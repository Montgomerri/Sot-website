"use client";

import { Plus } from "lucide-react";

interface ReactionSummary {
  emoji: string;
  count: number;
  reactedByCurrentUser: boolean;
}

interface Props {
  reactions: ReactionSummary[];
  onToggle: (emoji: string) => void;
  togglingEmoji: string | null;
  disabled?: boolean;
}

const QUICK_REACTIONS = [
  "👍",
  "❤️",
  "😂",
  "🎉",
  "👀",
];

export default function MessageReactions({
  reactions,
  onToggle,
  togglingEmoji,
  disabled = false,
}: Props) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {/* Existing reactions */}

      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={() =>
            onToggle(reaction.emoji)
          }
          disabled={
            disabled ||
            togglingEmoji ===
              reaction.emoji
          }
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            px-2.5
            py-1
            text-xs
            transition

            ${
              reaction.reactedByCurrentUser
                ? `
                  border-blue-300
                  bg-blue-50
                  text-blue-700
                `
                : `
                  border-gray-200
                  bg-white
                  text-gray-600
                  hover:border-gray-300
                  hover:bg-gray-50
                `
            }

            disabled:cursor-not-allowed
            disabled:opacity-50
          `}
        >
          <span>
            {reaction.emoji}
          </span>

          <span>
            {reaction.count}
          </span>
        </button>
      ))}

      {/* Add reaction */}

      <div className="relative">
        <div className="group">
          <button
            type="button"
            disabled={disabled}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-400
              transition
              hover:border-gray-300
              hover:bg-gray-50
              hover:text-gray-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Add reaction"
          >
            <Plus size={14} />
          </button>

          <div
            className="
              pointer-events-none
              absolute
              bottom-full
              left-0
              z-20
              mb-2
              flex
              translate-y-1
              gap-1
              rounded-xl
              border
              border-gray-200
              bg-white
              p-1.5
              opacity-0
              shadow-lg
              transition
              group-hover:pointer-events-auto
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            {QUICK_REACTIONS.map(
              (emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() =>
                    onToggle(emoji)
                  }
                  disabled={
                    togglingEmoji ===
                    emoji
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-base
                    transition
                    hover:bg-gray-100
                    disabled:opacity-50
                  "
                >
                  {emoji}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}