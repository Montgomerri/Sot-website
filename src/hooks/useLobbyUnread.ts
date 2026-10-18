"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type Counts = Record<string, number>;

/** Wait a moment before telling the database you've read new messages */
const MARK_READ_DELAY_MS = 800;

/** 3 stays 3, 150 becomes "99+" */
export function formatUnread(count: number) {
  return count > 99 ? "99+" : String(count);
}

/**
 * Unread messages per Lobby channel.
 *
 * - On the dashboard pages: pass only the user id and use `total`.
 * - Inside the Lobby: also pass the channel that is open. It is marked as
 *   read while you look at it, and counts for the other channels go up
 *   as messages arrive.
 */
export default function useLobbyUnread(
  userId: string | null,
  activeChannelId: string | null = null
) {
  const [counts, setCounts] = useState<Counts>({});

  const activeRef = useRef<string | null>(activeChannelId);
  const timersRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    activeRef.current = activeChannelId;
  }, [activeChannelId]);

  // Counts, plus live updates when messages arrive
  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const timers = timersRef.current;

    async function loadCounts() {
      const { data, error } = await supabase.rpc("lobby_unread_counts");

      if (cancelled) return;

      if (error) {
        console.error("Failed to load unread counts:", {
          message: error.message,
          code: error.code,
          hint: error.hint,
        });

        return;
      }

      const next: Counts = {};

      (
        (data ?? []) as { out_channel_id: string; out_unread: number | string }[]
      ).forEach((row) => {
        next[row.out_channel_id] = Number(row.out_unread);
      });

      // The channel you're looking at is never "unread"
      if (activeRef.current) next[activeRef.current] = 0;

      setCounts(next);
    }

    async function markRead(channelId: string) {
      const { error } = await supabase.rpc("lobby_mark_read", {
        p_channel_id: channelId,
      });

      if (error) console.error("Failed to mark channel as read:", error);
    }

    function scheduleMarkRead(channelId: string) {
      if (timers.has(channelId)) return;

      const timer = window.setTimeout(async () => {
        timers.delete(channelId);
        await markRead(channelId);
      }, MARK_READ_DELAY_MS);

      timers.set(channelId, timer);
    }

    function handleInsert(payload: { new: Record<string, unknown> }) {
      const row = payload.new as { channel_id: string; user_id: string };

      // Your own messages are never unread
      if (row.user_id === userId) return;

      const looking =
        row.channel_id === activeRef.current &&
        document.visibilityState === "visible";

      if (looking) {
        scheduleMarkRead(row.channel_id);
        return;
      }

      setCounts((current) => ({
        ...current,
        [row.channel_id]: (current[row.channel_id] ?? 0) + 1,
      }));
    }

    function handleVisible() {
      if (document.visibilityState === "visible") loadCounts();
    }

    async function start() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (session) {
        supabase.realtime.setAuth(session.access_token);
      }

      channel = supabase
        .channel(`lobby-unread-${userId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "lobby_messages" },
          handleInsert
        )
        .subscribe((status) => {
          // Also catches anything posted while the connection was starting
          if (status === "SUBSCRIBED") loadCounts();
        });

      loadCounts();
    }

    document.addEventListener("visibilitychange", handleVisible);

    start();

    return () => {
      cancelled = true;

      document.removeEventListener("visibilitychange", handleVisible);

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [userId]);

  // Mark the open channel as read (and again when you come back to the tab)
  useEffect(() => {
    if (!userId || !activeChannelId) return;

    const supabase = createClient();
    const channelId: string = activeChannelId;

    let cancelled = false;

    async function mark() {
      const { error } = await supabase.rpc("lobby_mark_read", {
        p_channel_id: channelId,
      });

      if (cancelled) return;

      if (error) {
        console.error("Failed to mark channel as read:", error);
        return;
      }

      setCounts((current) => ({ ...current, [channelId]: 0 }));
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") mark();
    };

    mark();

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [userId, activeChannelId]);

  const total = useMemo(
    () => Object.values(counts).reduce((sum, count) => sum + count, 0),
    [counts]
  );

  return { counts, total };
}