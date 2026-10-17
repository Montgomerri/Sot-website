"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import {
  deleteLobbyMessage,
  getCachedProfile,
  getLobbyMessages,
  getProfilesByIds,
  hydrateLobbyRows,
  sendLobbyMessage,
  updateLobbyMessage,
  uploadLobbyImage,
  type LobbyRow,
} from "@/services/lobby/lobby";

import type { LobbyMessage } from "@/types/lobby";

interface PendingJob {
  content: string;
  file: File | null;
  replyToId: string | null;
}

const CATCH_UP_LIMIT = 30;

function compareByTime(a: LobbyMessage, b: LobbyMessage) {
  if (a.created_at < b.created_at) return -1;
  if (a.created_at > b.created_at) return 1;
  return 0;
}

/** Put a confirmed message in the right place (before any unsent ones). */
function insertMessage(list: LobbyMessage[], message: LobbyMessage) {
  let end = list.length;

  while (end > 0 && list[end - 1].status) end--;

  let index = end;

  while (index > 0 && list[index - 1].created_at > message.created_at) {
    index--;
  }

  return [...list.slice(0, index), message, ...list.slice(index)];
}

/** Merge a freshly loaded page into what we already have. */
function mergeLatest(current: LobbyMessage[], latest: LobbyMessage[]) {
  const latestIds = new Set(latest.map((m) => m.id));

  const pending = current.filter((m) => m.status);
  const kept = current.filter((m) => !m.status && !latestIds.has(m.id));

  const merged = [...kept, ...latest].sort(compareByTime);

  return [...merged, ...pending];
}

