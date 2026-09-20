import { createClient } from "@/lib/supabase/client";
import { Answer } from "@/types/answer";
import { createNotification } from "@/services/notifications/notifications";

const supabase = createClient();

export async function getAnswers(questionId: string) {
  const { data, error } = await supabase
    .from("answers")
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
    .eq("question_id", questionId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function createAnswer({
  questionId,
  content,
}: {
  questionId: string;
  content: string;
}): Promise<Answer> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Create answer
  const { data, error } = await supabase
    .from("answers")
    .insert({
      question_id: questionId,
      user_id: user.id,
      content,
    })
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
    .single();

  if (error) throw error;

  // Find question owner
  const { data: question } = await supabase
    .from("questions")
    .select("id, user_id, title")
    .eq("id", questionId)
    .single();

  // Notify question owner (but not yourself)
  if (
    question &&
    question.user_id &&
    question.user_id !== user.id
  ) {
    await createNotification({
      userId: question.user_id,
      actorId: user.id,
      type: "answer",
      message: `Someone answered your question "${question.title}".`,
      link: `/questions/${question.id}`,
    });
  }

  return data as Answer;
}