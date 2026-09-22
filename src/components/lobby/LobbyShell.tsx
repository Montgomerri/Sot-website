"use client";

import { useState } from "react";

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

  const [mobileSidebar, setMobileSidebar] = useState<
    "channels" | "members" | null
  >(null);

  function closeMobileSidebar() {
    setMobileSidebar(null);
  }

  return (
    <div
      className="
        fixed
        inset-0
        flex
        w-full
        overflow-hidden
        bg-white
      "
      style={{
        height: "100dvh",
      }}
    >
      {/* Desktop channel sidebar */}

      <div className="hidden shrink-0 md:block">
        <ChannelSidebar />
      </div>

      {/* Main chat */}

      <ChatArea
        messages={messages}
        sendMessage={sendMessage}
        currentUserId={currentUserId}
        onEdit={editMessage}
        onDelete={deleteMessage}
        onOpenChannels={() =>
          setMobileSidebar("channels")
        }
        onOpenMembers={() =>
          setMobileSidebar("members")
        }
      />

      {/* Desktop member sidebar */}

      <div className="hidden shrink-0 lg:block">
        <MemberSidebar />
      </div>

      {/* Mobile backdrop */}

      {mobileSidebar && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobileSidebar}
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* Mobile channel drawer */}

      {mobileSidebar === "channels" && (
        <aside
          className="
            fixed
            inset-y-0
            left-0
            z-50
            w-[min(18rem,85vw)]
            overflow-y-auto
            border-r
            border-gray-200
            bg-white
            shadow-2xl
            md:hidden
          "
        >
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close channels"
            className="
              absolute
              right-3
              top-3
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-gray-100
              text-lg
              text-gray-600
              transition
              hover:bg-gray-200
            "
          >
            ×
          </button>

          <ChannelSidebar />
        </aside>
      )}

      {/* Mobile member drawer */}

      {mobileSidebar === "members" && (
        <aside
          className="
            fixed
            inset-y-0
            right-0
            z-50
            w-[min(20rem,88vw)]
            overflow-y-auto
            border-l
            border-gray-200
            bg-[#F8FAFC]
            shadow-2xl
            lg:hidden
          "
        >
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close members"
            className="
              absolute
              right-3
              top-3
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-white
              text-lg
              text-gray-600
              shadow-sm
              transition
              hover:bg-gray-100
            "
          >
            ×
          </button>

          <MemberSidebar />
        </aside>
      )}
    </div>
  );
}