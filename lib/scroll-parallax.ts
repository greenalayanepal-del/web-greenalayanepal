const PARALLAX_BASE_SCALE = 1.15;
const PARALLAX_SCROLL_RANGE = 900;
const PARALLAX_MAX_SCALE_ADD = 0.28;
const PARALLAX_Y_FACTOR = 0.18;

/** Same scroll-driven scale + vertical drift used by the homepage hero background. */
export function computeParallaxTransform(
  scrollY: number,
  viewportScale = 1,
): string {
  const scrollZoom =
    PARALLAX_BASE_SCALE + Math.min(scrollY / PARALLAX_SCROLL_RANGE, PARALLAX_MAX_SCALE_ADD);
  const pinchZoom = 1 + (viewportScale - 1) * 0.65;
  const scale = scrollZoom * pinchZoom;
  const y = scrollY * PARALLAX_Y_FACTOR;

  return `scale(${scale.toFixed(4)}) translate3d(0, ${(-y).toFixed(2)}px, 0)`;
}

export const PARALLAX_INITIAL_TRANSFORM = "scale(1.15) translate3d(0, 0, 0)";
