"use client";
import Link from "next/link";
import { MessageSquare, Eye, Paperclip, ChevronUp, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({
  question,
}: QuestionCardProps) {
  const author = question.profiles;

  return (
    <div className="rounded-xl border bg-white p-6 transition hover:border-blue-300 hover:shadow-md">

      <div className="flex gap-6">

        {/* Left stats */}

        <div className="flex w-20 flex-col items-center text-gray-500">

          <ChevronUp className="h-5 w-5" />

          <span className="font-semibold">
            {question.votes}
          </span>

          <ChevronDown className="h-5 w-5 mb-4" />

          <MessageSquare className="h-5 w-5" />

          <span>
            {question.answers_count}
          </span>

        </div>

        {/* Right content */}

        <div className="flex-1">

          <Link href={`/questions/${question.id}`}>
  <h2 className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600">
    {question.title}
  </h2>
</Link>

          <p
            className="mt-3 line-clamp-3 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: question.description,
            }}
          />

          <div className="mt-4 flex flex-wrap gap-2">

            {question.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {tag}
              </span>
            ))}

          </div>

          <div className="mt-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                {author?.full_name?.charAt(0) ?? "U"}
              </div>

              <div>

                <p className="font-medium">
                  {author?.full_name ?? "Unknown"}
                </p>

                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(
                    new Date(question.created_at),
                    { addSuffix: true }
                  )}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-6 text-gray-500">

              <div className="flex items-center gap-1">
                <Eye size={18} />
                {question.views}
              </div>

              <div className="flex items-center gap-1">
                <MessageSquare size={18} />
                {question.answers_count}
              </div>

              {question.attachments?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip size={18} />
                  {question.attachments.length}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}