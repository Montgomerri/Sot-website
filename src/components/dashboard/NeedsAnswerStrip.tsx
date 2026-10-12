import Link from "next/link";
import { differenceInDays, formatDistanceToNowStrict } from "date-fns";
import { ChevronRight, CircleCheck, HandHelping } from "lucide-react";

import type { NeedsAnswerData } from "@/services/questions/needsAnswer";

export default function NeedsAnswerStrip({
  data,
}: {
  data: NeedsAnswerData;
}) {
  const { count, items } = data;

  // Nothing waiting: a small "all caught up" card
  if (count === 0) {
    return (
      <section className="mt-4 flex items-center gap-3 rounded-xl border bg-white p-4 sm:mt-6 sm:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <CircleCheck size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900">
            You&apos;re all caught up
          </h2>

          <p className="text-sm text-gray-500">
            Every question has an answer. Nice work, everyone.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="needs-answer-title"
      className="mt-4 overflow-hidden rounded-xl border bg-white sm:mt-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3 border-b p-4 sm:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <HandHelping size={20} />
        </div>

        <div className="min-w-0">
          <h2
            id="needs-answer-title"
            className="text-base font-semibold text-gray-900 sm:text-lg"
          >
            Needs an answer
          </h2>

          <p className="text-sm text-gray-500">
            {count}{" "}
            {count === 1
              ? "question is waiting"
              : "questions are waiting"}{" "}
            for a response. Can you help?
          </p>
        </div>
      </div>

      {/* Longest-waiting questions */}
      <ul className="divide-y">
        {items.map((item) => {
          const created = new Date(item.createdAt);
          const urgent = differenceInDays(new Date(), created) >= 7;

          return (
            <li key={item.id}>
              <Link
                href={`/questions/${item.id}`}
                className="flex items-center gap-3 px-4 py-3 transition hover:bg-brand-50/60 focus-visible:bg-brand-50/60 focus-visible:outline-none sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-gray-900 sm:text-[15px]">
                    {item.title}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium ${
                        urgent
                          ? "bg-amber-50 text-amber-700"
                          : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      Waiting {formatDistanceToNowStrict(created)}
                    </span>

                    {item.authorName && <span>by {item.authorName}</span>}

                    {item.tags[0] && (
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-gray-400"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* More waiting than we show */}
      {count > items.length && (
        <Link
          href="/questions"
          className="block border-t bg-gray-50 px-4 py-3 text-center text-sm font-medium text-brand-700 transition hover:bg-brand-50"
        >
          See all {count} unanswered questions
        </Link>
      )}
    </section>
  );
}