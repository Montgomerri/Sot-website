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
  Menu,
  X,
} from "lucide-react";

interface Props {
  user: User;
}

export default function Navbar({ user }: Props) {
  const supabase = createClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-gray-200 border-t-[3px] border-t-orange-500 bg-white">
      <div className="mx-auto flex h-[50px] w-full max-w-[1600px] items-center px-3 sm:px-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

        {/* Logo */}
        <Link
          href="/dashboard"
          className="mr-3 flex shrink-0 items-center sm:mr-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/stackoverflow-logo.png"
            alt="Stack Overflow"
            width={140}
            height={32}
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        {/* Desktop left links */}
        <nav className="hidden items-center gap-5 text-[13px] text-gray-600 md:flex">
          <button className="rounded-md px-2 py-1 hover:bg-gray-100">
            Products
          </button>

          <button className="rounded-md px-2 py-1 hover:bg-gray-100">
            OverflowAI
          </button>
        </nav>

        {/* Search */}
        <div className="relative mx-2 min-w-0 flex-1 sm:mx-4 md:mx-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <input
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 sm:pl-10 sm:pr-4"
          />
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 text-gray-600 md:flex">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setNotificationOpen((open) => !open)
              }
              className="relative rounded-md p-1 hover:bg-gray-100 hover:text-black"
              aria-label="Notifications"
            >
              <Bell size={18} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] text-white">
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
            className="rounded-md p-1 hover:bg-gray-100 hover:text-black"
            aria-label="Messages"
          >
            <MessageSquare size={18} />
          </Link>

          {/* Badges */}
          <button
            type="button"
            className="rounded-md p-1 hover:bg-gray-100 hover:text-black"
            aria-label="Badges"
          >
            <Trophy size={18} />
          </button>

          {/* Help */}
          <button
            type="button"
            className="rounded-md p-1 hover:bg-gray-100 hover:text-black"
            aria-label="Help"
          >
            <CircleHelp size={18} />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
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
                  <p className="truncate text-sm font-semibold">
                    {user.email}
                  </p>
                </div>

                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserIcon size={16} />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <button
                  type="button"
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

        {/* Mobile profile */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-sm font-semibold text-white"
            aria-label="Open profile menu"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border bg-white py-2 shadow-lg">
              <div className="border-b px-4 py-3">
                <p className="truncate text-sm font-semibold">
                  {user.email}
                </p>
              </div>

              <Link
                href={`/profile/${user.id}`}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <UserIcon size={16} />
                Profile
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="space-y-1 px-3 py-3">
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/questions"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Questions
            </Link>

            <Link
              href="/tags"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tags
            </Link>

            <Link
              href="/users"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </Link>

            <Link
              href="/companies"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Companies
            </Link>

            <Link
              href="/messages"
              className="block rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>

            <button
              type="button"
              className="flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Badges
            </button>

            <button
              type="button"
              className="flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Help
            </button>

            {/* Mobile notifications */}
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((open) => !open);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              <span>Notifications</span>

              {unreadCount > 0 && (
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}