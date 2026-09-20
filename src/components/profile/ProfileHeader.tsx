"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Profile } from "@/types/profile";

import { startConversation } from "@/services/messages/startConversation";

import {
  Award,
  Building2,
  CalendarDays,
  Pencil,
  MessageCircle,
} from "lucide-react";

import { format } from "date-fns";

interface Props {
  profile: Profile;
  isOwner: boolean;
}

export default function ProfileHeader({
  profile,
  isOwner,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleMessage() {
    try {
      setLoading(true);

      const conversationId =
        await startConversation(
          profile.id
        );

      router.push(
        `/messages?conversation=${conversationId}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile?.full_name ?? "User avatar"}
                className="h-full w-full object-cover"
              />
            ) : (
              profile?.full_name?.charAt(0) ?? "U"
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile?.full_name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Award size={16} />
                Reputation {profile?.reputation ?? 1}
              </span>

              {profile?.department && (
                <span className="flex items-center gap-2">
                  <Building2 size={16} />
                  {profile.department}
                </span>
              )}

              {profile?.created_at && (
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Joined{" "}
                  {format(
                    new Date(profile.created_at),
                    "MMMM yyyy"
                  )}
                </span>
              )}
            </div>

            {profile?.bio && (
              <p className="mt-5 max-w-2xl text-gray-600">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOwner ? (
            <button
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                px-5
                py-3
                font-medium
                transition
                hover:bg-gray-50
              "
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleMessage}
              disabled={loading}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <MessageCircle size={18} />

              {loading
                ? "Opening..."
                : "Message"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}