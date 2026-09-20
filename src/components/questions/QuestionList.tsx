"use client";

import useQuestions from "@/hooks/useQuestions";
import QuestionCard from "./QuestionCard";

export default function QuestionList() {
  const { questions, loading } = useQuestions();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-6 mt-6">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border mt-6">

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Interesting Posts
        </h2>
      </div>

      {questions.length === 0 ? (
        <div className="p-6 text-gray-500">
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