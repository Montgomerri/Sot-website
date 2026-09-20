"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import useQuestionVote from "@/hooks/useQuestionVote";

interface Props {
  questionId: string;
}

export default function VoteButtons({
  questionId,
}: Props) {
  const {
    score,
    myVote,
    loading,
    vote,
  } = useQuestionVote(questionId);

  return (
    <div className="flex flex-col items-center gap-2">

      <button
        onClick={() => vote(1)}
        disabled={loading}
        className={`
          rounded-lg
          p-2
          transition
          ${
            myVote === 1
              ? "bg-blue-100 text-blue-600"
              : "text-gray-500 hover:bg-gray-100"
          }
        `}
      >
        <ChevronUp className="h-6 w-6" />
      </button>

      <span className="text-lg font-bold text-gray-900">
        {score}
      </span>

      <button
        onClick={() => vote(-1)}
        disabled={loading}
        className={`
          rounded-lg
          p-2
          transition
          ${
            myVote === -1
              ? "bg-red-100 text-red-600"
              : "text-gray-500 hover:bg-gray-100"
          }
        `}
      >
        <ChevronDown className="h-6 w-6" />
      </button>

    </div>
  );
}