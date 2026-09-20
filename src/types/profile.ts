export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  username?: string | null;
  reputation: number | null;
  department: string | null;
  level?: string | null;
  bio: string | null;
  created_at: string;
  updated_at?: string | null;
}