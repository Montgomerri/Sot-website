"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CircleHelp,
  Tags,
  Users,
  MessagesSquare,
} from "lucide-react";

import { formatUnread } from "@/hooks/useLobbyUnread";

const items = [
  { name: "Home", icon: House, href: "/dashboard" },
  { name: "Questions", icon: CircleHelp, href: "/questions" },
  { name: "Lobby", icon: MessagesSquare, href: "/lobby" },
  { name: "Tags", icon: Tags, href: "/questions/tags" },
  { name: "Users", icon: Users, href: "/users" },
];

export default function Sidebar({
  lobbyUnread = 0,
}: {
  lobbyUnread?: number;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";

    // Tags lives under /questions, so keep the two from both lighting up
    if (href === "/questions") {
      return (
        pathname === "/questions" ||
        (pathname.startsWith("/questions/") &&
          !pathname.startsWith("/questions/tags"))
      );
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="sticky top-[50px] h-[calc(100vh-50px)] w-[164px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
      <nav aria-label="Main" className="py-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 px-4 py-2 text-[13px] transition ${
                active
                  ? "border-r-[3px] border-brand-500 bg-brand-50 font-semibold text-brand-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={17} />
              <span>{item.name}</span>

              {item.href === "/lobby" && lobbyUnread > 0 && (
                <span
                  aria-label={`${lobbyUnread} unread messages`}
                  className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white"
                >
                  {formatUnread(lobbyUnread)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}