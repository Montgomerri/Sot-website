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
}

export default function ChatArea({
  messages,
  sendMessage,
  currentUserId,
  onEdit,
  onDelete,
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
    <main className="flex flex-1 flex-col bg-white">
      <ChatHeader />

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