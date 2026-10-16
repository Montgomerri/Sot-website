"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import type { LobbyMember } from "@/hooks/useLobbyMembers";

interface Props {
  online: LobbyMember[];
  offline: LobbyMember[];
  total: number | null;
  onlineCount: number;
  loading: boolean;
  currentUserId: string | null;
}

/** Offline people shown before "Show all" */
const OFFLINE_PREVIEW = 20;

function MemberAvatar({ member }: { member: LobbyMember }) {
  const [failed, setFailed] = useState(false);

  if (member.avatar_url && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={member.avatar_url}
        alt=""
        onError={() => setFailed(true)}
        className="h-9 w-9 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
      {(member.full_name?.trim().charAt(0) || "?").toUpperCase()}
    </div>
  );
}

function MemberRow({
  member,
  online,
  isMe,
}: {
  member: LobbyMember;
  online: boolean;
  isMe: boolean;
}) {
  const name = member.full_name?.trim() || "Unnamed member";

  const details = [
    member.level ? `Level ${member.level}` : null,
    member.department,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li>
      <Link
        href={`/profile/${member.id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-brand-50"
      >
        <div className="relative shrink-0">
          <MemberAvatar member={member} />

          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
              online ? "bg-emerald-500" : "bg-gray-300"
            }`}
          />
        </div>

        <div className="min-w-0">
          <p
            className={`truncate text-sm font-medium ${
              online ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {name}

            {isMe && (
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                (you)
              </span>
            )}
          </p>

          {details && (
            <p className="truncate text-xs text-gray-400">{details}</p>
          )}
        </div>
      </Link>
    </li>
  );
}

function MemberSkeleton() {
  return (
    <div className="space-y-4 px-2 pt-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex animate-pulse items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-200" />

          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-gray-200" />
            <div className="h-2.5 w-20 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MemberSidebar({
  online,
  offline,
  total,
  onlineCount,
  loading,
  currentUserId,
}: Props) {
  const [query, setQuery] = useState("");
  const [showAllOffline, setShowAllOffline] = useState(false);

  const search = query.trim().toLowerCase();

  const matches = (member: LobbyMember) =>
    !search || (member.full_name ?? "").toLowerCase().includes(search);

  const visibleOnline = useMemo(
    () => online.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [online, search]
  );

  const visibleOffline = useMemo(
    () => offline.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offline, search]
  );

  const offlineShown =
    search || showAllOffline
      ? visibleOffline
      : visibleOffline.slice(0, OFFLINE_PREVIEW);

  const hiddenOffline = visibleOffline.length - offlineShown.length;

  return (
    <aside className="flex h-full w-full flex-col border-l border-gray-200 bg-white lg:w-80">
      {/* Header (room on the right for the mobile close button) */}
      <div className="shrink-0 border-b border-gray-200 px-5 pb-4 pt-5 pr-14 lg:pr-5">
        <h2 className="text-base font-semibold text-gray-900">Members</h2>

        <p className="mt-0.5 text-xs text-gray-500">
          {total !== null ? `${total.toLocaleString()} members` : "Members"}
          {" · "}
          <span className="font-medium text-emerald-600">
            {onlineCount} online
          </span>
        </p>

        <div className="relative mt-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search members"
            aria-label="Search members"
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-base outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:bg-white sm:text-sm"
          />
        </div>
      </div>

      {/* Lists */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Online — {visibleOnline.length}
            </h3>

            {visibleOnline.length > 0 ? (
              <ul>
                {visibleOnline.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    online
                    isMe={member.id === currentUserId}
                  />
                ))}
              </ul>
            ) : (
              <p className="px-2 py-2 text-sm text-gray-400">
                {search
                  ? "No online members match."
                  : "No one is online right now."}
              </p>
            )}

            <h3 className="mb-1 mt-6 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Offline — {visibleOffline.length}
            </h3>

            {offlineShown.length > 0 ? (
              <ul>
                {offlineShown.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    online={false}
                    isMe={member.id === currentUserId}
                  />
                ))}
              </ul>
            ) : (
              <p className="px-2 py-2 text-sm text-gray-400">
                {search ? "No offline members match." : "Everyone is online."}
              </p>
            )}

            {hiddenOffline > 0 && (
              <button
                type="button"
                onClick={() => setShowAllOffline(true)}
                className="mt-2 w-full rounded-xl px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
              >
                Show all {visibleOffline.length}
              </button>
            )}
          </>
        )}
      </div>
    </aside>
  );
}