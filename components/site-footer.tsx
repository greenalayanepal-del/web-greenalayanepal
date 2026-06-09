import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import type { SVGProps } from "react";
import { SocialLinks } from "@/components/social-links";
import {
  footerAboutLinks,
  footerHelpfulLinks,
  footerWorkLinks,
  siteConfig,
  siteContact,
} from "@/lib/site";

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: IconMail,
    text: siteContact.email,
    href: `mailto:${siteContact.email}`,
  },
  {
    icon: IconPhone,
    text: siteContact.phone,
    href: `tel:${siteContact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: IconMapPin,
    text: siteContact.location,
    isAddress: true as const,
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 w-full place-self-end rounded-t-xl bg-emerald-50">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center gap-2 sm:justify-start">
              <SiteLogo
                surface="footer"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-2xl font-semibold text-[#2e7d32]">
                {siteConfig.name}
              </span>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-neutral-600 sm:max-w-xs sm:text-left">
              {siteConfig.description}
            </p>

            <SocialLinks className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-emerald-950">About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerAboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-neutral-600 transition hover:text-[#2e7d32]"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-emerald-950">Our Work</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerWorkLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-neutral-600 transition hover:text-[#2e7d32]"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-emerald-950">
                Helpful Links
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerHelpfulLinks.map((link) => {
                  const hasIndicator = "hasIndicator" in link && link.hasIndicator;
                  return (
                    <li key={link.text}>
                      <Link
                        href={link.href}
                        className={
                          hasIndicator
                            ? "group flex items-center justify-center gap-1.5 sm:justify-start"
                            : "text-neutral-600 transition hover:text-[#2e7d32]"
                        }
                      >
                        <span
                          className={
                            hasIndicator
                              ? "text-neutral-600 transition group-hover:text-[#2e7d32]"
                              : undefined
                          }
                        >
                          {link.text}
                        </span>
                        {hasIndicator && (
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2e7d32] opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-[#2e7d32]" />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-emerald-950">Contact Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  if ("href" in item && item.href) {
                    return (
                      <li key={item.text}>
                        <a
                          href={item.href}
                          className="flex items-center justify-center gap-1.5 sm:justify-start"
                        >
                          <Icon className="size-5 shrink-0 text-[#2e7d32]" />
                          <span className="flex-1 text-neutral-600 transition hover:text-[#2e7d32]">
                            {item.text}
                          </span>
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={item.text}>
                      <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                        <Icon className="size-5 shrink-0 text-[#2e7d32]" />
                        <address className="-mt-0.5 flex-1 not-italic text-neutral-600">
                          {item.text}
                        </address>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-200 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-neutral-600">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="mt-4 text-sm text-neutral-500 transition sm:order-first sm:mt-0">
              &copy; {year} {siteConfig.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
