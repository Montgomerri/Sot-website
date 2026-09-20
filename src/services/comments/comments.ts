import { createClient } from "@/lib/supabase/client";

const supabase = createClient();


export async function getComments(
  answerId: string
) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      profiles (
        full_name,
        avatar_url,
        reputation,
        department
      )
    `)
    .eq("answer_id", answerId)
    .order("created_at", {
      ascending: true,
    });


  if (error) throw error;

  return data;
}



export async function createComment({
  answerId,
  content,
}: {
  answerId: string;
  content: string;
}) {

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();


  if (!user) {
    throw new Error("Not authenticated");
  }


  const { error } = await supabase
    .from("comments")
    .insert({
      answer_id: answerId,
      user_id: user.id,
      content,
    });


  if (error) throw error;
}