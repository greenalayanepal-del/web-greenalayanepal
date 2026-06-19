import type { ReactNode } from "react";

function SectionTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#2e7d32] shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-[#81c784] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function HomeSectionHeader({
  tag,
  title,
  description,
  tone = "light",
  outlinedTitle = false,
}: {
  tag?: ReactNode;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  outlinedTitle?: boolean;
}) {
  const isDark = tone === "dark";

  return (
    <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6 lg:mb-16">
      {tag ? <SectionTag>{tag}</SectionTag> : null}
      <h2
        className={
          outlinedTitle
            ? "font-display text-4xl font-bold tracking-tight text-[#4caf50] uppercase [-webkit-text-stroke:1px_#000] [paint-order:stroke_fill] md:text-5xl"
            : `font-display text-3xl font-bold sm:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-foreground"
              }`
        }
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            isDark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
