import { createClient } from "@/lib/supabase/server";

export async function getQuestion(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url,
        reputation,
        department,
        bio,
        created_at
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}