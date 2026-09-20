"use client";

import { useState } from "react";
import {
  acceptAnswer,
  unacceptAnswer,
} from "@/services/accepted/acceptedAnswer";

export default function useAcceptedAnswer() {
  const [loading, setLoading] = useState(false);

  async function toggleAcceptedAnswer(
    questionId: string,
    answerId: string,
    currentlyAccepted: boolean
  ) {
    setLoading(true);

    try {
      if (currentlyAccepted) {
        await unacceptAnswer(questionId);
      } else {
        await acceptAnswer(questionId, answerId);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    toggleAcceptedAnswer,
  };
}