"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

import useNotifications from "@/hooks/useNotifications";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

import {
  Bell,
  MessageSquare,
  Trophy,
  CircleHelp,
  Search,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Settings,
} from "lucide-react";

interface Props {
  user: User;
}

export default function Navbar({ user }: Props) {
  const supabase = createClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const {
  notifications,
  unreadCount,
  loading,
  readNotification,
  clearAllNotifications,
} = useNotifications();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const initial =
    user.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 h-[50px] border-b border-gray-200 border-t-[3px] border-t-orange-500 bg-white">
      <div className="mx-auto flex h-full max-w-[1600px] items-center px-4">

        {/* Logo */}

        <Link
          href="/dashboard"
          className="mr-6 flex items-center gap-2"
        >
          <Image
            src="/stackoverflow-logo.png"
            alt="Stack Overflow"
            width={140}
            height={32}
            className="h-7 w-auto"
          />
        </Link>

        {/* Left Links */}

        <nav className="hidden items-center gap-5 text-[13px] text-gray-600 md:flex">

          <button className="rounded-md px-2 py-1 hover:bg-gray-100">
            Products
          </button>

          <button className="rounded-md px-2 py-1 hover:bg-gray-100">
            OverflowAI
          </button>

        </nav>

        {/* Search */}

        <div className="relative mx-6 flex-1">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <input
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-gray-300 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Icons */}

        <div className="flex items-center gap-4 text-gray-600">

          {/* Notifications */}

          <div className="relative">

            <button
              onClick={() =>
                setNotificationOpen(!notificationOpen)
              }
              className="relative hover:text-black"
            >

              <Bell size={18} />

              {unreadCount > 0 && (

                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">

                  {unreadCount}

                </span>

              )}

            </button>

            {notificationOpen && (

              <NotificationDropdown
  notifications={notifications}
  loading={loading}
  onRead={readNotification}
  onClear={clearAllNotifications}
  onClose={() => setNotificationOpen(false)}
/>

            )}

          </div>

          {/* Messages */}

<Link
  href="/messages"
  className="hover:text-black"
>
  <MessageSquare size={18} />
</Link>

          {/* Badges */}

          <button className="hover:text-black">
            <Trophy size={18} />
          </button>

          {/* Help */}

          <button className="hover:text-black">
            <CircleHelp size={18} />
          </button>

          {/* Profile */}

          <div className="relative">

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="flex items-center gap-2 rounded-md p-1 hover:bg-gray-100"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 font-semibold text-white">
                {initial}
              </div>

              <ChevronDown size={16} />

            </button>

            {menuOpen && (

              <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-white py-2 shadow-lg">

                <div className="border-b px-4 py-3">

                  <p className="text-sm font-semibold">
                    {user.email}
                  </p>

                </div>

                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <UserIcon size={16} />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Log out
                </button>

              </div>

            )}

          </div>

        </div>

      </div>
    </header>
  );
}