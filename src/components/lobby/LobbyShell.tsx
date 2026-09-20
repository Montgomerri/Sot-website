"use client";

import ChannelSidebar from "./ChannelSidebar";
import ChatArea from "./chat/ChatArea";
import MemberSidebar from "./MemberSidebar";

import useLobby from "@/hooks/useLobby";

export default function LobbyShell() {
  const {
    messages,
    currentUserId,
    sendMessage,
    editMessage,
    deleteMessage,
  } = useLobby();

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-white
      "
    >
      <ChannelSidebar />

      <ChatArea
        messages={messages}
        sendMessage={sendMessage}
        currentUserId={currentUserId}
        onEdit={editMessage}
        onDelete={deleteMessage}
      />

      <MemberSidebar />
    </div>
  );
}