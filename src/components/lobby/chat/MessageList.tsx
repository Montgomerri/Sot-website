"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowDown } from "lucide-react";

import MessageBubble from "./MessageBubble";

import type { ReactionSummary } from "@/hooks/useLobbyReactions";
import type { LobbyMessage } from "@/types/lobby";

interface Props {
  messages: LobbyMessage[];
  currentUserId: string | null;

  loading: boolean;
  loadError: boolean;
  onRetryLoad: () => void;

  hasMore: boolean;
  loadingOlder: boolean;
  onLoadOlder: () => void | Promise<void>;

  reactions: Record<string, ReactionSummary[]>;
  onToggleReaction: (messageId: string, emoji: string) => void;

  onEdit: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReply: (message: LobbyMessage) => void;
  onRetry: (id: string) => void;
  onDiscard: (id: string) => void;
}

const NEAR_BOTTOM_PX = 100;

function MessageSkeleton() {
  return (
    <div className="space-y-6 px-3 py-3 sm:px-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex animate-pulse gap-3 sm:gap-4">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 sm:h-11 sm:w-11" />

          <div className="flex-1 space-y-2.5 pt-1">
            <div className="h-3.5 w-28 rounded bg-gray-200" />
            <div
              className="h-3.5 rounded bg-gray-100"
              style={{ width: `${55 + ((i * 17) % 35)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MessageList({
  messages,
  currentUserId,
  loading,
  loadError,
  onRetryLoad,
  hasMore,
  loadingOlder,
  onLoadOlder,
  reactions,
  onToggleReaction,
  onEdit,
  onDelete,
  onReply,
  onRetry,
  onDiscard,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const isAtBottomRef = useRef(true);
  const didInitialScroll = useRef(false);
  const previousCount = useRef(0);
  const previousLastId = useRef<string | null>(null);
  const previousFirstId = useRef<string | null>(null);
  const previousScrollHeight = useRef<number | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewMessages, setShowNewMessages] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const firstId = messages[0]?.id ?? null;
  const lastId = messages[messages.length - 1]?.id ?? null;

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;

      if (!container) return;

      container.scrollTo({ top: container.scrollHeight, behavior });

      setShowNewMessages(false);
    },
    []
  );

  const handleScroll = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    const atBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      NEAR_BOTTOM_PX;

    isAtBottomRef.current = atBottom;
    setIsAtBottom(atBottom);

    if (atBottom) setShowNewMessages(false);
  }, []);

  // First batch: jump straight to the bottom. Older messages added above:
  // keep the reading position where it was.
  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    if (!didInitialScroll.current) {
      if (!loading && messages.length > 0) {
        container.scrollTop = container.scrollHeight;

        didInitialScroll.current = true;
        previousCount.current = messages.length;
        previousLastId.current = lastId;
      }

      previousFirstId.current = firstId;
      return;
    }

    if (
      previousScrollHeight.current !== null &&
      firstId !== previousFirstId.current
    ) {
      container.scrollTop +=
        container.scrollHeight - previousScrollHeight.current;

      previousScrollHeight.current = null;
    }

    previousFirstId.current = firstId;
  }, [messages, loading, firstId, lastId]);

  useEffect(() => {
    if (!loadingOlder) previousScrollHeight.current = null;
  }, [loadingOlder]);

  // A new message at the bottom
  useEffect(() => {
    if (!didInitialScroll.current) return;

    const grew = messages.length > previousCount.current;
    const newAtEnd = lastId !== previousLastId.current;

    if (grew && newAtEnd) {
      const last = messages[messages.length - 1];

      if (last.user_id === currentUserId || isAtBottomRef.current) {
        scrollToBottom("smooth");
      } else {
        setShowNewMessages(true);
      }
    }

    previousCount.current = messages.length;
    previousLastId.current = lastId;
  }, [messages, lastId, currentUserId, scrollToBottom]);

  // Images finishing loading shouldn't push you off the bottom
  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    const observer = new ResizeObserver(() => {
      if (isAtBottomRef.current && didInitialScroll.current) {
        container.scrollTop = container.scrollHeight;
      }
    });

    observer.observe(inner);

    return () => observer.disconnect();
  }, []);

  function handleLoadOlder() {
    const container = containerRef.current;

    if (container) {
      previousScrollHeight.current = container.scrollHeight;
    }

    void onLoadOlder();
  }

  const jumpToMessage = useCallback((messageId: string) => {
    const element = containerRef.current?.querySelector<HTMLElement>(
      `[data-message-id="${messageId}"]`
    );

    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });

    setHighlightedId(messageId);

    window.setTimeout(() => {
      setHighlightedId((current) =>
        current === messageId ? null : current
      );
    }, 1600);
  }, []);

  return (
    <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain py-3 sm:py-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div ref={innerRef} className="min-w-0">
          {loading ? (
            <MessageSkeleton />
          ) : loadError && messages.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-gray-600">
                We couldn&apos;t load the messages.
              </p>

              <button
                type="button"
                onClick={onRetryLoad}
                className="mt-3 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Try again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-gray-400">
              No messages yet. Say hello!
            </div>
          ) : (
            <>
              {hasMore ? (
                <div className="flex justify-center pb-2 pt-1">
                  <button
                    type="button"
                    onClick={handleLoadOlder}
                    disabled={loadingOlder}
                    className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    {loadingOlder
                      ? "Loading..."
                      : "Load older messages"}
                  </button>
                </div>
              ) : (
                <p className="pb-2 pt-1 text-center text-xs text-gray-400">
                  This is the start of the Lobby
                </p>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  data-message-id={message.id}
                  className={`min-w-0 transition-colors duration-700 ${
                    highlightedId === message.id ? "bg-amber-100/70" : ""
                  }`}
                >
                  <MessageBubble
                    id={message.id}
                    userId={message.user_id}
                    currentUserId={currentUserId}
                    name={message.profiles?.full_name ?? "User"}
                    message={message.content}
                    imageUrl={message.image_url}
                    status={message.status}
                    time={new Date(message.created_at).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                    replyTo={message.reply_to ?? null}
                    reactions={reactions[message.id] ?? []}
                    onToggleReaction={(emoji) =>
                      onToggleReaction(message.id, emoji)
                    }
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReply={onReply}
                    onJumpToMessage={jumpToMessage}
                    onRetry={onRetry}
                    onDiscard={onDiscard}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* New messages */}
      {showNewMessages && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-md transition hover:bg-gray-50"
        >
          New messages
        </button>
      )}

      {/* Scroll to bottom */}
      {!isAtBottom && !showNewMessages && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to bottom"
          className="absolute bottom-5 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  );
}