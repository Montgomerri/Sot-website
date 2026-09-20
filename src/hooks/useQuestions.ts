"use client";

import { useEffect, useState } from "react";
import { getQuestions } from "@/services/questions/questions";
import { Question } from "@/types/question";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function loadQuestions() {
    try {
      setLoading(true);

      const data = await getQuestions();

      setQuestions(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    refresh: loadQuestions,
  };
}