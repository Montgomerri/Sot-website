"use client";

import useQuestions from "@/hooks/useQuestions";
import QuestionCard from "./QuestionCard";
import QuestionCardSkeleton from "./QuestionCardSkeleton";

export default function QuestionFeed() {
  const { questions, loading, error } = useQuestions();

  if (loading) {
    return (
      <div className="space-y-6">
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load questions.
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">
          No questions yet
        </h2>

        <p className="mt-2 text-gray-500">
          Be the first person to ask a question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
        />
      ))}
    </div>
  );
}