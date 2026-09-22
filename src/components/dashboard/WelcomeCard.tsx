"use client";

import Link from "next/link";
import { Hand } from "lucide-react";
import useProfile from "@/hooks/useProfile";

export default function WelcomeCard() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 max-w-full rounded bg-gray-200 sm:w-64" />
          <div className="mt-4 h-4 w-full max-w-96 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {/* User heading */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600 sm:h-12 sm:w-12 sm:text-xl">
              {profile?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <Hand
                className="hidden shrink-0 text-sky-500 sm:block"
                size={24}
              />

              <h1 className="min-w-0 text-xl font-bold leading-tight text-gray-900 sm:text-3xl">
                Welcome back,{" "}
                {profile?.full_name || "User"}
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            Find answers to your technical questions and help
            answer questions for other people in your department.
          </p>

          {/* User metadata */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">
            <span>
              Reputation: {profile?.reputation || 1}
            </span>

            {profile?.level && (
              <span>
                Level {profile.level}
              </span>
            )}

            {profile?.department && (
              <span className="max-w-full break-words">
                {profile.department}
              </span>
            )}
          </div>
        </div>

        {/* Ask question */}
        <Link
          href="/questions/ask"
          className="inline-flex w-full shrink-0 items-center justify-center  bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Ask Question
        </Link>
      </div>
    </div>
  );
}