"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createClient } from "@/lib/supabase/client";

import {
  addLobbyReaction,
  getLobbyReactions,
  removeLobbyReaction,
} from "@/services/lobby/reactions";

import type { LobbyMessage, LobbyReaction } from "@/types/lobby";

export interface ReactionSummary {
  emoji: string;
  count: number;
  reactedByCurrentUser: boolean;
}

type ReactionMap = Record<string, LobbyReaction[]>;

const CHUNK_SIZE = 100;

function sameReaction(a: LobbyReaction, b: LobbyReaction) {
  return (
    a.message_id === b.message_id &&
    a.user_id === b.user_id &&
    a.emoji === b.emoji
  );
}

function addReaction(map: ReactionMap, reaction: LobbyReaction): ReactionMap {
  const list = map[reaction.message_id] ?? [];

  if (list.some((r) => r.id === reaction.id)) return map;

  // Replace our own unconfirmed copy of the same reaction
  const index = list.findIndex((r) => sameReaction(r, reaction));

  if (index !== -1) {
    const next = [...list];
    next[index] = reaction;
    return { ...map, [reaction.message_id]: next };
  }

  return { ...map, [reaction.message_id]: [...list, reaction] };
}

function removeReactionById(map: ReactionMap, id: string): ReactionMap {
  let changed = false;
  const next: ReactionMap = {};

  for (const [messageId, list] of Object.entries(map)) {
    const filtered = list.filter((r) => r.id !== id);

    if (filtered.length !== list.length) changed = true;

    next[messageId] = filtered;
  }

  return changed ? next : map;
}

/**
 * All reactions for the whole lobby, with ONE query per page of messages
 * and ONE live connection (instead of one of each per message).
 */
export default function useLobbyReactions(
  messages: LobbyMessage[],
  currentUserId: string | null
) {
  const [byMessage, setByMessage] = useState<ReactionMap>({});

  const byMessageRef = useRef<ReactionMap>({});
  const loadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    byMessageRef.current = byMessage;
  }, [byMessage]);

  // Load reactions for messages we haven't loaded them for yet
  useEffect(() => {
    const missing = messages
      .filter((m) => !m.status && !loadedRef.current.has(m.id))
      .map((m) => m.id);

    if (missing.length === 0) return;

    missing.forEach((id) => loadedRef.current.add(id));

    async function load() {
      for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
        const chunk = missing.slice(i, i + CHUNK_SIZE);

        try {
          const rows = await getLobbyReactions(chunk);

          setByMessage((current) => {
            let next = current;

            // Server rows first, then keep anything newer we already have
            const fresh: ReactionMap = { ...current };

            chunk.forEach((id) => {
              fresh[id] = [];
            });

            next = fresh;

            rows.forEach((row) => {
              next = addReaction(next, row);
            });

            chunk.forEach((id) => {
              (current[id] ?? []).forEach((existing) => {
                next = addReaction(next, existing);
              });
            });

            return next;
          });
        } catch (error) {
          console.error("Failed to load lobby reactions:", error);
          chunk.forEach((id) => loadedRef.current.delete(id));
        }
      }
    }

    load();
  }, [messages]);

  // One live connection for every reaction in the lobby
  useEffect(() => {
    const supabase = createClient();

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function start() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (session) {
        supabase.realtime.setAuth(session.access_token);
      }

      channel = supabase
        .channel("lobby-reactions")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "lobby_message_reactions",
          },
          (payload) => {
            const reaction = payload.new as LobbyReaction;
            setByMessage((current) => addReaction(current, reaction));
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "lobby_message_reactions",
          },
          (payload) => {
            const deleted = payload.old as Partial<LobbyReaction>;

            if (!deleted.id) return;

            const id = deleted.id;
            setByMessage((current) => removeReactionById(current, id));
          }
        )
        .subscribe();
    }

    start();

    return () => {
      cancelled = true;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, []);

  // Add or remove our reaction instantly, then tell the server
  const toggleReaction = useCallback(
    async (messageId: string, emoji: string) => {
      if (!currentUserId) return;

      const list = byMessageRef.current[messageId] ?? [];

      const mine = list.find(
        (r) => r.user_id === currentUserId && r.emoji === emoji
      );

      // Still being saved: ignore extra taps
      if (mine?.id.startsWith("tmp-")) return;

      if (mine) {
        setByMessage((current) => removeReactionById(current, mine.id));

        try {
          await removeLobbyReaction(messageId, emoji, currentUserId);
        } catch (error) {
          console.error("Failed to remove reaction:", error);
          setByMessage((current) => addReaction(current, mine));
        }

        return;
      }

      const temp: LobbyReaction = {
        id: `tmp-${crypto.randomUUID()}`,
        message_id: messageId,
        user_id: currentUserId,
        emoji,
        created_at: new Date().toISOString(),
      };

      setByMessage((current) => addReaction(current, temp));

      try {
        const saved = await addLobbyReaction(
          messageId,
          emoji,
          currentUserId
        );

        setByMessage((current) =>
          addReaction(removeReactionById(current, temp.id), saved)
        );
      } catch (error) {
        console.error("Failed to add reaction:", error);
        setByMessage((current) => removeReactionById(current, temp.id));
      }
    },
    [currentUserId]
  );

  const summaries = useMemo(() => {
    const result: Record<string, ReactionSummary[]> = {};

    for (const [messageId, list] of Object.entries(byMessage)) {
      const grouped = new Map<string, ReactionSummary>();

      for (const reaction of list) {
        const existing = grouped.get(reaction.emoji);
        const isMine = reaction.user_id === currentUserId;

        if (existing) {
          existing.count += 1;
          if (isMine) existing.reactedByCurrentUser = true;
        } else {
          grouped.set(reaction.emoji, {
            emoji: reaction.emoji,
            count: 1,
            reactedByCurrentUser: isMine,
          });
        }
      }

      if (grouped.size > 0) {
        result[messageId] = [...grouped.values()];
      }
    }

    return result;
  }, [byMessage, currentUserId]);

  return { summaries, toggleReaction };
}