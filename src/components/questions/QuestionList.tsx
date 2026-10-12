"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import useQuestions from "@/hooks/useQuestions";
import QuestionCard from "./QuestionCard";

type Sort = "newest" | "unanswered" | "votes";

const TABS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "unanswered", label: "Unanswered" },
  { id: "votes", label: "Most voted" },
];

const MAX_TAG_CHIPS = 8;

function FeedSkeleton() {
  return (
    <div className="divide-y">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex animate-pulse gap-4 p-4 sm:p-6">
          <div className="hidden w-16 shrink-0 space-y-2 sm:block">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-100" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />

            <div className="flex gap-2">
              <div className="h-5 w-14 rounded-full bg-gray-100" />
              <div className="h-5 w-14 rounded-full bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function QuestionList({
  title = "Questions",
}: {
  title?: string;
}) {
  const { questions, loading, error, refresh } = useQuestions();

  const [sort, setSort] = useState<Sort>("newest");
  const [tag, setTag] = useState<string | null>(null);

  // Most-used tags across all questions
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();

    questions.forEach((q) =>
      (q.tags ?? []).forEach((t) =>
        counts.set(t, (counts.get(t) ?? 0) + 1)
      )
    );

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, MAX_TAG_CHIPS)
      .map(([name]) => name);
  }, [questions]);

  const tagged = useMemo(
    () =>
      tag
        ? questions.filter((q) => (q.tags ?? []).includes(tag))
        : questions,
    [questions, tag]
  );

  const unansweredCount = useMemo(
    () => tagged.filter((q) => (q.answers_count ?? 0) === 0).length,
    [tagged]
  );

  const visible = useMemo(() => {
    if (sort === "unanswered") {
      return tagged.filter((q) => (q.answers_count ?? 0) === 0);
    }

    if (sort === "votes") {
      return [...tagged].sort(
        (a, b) =>
          (b.votes ?? 0) - (a.votes ?? 0) ||
          +new Date(b.created_at) - +new Date(a.created_at)
      );
    }

    return tagged; // already newest first
  }, [tagged, sort]);

  const hasFilters = sort !== "newest" || tag !== null;

  function clearFilters() {
    setSort("newest");
    setTag(null);
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border bg-white sm:mt-6">
      {/* Header */}
      <div className="space-y-3 border-b px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {title}
          </h2>

          {!loading && !error && (
            <span className="text-sm text-gray-500">
              {visible.length}{" "}
              {visible.length === 1 ? "question" : "questions"}
            </span>
          )}
        </div>

        {/* Sort tabs */}
        <div
          role="tablist"
          aria-label="Sort questions"
          className="grid w-full grid-cols-3 gap-1 rounded-lg bg-gray-100 p-1 sm:inline-grid sm:w-auto"
        >
          {TABS.map((t) => {
            const active = sort === t.id;

            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSort(t.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  active
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t.label}

                {t.id === "unanswered" &&
                  !loading &&
                  unansweredCount > 0 && (
                    <span className="ml-1.5 rounded-full bg-brand-100 px-1.5 py-0.5 text-xs text-brand-700">
                      {unansweredCount}
                    </span>
                  )}
              </button>
            );
          })}
        </div>

        {/* Tag chips */}
        {popularTags.length > 0 && (
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              aria-pressed={tag === null}
              onClick={() => setTag(null)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                tag === null
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              All
            </button>

            {popularTags.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={tag === name}
                onClick={() => setTag(tag === name ? null : name)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  tag === name
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <FeedSkeleton />
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-600">
            We couldn&apos;t load the questions.
          </p>

          <button
            type="button"
            onClick={refresh}
            className="mt-3 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="p-6 text-center sm:p-10">
          <p className="text-base font-medium text-gray-900">
            {tag
              ? `No questions tagged "${tag}" yet`
              : sort === "unanswered"
                ? "Everything has been answered"
                : "No questions yet"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {tag || sort === "unanswered"
              ? "Try another filter."
              : "Be the first to ask one."}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear filters
              </button>
            )}

            {!hasFilters && (
              <Link
                href="/questions/ask"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Ask a question
              </Link>
            )}
          </div>
        </div>
      ) : (
        visible.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))
      )}
    </div>
  );
}