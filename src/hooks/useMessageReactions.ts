"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getLobbyReactions,
  toggleLobbyReaction,
} from "@/services/lobby/reactions";

import { createClient } from "@/lib/supabase/client";
import { LobbyReaction } from "@/types/lobby";

interface ReactionSummary {
  emoji: string;
  count: number;
  reactedByCurrentUser: boolean;
}

export default function useMessageReactions(
  messageId: string,
  currentUserId: string | null
) {
  const [reactions, setReactions] = useState<LobbyReaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingEmoji, setTogglingEmoji] =
    useState<string | null>(null);

  const loadReactions = useCallback(async () => {
    try {
      setLoading(true);

      const allReactions =
        await getLobbyReactions([messageId]);

      const messageReactions = allReactions.filter(
        (reaction) => reaction.message_id === messageId
      );

      setReactions(messageReactions);
    } catch (error) {
      console.error(
        "Failed to load message reactions:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [messageId]);

  /*
   * Initial reaction load
   */
  useEffect(() => {
    loadReactions();
  }, [loadReactions]);

  /*
   * Realtime reaction updates
   */
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`message-reactions-${messageId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "lobby_message_reactions",
          filter: `message_id=eq.${messageId}`,
        },
        (payload) => {
          const newReaction =
            payload.new as LobbyReaction;

          setReactions((current) => {
            const alreadyExists = current.some(
              (reaction) =>
                reaction.id === newReaction.id
            );

            if (alreadyExists) {
              return current;
            }

            return [...current, newReaction];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "lobby_message_reactions",
          filter: `message_id=eq.${messageId}`,
        },
        (payload) => {
          const deletedReaction =
            payload.old as LobbyReaction;

          setReactions((current) =>
            current.filter(
              (reaction) =>
                reaction.id !== deletedReaction.id
            )
          );
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(
            `Reaction realtime connected for message ${messageId}`
          );
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messageId]);

  /*
   * Toggle reaction
   */
  async function handleToggle(emoji: string) {
    if (!currentUserId) return;

    try {
      setTogglingEmoji(emoji);

      await toggleLobbyReaction(
        messageId,
        emoji
      );

      /*
       * We reload after our own toggle as a safety net.
       * Realtime also updates the state.
       */
      await loadReactions();
    } catch (error) {
      console.error(
        "Failed to toggle reaction:",
        error
      );
    } finally {
      setTogglingEmoji(null);
    }
  }

  /*
   * Group reactions by emoji
   */
  const reactionSummary =
    useMemo<ReactionSummary[]>(() => {
      const grouped = new Map<
        string,
        LobbyReaction[]
      >();

      for (const reaction of reactions) {
        const existing =
          grouped.get(reaction.emoji) ?? [];

        existing.push(reaction);

        grouped.set(
          reaction.emoji,
          existing
        );
      }

      return Array.from(grouped.entries()).map(
        ([emoji, emojiReactions]) => ({
          emoji,
          count: emojiReactions.length,
          reactedByCurrentUser: currentUserId
            ? emojiReactions.some(
                (reaction) =>
                  reaction.user_id ===
                  currentUserId
              )
            : false,
        })
      );
    }, [reactions, currentUserId]);

  return {
    reactions,
    reactionSummary,
    loading,
    togglingEmoji,
    toggleReaction: handleToggle,
    reloadReactions: loadReactions,
  };
}