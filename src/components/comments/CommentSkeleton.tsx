"use client";

export default function CommentSkeleton() {
  return (
    <div className="flex items-start gap-3 border-b py-3">

      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />

      <div className="flex-1 space-y-2">

        <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />

        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />

        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />

      </div>

    </div>
  );
}