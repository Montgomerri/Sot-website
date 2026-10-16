
"use client";

import { useEffect } from "react";

export default function DraggableChatbase() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let attempts = 0;

    const timer = window.setInterval(() => {
      attempts++;

      // Chatbase may inject its widget after its script loads.
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[src*="chatbase"]'
      );

      if (!iframe) {
        if (attempts > 40) window.clearInterval(timer);
        return;
      }

      const widget = iframe.parentElement as HTMLElement | null;

      if (!widget) {
        window.clearInterval(timer);
        return;
      }

      window.clearInterval(timer);

      // Preserve the widget's existing position and dimensions.
      widget.style.position = "fixed";
      widget.style.zIndex = "9999";
      widget.style.touchAction = "none";

      let dragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;

      const onPointerDown = (event: PointerEvent) => {
        // Drag only from the widget's top/header area.
        // Adjust this selector/area to match Chatbase's actual UI.
        const rect = widget.getBoundingClientRect();
        const inHeader = event.clientY <= rect.top + 48;

        if (!inHeader || event.button !== 0) return;

        dragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialLeft = rect.left;
        initialTop = rect.top;

        widget.style.right = "auto";
        widget.style.bottom = "auto";
        widget.style.left = `${rect.left}px`;
        widget.style.top = `${rect.top}px`;

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;

        const left = Math.max(
          0,
          Math.min(
            window.innerWidth - widget.offsetWidth,
            initialLeft + event.clientX - startX
          )
        );

        const top = Math.max(
          0,
          Math.min(
            window.innerHeight - widget.offsetHeight,
            initialTop + event.clientY - startY
          )
        );

        widget.style.left = `${left}px`;
        widget.style.top = `${top}px`;
      };

      const onPointerUp = () => {
        dragging = false;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      widget.addEventListener("pointerdown", onPointerDown);

      cleanup = () => {
        widget.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };
    }, 500);

    return () => {
      window.clearInterval(timer);
      cleanup?.();
    };
  }, []);

  return null;
}
