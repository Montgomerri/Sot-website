import { createClient } from "@/lib/supabase/client";

export async function startConversation(
  otherUserId: string
): Promise<string> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not authenticated.");
  }

  if (user.id === otherUserId) {
    throw new Error("You cannot start a conversation with yourself.");
  }

  // Check whether a conversation already exists
  const { data: existing, error: existingError } = await supabase
    .from("conversations")
    .select("id")
    .or(
      `and(user1_id.eq.${user.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${user.id})`
    )
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return existing.id;
  }

  // Create a new conversation
  const { data: conversation, error: createError } = await supabase
    .from("conversations")
    .insert({
      user1_id: user.id,
      user2_id: otherUserId,
    })
    .select("id")
    .single();

  if (createError || !conversation) {
    throw createError ?? new Error("Failed to create conversation.");
  }

  return conversation.id;
} 