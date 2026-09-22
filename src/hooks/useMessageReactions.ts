"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getLobbyReactions,
  toggleLobbyReaction,
} from "@/services/lobby/reactions";

import type { MessageReaction } from "@/types/reaction";

export interface ReactionSummary {
  emoji: string;
  count: number;
  reactedByCurrentUser: boolean;
}

export default function useMessageReactions(
  messageId: string,
  currentUserId: string | null
) {
  const [reactions, setReactions] = useState<MessageReaction[]>([]);

  const [loading, setLoading] = useState(true);

  const [togglingEmoji, setTogglingEmoji] = useState<string | null>(
    null
  );

  // -----------------------------------------
  // LOAD REACTIONS
  // -----------------------------------------

  const loadReactions = useCallback(async () => {
    if (!messageId) {
      setReactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const allReactions = await getLobbyReactions([messageId]);

      const messageReactions = allReactions.filter(
        (reaction) => reaction.message_id === messageId
      );

      setReactions(messageReactions);
    } catch (error) {
  console.error(
    "Failed to load message reactions:",
    error
  );

  if (error && typeof error === "object") {
    console.error(
      "Reaction load error details:",
      {
        message:
          "message" in error
            ? error.message
            : undefined,
        details:
          "details" in error
            ? error.details
            : undefined,
        hint:
          "hint" in error
            ? error.hint
            : undefined,
        code:
          "code" in error
            ? error.code
            : undefined,
      }
    );
  }
} finally {
      setLoading(false);
    }
  }, [messageId]);

  useEffect(() => {
    loadReactions();
  }, [loadReactions]);

  // -----------------------------------------
  // TOGGLE REACTION
  // -----------------------------------------

  const handleToggle = useCallback(
    async (emoji: string) => {
      if (!currentUserId || !messageId) {
        return;
      }

      try {
        setTogglingEmoji(emoji);

        await toggleLobbyReaction(
          messageId,
          emoji
        );

        await loadReactions();
      } catch (error) {
  console.error(
    "Failed to toggle reaction:",
    error
  );

  if (error && typeof error === "object") {
    console.error(
      "Reaction toggle error details:",
      {
        message:
          "message" in error
            ? error.message
            : undefined,
        details:
          "details" in error
            ? error.details
            : undefined,
        hint:
          "hint" in error
            ? error.hint
            : undefined,
        code:
          "code" in error
            ? error.code
            : undefined,
      }
    );
  }
} finally {
        setTogglingEmoji(null);
      }
    },
    [currentUserId, messageId, loadReactions]
  );

  // -----------------------------------------
  // GROUP REACTIONS
  // -----------------------------------------

  const reactionSummary = useMemo<ReactionSummary[]>(() => {
    const grouped = new Map<string, MessageReaction[]>();

    for (const reaction of reactions) {
      const existing =
        grouped.get(reaction.emoji) ?? [];

      existing.push(reaction);

      grouped.set(
        reaction.emoji,
        existing
      );
    }

    return Array.from(grouped.entries()).map(
      ([emoji, emojiReactions]) => ({
        emoji,

        count: emojiReactions.length,

        reactedByCurrentUser: currentUserId
          ? emojiReactions.some(
              (reaction) =>
                reaction.user_id === currentUserId
            )
          : false,
      })
    );
  }, [reactions, currentUserId]);

  // -----------------------------------------
  // RETURN
  // -----------------------------------------

  return {
    reactions,
    reactionSummary,
    loading,
    togglingEmoji,
    toggleReaction: handleToggle,
    reloadReactions: loadReactions,
  };
}