import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function voteQuestion(
  questionId: string,
  value: 1 | -1
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: existingVote } = await supabase
    .from("question_votes")
    .select("*")
    .eq("question_id", questionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingVote?.value === value) {
    const { error } = await supabase
      .from("question_votes")
      .delete()
      .eq("id", existingVote.id);

    if (error) throw error;

    return 0;
  }

  if (existingVote) {
    const { error } = await supabase
      .from("question_votes")
      .update({
        value,
      })
      .eq("id", existingVote.id);

    if (error) throw error;

    return value;
  }

  const { error } = await supabase
    .from("question_votes")
    .insert({
      question_id: questionId,
      user_id: user.id,
      value,
    });

  if (error) throw error;

  return value;
}

export async function getQuestionVoteCount(
  questionId: string
) {
  const { data, error } = await supabase
    .from("question_votes")
    .select("value")
    .eq("question_id", questionId);

  if (error) throw error;

  return (
    data?.reduce(
      (sum, vote) => sum + vote.value,
      0
    ) ?? 0
  );
}

export async function getMyQuestionVote(
  questionId: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { data, error } = await supabase
    .from("question_votes")
    .select("value")
    .eq("question_id", questionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data?.value ?? 0;
}