import { createClient } from "@/lib/supabase/client";

import type { LobbyMessage, LobbyProfile } from "@/types/lobby";

/** How many messages are loaded at a time */
export const LOBBY_PAGE_SIZE = 50;

export interface LobbyRow {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  reply_to_id: string | null;
}

const COLUMNS =
  "id, channel_id, user_id, content, created_at, image_url, reply_to_id";

/* -----------------------------------------
   PROFILE CACHE
   Names and avatars are looked up once per
   person for the life of the page, instead of
   once per message.
----------------------------------------- */

const profileCache = new Map<string, LobbyProfile | null>();

export function getCachedProfile(userId: string): LobbyProfile | null {
  return profileCache.get(userId) ?? null;
}

export async function getProfilesByIds(
  ids: string[]
): Promise<Map<string, LobbyProfile | null>> {
  const unique = [...new Set(ids)];
  const missing = unique.filter((id) => !profileCache.has(id));

  if (missing.length > 0) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", missing);

    if (error) {
      console.error("Failed to load profiles:", error);
    } else {
      const found = new Map<string, LobbyProfile>();

      (data ?? []).forEach((p) =>
        found.set(p.id, {
          full_name: p.full_name,
          avatar_url: p.avatar_url,
        })
      );

      missing.forEach((id) => profileCache.set(id, found.get(id) ?? null));
    }
  }

  const result = new Map<string, LobbyProfile | null>();
  unique.forEach((id) => result.set(id, profileCache.get(id) ?? null));

  return result;
}

/* -----------------------------------------
   HYDRATE ROWS INTO COMPLETE MESSAGES
   Always 2 queries at most (replied-to
   messages + profiles), however many rows.
----------------------------------------- */

export async function hydrateLobbyRows(
  rows: LobbyRow[],
  known: LobbyMessage[] = []
): Promise<LobbyMessage[]> {
  if (rows.length === 0) return [];

  const supabase = createClient();

  // Everything we can already see (to resolve replies without a query)
  const lookup = new Map<
    string,
    { id: string; user_id: string; content: string }
  >();

  known.forEach((m) => lookup.set(m.id, m));
  rows.forEach((r) => lookup.set(r.id, r));

  const replyIds = [
    ...new Set(
      rows
        .map((r) => r.reply_to_id)
        .filter((id): id is string => !!id)
    ),
  ];

  const missingReplyIds = replyIds.filter((id) => !lookup.has(id));

  if (missingReplyIds.length > 0) {
    const { data, error } = await supabase
      .from("lobby_messages")
      .select("id, user_id, content")
      .in("id", missingReplyIds);

    if (error) {
      console.error("Failed to load replied-to messages:", error);
    } else {
      (data ?? []).forEach((r) => lookup.set(r.id, r));
    }
  }

  const userIds = [
    ...rows.map((r) => r.user_id),
    ...replyIds
      .map((id) => lookup.get(id)?.user_id)
      .filter((id): id is string => !!id),
  ];

  const profiles = await getProfilesByIds(userIds);

  return rows.map((row) => {
    const reply = row.reply_to_id ? lookup.get(row.reply_to_id) : undefined;

    return {
      id: row.id,
      channel_id: row.channel_id,
      user_id: row.user_id,
      content: row.content,
      created_at: row.created_at,
      image_url: row.image_url,
      reply_to_id: row.reply_to_id,
      profiles: profiles.get(row.user_id) ?? null,
      reply_to: reply
        ? {
            id: reply.id,
            user_id: reply.user_id,
            content: reply.content,
            profiles: profiles.get(reply.user_id) ?? null,
          }
        : null,
    };
  });
}

/* -----------------------------------------
   LOAD MESSAGES (newest page, or an older one)
----------------------------------------- */

export async function getLobbyMessages(options: {
  channelId: string;
  before?: string;
  limit?: number;
  known?: LobbyMessage[];
}): Promise<{ messages: LobbyMessage[]; hasMore: boolean }> {
  const {
    channelId,
    before,
    limit = LOBBY_PAGE_SIZE,
    known = [],
  } = options;

  const supabase = createClient();

  let query = supabase
    .from("lobby_messages")
    .select(COLUMNS)
    .eq("channel_id", channelId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (before) {
    query = query.lt("created_at", before);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load lobby messages:", error);
    throw error;
  }

  const rows = ((data ?? []) as LobbyRow[]).reverse();

  return {
    messages: await hydrateLobbyRows(rows, known),
    hasMore: rows.length === limit,
  };
}

/* -----------------------------------------
   SEND / EDIT / DELETE
----------------------------------------- */

export async function uploadLobbyImage(
  file: File,
  userId: string
): Promise<string> {
  const supabase = createClient();

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("lobby-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return supabase.storage.from("lobby-images").getPublicUrl(path).data
    .publicUrl;
}

/**
 * The caller passes the user id (it already knows it), which avoids a
 * network round trip to the auth server before every message.
 */
export async function sendLobbyMessage(input: {
  userId: string;
  channelId: string;
  content: string;
  imageUrl?: string | null;
  replyToId?: string | null;
}): Promise<LobbyRow> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lobby_messages")
    .insert({
      channel_id: input.channelId,
      user_id: input.userId,
      content: input.content,
      image_url: input.imageUrl ?? null,
      reply_to_id: input.replyToId ?? null,
    })
    .select(COLUMNS)
    .single();

  if (error) {
    console.error("Failed to send lobby message:", error);
    throw error;
  }

  return data as LobbyRow;
}

export async function deleteLobbyMessage(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("lobby_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete lobby message:", error);
    throw error;
  }
}

export async function updateLobbyMessage(
  id: string,
  content: string
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("lobby_messages")
    .update({ content })
    .eq("id", id);

  if (error) {
    console.error("Failed to update lobby message:", error);
    throw error;
  }
}