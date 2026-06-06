import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: string;
  backgroundImage: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
};

export function PageHero({
  title,
  description,
  backgroundImage,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <header
      className="relative flex min-h-[55vh] items-center justify-center bg-cover bg-center px-5 pt-24 text-center text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 100%), url('${backgroundImage}')`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative z-10 max-w-3xl animate-[fadeInUp_1s_ease]">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm backdrop-blur-md"
          >
            {breadcrumb.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                {index > 0 && <span className="opacity-80">›</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="opacity-90">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-4xl font-bold drop-shadow-lg sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">
          {description}
        </p>
        {children}
      </div>
    </header>
  );
}
