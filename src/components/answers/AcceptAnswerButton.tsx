"use client";

import { Check } from "lucide-react";
import useAcceptedAnswer from "@/hooks/useAcceptedAnswer";

interface Props {
  questionId: string;
  answerId: string;
  isAccepted: boolean;
  canAccept: boolean;
  onAccepted: () => void;
}

export default function AcceptAnswerButton({
  questionId,
  answerId,
  isAccepted,
  canAccept,
  onAccepted,
}: Props) {
  const {
    loading,
    toggleAcceptedAnswer,
  } = useAcceptedAnswer();

  if (!canAccept) return null;

  async function handleClick() {
    try {
      await toggleAcceptedAnswer(
        questionId,
        answerId,
        isAccepted
      );

      onAccepted();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        flex h-10 w-10 items-center justify-center
        rounded-full border transition-all duration-200
        ${
          isAccepted
            ? "border-green-600 bg-green-50 text-green-600"
            : "border-gray-300 text-gray-400 hover:border-green-500 hover:text-green-600"
        }
      `}
    >
      <Check size={20} />
    </button>
  );
}