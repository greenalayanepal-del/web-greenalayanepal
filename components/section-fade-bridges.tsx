"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import {
  buildSteppedSeamGradient,
  SEAM_BAND_HEIGHT_PX,
} from "@/lib/section-scroll-fade";

type SectionFadeBridgesProps = {
  targetRef: RefObject<HTMLElement | null>;
  showTop?: boolean;
  showBottom?: boolean;
};

function seamBridgeStyle(position: "top" | "bottom", gradient: string): CSSProperties {
  return {
    height: SEAM_BAND_HEIGHT_PX,
    top: position === "top" ? 0 : undefined,
    bottom: position === "bottom" ? 0 : undefined,
    backgroundImage: gradient,
  };
}

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function StaticSeamBridge({ position }: { position: "top" | "bottom" }) {
  const gradient = buildSteppedSeamGradient(position === "top" ? "to-bottom" : "to-top");

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-[15]"
      style={{ ...seamBridgeStyle(position, gradient), opacity: 1 }}
    />
  );
}

function ScrollSeamBridge({
  targetRef,
  position,
}: {
  targetRef: RefObject<HTMLElement | null>;
  position: "top" | "bottom";
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset:
      position === "top"
        ? ["start end", "start center"]
        : ["end center", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    position === "top" ? [1, 0] : [0, 1],
  );

  const gradient = buildSteppedSeamGradient(position === "top" ? "to-bottom" : "to-top");

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-[15]"
      style={{
        ...seamBridgeStyle(position, gradient),
        opacity,
      }}
    />
  );
}

export function SectionFadeBridges({
  targetRef,
  showTop = true,
  showBottom = true,
}: SectionFadeBridgesProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <>
      {showTop &&
        (reducedMotion ? (
          <StaticSeamBridge position="top" />
        ) : (
          <ScrollSeamBridge targetRef={targetRef} position="top" />
        ))}
      {showBottom &&
        (reducedMotion ? (
          <StaticSeamBridge position="bottom" />
        ) : (
          <ScrollSeamBridge targetRef={targetRef} position="bottom" />
        ))}
    </>
  );
}
