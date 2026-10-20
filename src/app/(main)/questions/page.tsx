import Link from "next/link";

import QuestionList from "@/components/questions/QuestionList";

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const params = await searchParams;

  // /questions?tag=react shows only the questions with that tag
  const tag =
    typeof params.tag === "string" && params.tag.trim()
      ? params.tag.trim()
      : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {tag ? (
          <>
            Questions tagged{" "}
            <span className="inline-block max-w-full break-words rounded-full bg-brand-50 px-3 py-0.5 align-middle text-lg font-medium text-brand-700 sm:text-xl">
              {tag}
            </span>
          </>
        ) : (
          "All Questions"
        )}
      </h1>

      {tag && (
        <Link
          href="/questions/tags"
          className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          &larr; All tags
        </Link>
      )}

      {/* The key makes the list start fresh when the tag in the address changes */}
      <div className="mt-5 sm:mt-6">
        <QuestionList key={tag ?? "all"} initialTag={tag} />
      </div>
    </div>
  );
}