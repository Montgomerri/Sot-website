"use client";
import { Question } from "@/types/question";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  MessageSquare,
} from "lucide-react";

interface Props {
  question: Question;
}

export default function QuestionSidebar({
  question,
}: Props) {
  return (
    <div className="sticky top-24">

      <div className="flex w-20 flex-col items-center rounded-2xl border bg-white py-6">

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <ChevronUp size={26} />
        </button>

        <span className="my-2 text-2xl font-bold">
          {question.votes}
        </span>

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <ChevronDown size={26} />
        </button>

        <div className="my-6 h-px w-10 bg-gray-200" />

        <div className="flex flex-col items-center gap-5 text-gray-500">

          <div className="flex flex-col items-center">
            <Eye size={18} />
            <span className="mt-1 text-sm">
              {question.views}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <MessageSquare size={18} />
            <span className="mt-1 text-sm">
              {question.answers_count}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}