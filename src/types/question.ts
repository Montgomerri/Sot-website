import { Profile } from "./profile";

export interface Question {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  attachments: string[];
  votes: number;
  views: number;
  answers_count: number;
  accepted_answer_id: string | null;
  created_at: string;

  profiles: Profile | null;
}