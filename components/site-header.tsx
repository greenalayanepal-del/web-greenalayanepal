import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-bold text-emerald-900">
          Greenalaya Nepal
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-neutral-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-emerald-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
