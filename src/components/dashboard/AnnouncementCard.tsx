"use client";

import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

import useAnnouncements from "@/hooks/useAnnouncements";

export default function AnnouncementCard() {
  const { items, loading, error } = useAnnouncements();

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-brand-200">
      <div className="border-b border-brand-200 bg-brand-100 px-4 py-3">
        <h3 className="font-semibold text-brand-900">
          Department Announcements
        </h3>
      </div>

      <div className="bg-brand-50">
        {loading ? (
          <div className="space-y-4 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-3.5 w-full rounded bg-brand-100" />
                <div className="h-3.5 w-2/3 rounded bg-brand-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="p-4 text-sm text-gray-500">
            We couldn&apos;t load the announcements right now.
          </p>
        ) : items.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No announcements yet.
          </p>
        ) : (
          <ul className="divide-y divide-brand-100">
            {items.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <p className="line-clamp-4 whitespace-pre-wrap break-words text-sm text-gray-800">
                  {item.content || "Shared an image"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {formatDistanceToNowStrict(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/lobby?channel=announcements"
          className="block border-t border-brand-200 px-4 py-2.5 text-center text-sm font-medium text-brand-700 transition hover:bg-brand-100"
        >
          See all in the Lobby
        </Link>
      </div>
    </div>
  );
}