"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import type { LobbyChannel } from "@/types/lobby";

/**
 * The channel list, who you are, and whether you're an admin.
 * (Being an admin only changes what the page shows. The database itself
 * is what stops other people posting in admin-only channels.)
 */
export default function useLobbyChannels() {
  const [channels, setChannels] = useState<LobbyChannel[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const supabase = createClient();

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const uid = session?.user.id ?? null;

      const [channelResult, adminResult] = await Promise.all([
        supabase
          .from("lobby_channels")
          .select("id, slug, name, description, admin_only, sort_order")
          .order("sort_order", { ascending: true }),

        uid
          ? supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", uid)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ]);

      if (cancelled) return;

      setUserId(uid);

      if (channelResult.error) {
        console.error("Failed to load lobby channels:", {
          message: channelResult.error.message,
          code: channelResult.error.code,
          details: channelResult.error.details,
          hint: channelResult.error.hint,
        });

        setError(true);
      } else if (!channelResult.data?.length) {
        console.error(
          "Lobby channels came back empty. Check the read policy on lobby_channels."
        );

        setError(true);
      } else {
        setChannels(channelResult.data as LobbyChannel[]);
      }

      // If the column doesn't exist yet this is simply false
      setIsAdmin(
        Boolean((adminResult.data as { is_admin?: boolean } | null)?.is_admin)
      );

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { channels, userId, isAdmin, loading, error };
}