"use client";

import { useRef, useState } from "react";

import AnnouncementCard from "./AnnouncementCard";
import UpcomingEvents from "./UpcomingEvents";
import ResourcesCard from "./ResourcesCard";

/**
 * The right-hand sidebar cards, as a swipeable row.
 * Only shown below the `xl` breakpoint, where the real sidebar is hidden.
 */
const SLIDES = [
  { title: "Department Announcements", node: <AnnouncementCard /> },
  { title: "Upcoming Events", node: <UpcomingEvents /> },
  
];

export default function MobileHighlights() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = rowRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;

    const index = Math.round((el.scrollLeft / max) * (SLIDES.length - 1));
    setActive(index);
  };

  const goTo = (index: number) => {
    const el = rowRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (!child) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    child.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <section
      aria-label="Department updates"
      className="mt-4 sm:mt-6 xl:hidden"
    >
      <h2 className="mb-2 text-sm font-semibold text-gray-900">
        Around the department
      </h2>

      {/* Swipe row (bleeds to the screen edges so the next card peeks in) */}
      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="-mx-3 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-px-3 px-3 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.title}
            className="w-[82%] shrink-0 snap-start sm:w-[340px] [&>*]:!mb-0"
          >
            {slide.node}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${slide.title}`}
            aria-current={active === i}
            className={`h-1.5 rounded-full transition-all ${
              active === i ? "w-5 bg-brand-600" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}