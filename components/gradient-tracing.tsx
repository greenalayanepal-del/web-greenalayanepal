"use client";

import { motion } from "framer-motion";
import { useId, type FC } from "react";

interface GradientTracingProps {
  width: number;
  height: number;
  baseColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
  path?: string;
}

export const GradientTracing: FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "#2e7d32",
  gradientColors = ["#2e7d32", "#4caf50", "#1b5e20"],
  animationDuration = 2,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
}) => {
  const gradientId = `pulse-${useId().replace(/:/g, "")}`;

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <path d={path} stroke={baseColor} strokeOpacity="0.2" strokeWidth={strokeWidth} />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <defs>
          <motion.linearGradient
            initial={{ x1: 0, x2: 0 }}
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};
