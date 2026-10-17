"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import type { ReactionSummary } from "@/hooks/useLobbyReactions";
import type { LobbyChannel, LobbyMessage } from "@/types/lobby";

interface Props {
  channel: LobbyChannel;

  /** False in admin-only channels for everyone who isn't an admin */
  canPost: boolean;

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

  onlineCount: number;

  onOpenChannels: () => void;
  onOpenMembers: () => void;
}

export default function ChatArea({
  channel,
  canPost,
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
  onlineCount,
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
        channel={channel}
        onlineCount={onlineCount}
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
        onReply={canPost ? setReplyingTo : () => {}}
        onRetry={onRetry}
        onDiscard={onDiscard}
      />

      {canPost ? (
        <MessageInput
          sendMessage={handleSendMessage}
          replyingTo={replyingTo}
          channelName={channel.name}
          onCancelReply={() => setReplyingTo(null)}
        />
      ) : (
        <div className="relative z-30 flex shrink-0 items-center justify-center gap-2 border-t border-gray-200 bg-gray-50 px-4 py-4 text-center text-sm text-gray-500">
          <Lock size={14} className="shrink-0" />

          <span>
            Only admins can post in {channel.name}. You can still react to
            messages.
          </span>
        </div>
      )}
    </main>
  );
}