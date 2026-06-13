"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteLogo } from "@/components/site-logo";
import { SocialLinks } from "@/components/social-links";
import {
  footerAboutLinks,
  footerMediaLinks,
  footerWorkLinks,
  siteConfig,
  siteContact,
} from "@/lib/site";

const footerColumnLinkClass =
  "text-black leading-none transition hover:opacity-70 dark:text-white";

const footerBodyTextClass = "text-black dark:text-white";

const contactInfo = [
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

function FooterContactList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {contactInfo.map((item) => {
        const Icon = item.icon;
        if ("href" in item && item.href) {
          return (
            <li key={item.text}>
              <a
                href={item.href}
                className="flex items-center justify-center gap-1.5 sm:justify-start"
              >
                <Icon className="size-4 shrink-0 text-primary" />
                <span
                  className={`transition hover:opacity-70 ${footerBodyTextClass}`}
                >
                  {item.text}
                </span>
              </a>
            </li>
          );
        }
        return (
          <li key={item.text}>
            <div className="flex items-center justify-center gap-1.5 sm:justify-start">
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

export function SiteFooter() {
  const year = new Date().getFullYear();
  const isHome = usePathname() === "/";
  const mainPadding = isHome
    ? "-mt-[6px] px-4 pt-0 pb-6 sm:px-6 lg:mt-0 lg:px-8 lg:pt-[26px]"
    : "px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24";

  return (
    <footer className="w-full place-self-end bg-secondary dark:bg-[#0a0f0a]">
      <div className={`mx-auto max-w-screen-xl ${mainPadding}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="-ml-[20px] -mt-[15px]">
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

          <div className="-ml-[20px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            <div className="text-center sm:text-left">
              <p className="text-[20px] font-medium text-black dark:text-white">
                About
              </p>
              <ul className="mt-8 space-y-[11px] text-[16px] leading-none">
                {footerAboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerColumnLinkClass}>
                      {"lines" in link ? (
                        <>
                          {link.lines.map((line, index) => (
                            <span
                              key={line}
                              className={
                                index === 0 ? "block" : "mt-[11px] block"
                              }
                            >
                              {line}
                            </span>
                          ))}
                        </>
                      ) : (
                        link.text
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[20px] font-medium text-black dark:text-white">
                Our Work
              </p>
              <ul className="mt-8 space-y-[11px] text-[16px]">
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
              <p className="text-[20px] font-medium text-black dark:text-white">
                Media
              </p>
              <ul className="mt-8 space-y-[11px] text-[16px]">
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
              <p className="text-[20px] font-medium text-black dark:text-white">
                Contact
              </p>
              <FooterContactList className="mt-8 space-y-[11px] text-[16px]" />
            </div>
          </div>
        </div>

        <div className="-ml-[20px] mt-[38px] border-t border-black/10 pt-[4px] dark:border-white/10">
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
