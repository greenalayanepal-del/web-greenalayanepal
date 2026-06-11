'use client';

import { useEffect, type CSSProperties, type ReactNode } from 'react';

export type GlowCardColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowCardColor;
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  /** Glass fill opacity (0–1). Default 0.12 */
  backdropOpacity?: number;
  /** Glass panel tint behind the glow. Default grey */
  glassTone?: 'grey' | 'black';
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

let glowPointerSubscribers = 0;

function syncGlowPointer(e: PointerEvent) {
  const { clientX: x, clientY: y } = e;
  const xp = (x / window.innerWidth).toFixed(2);
  const yp = (y / window.innerHeight).toFixed(2);
  const xStr = x.toFixed(2);
  const yStr = y.toFixed(2);

  document.querySelectorAll<HTMLElement>('[data-glow-root]').forEach((el) => {
    el.style.setProperty('--x', xStr);
    el.style.setProperty('--xp', xp);
    el.style.setProperty('--y', yStr);
    el.style.setProperty('--yp', yp);
  });
}

function subscribeGlowPointer() {
  if (glowPointerSubscribers === 0) {
    document.addEventListener('pointermove', syncGlowPointer);
  }
  glowPointerSubscribers += 1;
}

function unsubscribeGlowPointer() {
  glowPointerSubscribers -= 1;
  if (glowPointerSubscribers === 0) {
    document.removeEventListener('pointermove', syncGlowPointer);
  }
}

function GlowCard({
  children,
  className = '',
  glowColor = 'green',
  size = 'md',
  width,
  height,
  customSize = false,
  backdropOpacity = 0.12,
  glassTone = 'grey',
}: GlowCardProps) {
  useEffect(() => {
    subscribeGlowPointer();
    return unsubscribeGlowPointer;
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) {
      return '';
    }
    return sizeMap[size];
  };

  const getInlineStyles = (): CSSProperties & Record<string, string | number> => {
    const glassLightness = glassTone === 'black' ? 0 : 60;
    const baseStyles: CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '3',
      '--backdrop': `hsl(0 0% ${glassLightness}% / ${backdropOpacity})`,
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <div
      data-glow
      data-glow-root
      style={getInlineStyles()}
      className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl
          relative
          shadow-[0_1rem_2rem_-1rem_black]
          p-4
          backdrop-blur-[5px]
          ${className}
        `}
    >
      <div data-glow aria-hidden />
      {children}
    </div>
  );
}

export { GlowCard };
