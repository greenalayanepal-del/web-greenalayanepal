"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteLogo } from "@/components/site-logo";
import { mainNavItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const primaryNavItems = mainNavItems.slice(0, 5);

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return href === pathname || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaHref = pathname === "/" ? "#get-involved" : "/#get-involved";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-[100] flex items-center justify-between border-b border-[#2e7d32]/20 bg-[#0a0f0a]/90 px-5 py-4 backdrop-blur-xl transition-all duration-300 md:px-10",
        scrolled && "bg-[#0a0f0a]/95 py-3.5",
      )}
    >
      <Link href="/" className="flex items-center gap-2 no-underline">
        <SiteLogo surface="default" priority className="h-10 w-auto object-contain" />
        <span className="font-display text-xl font-semibold text-[#2e7d32]">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {primaryNavItems.map((item) => {
          const active = isNavItemActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm no-underline transition-colors",
                active
                  ? "bg-[#4caf50]/20 font-medium text-white"
                  : "text-white/80 hover:bg-[#4caf50]/15 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <ModeToggle className="border border-white/15 bg-white/10 text-white hover:bg-white/15 data-[state=on]:bg-white/15 data-[state=on]:hover:bg-white/20" />
        <Link
          href={ctaHref}
          className="rounded-full bg-gradient-to-br from-[#4caf50] to-[#2e7d32] px-6 py-2.5 text-sm font-medium text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(76,175,80,0.4)]"
        >
          Get Involved
        </Link>
      </div>
    </header>
  );
}
