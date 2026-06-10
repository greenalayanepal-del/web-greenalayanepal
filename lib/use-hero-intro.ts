"use client";

import { useEffect, useState } from "react";

/** After the first hero intro finishes, skip Framer `initial` so theme toggles do not replay hide animations. */
export function useHeroIntroComplete(delayMs = 2200) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setComplete(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return complete;
}
