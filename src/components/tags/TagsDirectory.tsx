"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export interface TagCount {
  name: string;
  count: number;
}

interface Props {
  tags: TagCount[];
  loadFailed: boolean;
}

type Sort = "popular" | "name";

const fieldClass =
  "h-10 rounded-xl border border-gray-200 bg-white px-3 text-base outline-none transition focus:border-brand-500 sm:text-sm";

export default function TagsDirectory({ tags, loadFailed }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const search = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const list = tags.filter(
      (tag) => !search || tag.name.toLowerCase().includes(search)
    );

    return [...list].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : b.count - a.count || a.name.localeCompare(b.name)
    );
  }, [tags, search, sort]);

  return (
    <div className="mx-auto w-full max-w-[1000px] px-3 py-4 sm:px-6 sm:py-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Tags
      </h1>

      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        A tag is a keyword that describes what a question is about. Pick a tag
        to see every question that uses it.{" "}
        {tags.length > 0 &&
          `${tags.length.toLocaleString()} ${
            tags.length === 1 ? "tag" : "tags"
          } so far.`}
      </p>

      {tags.length > 0 && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tags"
              aria-label="Search tags"
              className={`${fieldClass} w-full pl-9`}
            />
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            aria-label="Sort tags"
            className={fieldClass}
          >
            <option value="popular">Most used</option>
            <option value="name">Name A to Z</option>
          </select>
        </div>
      )}

      {loadFailed ? (
        <div className="mt-6 rounded-xl border bg-white p-8 text-center text-sm text-gray-600">
          We couldn&apos;t load the tags right now. Please refresh the page.
        </div>
      ) : tags.length === 0 ? (
        <div className="mt-6 rounded-xl border bg-white p-8 text-center">
          <p className="text-base font-medium text-gray-900">
            No tags yet
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Tags appear here as soon as people start asking questions.
          </p>

          <Link
            href="/questions/ask"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Ask a question
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-6 rounded-xl border bg-white p-8 text-center">
          <p className="text-base font-medium text-gray-900">
            No tags match &ldquo;{query.trim()}&rdquo;
          </p>

          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear search
          </button>
        </div>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tag) => (
            <li key={tag.name}>
              <Link
                href={`/questions?tag=${encodeURIComponent(tag.name)}`}
                className="block rounded-xl border bg-white p-4 transition hover:border-brand-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="inline-block max-w-full break-words rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                  {tag.name}
                </span>

                <p className="mt-3 text-sm text-gray-500">
                  {tag.count.toLocaleString()}{" "}
                  {tag.count === 1 ? "question" : "questions"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}