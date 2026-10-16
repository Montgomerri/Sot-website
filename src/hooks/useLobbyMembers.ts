"use client";

import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export interface LobbyMember {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  level: string | null;
  department: string | null;
}

/** The member list loads this many people (alphabetical) */
const MEMBER_LIMIT = 300;

function byName(a: LobbyMember, b: LobbyMember) {
  return (a.full_name ?? "").localeCompare(b.full_name ?? "");
}

/**
 * Who is in the community, and who has the Lobby open right now.
 * "Online" comes from Supabase Presence: nothing is stored in your database.
 */
export default function useLobbyMembers(currentUserId: string | null) {
  const [profiles, setProfiles] = useState<LobbyMember[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load the members once
  useEffect(() => {
    let cancelled = false;

    const supabase = createClient();

    async function load() {
      const [list, count] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, avatar_url, level, department")
          .order("full_name", { ascending: true })
          .limit(MEMBER_LIMIT),

        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true }),
      ]);

      if (cancelled) return;

      if (list.error) {
        console.error("Failed to load members:", list.error);
      } else {
        setProfiles((list.data ?? []) as LobbyMember[]);
      }

      setTotal(count.count ?? list.data?.length ?? null);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // Say "I'm here" and watch who else is
  useEffect(() => {
    if (!currentUserId) return;

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

      const presenceChannel = supabase.channel("lobby-presence", {
        config: { presence: { key: currentUserId as string } },
      });

      channel = presenceChannel;

      presenceChannel
        .on("presence", { event: "sync" }, () => {
          setOnlineIds(new Set(Object.keys(presenceChannel.presenceState())));
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await presenceChannel.track({
              user_id: currentUserId,
              online_at: new Date().toISOString(),
            });
          }
        });
    }

    start();

    return () => {
      cancelled = true;

      if (channel) {
        channel.untrack();
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [currentUserId]);

  const { online, offline } = useMemo(() => {
    const onlineList: LobbyMember[] = [];
    const offlineList: LobbyMember[] = [];

    profiles.forEach((profile) =>
      (onlineIds.has(profile.id) ? onlineList : offlineList).push(profile)
    );

    // You first, then everyone else A to Z
    onlineList.sort((a, b) => {
      if (a.id === currentUserId) return -1;
      if (b.id === currentUserId) return 1;
      return byName(a, b);
    });

    return { online: onlineList, offline: offlineList };
  }, [profiles, onlineIds, currentUserId]);

  return {
    online,
    offline,
    total,
    onlineCount: onlineIds.size,
    loading,
  };
}