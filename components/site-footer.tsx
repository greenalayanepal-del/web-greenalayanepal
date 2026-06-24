"use client";

import { ChevronDown, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState, type ReactNode } from "react";
import { SiteLogo } from "@/components/site-logo";
import { SocialLinks } from "@/components/social-links";
import {
  footerAboutLinks,
  footerMediaLinks,
  footerWorkLinks,
  siteConfig,
  siteContact,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const footerColumnTitleClass =
  "mb-8 text-[20px] font-medium leading-tight text-black dark:text-white";

const footerColumnListClass = "space-y-[11px] text-[16px] leading-snug";

const footerColumnLinkClass =
  "text-black leading-none transition hover:opacity-70 dark:text-white";

const footerBodyTextClass = "text-black dark:text-white";

const contactInfo = [
  {
    icon: MessageSquare,
    text: "Contact us",
    href: "/contact",
  },
  {
    icon: Mail,
    text: siteContact.email,
    href: `mailto:${siteContact.email}`,
  },
  {
    icon: Phone,
    text: siteContact.phone,
    href: `tel:${siteContact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MapPin,
    text: siteContact.location,
    isAddress: true as const,
  },
];

function FooterContactList({
  className,
  align = "responsive",
}: {
  className?: string;
  align?: "responsive" | "start";
}) {
  const itemAlign =
    align === "start" ? "justify-start" : "justify-center sm:justify-start";

  return (
    <ul className={className}>
      {contactInfo.map((item) => {
        const Icon = item.icon;
        if ("href" in item && item.href) {
          const content = (
            <>
              <Icon className="size-4 shrink-0 text-primary" />
              <span
                className={`transition hover:opacity-70 ${footerBodyTextClass}`}
              >
                {item.text}
              </span>
            </>
          );

          return (
            <li key={item.text}>
              {item.href.startsWith("/") ? (
                <Link href={item.href} className={`flex items-center gap-1.5 ${itemAlign}`}>
                  {content}
                </Link>
              ) : (
                <a href={item.href} className={`flex items-center gap-1.5 ${itemAlign}`}>
                  {content}
                </a>
              )}
            </li>
          );
        }
        return (
          <li key={item.text}>
            <div className={`flex items-center gap-1.5 ${itemAlign}`}>
              <Icon className="size-4 shrink-0 text-primary" />
              <address className={`not-italic ${footerBodyTextClass}`}>
                {item.text}
              </address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function FooterAboutLinks() {
  return (
    <>
      {footerAboutLinks.map((link) => (
        <li key={link.text}>
          <Link href={link.href} className={footerColumnLinkClass}>
            {link.text}
          </Link>
        </li>
      ))}
    </>
  );
}

function FooterAccordionSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-lg font-semibold text-black dark:text-white">{title}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 shrink-0 text-black/70 transition-transform duration-200 dark:text-white/70",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div id={panelId} className="pb-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MobileFooterNav() {
  return (
    <nav className="lg:hidden" aria-label="Footer">
      <FooterAccordionSection title="About">
        <ul className="space-y-3 text-[16px] leading-snug">
          <FooterAboutLinks />
        </ul>
      </FooterAccordionSection>

      <FooterAccordionSection title="Our Work">
        <ul className="space-y-3 text-[16px]">
          {footerWorkLinks.map(({ text, href }) => (
            <li key={text}>
              <Link href={href} className={footerColumnLinkClass}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </FooterAccordionSection>

      <FooterAccordionSection title="Media">
        <ul className="space-y-3 text-[16px]">
          {footerMediaLinks.map(({ text, href }) => (
            <li key={text}>
              <Link href={href} className={footerColumnLinkClass}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </FooterAccordionSection>

      <FooterAccordionSection title="Contact">
        <FooterContactList align="start" className="space-y-3 text-[16px]" />
      </FooterAccordionSection>
    </nav>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const isHome = usePathname() === "/";
  const mainPadding = isHome
    ? "-mt-[6px] px-4 pt-0 pb-6 sm:px-6 lg:mt-0 lg:px-8 lg:pt-[26px]"
    : "px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24";

  return (
    <footer className="w-full place-self-end bg-secondary dark:bg-[#0E110F]">
      <div className={`mx-auto max-w-screen-xl ${mainPadding}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="-mt-[15px]">
            <Link
              href="/"
              className="-translate-y-[3px] mt-[6px] flex items-center justify-center gap-2 no-underline sm:justify-start"
            >
              <SiteLogo
                surface="default"
                className="-translate-y-[10px] h-[45px] w-auto object-contain sm:h-[49px]"
              />
              <span className="font-display text-[26px] font-semibold text-[#2e7d32]">
                {siteConfig.name}
              </span>
            </Link>

            <div className="-translate-y-[10px]">
              <p
                className={`mt-[19px] max-w-md text-center text-[16px] leading-relaxed sm:max-w-xs sm:text-left ${footerBodyTextClass}`}
              >
                {siteConfig.description}
              </p>

              <SocialLinks
                className="mt-[19px] flex justify-center gap-6 sm:justify-start md:gap-8"
                iconClassName="size-6 text-primary transition hover:text-primary/80"
              />
            </div>
          </div>

          <div className="hidden grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-8 lg:gap-y-0">
            <div className="text-center sm:text-left">
              <p className={footerColumnTitleClass}>About</p>
              <ul className={footerColumnListClass}>
                <FooterAboutLinks />
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className={footerColumnTitleClass}>Our Work</p>
              <ul className={footerColumnListClass}>
                {footerWorkLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link href={href} className={footerColumnLinkClass}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className={footerColumnTitleClass}>Media</p>
              <ul className={footerColumnListClass}>
                {footerMediaLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link href={href} className={footerColumnLinkClass}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className={footerColumnTitleClass}>Contact</p>
              <FooterContactList className={footerColumnListClass} />
            </div>
          </div>
        </div>

        <MobileFooterNav />
      </div>

      <div className="border-t border-black/10 dark:border-white/10 dark:bg-[#050706]">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 text-center lg:grid-cols-3 lg:gap-8 lg:text-left">
            <p className={`text-[16px] lg:col-span-1 ${footerBodyTextClass}`}>
              &copy; {year} {siteConfig.name}
            </p>

            <p
              className={`text-[16px] lg:col-span-2 lg:text-right ${footerBodyTextClass}`}
            >
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