export default function useLobby(channelId: string) {
  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);

  const messagesRef = useRef<LobbyMessage[]>([]);
  const currentUserIdRef = useRef<string | null>(null);
  const pendingRef = useRef<Map<string, PendingJob>>(new Map());
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const loadingOlderRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  const fetchLatest = useCallback(
    async (isInitial: boolean, limit?: number) => {
      const { messages: latest, hasMore: more } = await getLobbyMessages({
        channelId,
        limit,
        known: messagesRef.current,
      });

      setMessages((current) => mergeLatest(current, latest));

      if (isInitial) setHasMore(more);
    },
    [channelId]
  );

  const reload = useCallback(async () => {
    setLoadError(false);
    setLoading(true);

    try {
      await fetchLatest(true);
    } catch (error) {
      console.error("Failed to load lobby messages:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchLatest]);

  const loadOlder = useCallback(async () => {
    if (loadingOlderRef.current) return;

    const oldest = messagesRef.current.find((m) => !m.status);
    if (!oldest) return;

    loadingOlderRef.current = true;
    setLoadingOlder(true);

    try {
      const { messages: older, hasMore: more } = await getLobbyMessages({
        channelId,
        before: oldest.created_at,
        known: messagesRef.current,
      });

      setMessages((current) => {
        const ids = new Set(current.map((m) => m.id));
        return [...older.filter((m) => !ids.has(m.id)), ...current];
      });

      setHasMore(more);
    } catch (error) {
      console.error("Failed to load older messages:", error);
    } finally {
      loadingOlderRef.current = false;
      setLoadingOlder(false);
    }
  }, [channelId]);

  // -----------------------------------------
  // REALTIME
  // -----------------------------------------

  useEffect(() => {
    const supabase = createClient();

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let subscribedBefore = false;

    const blobUrls = blobUrlsRef.current;

    function applyUserId(id: string | null) {
      currentUserIdRef.current = id;
      setCurrentUserId(id);
    }

    // Keep Realtime's token fresh when Supabase refreshes the session
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;

      applyUserId(session?.user?.id ?? null);

      if (session?.access_token) {
        supabase.realtime.setAuth(session.access_token);
      }
    });

    function catchUp() {
      if (cancelled) return;

      fetchLatest(false, CATCH_UP_LIMIT).catch((error) =>
        console.error("Lobby catch-up failed:", error)
      );
    }

    // Someone else's new message
    async function handleInsert(payload: {
      new: Record<string, unknown>;
    }) {
      const row = payload.new as unknown as LobbyRow;

      if (row.channel_id !== channelId) return;

      if (messagesRef.current.some((m) => m.id === row.id)) return;

      // The server confirming a message we already show: swap it in place
      if (row.user_id === currentUserIdRef.current) {
        const mine = messagesRef.current.find(
          (m) =>
            m.status === "sending" &&
            m.user_id === row.user_id &&
            m.content === row.content &&
            !!m.image_url === !!row.image_url &&
            (m.reply_to_id ?? null) === (row.reply_to_id ?? null)
        );

        if (mine) {
          pendingRef.current.delete(mine.id);

          setMessages((current) =>
            current.map((m) =>
              m.id === mine.id
                ? {
                    ...m,
                    id: row.id,
                    created_at: row.created_at,
                    status: undefined,
                  }
                : m
            )
          );

          return;
        }
      }

      try {
        const [message] = await hydrateLobbyRows(
          [row],
          messagesRef.current
        );

        if (cancelled || !message) return;

        setMessages((current) =>
          current.some((m) => m.id === message.id)
            ? current
            : insertMessage(current, message)
        );
      } catch (error) {
        console.error("Failed to process new lobby message:", error);
      }
    }

    function handleUpdate(payload: { new: Record<string, unknown> }) {
      const row = payload.new as unknown as LobbyRow;

      setMessages((current) =>
        current.map((m) =>
          m.id === row.id ? { ...m, content: row.content } : m
        )
      );
    }

    function handleDelete(payload: { old: Record<string, unknown> }) {
      const deletedId = payload.old.id as string | undefined;

      if (!deletedId) return;

      setMessages((current) => current.filter((m) => m.id !== deletedId));
    }

    function handleVisible() {
      if (document.visibilityState === "visible") catchUp();
    }

    async function start() {
      // Local session: no network call
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (!session) {
        setLoadError(true);
        setLoading(false);
        return;
      }

      applyUserId(session.user.id);
      supabase.realtime.setAuth(session.access_token);

      // Warm the cache so our own optimistic messages show our name
      void getProfilesByIds([session.user.id]);

      // Subscribe and load the history at the same time
      let resolveSubscribed: () => void = () => {};

      const subscribed = new Promise<void>((resolve) => {
        resolveSubscribed = resolve;
      });

      channel = supabase
        .channel(`lobby-room-${channelId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "lobby_messages",
            filter: `channel_id=eq.${channelId}`,
          },
          handleInsert
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "lobby_messages",
            filter: `channel_id=eq.${channelId}`,
          },
          handleUpdate
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "lobby_messages" },
          handleDelete
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            // After a dropped connection, fetch what we missed
            if (subscribedBefore) catchUp();

            subscribedBefore = true;
            resolveSubscribed();
          }

          if (
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            resolveSubscribed();
          }
        });

      await reload();

      if (cancelled) return;

      // Anything posted between the history query and the live connection
      await subscribed;
      catchUp();
    }

    document.addEventListener("visibilitychange", handleVisible);
    window.addEventListener("online", handleVisible);

    start();

    return () => {
      cancelled = true;

      authSubscription.unsubscribe();

      document.removeEventListener("visibilitychange", handleVisible);
      window.removeEventListener("online", handleVisible);

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }

      blobUrls.forEach((url) => URL.revokeObjectURL(url));
      blobUrls.clear();
    };
  }, [fetchLatest, reload, channelId]);

  // -----------------------------------------
  // SEND (optimistic: shows instantly)
  // -----------------------------------------

  const deliver = useCallback(async (tmpId: string) => {
    const job = pendingRef.current.get(tmpId);
    const userId = currentUserIdRef.current;

    if (!job || !userId) return;

    setMessages((current) =>
      current.map((m) =>
        m.id === tmpId ? { ...m, status: "sending" } : m
      )
    );

    try {
      const imageUrl = job.file
        ? await uploadLobbyImage(job.file, userId)
        : null;

      const row = await sendLobbyMessage({
        userId,
        channelId,
        content: job.content,
        imageUrl,
        replyToId: job.replyToId,
      });

      pendingRef.current.delete(tmpId);

      setMessages((current) => {
        // The live connection already swapped it in
        if (current.some((m) => m.id === row.id)) {
          return current.filter((m) => m.id !== tmpId);
        }

        return current.map((m) =>
          m.id === tmpId
            ? {
                ...m,
                id: row.id,
                created_at: row.created_at,
                status: undefined,
                profiles: m.profiles ?? getCachedProfile(m.user_id),
              }
            : m
        );
      });
    } catch (error) {
      console.error("Failed to send lobby message:", error);

      setMessages((current) =>
        current.map((m) =>
          m.id === tmpId ? { ...m, status: "failed" } : m
        )
      );
    }
  }, [channelId]);

  const sendMessage = useCallback(
    async (
      content: string,
      file?: File | null,
      replyTo?: LobbyMessage | null
    ) => {
      const userId = currentUserIdRef.current;

      if (!userId) return;

      const tmpId = `tmp-${crypto.randomUUID()}`;

      const previewUrl = file ? URL.createObjectURL(file) : null;

      if (previewUrl) blobUrlsRef.current.add(previewUrl);

      pendingRef.current.set(tmpId, {
        content,
        file: file ?? null,
        replyToId: replyTo?.id ?? null,
      });

      const optimistic: LobbyMessage = {
        id: tmpId,
        channel_id: channelId,
        clientKey: tmpId,
        user_id: userId,
        content,
        created_at: new Date().toISOString(),
        image_url: previewUrl,
        reply_to_id: replyTo?.id ?? null,
        status: "sending",
        profiles: getCachedProfile(userId),
        reply_to: replyTo
          ? {
              id: replyTo.id,
              user_id: replyTo.user_id,
              content: replyTo.content,
              profiles: replyTo.profiles ?? null,
            }
          : null,
      };

      setMessages((current) => [...current, optimistic]);

      await deliver(tmpId);
    },
    [deliver, channelId]
  );

  const retryMessage = useCallback(
    (id: string) => deliver(id),
    [deliver]
  );

  const discardMessage = useCallback((id: string) => {
    pendingRef.current.delete(id);
    setMessages((current) => current.filter((m) => m.id !== id));
  }, []);

  // -----------------------------------------
  // EDIT / DELETE (optimistic, rolled back on error)
  // -----------------------------------------

  const editMessage = useCallback(
    async (id: string, content: string) => {
      const before = messagesRef.current.find((m) => m.id === id)?.content;

      setMessages((current) =>
        current.map((m) => (m.id === id ? { ...m, content } : m))
      );

      try {
        await updateLobbyMessage(id, content);
      } catch (error) {
        if (before !== undefined) {
          setMessages((current) =>
            current.map((m) =>
              m.id === id ? { ...m, content: before } : m
            )
          );
        }

        throw error;
      }
    },
    []
  );

  const deleteMessage = useCallback(async (id: string) => {
    const snapshot = messagesRef.current;
    const index = snapshot.findIndex((m) => m.id === id);
    const removed = snapshot[index];

    setMessages((current) => current.filter((m) => m.id !== id));

    try {
      await deleteLobbyMessage(id);
    } catch (error) {
      if (removed) {
        setMessages((current) => {
          if (current.some((m) => m.id === id)) return current;

          const next = [...current];
          next.splice(Math.min(index, next.length), 0, removed);
          return next;
        });
      }

      throw error;
    }
  }, []);

  return {
    messages,
    currentUserId,
    loading,
    loadError,
    reload,
    hasMore,
    loadingOlder,
    loadOlder,
    sendMessage,
    retryMessage,
    discardMessage,
    editMessage,
    deleteMessage,
  };
}