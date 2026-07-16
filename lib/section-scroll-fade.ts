export const SECTION_BLACK_RGB = "10, 15, 10";
export const SEAM_BAND_HEIGHT_PX = 8;

export type SeamGradientDirection = "to-top" | "to-bottom";

/** Stepped seam: 2px 100%, 3px 70%, 2px 40%, 1px 10%, then transparent. */
export function buildSteppedSeamGradient(direction: SeamGradientDirection): string {
  const rgb = SECTION_BLACK_RGB;

  return `linear-gradient(${direction},
    rgba(${rgb}, 1) 0px,
    rgba(${rgb}, 1) 2px,
    rgba(${rgb}, 0.7) 2px,
    rgba(${rgb}, 0.7) 5px,
    rgba(${rgb}, 0.4) 5px,
    rgba(${rgb}, 0.4) 7px,
    rgba(${rgb}, 0.1) 7px,
    rgba(${rgb}, 0.1) 8px,
    transparent 8px
  )`;
}
