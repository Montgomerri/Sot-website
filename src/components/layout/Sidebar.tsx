"use client";

import Link from "next/link";
import {
  House,
  CircleHelp,
  Tags,
  Users,
  Building2,
  FlaskConical,
} from "lucide-react";

const items = [
  { name: "Home", icon: House, href: "/dashboard", active: true },
  { name: "Questions", icon: CircleHelp, href: "/questions" },
  { name: "Tags", icon: Tags, href: "/tags" },
  { name: "Users", icon: Users, href: "/users" },
  { name: "Companies", icon: Building2, href: "/companies" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-[50px] h-[calc(100vh-50px)] w-[164px] shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
      <nav className="py-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-[13px] transition ${
                item.active
                  ? "border-r-[3px] border-orange-500 bg-orange-50 font-semibold text-black"
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

          <button className="text-left text-[13px] text-blue-600 hover:underline">
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

            <button className="mt-3 w-full rounded bg-orange-500 py-2 text-xs text-white hover:bg-orange-600">
              Create free Team
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}