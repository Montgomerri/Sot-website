"use client";

import { useState } from "react";
import { createAnswer } from "@/services/answers/answers";

export default function useCreateAnswer() {
  const [loading, setLoading] = useState(false);


  async function submitAnswer(
    questionId: string,
    content: string
  ) {

    setLoading(true);

    try {

      const answer = await createAnswer({
        questionId,
        content,
      });


      return answer;


    } finally {

      setLoading(false);

    }
  }


  return {
    submitAnswer,
    loading,
  };
}