import Image from "next/image";
import { siteConfig } from "@/lib/site";

type SiteLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Surface behind the logo — picks a matching backdrop when needed. */
  surface?: "header" | "footer" | "default";
};

const surfaceBackdrop: Record<NonNullable<SiteLogoProps["surface"]>, string> = {
  header: "bg-white",
  footer: "bg-emerald-50",
  default: "bg-transparent",
};

export function SiteLogo({
  className = "h-12 w-auto object-contain lg:h-14",
  width = 55,
  height = 55,
  priority = false,
  surface = "default",
}: SiteLogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg p-0.5 ${surfaceBackdrop[surface]}`}
    >
      <Image
        src="/logo.png"
        alt={siteConfig.name}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized
      />
    </span>
  );
}
