"use client";

import { useState } from "react";
import useCreateComment from "@/hooks/useCreateComment";

interface Props {
  answerId: string;
  onCommentAdded?: () => void;
}

export default function CommentEditor({
  answerId,
  onCommentAdded,
}: Props) {
  const [content, setContent] = useState("");

  const {
    submitComment,
    loading,
  } = useCreateComment();


  async function handleSubmit() {
    if (!content.trim()) return;


    try {

      await submitComment(
        answerId,
        content
      );

      setContent("");

      onCommentAdded?.();

    } catch (error) {

      console.error(error);

    }
  }


  return (
    <div className="mt-4">

      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Add a comment..."
        rows={3}
        className="
          w-full
          rounded-lg
          border
          px-4
          py-3
          text-sm
          outline-none
          transition
          focus:ring-2
          focus:ring-blue-500
        "
      />


      <div className="mt-2 flex justify-end">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {loading
            ? "Posting..."
            : "Comment"
          }

        </button>

      </div>

    </div>
  );
}