import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      profiles (
        full_name,
        avatar_url,
        reputation
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}