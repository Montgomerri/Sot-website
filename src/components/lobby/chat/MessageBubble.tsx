"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  MoreHorizontal,
  Pencil,
  Reply,
  Trash2,
  X,
} from "lucide-react";

import ImageLightbox from "./ImageLightbox";
import MessageContent from "./MessageContent";
import ReactionBar from "./ReactionBar";
import SwipeToReply from "./SwipeToReply";

import type { ReactionSummary } from "@/hooks/useLobbyReactions";
import type { LobbyMessage } from "@/types/lobby";

interface Props {
  id: string;
  userId: string;
  currentUserId: string | null;
  name: string;
  avatarUrl?: string | null;
  message: string;
  time: string;
  imageUrl?: string | null;

  /** Same person as the message above: hide the avatar and name */
  grouped?: boolean;

  /** "sending" / "failed" while the message isn't confirmed yet */
  status?: "sending" | "failed";

  replyTo?: LobbyMessage["reply_to"] | null;

  reactions: ReactionSummary[];
  onToggleReaction: (emoji: string) => void;

  onReply?: (message: LobbyMessage) => void;
  onJumpToMessage?: (messageId: string) => void;

  onEdit: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;

  onRetry?: (id: string) => void;
  onDiscard?: (id: string) => void;
}

const menuItem =
  "flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50";

function UserAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  const [failed, setFailed] = useState(false);

  const size = "h-9 w-9 sm:h-11 sm:w-11";

  if (avatarUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt=""
        onError={() => setFailed(true)}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function MessageBubble({
  id,
  userId,
  currentUserId,
  name,
  avatarUrl,
  message,
  time,
  imageUrl,
  grouped = false,
  status,
  replyTo,
  reactions,
  onToggleReaction,
  onReply,
  onJumpToMessage,
  onEdit,
  onDelete,
  onRetry,
  onDiscard,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(message);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  const isOwner = currentUserId === userId;
  const sending = status === "sending";
  const failed = status === "failed";
  const locked = sending || failed;

  // Close the menu when tapping elsewhere or pressing Escape
  useEffect(() => {
    if (!menuOpen) return;

    const onDown = (event: MouseEvent | TouchEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  async function handleCopy() {
    if (!message) return;

    try {
      await navigator.clipboard.writeText(message);

      setCopied(true);
      setMenuOpen(false);

      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  }

  function startEditing() {
    setEditText(message);
    setEditing(true);
    setMenuOpen(false);
  }

  function cancelEditing() {
    setEditText(message);
    setEditing(false);
  }

  async function saveEdit() {
    const trimmed = editText.trim();

    if (!trimmed) return;

    if (trimmed === message) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);

      await onEdit(id, trimmed);

      setEditing(false);
    } catch (error) {
      console.error("Failed to edit message:", error);
      alert("Failed to edit message.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setMenuOpen(false);

    if (!window.confirm("Delete this message?")) return;

    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message.");
    }
  }

  function handleReply() {
    setMenuOpen(false);

    onReply?.({
      id,
      user_id: userId,
      content: message,
      created_at: "",
      image_url: imageUrl ?? null,
      reply_to_id: null,
      profiles: {
        full_name: name,
        avatar_url: avatarUrl ?? null,
      },
      reply_to: null,
    });
  }

  return (
    <SwipeToReply
      enabled={!locked && !editing && !!onReply}
      onTrigger={handleReply}
    >
      <div
        className={`group relative flex min-w-0 gap-3 px-3 transition hover:bg-brand-50/50 sm:gap-4 sm:px-6 ${
          grouped ? "py-0.5" : "pb-1 pt-3 sm:pt-4"
        } ${sending ? "opacity-70" : ""}`}
      >
        {/* Left column: avatar, or just the time for grouped messages */}
        {grouped ? (
          <div className="flex w-9 shrink-0 items-start justify-center pt-1.5 sm:w-11">
            <span className="text-[10px] text-gray-400 opacity-0 transition group-hover:opacity-100 [@media(hover:none)]:hidden">
              {time}
            </span>
          </div>
        ) : (
          <UserAvatar name={name} avatarUrl={avatarUrl} />
        )}

        {/* Message */}
        <div className="min-w-0 flex-1">
          {/* Name and time */}
          {!grouped && (
            <div className="flex min-w-0 items-center gap-3 pr-10">
              <h4 className="min-w-0 truncate font-semibold text-gray-900">
                {name}
              </h4>

              <span className="shrink-0 text-xs text-gray-400">
                {sending ? "Sending…" : time}
              </span>
            </div>
          )}

          {grouped && sending && (
            <span className="text-xs text-gray-400">Sending…</span>
          )}

          {/* Quoted message (tap to jump to it) */}
          {replyTo && (
            <button
              type="button"
              onClick={() => onJumpToMessage?.(replyTo.id)}
              className="mt-2 block w-full rounded-lg border-l-4 border-brand-500 bg-gray-50 px-3 py-2 text-left transition hover:bg-brand-50"
            >
              <div className="truncate text-xs font-semibold text-brand-700">
                {replyTo.profiles?.full_name ?? "User"}
              </div>

              <div className="mt-0.5 line-clamp-2 break-words text-xs text-gray-500">
                {replyTo.content || "Image"}
              </div>
            </button>
          )}

          {editing ? (
            <div className="mt-2">
              <textarea
                value={editText}
                onChange={(event) => setEditText(event.target.value)}
                autoFocus
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:text-sm"
              />

              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={saving || !editText.trim()}
                  className="flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700 disabled:opacity-50"
                >
                  <Check size={14} />
                  {saving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {message && (
                <p className="mt-0.5 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                  <MessageContent text={message} />
                </p>
              )}

              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  aria-label="View image full size"
                  className="mt-2 block cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Uploaded image"
                    decoding="async"
                    className="max-h-96 max-w-full rounded-xl border border-gray-200 object-cover sm:max-w-md"
                  />
                </button>
              )}

              {failed && (
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="font-medium text-red-600">
                    Failed to send
                  </span>

                  <button
                    type="button"
                    onClick={() => onRetry?.(id)}
                    className="font-semibold text-brand-700 hover:underline"
                  >
                    Retry
                  </button>

                  <button
                    type="button"
                    onClick={() => onDiscard?.(id)}
                    className="text-gray-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}

              {!locked && (
                <ReactionBar
                  reactions={reactions}
                  onToggle={onToggleReaction}
                />
              )}
            </>
          )}
        </div>

        {/* Actions (always visible on touch screens, hover on desktop) */}
        {!locked && !editing && (
          <div
            ref={actionsRef}
            className={`absolute right-2 sm:right-5 ${
              grouped ? "top-0" : "top-1"
            }`}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Message actions"
              aria-expanded={menuOpen}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 opacity-0 transition hover:bg-gray-100 hover:text-gray-700 focus:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={handleReply}
                  className={menuItem}
                >
                  <Reply size={16} />
                  Reply
                </button>

                {message && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={menuItem}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}

                {isOwner && (
                  <>
                    {message && (
                      <button
                        type="button"
                        onClick={startEditing}
                        className={menuItem}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {viewerOpen && imageUrl && (
        <ImageLightbox
          src={imageUrl}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </SwipeToReply>
  );
}