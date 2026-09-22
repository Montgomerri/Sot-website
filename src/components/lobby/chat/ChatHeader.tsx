"use client";

import {
  Menu,
  Users,
} from "lucide-react";

interface Props {
  onOpenChannels: () => void;
  onOpenMembers: () => void;
}

export default function ChatHeader({
  onOpenChannels,
  onOpenMembers,
}: Props) {
  return (
    <header
      className="
        relative
        z-30
        flex
        h-16
        min-h-16
        shrink-0
        items-center
        border-b
        border-gray-200
        bg-white
        px-3
        sm:px-6
      "
    >
      {/* Mobile channel button */}

      <button
        type="button"
        onClick={onOpenChannels}
        aria-label="Open channels"
        className="
          mr-3
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-gray-500
          transition
          hover:bg-gray-100
          hover:text-gray-900
          md:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Channel information */}

      <div className="min-w-0 flex-1">
        <h2
          className="
            truncate
            text-sm
            font-semibold
            text-gray-900
            sm:text-base
          "
        >
          General Lobby
        </h2>

        <p
          className="
            truncate
            text-[11px]
            text-gray-500
            sm:text-xs
          "
        >
          Community discussion
        </p>
      </div>

      {/* Mobile member button */}

      <button
        type="button"
        onClick={onOpenMembers}
        aria-label="Open members"
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-gray-500
          transition
          hover:bg-gray-100
          hover:text-gray-900
          lg:hidden
        "
      >
        <Users size={20} />
      </button>
    </header>
  );
}