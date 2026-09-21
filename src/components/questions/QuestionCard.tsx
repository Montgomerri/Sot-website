"use client";

import Link from "next/link";
import {
  MessageSquare,
  Eye,
  Paperclip,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
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
    <div className="border-b bg-white p-4 transition last:border-b-0 hover:bg-gray-50 sm:rounded-xl sm:border sm:p-6 sm:hover:border-blue-300 sm:hover:shadow-md">
      <div className="flex min-w-0 gap-3 sm:gap-6">
        {/* Left stats */}
        <div className="flex w-12 shrink-0 flex-col items-center text-gray-500 sm:w-20">
          <button
            type="button"
            className="rounded p-1 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Upvote question"
          >
            <ChevronUp className="h-5 w-5" />
          </button>

          <span className="text-sm font-semibold sm:text-base">
            {question.votes}
          </span>

          <button
            type="button"
            className="mb-3 rounded p-1 hover:bg-gray-100 hover:text-gray-900 sm:mb-4"
            aria-label="Downvote question"
          >
            <ChevronDown className="h-5 w-5" />
          </button>

          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />

          <span className="text-sm sm:text-base">
            {question.answers_count}
          </span>
        </div>

        {/* Right content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <Link href={`/questions/${question.id}`}>
            <h2 className="break-words text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 sm:text-xl sm:leading-7">
              {question.title}
            </h2>
          </Link>

          {/* Description */}
          <p
            className="mt-2 line-clamp-3 break-words text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base"
            dangerouslySetInnerHTML={{
              __html: question.description,
            }}
          />

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              {question.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="max-w-full break-words rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700 sm:px-3 sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom information */}
          <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Author */}
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 sm:h-10 sm:w-10">
                {author?.full_name?.charAt(0).toUpperCase() ?? "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium sm:text-base">
                  {author?.full_name ?? "Unknown"}
                </p>

                <p className="text-xs text-gray-500 sm:text-sm">
                  {formatDistanceToNow(
                    new Date(question.created_at),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Question statistics */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{question.views}</span>
              </div>

              <div className="flex items-center gap-1">
                <MessageSquare size={16} />
                <span>{question.answers_count}</span>
              </div>

              {question.attachments?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip size={16} />
                  <span>{question.attachments.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}