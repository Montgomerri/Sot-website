import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function acceptAnswer(
  questionId: string,
  answerId: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Verify ownership of the question
  const { data: question, error: questionError } = await supabase
    .from("questions")
    .select("user_id")
    .eq("id", questionId)
    .single();

  if (questionError) throw questionError;

  if (question.user_id !== user.id) {
    throw new Error("Only the question owner can accept an answer.");
  }

  const { error } = await supabase
    .from("questions")
    .update({
      accepted_answer_id: answerId,
    })
    .eq("id", questionId);

  if (error) throw error;
}

export async function unacceptAnswer(
  questionId: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: question, error: questionError } = await supabase
    .from("questions")
    .select("user_id")
    .eq("id", questionId)
    .single();

  if (questionError) throw questionError;

  if (question.user_id !== user.id) {
    throw new Error("Only the question owner can remove the accepted answer.");
  }

  const { error } = await supabase
    .from("questions")
    .update({
      accepted_answer_id: null,
    })
    .eq("id", questionId);

  if (error) throw error;
} 