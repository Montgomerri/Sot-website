import type { SupabaseClient } from "@supabase/supabase-js";

export interface DashboardStats {
  questionCount: number;
  answerCount: number;
  acceptedCount: number;
}

/**
 * Cheap counts for the dashboard (no rows are downloaded, Supabase just
 * returns the totals).
 */
export async function getDashboardStats(
  supabase: SupabaseClient,
  userId: string
): Promise<DashboardStats> {
  const [questions, answers, accepted] = await Promise.all([
    supabase
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),

    supabase
      .from("answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),

    supabase
      .from("answers")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_accepted", true),
  ]);

  return {
    questionCount: questions.count ?? 0,
    answerCount: answers.count ?? 0,
    acceptedCount: accepted.count ?? 0,
  };
}