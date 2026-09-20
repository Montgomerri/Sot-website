import { createClient } from "@/lib/supabase/server";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function getUserQuestions(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getUserAnswers(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("answers")
    .select(`
      *,
      questions!answers_question_id_fkey (
        id,
        title
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getProfileStats(userId: string) {
  const [questions, answers] = await Promise.all([
    getUserQuestions(userId),
    getUserAnswers(userId),
  ]);

  return {
    questionCount: questions.length,
    answerCount: answers.length,
    acceptedCount: answers.filter(
      (answer: any) => answer.is_accepted
    ).length,
  };
}