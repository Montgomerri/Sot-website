"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/** Number that counts up from 0 when it appears. */
export function CountUp({
  value,
  duration = 0.9,
}: {
  value: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [value, duration, reduceMotion]);

  return <>{display.toLocaleString("en-GB")}</>;
}

/** Circular progress ring with the reputation number in the middle. */
export function ReputationRing({
  value,
  progress,
}: {
  value: number;
  /** 0 to 1 */
  progress: number;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(progress));
    return () => cancelAnimationFrame(id);
  }, [progress]);

  const percent = Math.max(0, Math.min(1, shown)) * 100;

  return (
    <div className="relative h-[72px] w-[72px] shrink-0 sm:h-20 sm:w-20">
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          strokeWidth="3"
          className="stroke-brand-100"
        />

        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          style={{ strokeDashoffset: 100 - percent }}
          className="stroke-brand-600 transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900 sm:text-xl">
        <CountUp value={value} />
      </div>
    </div>
  );
}