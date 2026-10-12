"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleHelp,
  House,
  MessagesSquare,
  Plus,
  User,
} from "lucide-react";

/**
 * Pages where the tab bar is hidden (the editor needs the full screen).
 * MainLayout uses this too, so the bottom spacing is removed as well.
 */
const HIDE_ON = ["/questions/ask"];

export function shouldShowTabBar(pathname: string | null) {
  return !HIDE_ON.includes(pathname ?? "");
}

export default function BottomTabBar({ userId }: { userId: string }) {
  const pathname = usePathname() ?? "";

  if (!shouldShowTabBar(pathname)) return null;

  const tabs = [
    {
      label: "Home",
      href: "/dashboard",
      icon: House,
      active: pathname === "/dashboard",
    },
    {
      label: "Questions",
      href: "/questions",
      icon: CircleHelp,
      active: pathname.startsWith("/questions"),
    },
    {
      label: "Ask",
      href: "/questions/ask",
      icon: Plus,
      active: false,
      center: true,
    },
    {
      label: "Lobby",
      href: "/lobby",
      icon: MessagesSquare,
      active: false,
    },
    {
      label: "Profile",
      href: `/profile/${userId}`,
      icon: User,
      active: pathname.startsWith(`/profile/${userId}`),
    },
  ];

  return (
    <>
      {/* Keeps the chat widget bubble from sitting on top of the tab bar */}
      <style>{`
        @media (max-width: 767px) {
          #chatbase-bubble-button {
            bottom: calc(88px + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            if (tab.center) {
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.href}
                    className="flex flex-col items-center pb-2 text-[11px] font-semibold text-brand-800"
                  >
                    <span className="-mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_6px_16px_rgba(55,155,89,0.45)] ring-4 ring-white transition active:scale-95">
                      <Icon size={26} strokeWidth={2.5} />
                    </span>

                    <span className="mt-1">{tab.label}</span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={tab.label}>
                <Link
                  href={tab.href}
                  aria-current={tab.active ? "page" : undefined}
                  className={`relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${
                    tab.active
                      ? "text-brand-700"
                      : "text-gray-500 active:text-gray-700"
                  }`}
                >
                  {tab.active && (
                    <span className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-b-full bg-brand-600" />
                  )}

                  <Icon size={22} strokeWidth={tab.active ? 2.4 : 2} />

                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}