"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Answer } from "@/types/answer";
import {
  Award,
  Building2,
  Clock3,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AcceptAnswerButton from "./AcceptAnswerButton";
import CommentList from "@/components/comments/CommentList";
import CommentEditor from "@/components/comments/CommentEditor";

interface Props {
  answer: Answer;
  questionId: string;
  isAccepted: boolean;
  canAccept: boolean;
  onAccepted: () => void;
}

export default function AnswerCard({
  answer,
  questionId,
  isAccepted,
  canAccept,
  onAccepted,
}: Props) {

  const profile = answer.profiles;

  const [commentRefresh, setCommentRefresh] = useState(0);


  function handleCommentAdded() {
    setCommentRefresh((prev) => prev + 1);
  }


  return (
    <div
      className={`
        rounded-2xl border bg-white p-6 transition
        ${
          isAccepted
            ? "border-green-500 bg-green-50/40"
            : ""
        }
      `}
    >

      {isAccepted && (
        <div className="mb-4 text-sm font-medium text-green-700">
          Accepted Answer
        </div>
      )}


      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-semibold text-blue-700">

            {profile?.avatar_url ? (
              <Image
  src={profile.avatar_url}
  alt={profile.full_name ?? "User avatar"}
  width={48}
  height={48}
  className="h-full w-full object-cover"
/>
            ) : (
              profile?.full_name?.charAt(0) ?? "U"
            )}

          </div>


          <div>

            <Link
  href={`/profile/${profile?.id}`}
  className="font-semibold text-gray-900 hover:text-blue-600"
>
  {profile?.full_name ?? "Unknown User"}
</Link>


            <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1">
                <Award size={15} />
                {profile?.reputation ?? 1}
              </span>


              {profile?.department && (
                <span className="flex items-center gap-1">
                  <Building2 size={15} />
                  {profile.department}
                </span>
              )}

            </div>

          </div>

        </div>


        <div className="flex items-center gap-4">

          <AcceptAnswerButton
            questionId={questionId}
            answerId={answer.id}
            isAccepted={isAccepted}
            canAccept={canAccept}
            onAccepted={onAccepted}
          />


          <span className="flex items-center gap-2 text-sm text-gray-500">

            <Clock3 size={15} />

            {formatDistanceToNow(
              new Date(answer.created_at),
              {
                addSuffix: true,
              }
            )}

          </span>

        </div>


      </div>


      <article
        className="prose mt-6 max-w-none"
        dangerouslySetInnerHTML={{
          __html: answer.content,
        }}
      />


      {/* Comments */}

      <div key={commentRefresh}>

        <CommentList
          answerId={answer.id}
        />

      </div>


      <CommentEditor
        answerId={answer.id}
        onCommentAdded={handleCommentAdded}
      />


    </div>
  );
}