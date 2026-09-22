import { createClient } from "@/lib/supabase/client";
import type { MessageReaction } from "@/types/reaction";

const REACTION_TABLE = "lobby_message_reactions";

export async function getLobbyReactions(
  messageIds: string[]
): Promise<MessageReaction[]> {
  if (messageIds.length === 0) {
    return [];
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from(REACTION_TABLE)
    .select("id, message_id, user_id, emoji, created_at")
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

export async function toggleLobbyReaction(
  messageId: string,
  emoji: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check whether this user already has this reaction
  const { data: existing, error: findError } = await supabase
    .from(REACTION_TABLE)
    .select("id")
    .eq("message_id", messageId)
    .eq("user_id", user.id)
    .eq("emoji", emoji)
    .maybeSingle();

  if (findError) {
    console.error("Find reaction Supabase error:", {
      message: findError.message,
      details: findError.details,
      hint: findError.hint,
      code: findError.code,
    });

    throw findError;
  }

  // Remove reaction if it already exists
  if (existing) {
    const { error } = await supabase
      .from(REACTION_TABLE)
      .delete()
      .eq("id", existing.id);

    if (error) {
      console.error("Delete reaction Supabase error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      throw error;
    }

    return {
      active: false,
      userId: user.id,
      reactionId: existing.id,
    };
  }

  // Otherwise add reaction
  const { data, error } = await supabase
    .from(REACTION_TABLE)
    .insert({
      message_id: messageId,
      user_id: user.id,
      emoji,
    })
    .select("id, message_id, user_id, emoji, created_at")
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

  return {
    active: true,
    userId: user.id,
    reaction: data,
  };
}