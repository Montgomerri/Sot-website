"use client";

import useQuestions from "@/hooks/useQuestions";
import QuestionCard from "./QuestionCard";

export default function QuestionList() {
  const { questions, loading } = useQuestions();

  if (loading) {
    return (
      <div className="mt-4 rounded-xl border bg-white p-4 sm:mt-6 sm:p-6">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border bg-white sm:mt-6">
      <div className="border-b px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold sm:text-xl">
          Interesting Posts
        </h2>
      </div>

      {questions.length === 0 ? (
        <div className="p-4 text-sm text-gray-500 sm:p-6 sm:text-base">
          No questions yet.
        </div>
      ) : (
        questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
          />
        ))
      )}
    </div>
  );
}