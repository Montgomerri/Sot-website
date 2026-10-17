"use client";

import { useState } from "react";
import Link from "next/link";

import ChannelSidebar from "./ChannelSidebar";
import LobbyChat from "./LobbyChat";
import MemberSidebar from "./MemberSidebar";

import useLobbyChannels from "@/hooks/useLobbyChannels";
import useLobbyMembers from "@/hooks/useLobbyMembers";

export default function LobbyShell() {
  const { channels, userId, isAdmin, loading, error } = useLobbyChannels();

  const members = useLobbyMembers(userId);

  // Which channel is open comes from the address (?channel=programming),
  // so refreshing keeps you where you were and links can point to a channel.
  // (The page shows a loading screen first, so reading the address here
  // can't cause a server/browser mismatch.)
  const [activeSlug, setActiveSlug] = useState<string | null>(() =>
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("channel")
  );

  const [mobileSidebar, setMobileSidebar] = useState<
    "channels" | "members" | null
  >(null);

  function closeMobileSidebar() {
    setMobileSidebar(null);
  }

  function selectChannel(id: string) {
    const channel = channels.find((item) => item.id === id);

    if (channel) {
      setActiveSlug(channel.slug);

      window.history.replaceState(null, "", `?channel=${channel.slug}`);
    }

    closeMobileSidebar();
  }

  // The channel in the address, or the first one (Lobby)
  const activeChannel =
    channels.find((channel) => channel.slug === activeSlug) ??
    channels[0] ??
    null;

  const canPost =
    !!activeChannel && (!activeChannel.admin_only || isAdmin);

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white text-sm text-gray-500"
        style={{ height: "100dvh" }}
      >
        Loading the Lobby...
      </div>
    );
  }

  if (error || !activeChannel) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-white px-6 text-center"
        style={{ height: "100dvh" }}
      >
        <p className="max-w-sm text-sm text-gray-600">
          The Lobby channels aren&apos;t available yet. If you&apos;re the
          site owner, run the channels SQL in Supabase and refresh.
        </p>

        <Link
          href="/dashboard"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Asknet
        </Link>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex w-full overflow-hidden bg-white"
      style={{ height: "100dvh" }}
    >
      {/* Desktop channel sidebar */}
      <div className="hidden shrink-0 md:block">
        <ChannelSidebar
          channels={channels}
          activeId={activeChannel.id}
          onSelect={selectChannel}
        />
      </div>

      {/* Main chat (a new key gives each channel a fresh start) */}
      <LobbyChat
        key={activeChannel.id}
        channel={activeChannel}
        canPost={canPost}
        onlineCount={members.onlineCount}
        onOpenChannels={() => setMobileSidebar("channels")}
        onOpenMembers={() => setMobileSidebar("members")}
      />

      {/* Desktop member sidebar */}
      <div className="hidden shrink-0 lg:block">
        <MemberSidebar
          online={members.online}
          offline={members.offline}
          total={members.total}
          onlineCount={members.onlineCount}
          loading={members.loading}
          currentUserId={userId}
        />
      </div>

      {/* Mobile backdrop */}
      {mobileSidebar && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Mobile channel drawer */}
      {mobileSidebar === "channels" && (
        <aside className="fixed inset-y-0 left-0 z-50 w-[min(18rem,85vw)] overflow-y-auto border-r border-gray-200 bg-white shadow-2xl md:hidden">
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close channels"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200"
          >
            ×
          </button>

          <ChannelSidebar
            channels={channels}
            activeId={activeChannel.id}
            onSelect={selectChannel}
          />
        </aside>
      )}

      {/* Mobile member drawer */}
      {mobileSidebar === "members" && (
        <aside className="fixed inset-y-0 right-0 z-50 w-[min(20rem,88vw)] border-l border-gray-200 bg-white shadow-2xl lg:hidden">
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close members"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg text-gray-600 shadow-sm transition hover:bg-gray-100"
          >
            ×
          </button>

          <MemberSidebar
            online={members.online}
            offline={members.offline}
            total={members.total}
            onlineCount={members.onlineCount}
            loading={members.loading}
            currentUserId={userId}
          />
        </aside>
      )}
    </div>
  );
}