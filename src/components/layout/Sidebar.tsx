"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CircleHelp,
  Tags,
  Users,
  Building2,
  FlaskConical,
} from "lucide-react";

const items = [
  { name: "Home", icon: House, href: "/dashboard" },
  { name: "Questions", icon: CircleHelp, href: "/questions" },
  { name: "Tags", icon: Tags, href: "/tags" },
  { name: "Users", icon: Users, href: "/users" },
  { name: "Companies", icon: Building2, href: "/companies" },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="sticky top-[50px] h-[calc(100vh-50px)] w-[164px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
      <nav className="py-4">
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
            </Link>
          );
        })}

        <div className="mt-6 px-4">
          <p className="mb-2 text-[11px] uppercase text-gray-500">
            Labs
          </p>

          <Link
            href="#"
            className="flex items-center gap-3 rounded px-2 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
          >
            <FlaskConical size={16} />
            <span>Discussions</span>
          </Link>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-2 text-[11px] uppercase text-gray-500">
            Collectives
          </p>

          <button className="text-left text-[13px] text-brand-700 hover:underline">
            Explore all Collectives
          </button>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-2 text-[11px] uppercase text-gray-500">
            Teams
          </p>

          <div className="rounded-lg border bg-gray-50 p-3">
            <p className="text-xs leading-5 text-gray-600">
              Ask questions, find answers and collaborate.
            </p>

            <button className="mt-3 w-full rounded bg-brand-600 py-2 text-xs text-white hover:bg-brand-700">
              Create free Team
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}