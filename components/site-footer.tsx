import Image from "next/image";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { siteConfig, siteContact } from "@/lib/site";

function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

type SocialLink = {
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  label: string;
  href: string;
};

const aboutLinks = [
  { text: "About Greenalaya", href: "/about" },
  { text: "Meet the Team", href: "/team" },
  { text: "Strategic Pillars", href: "/about" },
  { text: "Thematic Areas", href: "/about" },
];

const workLinks = [
  { text: "Projects", href: "/projects" },
  { text: "Research", href: "/research" },
  { text: "Resources", href: "/resources" },
  { text: "News & Updates", href: "/news" },
];

const helpfulLinks = [
  { text: "Contact Us", href: "/contact" },
  { text: "Get Involved", href: "/#get-involved" },
  { text: "Browse Resources", href: "/resources" },
  { text: "Send a Message", href: "/contact", hasIndicator: true },
];

const socialLinks: SocialLink[] = [
  { icon: IconFacebook, label: "Facebook", href: siteConfig.social.facebook },
  { icon: IconInstagram, label: "Instagram", href: siteConfig.social.instagram },
  { icon: IconLinkedin, label: "LinkedIn", href: siteConfig.social.linkedin },
];

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
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center gap-2 sm:justify-start">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-contain"
                unoptimized
              />
              <span className="font-display text-2xl font-semibold text-[#2e7d32]">
                {siteConfig.name}
              </span>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-neutral-600 sm:max-w-xs sm:text-left">
              {siteConfig.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2e7d32] transition hover:text-[#1b5e20]"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-emerald-950">About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
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
                {workLinks.map(({ text, href }) => (
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
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <Link
                      href={href}
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
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2e7d32] opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-[#2e7d32]" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
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
