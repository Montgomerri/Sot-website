"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  answers: any[];
}

export default function ProfileAnswers({
  answers,
}: Props) {
  if (answers.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        No answers yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {answers.map((answer) => (

        <div
          key={answer.id}
          className="rounded-xl border p-5"
        >

          <Link
            href={`/questions/${answer.questions?.id}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {answer.questions?.title}
          </Link>

          <div
            className="prose mt-4 max-w-none line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: answer.content,
            }}
          />

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

            <Clock3 size={15} />

            {formatDistanceToNow(
              new Date(answer.created_at),
              {
                addSuffix: true,
              }
            )}

          </div>

        </div>

      ))}

    </div>
  );
}