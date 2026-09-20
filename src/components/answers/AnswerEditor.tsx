"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Answer } from "@/types/answer";
import useCreateAnswer from "@/hooks/useCreateAnswer";

const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-5 h-64 animate-pulse rounded-xl border bg-gray-100" />
    ),
  }
);

interface Props {
  questionId: string;
  onAnswerAdded: (answer: Answer) => void;
}

export default function AnswerEditor({
  questionId,
  onAnswerAdded,
}: Props) {
  const [content, setContent] = useState("");

  const {
    submitAnswer,
    loading,
  } = useCreateAnswer();

  async function handleSubmit() {
    if (!content.trim()) return;

    try {
      const answer = await submitAnswer(
        questionId,
        content
      );

      onAnswerAdded(answer);

      setContent("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border bg-white p-8">

      <h2 className="text-xl font-semibold">
        Write your answer
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Explain your solution clearly and provide helpful details.
      </p>

      <div className="mt-5">
        <RichTextEditor
          value={content}
          onChange={setContent}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          mt-5
          rounded-lg
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Posting..." : "Post Answer"}
      </button>

    </div>
  );
}