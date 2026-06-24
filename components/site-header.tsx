"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SiteLogo } from "@/components/site-logo";
import { primaryNavItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const MOBILE_MENU_ID = "mobile-primary-nav";

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return href === pathname || pathname.startsWith(`${href}/`);
}

const navLinkClass = (active: boolean) =>
  cn(
    "rounded-full px-4 py-2 text-sm no-underline transition-colors",
    active
      ? "bg-[#4caf50]/20 font-medium text-white"
      : "text-white/80 hover:bg-[#4caf50]/15 hover:text-white",
  );

const mobileNavLinkClass = (active: boolean) =>
  cn(
    "flex min-h-11 items-center rounded-lg px-4 py-3 text-base font-medium no-underline transition-colors",
    active
      ? "bg-[#4caf50]/20 text-white"
      : "text-white/85 hover:bg-[#4caf50]/15 hover:text-white",
  );

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  const ctaHref = pathname === "/" ? "#get-involved" : "/#get-involved";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] flex items-center justify-between border-b border-[#2e7d32]/20 bg-[#0a0f0a]/90 px-4 py-4 backdrop-blur-xl transition-all duration-300 sm:px-5 md:px-10",
          scrolled && "bg-[#0a0f0a]/95 py-3.5",
        )}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 no-underline">
          <SiteLogo surface="default" priority className="h-10 w-auto shrink-0 object-contain" />
          <span className="min-w-0 translate-y-1 truncate font-display text-lg font-semibold text-[#2e7d32] sm:text-xl">
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
                className={navLinkClass(active)}
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
            className="hidden rounded-full bg-gradient-to-br from-[#4caf50] to-[#2e7d32] px-4 py-2 text-xs font-medium text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(76,175,80,0.4)] sm:inline-flex sm:min-h-11 sm:items-center sm:px-6 sm:py-2.5 sm:text-sm"
          >
            Get Involved
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15 md:hidden"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[110] md:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            ref={panelRef}
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-[#2e7d32]/25 bg-[#0a0f0a] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p id={titleId} className="font-display text-lg font-semibold text-[#2e7d32]">
                Menu
              </p>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4" aria-label="Primary mobile">
              {primaryNavItems.map((item) => {
                const active = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={mobileNavLinkClass(active)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-white/10 p-4">
              <Link
                href={ctaHref}
                className="flex min-h-11 items-center justify-center rounded-full bg-gradient-to-br from-[#4caf50] to-[#2e7d32] px-6 py-3 text-sm font-medium text-white no-underline transition-all hover:shadow-[0_8px_24px_rgba(76,175,80,0.4)]"
                onClick={closeMenu}
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
