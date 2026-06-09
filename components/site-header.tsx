import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resources", label: "Resources" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <Image
            src="/logo.png"
            alt="Greenalaya Nepal"
            width={55}
            height={55}
            className="h-12 w-auto object-contain lg:h-14"
            priority
          />
          <span className="font-display text-xl font-bold tracking-tight text-[#2e7d32] lg:text-2xl">
            Greenalaya Nepal
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-800 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 transition hover:text-[#2e7d32] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#2e7d32] after:to-[#1b5e20] after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#get-involved"
            className="rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Involved
          </Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg px-2 py-2 text-2xl text-neutral-800 marker:content-none">
            <span aria-hidden>☰</span>
            <span className="sr-only">Open menu</span>
          </summary>
          <nav className="absolute right-0 top-full mt-2 min-w-56 rounded-xl border border-black/5 bg-white p-4 shadow-lg">
            <ul className="space-y-2 text-sm font-semibold text-neutral-800">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-2 hover:bg-emerald-50 hover:text-[#2e7d32]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#get-involved"
                  className="block rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-4 py-2 text-center text-white"
                >
                  Get Involved
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
