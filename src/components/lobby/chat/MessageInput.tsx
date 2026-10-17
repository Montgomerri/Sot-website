"use client";

import { useEffect, useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";

import type { LobbyMessage } from "@/types/lobby";

interface Props {
  sendMessage: (
    content: string,
    file?: File | null
  ) => void | Promise<void>;

  replyingTo: LobbyMessage | null;

  /** Shown in the placeholder: "Message Programming..." */
  channelName: string;

  onCancelReply: () => void;
}

interface SelectedImage {
  file: File;
  url: string;
}

export default function MessageInput({
  sendMessage,
  replyingTo,
  channelName,
  onCancelReply,
}: Props) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<SelectedImage | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<SelectedImage | null>(null);

  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  // Start typing straight away after choosing a message to reply to
  // (works for the menu and for swipe to reply)
  useEffect(() => {
    if (replyingTo) inputRef.current?.focus();
  }, [replyingTo]);

  // Release the preview when leaving the page
  useEffect(() => {
    return () => {
      if (imageRef.current) URL.revokeObjectURL(imageRef.current.url);
    };
  }, []);

  function clearImage() {
    if (imageRef.current) URL.revokeObjectURL(imageRef.current.url);

    setImage(null);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Image must be smaller than 5MB.");
      return;
    }

    setNotice(null);

    if (imageRef.current) URL.revokeObjectURL(imageRef.current.url);

    // The preview URL is created once, not on every keystroke
    setImage({ file, url: URL.createObjectURL(file) });
  }

  // The message appears in the chat straight away, so the box clears
  // immediately and keeps focus (the keyboard stays open on phones).
  function handleSend() {
    const text = message.trim();

    if (!text && !image) return;

    void sendMessage(text, image?.file ?? null);

    setMessage("");
    setNotice(null);
    clearImage();
    onCancelReply();

    inputRef.current?.focus();
  }

  const canSend = message.trim().length > 0 || image !== null;

  return (
    <div className="relative z-30 shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Reply preview */}
      {replyingTo && (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 border-l-4 border-l-brand-500 bg-gray-50 px-3 py-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-brand-700">
              Replying to {replyingTo.profiles?.full_name ?? "User"}
            </p>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {replyingTo.content || "Image"}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Selected image preview */}
      {image && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt="Selected image preview"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-700">
              {image.file.name}
            </p>

            <p className="text-xs text-gray-400">Ready to send</p>
          </div>

          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove image"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {notice && (
        <p role="alert" className="mb-2 text-xs text-red-600">
          {notice}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 transition focus-within:border-brand-500 focus-within:bg-white">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach an image"
          className="text-gray-400 transition hover:text-brand-600"
        >
          <Paperclip size={20} />
        </button>

        <input
          ref={inputRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              handleSend();
            }
          }}
          aria-label="Message"
          maxLength={2000}
          placeholder={
            replyingTo ? "Write a reply..." : `Message ${channelName}...`
          }
          className="min-w-0 flex-1 bg-transparent text-base outline-none sm:text-sm"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}