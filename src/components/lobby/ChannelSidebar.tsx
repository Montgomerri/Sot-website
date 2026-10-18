"use client";

import {
  Code2,
  Hash,
  Lock,
  Megaphone,
  MessageCircle,
  Shuffle,
  type LucideIcon,
} from "lucide-react";

import { formatUnread } from "@/hooks/useLobbyUnread";

import type { LobbyChannel } from "@/types/lobby";

interface Props {
  channels: LobbyChannel[];
  activeId: string | null;
  unread: Record<string, number>;
  onSelect: (id: string) => void;
}

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  lobby: MessageCircle,
  announcements: Megaphone,
  programming: Code2,
  random: Shuffle,
};

export default function ChannelSidebar({
  channels,
  activeId,
  unread,
  onSelect,
}: Props) {
  return (
    <aside className="w-72 border-r border-gray-200 bg-white px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">
          G
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">GIMPA</h2>
          <p className="text-xs text-gray-500">Community</p>
        </div>
      </div>

      <nav aria-label="Channels" className="space-y-1">
        <h3 className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
          Channels
        </h3>

        {channels.map((channel) => {
          const Icon = CHANNEL_ICONS[channel.slug] ?? Hash;
          const active = channel.id === activeId;
          const unreadCount = active ? 0 : unread[channel.id] ?? 0;

          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => onSelect(channel.id)}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                active
                  ? "bg-brand-100 font-semibold text-brand-800"
                  : "text-gray-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              <Icon size={18} className="shrink-0" />

              <span
                className={`truncate ${
                  unreadCount > 0 ? "font-semibold text-gray-900" : ""
                }`}
              >
                {channel.name}
              </span>

              <span className="ml-auto flex shrink-0 items-center gap-2">
                {channel.admin_only && (
                  <Lock
                    size={13}
                    className="text-gray-400"
                    aria-label="Only admins can post"
                  />
                )}

                {unreadCount > 0 && (
                  <span
                    aria-label={`${unreadCount} unread`}
                    className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[11px] font-semibold text-white"
                  >
                    {formatUnread(unreadCount)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}