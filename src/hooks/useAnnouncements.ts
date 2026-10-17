"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export interface Announcement {
  id: string;
  content: string;
  hasImage: boolean;
  createdAt: string;
}

/** How many of the latest announcements the dashboard shows */
const LIMIT = 3;

// The channel never changes, so look it up once
let announcementsChannelId: string | null = null;

async function getAnnouncementsChannelId(supabase: SupabaseClient) {
  if (announcementsChannelId) return announcementsChannelId;

  const { data, error } = await supabase
    .from("lobby_channels")
    .select("id")
    .eq("slug", "announcements")
    .maybeSingle();

  if (error) throw error;

  announcementsChannelId = data?.id ?? null;

  return announcementsChannelId;
}

/**
 * The latest posts from the Lobby's Announcements channel.
 * Post there once and every dashboard shows it.
 */
export default function useAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const supabase = createClient();

    async function load() {
      try {
        const channelId = await getAnnouncementsChannelId(supabase);

        if (cancelled) return;

        if (!channelId) {
          setItems([]);
          setError(false);
          return;
        }

        const { data, error: queryError } = await supabase
          .from("lobby_messages")
          .select("id, content, image_url, created_at")
          .eq("channel_id", channelId)
          .order("created_at", { ascending: false })
          .limit(LIMIT);

        if (queryError) throw queryError;

        if (cancelled) return;

        setItems(
          (data ?? []).map((row) => ({
            id: row.id,
            content: row.content ?? "",
            hasImage: !!row.image_url,
            createdAt: row.created_at,
          }))
        );

        setError(false);
      } catch (loadError) {
        console.error("Failed to load announcements:", loadError);

        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    // Pick up new announcements when you come back to the tab
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return { items, loading, error };
}