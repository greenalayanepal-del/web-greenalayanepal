import Link from "next/link";
import { siteConfig, siteContact, thematicAreas } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-semibold">Greenalaya Nepal</p>
          <p className="mt-2 text-sm text-emerald-100">
            Research &amp; Innovation for Nature. Building a resilient Nepal
            through data-driven conservation and green enterprise.
          </p>
        </div>
        <div>
          <p className="font-semibold">Quick links</p>
          <ul className="mt-2 space-y-1 text-sm text-emerald-100">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/research" className="hover:text-white">
                Research
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white">
                Team
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-emerald-100">
            <li>
              <a
                href={`mailto:${siteContact.email}`}
                className="hover:text-white"
              >
                {siteContact.email}
              </a>
            </li>
            <li>{siteContact.location}</li>
            <li>
              <a
                href={`tel:${siteContact.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-white"
              >
                {siteContact.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.linkedin}
                className="hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            Thematic areas
          </p>
          <ul className="mt-2 space-y-1 text-xs text-emerald-200">
            {thematicAreas.slice(0, 4).map((area) => (
              <li key={area.title}>{area.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-900 px-6 py-4 text-center text-xs text-emerald-200">
        © {new Date().getFullYear()} Greenalaya Nepal. All rights reserved.
      </div>
    </footer>
  );
}
