"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Trophy } from "lucide-react";

export interface DirectoryUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  level: string | null;
  department: string | null;
  reputation: number | null;
  created_at: string;
}

interface Props {
  users: DirectoryUser[];
  total: number;
  currentUserId: string | null;
  loadFailed: boolean;
}

type Sort = "reputation" | "newest" | "name";

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "reputation", label: "Top reputation" },
  { value: "newest", label: "Newest members" },
  { value: "name", label: "Name A to Z" },
];

const fieldClass =
  "h-10 rounded-xl border border-gray-200 bg-white px-3 text-base outline-none transition focus:border-brand-500 sm:text-sm";

function nameOf(user: DirectoryUser) {
  return user.full_name?.trim() || "Unnamed member";
}

function reputationOf(user: DirectoryUser) {
  return user.reputation ?? 1;
}

function UserAvatar({ user }: { user: DirectoryUser }) {
  const [failed, setFailed] = useState(false);

  if (user.avatar_url && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatar_url}
        alt=""
        onError={() => setFailed(true)}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
      {nameOf(user).charAt(0).toUpperCase()}
    </div>
  );
}

export default function UsersDirectory({
  users,
  total,
  currentUserId,
  loadFailed,
}: Props) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState<Sort>("reputation");

  // Only offer levels that someone actually has
  const levels = useMemo(
    () =>
      [...new Set(users.map((u) => u.level).filter((l): l is string => !!l))]
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    [users]
  );

  const filtering = query.trim() !== "" || level !== "all";

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    const list = users.filter((user) => {
      if (level !== "all" && user.level !== level) return false;

      if (!search) return true;

      return (
        nameOf(user).toLowerCase().includes(search) ||
        (user.department ?? "").toLowerCase().includes(search)
      );
    });

    return [...list].sort((a, b) => {
      if (sort === "name") return nameOf(a).localeCompare(nameOf(b));

      if (sort === "newest") {
        return +new Date(b.created_at) - +new Date(a.created_at);
      }

      return (
        reputationOf(b) - reputationOf(a) ||
        nameOf(a).localeCompare(nameOf(b))
      );
    });
  }, [users, query, level, sort]);

  function clearFilters() {
    setQuery("");
    setLevel("all");
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] px-3 py-4 sm:px-6 sm:py-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Users
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Meet the people in the community.{" "}
        {total.toLocaleString()} {total === 1 ? "member" : "members"}.
      </p>

      {/* Search, level and sort */}
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
            placeholder="Search by name or department"
            aria-label="Search users"
            className={`${fieldClass} w-full pl-9`}
          />
        </div>

        {levels.length > 0 && (
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            aria-label="Filter by level"
            className={fieldClass}
          >
            <option value="all">All levels</option>

            {levels.map((value) => (
              <option key={value} value={value}>
                Level {value}
              </option>
            ))}
          </select>
        )}

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as Sort)}
          aria-label="Sort users"
          className={fieldClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {loadFailed ? (
        <div className="mt-6 rounded-xl border bg-white p-8 text-center text-sm text-gray-600">
          We couldn&apos;t load the users right now. Please refresh the page.
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-6 rounded-xl border bg-white p-8 text-center">
          <p className="text-base font-medium text-gray-900">
            No users match your search
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try a different name or clear the filters.
          </p>

          {filtering && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="mb-3 mt-5 text-xs text-gray-500">
            Showing {visible.length} of {users.length}
          </p>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((user, index) => {
              const details = [
                user.level ? `Level ${user.level}` : null,
                user.department,
              ]
                .filter(Boolean)
                .join(" · ");

              // Medal positions only make sense in the default ranking
              const rank =
                sort === "reputation" && !filtering && index < 3
                  ? index + 1
                  : null;

              return (
                <li key={user.id}>
                  <Link
                    href={`/profile/${user.id}`}
                    className="flex items-center gap-3 rounded-xl border bg-white p-4 transition hover:border-brand-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <UserAvatar user={user} />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {nameOf(user)}

                        {user.id === currentUserId && (
                          <span className="ml-1.5 text-xs font-normal text-gray-400">
                            (you)
                          </span>
                        )}
                      </p>

                      {details && (
                        <p className="truncate text-xs text-gray-500">
                          {details}
                        </p>
                      )}

                      <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                        <Trophy size={12} />
                        {reputationOf(user).toLocaleString()}
                      </span>
                    </div>

                    {rank && (
                      <span
                        aria-label={`Rank ${rank}`}
                        className="shrink-0 text-xs font-semibold text-gray-400"
                      >
                        #{rank}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}