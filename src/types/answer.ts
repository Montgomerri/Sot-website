import { Profile } from "./profile";

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  is_accepted: boolean;
  created_at: string;
  updated_at?: string | null;

  profiles: Profile | null;
}