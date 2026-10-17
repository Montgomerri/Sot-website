"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Menu, Users } from "lucide-react";

import type { LobbyChannel } from "@/types/lobby";

interface Props {
  channel: LobbyChannel;
  onlineCount: number;
  onOpenChannels: () => void;
  onOpenMembers: () => void;
}

const iconButton =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900";

export default function ChatHeader({
  channel,
  onlineCount,
  onOpenChannels,
  onOpenMembers,
}: Props) {
  return (
    <header className="relative z-30 flex h-16 min-h-16 shrink-0 items-center border-b border-gray-200 bg-white px-3 sm:px-6">
      {/* Back to the rest of the app */}
      <Link
        href="/dashboard"
        aria-label="Back to Asknet"
        className={`${iconButton} mr-2`}
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Mobile channel button */}
      <button
        type="button"
        onClick={onOpenChannels}
        aria-label="Open channels"
        className={`${iconButton} mr-3 md:hidden`}
      >
        <Menu size={20} />
      </button>

      {/* Channel information */}
      <div className="min-w-0 flex-1">
        <h2 className="flex items-center gap-1.5 truncate text-sm font-semibold text-gray-900 sm:text-base">
          {channel.name}

          {channel.admin_only && (
            <Lock
              size={13}
              className="shrink-0 text-gray-400"
              aria-label="Only admins can post"
            />
          )}
        </h2>

        <p className="flex items-center gap-1.5 text-[11px] text-gray-500 sm:text-xs">
          {onlineCount > 0 && (
            <>
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

              <span className="shrink-0">{onlineCount} online</span>

              <span aria-hidden="true">·</span>
            </>
          )}

          <span className="truncate">
            {channel.description ?? "Community discussion"}
          </span>
        </p>
      </div>

      {/* Mobile member button */}
      <button
        type="button"
        onClick={onOpenMembers}
        aria-label="Open members"
        className={`${iconButton} lg:hidden`}
      >
        <Users size={20} />
      </button>
    </header>
  );
}