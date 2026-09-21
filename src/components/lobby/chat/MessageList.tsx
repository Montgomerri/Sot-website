"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ArrowDown } from "lucide-react";

import MessageBubble from "./MessageBubble";
import { LobbyMessage } from "@/types/lobby";

interface Props {
  messages: LobbyMessage[];
  currentUserId: string | null;

  onEdit: (
    id: string,
    content: string
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;

  onReply: (
    message: LobbyMessage
  ) => void;
}

export default function MessageList({
  messages,
  currentUserId,
  onEdit,
  onDelete,
  onReply,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const previousMessageCount =
    useRef(messages.length);

  const [isAtBottom, setIsAtBottom] =
    useState(true);

  const [showNewMessages, setShowNewMessages] =
    useState(false);

  const checkIfAtBottom =
    useCallback(() => {
      const container =
        containerRef.current;

      if (!container) return;

      const distanceFromBottom =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      const atBottom =
        distanceFromBottom < 100;

      setIsAtBottom(atBottom);

      if (atBottom) {
        setShowNewMessages(false);
      }
    }, []);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    container.addEventListener(
      "scroll",
      checkIfAtBottom,
      { passive: true }
    );

    checkIfAtBottom();

    return () => {
      container.removeEventListener(
        "scroll",
        checkIfAtBottom
      );
    };
  }, [checkIfAtBottom]);

  useEffect(() => {
    const previousCount =
      previousMessageCount.current;

    const currentCount =
      messages.length;

    if (currentCount > previousCount) {
      if (isAtBottom) {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        setShowNewMessages(true);
      }
    }

    previousMessageCount.current =
      currentCount;
  }, [messages.length, isAtBottom]);

  useEffect(() => {
    if (messages.length > 0) {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "auto",
        });
      });
    }
  }, []);

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    setShowNewMessages(false);
    setIsAtBottom(true);
  }

  function jumpToMessage(
    messageId: string
  ) {
    const element =
      document.getElementById(
        `message-${messageId}`
      );

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    element.classList.add(
      "bg-blue-50"
    );

    window.setTimeout(() => {
      element.classList.remove(
        "bg-blue-50"
      );
    }, 1500);
  }

  if (messages.length === 0) {
    return (
      <div
        className="
          flex
          flex-1
          items-center
          justify-center
          text-gray-400
        "
      >
        No messages yet
      </div>
    );
  }

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={containerRef}
        className="
  h-full
  min-w-0
  overflow-x-hidden
  overflow-y-auto
  py-3
  scroll-smooth
  sm:py-4
"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            id={`message-${message.id}`}
            className="transition-colors duration-300"
          >
            <MessageBubble
              id={message.id}
              userId={message.user_id}
              currentUserId={
                currentUserId
              }
              name={
                message.profiles
                  ?.full_name ??
                "User"
              }
              message={
                message.content
              }
              imageUrl={
                message.image_url
              }
              time={new Date(
                message.created_at
              ).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              replyTo={
                message.reply_to ??
                null
              }
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              onJumpToMessage={
                jumpToMessage
              }
            />
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {showNewMessages && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="
            absolute
            bottom-5
            left-1/2
            z-10
            -translate-x-1/2
            rounded-full
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-xs
            font-medium
            text-gray-700
            shadow-md
            transition
            hover:bg-gray-50
          "
        >
          New messages
        </button>
      )}

      {!isAtBottom &&
        !showNewMessages && (
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className="
              absolute
              bottom-5
              right-5
              z-10
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-600
              shadow-md
              transition
              hover:bg-gray-50
              hover:text-gray-900
            "
          >
            <ArrowDown size={18} />
          </button>
        )}
    </div>
  );
}