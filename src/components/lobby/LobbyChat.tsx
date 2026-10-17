"use client";

import ChatArea from "./chat/ChatArea";

import useLobby from "@/hooks/useLobby";
import useLobbyReactions from "@/hooks/useLobbyReactions";

import type { LobbyChannel } from "@/types/lobby";

interface Props {
  channel: LobbyChannel;
  canPost: boolean;
  onlineCount: number;
  onOpenChannels: () => void;
  onOpenMembers: () => void;
}

/**
 * One channel's chat. LobbyShell renders it with key={channel.id}, so every
 * channel starts completely fresh (its own messages and live connection).
 */
export default function LobbyChat({
  channel,
  canPost,
  onlineCount,
  onOpenChannels,
  onOpenMembers,
}: Props) {
  const {
    messages,
    currentUserId,
    loading,
    loadError,
    reload,
    hasMore,
    loadingOlder,
    loadOlder,
    sendMessage,
    retryMessage,
    discardMessage,
    editMessage,
    deleteMessage,
  } = useLobby(channel.id);

  const { summaries, toggleReaction } = useLobbyReactions(
    messages,
    currentUserId
  );

  return (
    <ChatArea
      channel={channel}
      canPost={canPost}
      messages={messages}
      currentUserId={currentUserId}
      loading={loading}
      loadError={loadError}
      onRetryLoad={reload}
      hasMore={hasMore}
      loadingOlder={loadingOlder}
      onLoadOlder={loadOlder}
      sendMessage={sendMessage}
      reactions={summaries}
      onToggleReaction={toggleReaction}
      onEdit={editMessage}
      onDelete={deleteMessage}
      onRetry={retryMessage}
      onDiscard={discardMessage}
      onlineCount={onlineCount}
      onOpenChannels={onOpenChannels}
      onOpenMembers={onOpenMembers}
    />
  );
}