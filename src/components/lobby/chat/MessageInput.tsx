"use client";

import {
  useRef,
  useState,
} from "react";

import {
  Paperclip,
  Smile,
  Send,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { LobbyMessage } from "@/types/lobby";

interface Props {
  sendMessage: (
    content: string,
    imageUrl?: string | null,
    replyToId?: string | null
  ) => Promise<void>;

  replyingTo: LobbyMessage | null;

  onCancelReply: () => void;
}

export default function MessageInput({
  sendMessage,
  replyingTo,
  onCancelReply,
}: Props) {
  const [message, setMessage] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image must be smaller than 5MB."
      );
      return;
    }

    setSelectedImage(file);

    event.target.value = "";
  }

  function removeSelectedImage() {
    setSelectedImage(null);
  }

  async function uploadImage(file: File) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "User not authenticated"
      );
    }

    const extension =
      file.name.split(".").pop() || "jpg";

    const fileName =
      `${user.id}/${crypto.randomUUID()}.${extension}`;

    const { error } =
      await supabase.storage
        .from("lobby-images")
        .upload(
          fileName,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

    if (error) {
      throw error;
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("lobby-images")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async function handleSend() {
    if (
      !message.trim() &&
      !selectedImage
    ) {
      return;
    }

    try {
      setUploading(true);

      let imageUrl:
        | string
        | null = null;

      if (selectedImage) {
        imageUrl =
          await uploadImage(
            selectedImage
          );
      }

      await sendMessage(
        message.trim(),
        imageUrl,
        replyingTo?.id ?? null
      );

      setMessage("");
      setSelectedImage(null);
      onCancelReply();
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );

      alert(
        "Failed to send message. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="
        border-t
        bg-white
        p-4
      "
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Reply preview */}

      {replyingTo && (
        <div
          className="
            mb-3
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-3
            py-2
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                text-blue-600
              "
            >
              Replying to{" "}
              {replyingTo.profiles
                ?.full_name ??
                "User"}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                text-gray-500
              "
            >
              {replyingTo.content ||
                "Image"}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancelReply}
            className="
              ml-3
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-200
              hover:text-gray-700
            "
            aria-label="Cancel reply"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Selected image preview */}

      {selectedImage && (
        <div
          className="
            mb-3
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-2
          "
        >
          <div
            className="
              relative
              h-16
              w-16
              shrink-0
              overflow-hidden
              rounded-lg
              border
              border-gray-200
              bg-white
            "
          >
            <img
              src={URL.createObjectURL(
                selectedImage
              )}
              alt="Selected image preview"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-sm
                font-medium
                text-gray-700
              "
            >
              {selectedImage.name}
            </p>

            <p className="text-xs text-gray-400">
              Ready to send
            </p>
          </div>

          <button
            type="button"
            onClick={
              removeSelectedImage
            }
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-200
              hover:text-gray-700
            "
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-2
          transition
          focus-within:border-blue-400
          focus-within:bg-white
        "
      >
        <button
          type="button"
          onClick={openFilePicker}
          disabled={uploading}
          className="
            text-gray-400
            transition
            hover:text-blue-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Paperclip size={20} />
        </button>

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            uploading
              ? "Uploading..."
              : replyingTo
                ? "Write a reply..."
                : "Message the lobby..."
          }
          disabled={uploading}
          className="
            flex-1
            bg-transparent
            text-sm
            outline-none
            disabled:opacity-50
          "
        />

        <button
          type="button"
          className="
            text-gray-400
            transition
            hover:text-blue-500
          "
        >
          <Smile size={20} />
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={
            uploading ||
            (!message.trim() &&
              !selectedImage)
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}