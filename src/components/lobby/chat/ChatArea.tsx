"use client";

import { useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { LobbyMessage } from "@/types/lobby";

interface Props {
  messages: LobbyMessage[];

  sendMessage: (
    content: string,
    imageUrl?: string | null,
    replyToId?: string | null
  ) => Promise<void>;

  currentUserId: string | null;

  onEdit: (
    id: string,
    content: string
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;

  onOpenChannels: () => void;

  onOpenMembers: () => void;
}

export default function ChatArea({
  messages,
  sendMessage,
  currentUserId,
  onEdit,
  onDelete,
  onOpenChannels,
  onOpenMembers,
}: Props) {
  const [replyingTo, setReplyingTo] =
    useState<LobbyMessage | null>(null);

  function handleReply(message: LobbyMessage) {
    setReplyingTo(message);
  }

  function cancelReply() {
    setReplyingTo(null);
  }

  async function handleSendMessage(
    content: string,
    imageUrl?: string | null
  ) {
    await sendMessage(
      content,
      imageUrl,
      replyingTo?.id ?? null
    );

    setReplyingTo(null);
  }

  return (
    <main
      className="
        flex
        min-w-0
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        bg-white
      "
    >
      <ChatHeader
        onOpenChannels={onOpenChannels}
        onOpenMembers={onOpenMembers}
      />

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        onEdit={onEdit}
        onDelete={onDelete}
        onReply={handleReply}
      />

      <MessageInput
        sendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCancelReply={cancelReply}
      />
    </main>
  );
}