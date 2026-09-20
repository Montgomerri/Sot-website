import { createClient } from "@/lib/supabase/client";

import { LobbyMessage } from "@/types/lobby";

/**
 * Build a complete lobby message.
 *
 * We intentionally fetch the profile and reply separately
 * instead of relying on Supabase's nested self-relation.
 * This prevents realtime messages from incorrectly showing
 * "User / Image" until the page is refreshed.
 */
async function hydrateLobbyMessage(
  row: {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    image_url: string | null;
    reply_to_id: string | null;
  },
  supabase: ReturnType<typeof createClient>
): Promise<LobbyMessage> {
  // -----------------------------------------
  // GET MESSAGE AUTHOR
  // -----------------------------------------

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", row.user_id)
      .maybeSingle();

  if (profileError) {
    console.error(
      "Failed to load message profile:",
      profileError
    );
  }

  // -----------------------------------------
  // DEFAULT: NO REPLY
  // -----------------------------------------

  let replyTo: LobbyMessage["reply_to"] = null;

  // -----------------------------------------
  // GET REPLY MESSAGE
  // -----------------------------------------

  if (row.reply_to_id) {
    const { data: replyRow, error: replyError } =
      await supabase
        .from("lobby_messages")
        .select(
          `
            id,
            user_id,
            content,
            created_at,
            image_url,
            reply_to_id
          `
        )
        .eq("id", row.reply_to_id)
        .maybeSingle();

    if (replyError) {
      console.error(
        "Failed to load reply message:",
        replyError
      );
    }

    if (replyRow) {
      // ---------------------------------------
      // GET REPLY AUTHOR
      // ---------------------------------------

      const {
        data: replyProfile,
        error: replyProfileError,
      } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", replyRow.user_id)
        .maybeSingle();

      if (replyProfileError) {
        console.error(
          "Failed to load reply profile:",
          replyProfileError
        );
      }

      replyTo = {
        id: replyRow.id,
        user_id: replyRow.user_id,
        content: replyRow.content,
        profiles: replyProfile ?? null,
      };
    }
  }

  // -----------------------------------------
  // RETURN COMPLETE MESSAGE
  // -----------------------------------------

  return {
    id: row.id,
    user_id: row.user_id,
    content: row.content,
    created_at: row.created_at,
    image_url: row.image_url,
    reply_to_id: row.reply_to_id,
    profiles: profile ?? null,

    // IMPORTANT:
    // Normal messages always have reply_to = null.
    // Only actual replies receive a reply object.
    reply_to: replyTo,
  };
}

/**
 * Get all lobby messages.
 */
export async function getLobbyMessages(): Promise<
  LobbyMessage[]
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lobby_messages")
    .select(
      `
        id,
        user_id,
        content,
        created_at,
        image_url,
        reply_to_id
      `
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to load lobby messages:",
      error
    );

    return [];
  }

  if (!data) {
    return [];
  }

  const messages = await Promise.all(
    data.map((row) =>
      hydrateLobbyMessage(row, supabase)
    )
  );

  return messages;
}

/**
 * Get one complete lobby message by ID.
 *
 * This is used by the realtime INSERT handler.
 */
export async function getLobbyMessageById(
  id: string
): Promise<LobbyMessage | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lobby_messages")
    .select(
      `
        id,
        user_id,
        content,
        created_at,
        image_url,
        reply_to_id
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Failed to load lobby message:",
      error
    );

    throw error;
  }

  if (!data) {
    return null;
  }

  return hydrateLobbyMessage(
    data,
    supabase
  );
}

/**
 * Send a lobby message.
 */
export async function sendLobbyMessage(
  content: string,
  imageUrl?: string | null,
  replyToId?: string | null
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const { error } = await supabase
    .from("lobby_messages")
    .insert({
      user_id: user.id,
      content,
      image_url: imageUrl ?? null,
      reply_to_id: replyToId ?? null,
    });

  if (error) {
    console.error(
      "Failed to send lobby message:",
      error
    );

    throw error;
  }
}

/**
 * Update a lobby message.
 */
export async function updateLobbyMessage(
  id: string,
  content: string
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("lobby_messages")
    .update({
      content,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to update lobby message:",
      error
    );

    throw error;
  }
}

/**
 * Delete a lobby message.
 */
export async function deleteLobbyMessage(
  id: string
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("lobby_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to delete lobby message:",
      error
    );

    throw error;
  }
}