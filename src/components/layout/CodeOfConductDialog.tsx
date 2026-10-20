"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, X } from "lucide-react";

/** Edit the rules here. Keep each point short. */
const SECTIONS = [
  {
    title: "For everyone",
    points: [
      "Be respectful. No insults, harassment, hate or discrimination.",
      "Keep personal details, yours and other people's, private.",
      "No spam, advertising or anything unrelated to learning.",
    ],
  },
  {
    title: "In Questions & Answers",
    points: [
      "Search first, then ask one clear question per post.",
      "Say what you tried, and include any error message or code.",
      "Use the right tags so the right people find your question.",
      "Explain your answers instead of just pasting a solution.",
      "Accept the answer that helped and thank the person.",
      "Ask for help understanding, not for answers to graded work. Credit your sources.",
    ],
  },
  {
    title: "In the Lobby",
    points: [
      "Keep each channel on its topic: Programming for code, Random for the rest.",
      "Only admins post in Announcements.",
      "Don't share exam papers, answers or other people's private messages.",
      "Be kind with feedback: talk about ideas, not people.",
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

/** A short code of conduct for the Q&A and the Lobby. */
export default function CodeOfConductDialog({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Keep Tab inside the dialog
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], [tabindex]:not([tabindex='-1'])"
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="conduct-title"
        tabIndex={-1}
        className="flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl outline-none sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <ShieldCheck size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="conduct-title"
              className="text-base font-semibold text-gray-900 sm:text-lg"
            >
              Code of Conduct
            </h2>

            <p className="text-sm text-gray-500">
              How we keep Asknet helpful and respectful.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rules */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>

              <ul className="mt-2 space-y-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm leading-6 text-gray-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="rounded-xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-500">
            Posts that break these rules may be removed, and repeated breaches
            can lead to losing access. If something worries you, tell a
            department admin.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            I understand
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}