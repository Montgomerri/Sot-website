"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/services/comments/comments";

export default function useComments(
  answerId: string
) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadComments() {

      try {

        const data = await getComments(answerId);

        setComments(data ?? []);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }


    loadComments();

  }, [answerId]);


  return {
    comments,
    loading,
  };
}