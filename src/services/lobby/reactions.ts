import { createClient } from "@/lib/supabase/client";
import type { LobbyReaction } from "@/types/lobby";

const REACTION_TABLE = "lobby_message_reactions";
const COLUMNS = "id, message_id, user_id, emoji, created_at";

export async function getLobbyReactions(
  messageIds: string[]
): Promise<LobbyReaction[]> {
  if (messageIds.length === 0) {
    return [];
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from(REACTION_TABLE)
    .select(COLUMNS)
    .in("message_id", messageIds)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getLobbyReactions Supabase error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw error;
  }

  return data ?? [];
}

/** Add a reaction (one query). */
export async function addLobbyReaction(
  messageId: string,
  emoji: string,
  userId: string
): Promise<LobbyReaction> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(REACTION_TABLE)
    .insert({
      message_id: messageId,
      user_id: userId,
      emoji,
    })
    .select(COLUMNS)
    .single();

  if (error) {
    console.error("Insert reaction Supabase error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw error;
  }

  return data;
}

/** Remove a reaction (one query, no lookup needed). */
export async function removeLobbyReaction(
  messageId: string,
  emoji: string,
  userId: string
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from(REACTION_TABLE)
    .delete()
    .eq("message_id", messageId)
    .eq("user_id", userId)
    .eq("emoji", emoji);

  if (error) {
    console.error("Delete reaction Supabase error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw error;
  }
}

/**
 * Kept so the old useMessageReactions hook (if you still have the file)
 * keeps compiling. The lobby now uses addLobbyReaction / removeLobbyReaction.
 */
export async function toggleLobbyReaction(
  messageId: string,
  emoji: string
) {
  const supabase = createClient();

  // getSession reads the local session (no network call)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: existing, error: findError } = await supabase
    .from(REACTION_TABLE)
    .select("id")
    .eq("message_id", messageId)
    .eq("user_id", user.id)
    .eq("emoji", emoji)
    .maybeSingle();

  if (findError) throw findError;

  if (existing) {
    await removeLobbyReaction(messageId, emoji, user.id);

    return {
      active: false,
      userId: user.id,
      reactionId: existing.id,
    };
  }

  const reaction = await addLobbyReaction(messageId, emoji, user.id);

  return {
    active: true,
    userId: user.id,
    reaction,
  };
}