"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import BottomTabBar, { shouldShowTabBar } from "./BottomTabBar";

import useLobbyUnread from "@/hooks/useLobbyUnread";

interface Props {
  children: ReactNode;
  user: User;
}

export default function MainLayout({
  children,
  user,
}: Props) {
  const pathname = usePathname();
  const showTabBar = shouldShowTabBar(pathname);

  // Unread Lobby messages, shown on the Lobby link and tab
  const { total: lobbyUnread } = useLobbyUnread(user.id);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar user={user} />

      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar lobbyUnread={lobbyUnread} />
        </div>

        {/* Main content (extra bottom room on phones for the tab bar) */}
        <main
          className={`min-h-[calc(100vh-50px)] min-w-0 flex-1 ${
            showTabBar
              ? "pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0"
              : ""
          }`}
        >
          {children}
        </main>

        {/* Desktop right sidebar */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>

      {/* Phone navigation */}
      <BottomTabBar userId={user.id} lobbyUnread={lobbyUnread} />
    </div>
  );
}