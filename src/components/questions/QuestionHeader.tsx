"use client";

import { Question } from "@/types/question";
import Link from "next/link";
import Image from "next/image";
import VoteButtons from "@/components/votes/VoteButtons";
import {
  ArrowLeft,
  Award,
  Building2,
  Clock3,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  question: Question;
}

export default function QuestionHeader({
  question,
}: Props) {
  const profile = question.profiles;

  return (
    <div className="rounded-2xl border bg-white p-8">

      <Link
        href="/questions"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Questions
      </Link>

      <div className="mt-8 flex gap-8">

        {/* Vote Sidebar */}

        <div className="flex-shrink-0">
          <VoteButtons questionId={question.id} />
        </div>

        {/* Question Content */}

        <div className="flex-1 min-w-0">

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {question.title}
          </h1>

          <div
            className="prose prose-gray mt-6 max-w-none"
            dangerouslySetInnerHTML={{
              __html: question.description,
            }}
          />

          <div className="mt-6 flex flex-wrap gap-2">
            {question.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t pt-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-lg font-semibold text-blue-700">

                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile?.full_name ?? "User avatar"}
                    width={56}
                    height={56}
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

                <div className="mt-2 flex flex-wrap gap-5 text-sm text-gray-500">

                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    <span>
                      Reputation {profile?.reputation ?? 1}
                    </span>
                  </div>

                  {profile?.department && (
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      <span>{profile.department}</span>
                    </div>
                  )}

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <Clock3 size={16} />

              <span>
                {formatDistanceToNow(
                  new Date(question.created_at),
                  { addSuffix: true }
                )}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}