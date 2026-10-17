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

import type { LobbyChannel } from "@/types/lobby";

interface Props {
  channels: LobbyChannel[];
  activeId: string | null;
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

              <span className="truncate">{channel.name}</span>

              {channel.admin_only && (
                <Lock
                  size={13}
                  className="ml-auto shrink-0 text-gray-400"
                  aria-label="Only admins can post"
                />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}