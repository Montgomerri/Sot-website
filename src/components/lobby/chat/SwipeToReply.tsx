"use client";

import { useRef, useState } from "react";
import { Reply } from "lucide-react";

interface Props {
  /** Turn the gesture off (unsent messages, editing) */
  enabled: boolean;
  onTrigger: () => void;
  children: React.ReactNode;
}

const TRIGGER_PX = 56; // how far to drag before letting go replies
const MAX_PX = 80;
const EDGE_PX = 24; // ignore the screen edge (the browser's swipe-back)

/**
 * Drag a message to the right to reply, like WhatsApp.
 * Up and down scrolling is untouched (touch-action: pan-y).
 */
export default function SwipeToReply({
  enabled,
  onTrigger,
  children,
}: Props) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const start = useRef<{ x: number; y: number } | null>(null);
  const engaged = useRef(false);
  const crossed = useRef(false);

  function reset() {
    start.current = null;
    engaged.current = false;
    crossed.current = false;

    setDragging(false);
    setOffset(0);
  }

  function handleTouchStart(event: React.TouchEvent) {
    if (!enabled || event.touches.length !== 1) return;

    const touch = event.touches[0];

    if (touch.clientX < EDGE_PX) return;

    start.current = { x: touch.clientX, y: touch.clientY };
    engaged.current = false;
    crossed.current = false;
  }

  function handleTouchMove(event: React.TouchEvent) {
    const origin = start.current;

    if (!origin) return;

    const touch = event.touches[0];
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;

    if (!engaged.current) {
      // It's a scroll: hand the gesture back to the browser
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        start.current = null;
        return;
      }

      // Only a clear swipe to the right starts the reply gesture
      if (dx > 12 && dx > Math.abs(dy) * 1.5) {
        engaged.current = true;
        setDragging(true);
      } else {
        return;
      }
    }

    // Slows down after the trigger point, like a rubber band
    const eased =
      dx > TRIGGER_PX
        ? Math.min(MAX_PX, TRIGGER_PX + (dx - TRIGGER_PX) * 0.35)
        : Math.max(0, dx);

    setOffset(eased);

    if (eased >= TRIGGER_PX && !crossed.current) {
      crossed.current = true;

      if (typeof navigator.vibrate === "function") {
        navigator.vibrate(8);
      }
    } else if (eased < TRIGGER_PX) {
      crossed.current = false;
    }
  }

  function handleTouchEnd() {
    const shouldReply = engaged.current && crossed.current;

    reset();

    if (shouldReply) onTrigger();
  }

  const progress = Math.min(1, offset / TRIGGER_PX);

  return (
    <div
      className="relative"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={reset}
    >
      {/* Reply icon revealed behind the message */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center"
        style={{
          opacity: progress,
          transform: `scale(${0.6 + 0.4 * progress})`,
        }}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            progress >= 1
              ? "bg-brand-600 text-white"
              : "bg-brand-100 text-brand-700"
          }`}
        >
          <Reply size={16} />
        </span>
      </div>

      <div
        style={{
          transform: offset ? `translateX(${offset}px)` : undefined,
          transition: dragging ? "none" : "transform 200ms ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}