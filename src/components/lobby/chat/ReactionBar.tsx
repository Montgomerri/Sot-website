"use client";

import { Plus } from "lucide-react";

import useMessageReactions from "@/hooks/useMessageReactions";

interface Props {
  messageId: string;
  currentUserId: string | null;
}

const AVAILABLE_REACTIONS = [
  "👍",
  "❤️",
  "😂",
  "🎉",
  "👏",
  "🔥",
];

export default function ReactionBar({
  messageId,
  currentUserId,
}: Props) {
  const {
    reactionSummary,
    togglingEmoji,
    toggleReaction,
  } = useMessageReactions(
    messageId,
    currentUserId
  );

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {reactionSummary.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={() =>
            toggleReaction(reaction.emoji)
          }
          disabled={
            togglingEmoji === reaction.emoji
          }
          className={`
            inline-flex
            items-center
            gap-1
            rounded-full
            border
            px-2.5
            py-1
            text-xs
            transition
            ${
              reaction.reactedByCurrentUser
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50"
            }
            disabled:cursor-not-allowed
            disabled:opacity-50
          `}
        >
          <span>{reaction.emoji}</span>

          <span className="font-medium">
            {reaction.count}
          </span>
        </button>
      ))}

      <div className="relative">
        <details>
          <summary
            className="
              flex
              h-7
              w-7
              cursor-pointer
              list-none
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-400
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
            "
            aria-label="Add reaction"
          >
            <Plus size={14} />
          </summary>

          <div
            className="
              absolute
              bottom-9
              left-0
              z-30
              flex
              gap-1
              rounded-xl
              border
              border-gray-200
              bg-white
              p-2
              shadow-lg
            "
          >
            {AVAILABLE_REACTIONS.map(
              (emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() =>
                    toggleReaction(emoji)
                  }
                  disabled={
                    togglingEmoji === emoji
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
        </details>
      </div>
    </div>
  );
}