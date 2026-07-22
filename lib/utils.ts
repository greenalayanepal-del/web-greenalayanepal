import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Coalesces rapid-fire calls (scroll/pointer events) to at most once per animation frame. */
export function rafThrottle<Args extends unknown[]>(
  fn: (...args: Args) => void,
): (...args: Args) => void {
  let rafId: number | null = null;
  let lastArgs: Args;

  return (...args: Args) => {
    lastArgs = args;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fn(...lastArgs);
    });
  };
}
