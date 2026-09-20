import QuestionHeader from "@/components/questions/QuestionHeader";
import QuestionSidebar from "@/components/questions/QuestionSidebar";
import QuestionBody from "@/components/questions/QuestionBody";
import QuestionAttachments from "@/components/questions/QuestionAttachments";
import QuestionDiscussion from "@/components/questions/QuestionDiscussion";
import { getQuestion } from "@/services/questions/getQuestion";
import { createClient } from "@/lib/supabase/server";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const question = await getQuestion(id);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canAccept =
    user?.id === question.user_id;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">

      <QuestionHeader question={question} />

      <div className="mt-8 flex gap-8">

        <QuestionSidebar question={question} />

        <div className="flex-1 space-y-8">

          <QuestionBody question={question} />

          <QuestionAttachments
            attachments={question.attachments}
          />

          <QuestionDiscussion
            questionId={question.id}
            acceptedAnswerId={
              question.accepted_answer_id
            }
            canAccept={canAccept}
          />

        </div>

      </div>

    </div>
  );
}