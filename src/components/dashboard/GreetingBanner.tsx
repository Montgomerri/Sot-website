import Link from "next/link";
import {
  GraduationCap,
  MessagesSquare,
  Plus,
  Trophy,
} from "lucide-react";

import type { Profile } from "@/types/profile";

/**
 * Time-of-day greeting, worked out in Ghana time (Africa/Accra) so the
 * server and the student always agree.
 */
function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Africa/Accra",
    }).format(new Date())
  );

  if (hour >= 5 && hour < 12) {
    return { twi: "Maakye", english: "Good morning" };
  }

  if (hour >= 12 && hour < 17) {
    return { twi: "Maaha", english: "Good afternoon" };
  }

  return { twi: "Maadwo", english: "Good evening" };
}

export default function GreetingBanner({
  profile,
}: {
  profile: Profile | null;
}) {
  const greeting = getGreeting();

  const fullName = profile?.full_name?.trim() ?? "";
  const firstName = fullName.split(/\s+/)[0] || "Student";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-brand-950 px-5 py-6 text-white sm:px-8 sm:py-8">
      {/* Decorative orbit rings */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-28 h-[340px] w-[340px] text-brand-400 sm:-right-16 sm:-top-24 sm:h-[400px] sm:w-[400px]"
      >
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeOpacity="0.14" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeOpacity="0.26" />
        <circle cx="200" cy="200" r="90" fill="currentColor" fillOpacity="0.06" />
      </svg>

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt=""
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/20 sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xl font-semibold text-white ring-2 ring-white/20 sm:h-16 sm:w-16 sm:text-2xl">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-300">
                {greeting.english}
              </p>

              <h1 className="mt-0.5 truncate text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {greeting.twi}, {firstName}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-6 text-brand-100/90 sm:text-base sm:leading-7">
            Find answers to your technical questions and help other
            students in your department.
          </p>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/10">
              <Trophy size={13} />
              Reputation {profile?.reputation ?? 1}
            </span>

            {profile?.level && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/10">
                Level {profile.level}
              </span>
            )}

            {profile?.department && (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/10">
                <GraduationCap size={13} className="shrink-0" />
                <span className="truncate">{profile.department}</span>
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/questions/ask"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
          >
            <Plus size={16} />
            Ask a question
          </Link>

          <Link
            href="/lobby"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
          >
            <MessagesSquare size={16} />
            Open Lobby
          </Link>
        </div>
      </div>
    </section>
  );
}