"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` when `inView` becomes true.
 * Returns the current display value as a string (e.g. "200+", "10+", "5★").
 */
export function useCounter(
  target: number,
  suffix: string,
  inView: boolean,
  duration = 1.6
): string {
  const [display, setDisplay] = useState("0" + suffix);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      setDisplay(value + suffix);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, suffix, duration]);

  return display;
}
