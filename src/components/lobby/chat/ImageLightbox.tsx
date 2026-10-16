"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";

interface Props {
  src: string;
  onClose: () => void;
}

/** Full-size image viewer. Closes with Escape, the X, or a tap outside. */
export default function ImageLightbox({ src, onClose }: Props) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Rendered on document.body so it always covers the whole screen
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
      >
        <X size={20} />
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Full size preview"
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain"
      />

      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/25"
      >
        <ExternalLink size={14} />
        Open original
      </a>
    </div>,
    document.body
  );
}