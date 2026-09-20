"use client";
import { useMemo } from "react";
import { Answer } from "@/types/answer";
import AnswerCard from "./AnswerCard";
import AnswerSkeleton from "./AnswerSkeleton";

interface Props {
  questionId: string;
  answers: Answer[];
  loading: boolean;
  acceptedAnswerId?: string | null;
  canAccept: boolean;
  onAccepted: (answerId: string) => void;
}

export default function AnswerList({
  questionId,
  answers,
  loading,
  acceptedAnswerId,
  canAccept,
  onAccepted,
}: Props) {

  const sortedAnswers = useMemo(() => {
  return [...answers].sort((a, b) => {
    if (a.id === acceptedAnswerId) return -1;
    if (b.id === acceptedAnswerId) return 1;

    return 0;
  });
}, [answers, acceptedAnswerId]);


  return (
    <div className="mt-10 space-y-6">

      <h2 className="text-2xl font-bold text-gray-900">
        {loading
          ? "Answers"
          : `${answers.length} ${
              answers.length === 1
                ? "Answer"
                : "Answers"
            }`}
      </h2>


      {loading && (
        <>
          <AnswerSkeleton />
          <AnswerSkeleton />
        </>
      )}


      {!loading && answers.length === 0 && (
        <div className="rounded-2xl border bg-white p-8 text-center">

          <h3 className="text-lg font-semibold text-gray-900">
            No answers yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Be the first person to help answer this question.
          </p>

        </div>
      )}


      {!loading && answers.length > 0 && (

        <div className="space-y-6">

          {sortedAnswers.map((answer) => (

            <AnswerCard
              key={answer.id}
              answer={answer}
              questionId={questionId}
              isAccepted={
                answer.id === acceptedAnswerId
              }
              canAccept={canAccept}
              onAccepted={() => onAccepted(answer.id)}
            />

          ))}

        </div>

      )}

    </div>
  );
}