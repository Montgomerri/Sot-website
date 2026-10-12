import Link from "next/link";
import { Plus } from "lucide-react";

import type { Profile } from "@/types/profile";

export default function QuickAskBox({
  profile,
}: {
  profile: Profile | null;
}) {
  const firstName = profile?.full_name?.trim().split(/\s+/)[0] ?? "";

  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border bg-white p-3 sm:mt-6 sm:p-4">
      {/* Avatar */}
      {profile?.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.avatar_url}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base font-semibold text-brand-700">
          {(firstName.charAt(0) || "U").toUpperCase()}
        </div>
      )}

      {/* Looks like an input, opens the Ask page */}
      <Link
        href="/questions/ask"
        aria-label="Ask a question"
        className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 transition hover:border-brand-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span className="truncate">
          {firstName
            ? `What's your question, ${firstName}?`
            : "What's your question?"}
        </span>
      </Link>

      <Link
        href="/questions/ask"
        className="hidden h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:inline-flex"
      >
        <Plus size={16} />
        Ask
      </Link>
    </div>
  );
}