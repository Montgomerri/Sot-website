"use client";

import {
  Check,
  Copy,
  MoreHorizontal,
  Pencil,
  Reply,
  Trash2,
  X,
} from "lucide-react";

import { useState } from "react";
import { LobbyMessage } from "@/types/lobby";

interface Props {
  id: string;
  userId: string;
  currentUserId: string | null;
  name: string;
  message: string;
  time: string;
  imageUrl?: string | null;

  replyTo?: LobbyMessage["reply_to"] | null;

  onReply?: (message: LobbyMessage) => void;

  onJumpToMessage?: (messageId: string) => void;

  onEdit: (
    id: string,
    content: string
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;
}

export default function MessageBubble({
  id,
  userId,
  currentUserId,
  name,
  message,
  time,
  imageUrl,
  replyTo,
  onReply,
  onJumpToMessage,
  onEdit,
  onDelete,
}: Props) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [editText, setEditText] =
    useState(message);

  const [saving, setSaving] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const isOwner =
    currentUserId === userId;

  async function handleCopy() {
    if (!message) return;

    try {
      await navigator.clipboard.writeText(
        message
      );

      setCopied(true);
      setMenuOpen(false);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy message:",
        error
      );
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
    const trimmed =
      editText.trim();

    if (!trimmed) return;

    if (trimmed === message) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);

      await onEdit(
        id,
        trimmed
      );

      setEditing(false);
    } catch (error) {
      console.error(
        "Failed to edit message:",
        error
      );

      alert(
        "Failed to edit message."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete this message?"
      );

    if (!confirmed) return;

    try {
      await onDelete(id);
    } catch (error) {
      console.error(
        "Failed to delete message:",
        error
      );

      alert(
        "Failed to delete message."
      );
    }

    setMenuOpen(false);
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
        avatar_url: null,
      },
      reply_to: null,
    });
  }

  function handleJumpToReply() {
    if (!replyTo) return;

    onJumpToMessage?.(
      replyTo.id
    );
  }

  return (
    <div
  id={`message-${id}`}
  className="
    group
    flex
    min-w-0
    gap-3
    px-3
    py-3
    transition
    hover:bg-blue-50/50
    sm:gap-4
    sm:px-6
    sm:py-4
  "
>
      {/* Avatar */}

      <div
  className="
    flex
    h-9
    w-9
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-blue-500
    text-sm
    font-semibold
    text-white
    sm:h-11
    sm:w-11
  "
>
        {name
          .charAt(0)
          .toUpperCase()}
      </div>

      {/* Message */}

      <div className="relative min-w-0 flex-1">

        {/* Header */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <h4
            className="
              min-w-0
              truncate
              font-semibold
              text-gray-900
            "
          >
            {name}
          </h4>

          <span
            className="
              shrink-0
              text-xs
              text-gray-400
            "
          >
            {time}
          </span>

          {/* Actions */}

          <div
            className="
              relative
              ml-auto
              flex
              shrink-0
              items-center
            "
          >
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (value) =>
                    !value
                )
              }
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-gray-400
                opacity-0
                transition
                hover:bg-gray-100
                hover:text-gray-700
                group-hover:opacity-100
                focus:opacity-100
              "
              aria-label="Message actions"
            >
              <MoreHorizontal
                size={18}
              />
            </button>

            {menuOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-9
                  z-20
                  w-40
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  py-1
                  shadow-lg
                "
              >
                {/* Reply */}

                <button
                  type="button"
                  onClick={
                    handleReply
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-3
                    py-2
                    text-left
                    text-sm
                    text-gray-700
                    hover:bg-gray-50
                  "
                >
                  <Reply
                    size={16}
                  />

                  Reply
                </button>

                {/* Copy */}

                {message && (
                  <button
                    type="button"
                    onClick={
                      handleCopy
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-3
                      py-2
                      text-left
                      text-sm
                      text-gray-700
                      hover:bg-gray-50
                    "
                  >
                    {copied ? (
                      <Check
                        size={16}
                      />
                    ) : (
                      <Copy
                        size={16}
                      />
                    )}

                    {copied
                      ? "Copied"
                      : "Copy"}
                  </button>
                )}

                {/* Edit / Delete */}

                {isOwner && (
                  <>
                    {message && (
                      <button
                        type="button"
                        onClick={
                          startEditing
                        }
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-3
                          py-2
                          text-left
                          text-sm
                          text-gray-700
                          hover:bg-gray-50
                        "
                      >
                        <Pencil
                          size={16}
                        />

                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={
                        handleDelete
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-3
                        py-2
                        text-left
                        text-sm
                        text-red-600
                        hover:bg-red-50
                      "
                    >
                      <Trash2
                        size={16}
                      />

                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Referenced message */}

        {replyTo && (
          <button
            type="button"
            onClick={
              handleJumpToReply
            }
            className="
              mt-2
              block
              w-full
              rounded-lg
              border-l-4
              border-blue-400
              bg-gray-50
              px-3
              py-2
              text-left
              transition
              hover:bg-blue-50
            "
          >
            <div
              className="
                truncate
                text-xs
                font-semibold
                text-blue-600
              "
            >
              {replyTo.profiles
                ?.full_name ??
                "User"}
            </div>

            <div
              className="
                mt-0.5
                line-clamp-2
                break-words
                text-xs
                text-gray-500
              "
            >
              {replyTo.content ||
                "Image"}
            </div>
          </button>
        )}

        {/* Editing */}

        {editing ? (
          <div className="mt-2">
            <textarea
              value={editText}
              onChange={(event) =>
                setEditText(
                  event.target.value
                )
              }
              autoFocus
              rows={3}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
              "
            />

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={
                  saveEdit
                }
                disabled={
                  saving ||
                  !editText.trim()
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  hover:bg-blue-700
                  disabled:opacity-50
                "
              >
                <Check
                  size={14}
                />

                {saving
                  ? "Saving..."
                  : "Save"}
              </button>

              <button
                type="button"
                onClick={
                  cancelEditing
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-gray-500
                  hover:bg-gray-100
                "
              >
                <X
                  size={14}
                />

                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Text */}

            {message && (
              <p
  className="
    mt-1
    break-words
    text-sm
    leading-6
    text-gray-600
  "
>
                {message}
              </p>
            )}

            {/* Image */}

            {imageUrl && (
              <div className="mt-3">
                <img
                  src={imageUrl}
                  alt="Uploaded image"
                  className="
                    max-h-96
                    max-w-md
                    rounded-xl
                    border
                    border-gray-200
                    object-cover
                  "
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}