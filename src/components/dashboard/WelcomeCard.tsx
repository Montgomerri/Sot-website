"use client";
import Link from "next/link";
import { Hand } from "lucide-react";
import useProfile from "@/hooks/useProfile";

export default function WelcomeCard() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="border rounded-xl bg-white p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="mt-4 h-4 w-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-white p-6">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl">
              {profile?.full_name?.charAt(0) || "U"}
            </div>

            <div className="flex items-center gap-2">

              <Hand
                className="text-sky-500"
                size={24}
              />

              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.full_name || "User"} 👋
              </h1>

            </div>

          </div>


          <p className="text-gray-600 mt-4 max-w-2xl leading-7">
            Find answers to your technical questions and help answer
            questions for other people in your department.
          </p>


          <div className="flex gap-4 mt-4 text-sm text-gray-500">

            <span>
              Reputation: {profile?.reputation || 1}
            </span>

            {profile?.level && (
              <span>
                Level {profile.level}
              </span>
            )}

            {profile?.department && (
              <span>
                {profile.department}
              </span>
            )}

          </div>

        </div>


       <Link
  href="/questions/ask"
  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
>
  Ask Question
</Link>


      </div>

    </div>
  );
}