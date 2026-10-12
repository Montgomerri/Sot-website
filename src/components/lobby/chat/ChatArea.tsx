"use client";

import { useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

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

  sendMessage: (
    content: string,
    file?: File | null,
    replyTo?: LobbyMessage | null
  ) => void | Promise<void>;

  reactions: Record<string, ReactionSummary[]>;
  onToggleReaction: (messageId: string, emoji: string) => void;

  onEdit: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onRetry: (id: string) => void;
  onDiscard: (id: string) => void;

  onOpenChannels: () => void;
  onOpenMembers: () => void;
}

export default function ChatArea({
  messages,
  currentUserId,
  loading,
  loadError,
  onRetryLoad,
  hasMore,
  loadingOlder,
  onLoadOlder,
  sendMessage,
  reactions,
  onToggleReaction,
  onEdit,
  onDelete,
  onRetry,
  onDiscard,
  onOpenChannels,
  onOpenMembers,
}: Props) {
  const [replyingTo, setReplyingTo] = useState<LobbyMessage | null>(null);

  // Not awaited: the message shows up instantly while it sends
  function handleSendMessage(content: string, file?: File | null) {
    void sendMessage(content, file ?? null, replyingTo);

    setReplyingTo(null);
  }

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <ChatHeader
        onOpenChannels={onOpenChannels}
        onOpenMembers={onOpenMembers}
      />

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        loading={loading}
        loadError={loadError}
        onRetryLoad={onRetryLoad}
        hasMore={hasMore}
        loadingOlder={loadingOlder}
        onLoadOlder={onLoadOlder}
        reactions={reactions}
        onToggleReaction={onToggleReaction}
        onEdit={onEdit}
        onDelete={onDelete}
        onReply={setReplyingTo}
        onRetry={onRetry}
        onDiscard={onDiscard}
      />

      <MessageInput
        sendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
    </main>
  );
}