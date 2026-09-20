"use client";

import Link from "next/link";
import { MessageSquare, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  questions: any[];
}

export default function ProfileQuestions({
  questions,
}: Props) {
  if (questions.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        No questions yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {questions.map((question) => (

        <Link
          key={question.id}
          href={`/questions/${question.id}`}
          className="
            block
            rounded-xl
            border
            p-5
            transition
            hover:border-blue-300
            hover:shadow-sm
          "
        >

          <h3 className="font-semibold text-gray-900">
            {question.title}
          </h3>

          <div className="mt-3 flex items-center gap-5 text-sm text-gray-500">

            <span className="flex items-center gap-2">

              <MessageSquare size={15} />

              {question.answer_count ?? 0} Answers

            </span>

            <span className="flex items-center gap-2">

              <Clock3 size={15} />

              {formatDistanceToNow(
                new Date(question.created_at),
                {
                  addSuffix: true,
                }
              )}

            </span>

          </div>

        </Link>

      ))}

    </div>
  );
}