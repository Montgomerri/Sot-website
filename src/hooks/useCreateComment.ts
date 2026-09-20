"use client";

import { useState } from "react";
import { createComment } from "@/services/comments/comments";

export default function useCreateComment() {
  const [loading, setLoading] = useState(false);

  async function submitComment(
    answerId: string,
    content: string
  ) {
    setLoading(true);

    try {
      await createComment({
        answerId,
        content,
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    submitComment,
    loading,
  };
}