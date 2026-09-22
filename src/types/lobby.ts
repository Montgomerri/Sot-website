export interface LobbyMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url?: string | null;
  reply_to_id?: string | null;

  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;

  reply_to?: {
    id: string;
    content: string;
    user_id: string;

    profiles?: {
      full_name: string | null;
      avatar_url: string | null;
    } | null;
  } | null;
}

export interface LobbyReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}