"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ArrowUpRight,
  Equal,
  FilePlus2,
  LayoutTemplate,
  Moon,
  Palette,
  PenTool,
  Search,
  Sun,
} from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  mainNavItems,
  mobileNavGroups,
  siteConfig,
} from "@/lib/site";

function isNavItemActive(pathname: string, href: string) {
  return href === pathname || pathname.startsWith(`${href}/`);
}

function getActiveLabel(pathname: string) {
  if (pathname === "/") return "Home";
  const match = mainNavItems.find((item) => isNavItemActive(pathname, item.href));
  return match?.label ?? "Home";
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const activeLabel = getActiveLabel(pathname);

  const navItems = mainNavItems.map((item) => ({
    ...item,
    active: isNavItemActive(pathname, item.href),
  }));

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <SiteLogo surface="header" priority className="h-10 w-auto object-contain" />
            <span className="font-display text-xl font-semibold text-[#2e7d32] dark:text-primary">
              {siteConfig.name}
            </span>
          </Link>

          <HeaderSearch />

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button asChild className="hidden items-center gap-2 md:flex">
              <Link href="/#get-involved">
                <span>Get Involved</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Equal className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full overflow-y-auto sm:w-[400px]"
              >
                <div className="m-6 mt-14">
                  <Accordion type="single" collapsible className="mb-8">
                    <AccordionItem value="navigation" className="border-none">
                      <AccordionTrigger className="rounded-lg bg-accent px-4 hover:bg-accent/80 hover:no-underline">
                        <div className="text-left">
                          <div className="font-medium">{siteConfig.name}</div>
                          <div className="text-sm text-muted-foreground">
                            / {activeLabel}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="overflow-hidden rounded-lg border">
                          {navItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block border-b px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-accent ${
                                item.active ? "bg-accent font-medium" : ""
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="space-y-6">
                    {mobileNavGroups.map((group) => (
                      <div key={group.location}>
                        <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                          {group.location}
                        </p>
                        <ul className="space-y-2">
                          {group.venues.map((venue) => (
                            <li key={venue.href} className="border-t border-border">
                              <Link
                                href={venue.href}
                                className="block py-3 text-lg font-medium transition-colors hover:text-muted-foreground"
                                onClick={() => setMobileOpen(false)}
                              >
                                {venue.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className="hidden border-t lg:block" aria-label="Main">
          <ul className="-mx-2 flex items-center justify-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    item.active
                      ? "border-b-2 border-primary font-semibold"
                      : "hover:bg-primary/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function HeaderSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        className="hidden h-9 w-full max-w-lg rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 lg:inline-flex"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <Search
            className="-ms-1 me-3 text-muted-foreground/80"
            size={16}
            aria-hidden="true"
          />
          <span className="font-normal text-muted-foreground/70">
            Search Greenalaya...
          </span>
        </span>
        <kbd className="-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, resources, and more..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {mainNavItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => navigate(item.href)}
              >
                <ArrowUpRight className="opacity-60" size={16} aria-hidden="true" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
            <CommandItem onSelect={() => navigate("/#get-involved")}>
              <ArrowUpRight className="opacity-60" size={16} aria-hidden="true" />
              <span>Get Involved</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick links">
            <CommandItem onSelect={() => navigate("/resources")}>
              <FilePlus2 size={16} className="opacity-60" aria-hidden="true" />
              <span>Browse resources</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/news")}>
              <LayoutTemplate size={16} className="opacity-60" aria-hidden="true" />
              <span>Latest news</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/contact")}>
              <PenTool size={16} className="opacity-60" aria-hidden="true" />
              <span>Contact us</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <Palette size={16} className="opacity-60" aria-hidden="true" />
              <span>Light mode</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <Palette size={16} className="opacity-60" aria-hidden="true" />
              <span>Dark mode</span>
              <CommandShortcut>⌘⇧T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toggle
      className="group size-9 cursor-pointer bg-secondary data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted dark:bg-secondary"
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Moon
        size={16}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <Sun
        size={16}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}
