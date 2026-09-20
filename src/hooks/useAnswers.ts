"use client";

import { useEffect, useState } from "react";
import { getAnswers } from "@/services/answers/answers";
import { Answer } from "@/types/answer";

export default function useAnswers(questionId: string) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnswers() {
      try {
        const data = await getAnswers(questionId);
        setAnswers(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (questionId) {
      loadAnswers();
    }
  }, [questionId]);

  return {
    answers,
    loading,
  };
}