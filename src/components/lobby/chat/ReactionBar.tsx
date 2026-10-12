"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import type { ReactionSummary } from "@/hooks/useLobbyReactions";

interface Props {
  reactions: ReactionSummary[];
  onToggle: (emoji: string) => void;
}

const AVAILABLE_REACTIONS = ["👍", "❤️", "😂", "🎉", "👏", "🔥"];

export default function ReactionBar({ reactions, onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close the picker when tapping elsewhere or pressing Escape
  useEffect(() => {
    if (!open) return;

    const onDown = (event: MouseEvent | TouchEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={() => onToggle(reaction.emoji)}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
            reaction.reactedByCurrentUser
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50"
          }`}
        >
          <span>{reaction.emoji}</span>
          <span className="font-medium">{reaction.count}</span>
        </button>
      ))}

      <div ref={pickerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Add reaction"
          aria-expanded={open}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Plus size={14} />
        </button>

        {open && (
          <div className="absolute bottom-9 left-0 z-30 flex gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
            {AVAILABLE_REACTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  onToggle(emoji);
                  setOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg transition hover:bg-gray-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}