"use client";

import useComments from "@/hooks/useComments";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";

interface Props {
  answerId: string;
}

export default function CommentList({
  answerId,
}: Props) {
  const {
    comments,
    loading,
  } = useComments(answerId);


  return (
    <div className="mt-5 border-t pt-4">

      <h4 className="mb-3 text-sm font-semibold text-gray-700">
        Comments
      </h4>


      {loading && (
        <>

          <CommentSkeleton />

          <CommentSkeleton />

        </>
      )}


      {!loading && comments.length === 0 && (

        <p className="text-sm text-gray-500">
          No comments yet.
        </p>

      )}


      {!loading && comments.length > 0 && (

        <div>

          {comments.map((comment) => (

            <CommentCard
              key={comment.id}
              comment={comment}
            />

          ))}

        </div>

      )}

    </div>
  );
}