export interface LobbyProfile {
  full_name: string | null;
  avatar_url: string | null;
}

export interface LobbyMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url?: string | null;
  reply_to_id?: string | null;

  /** Only set while a message hasn't been confirmed by the server yet */
  status?: "sending" | "failed";

  channel_id?: string;

  /** Stable React key: stays the same when a sent message gets its real id */
  clientKey?: string;

  profiles?: LobbyProfile | null;

  reply_to?: {
    id: string;
    content: string;
    user_id: string;
    profiles?: LobbyProfile | null;
  } | null;
}

export interface LobbyReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface LobbyChannel {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  admin_only: boolean;
  sort_order: number;
}