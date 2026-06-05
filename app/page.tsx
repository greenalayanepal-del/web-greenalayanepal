import Link from "next/link";

const sections = [
  {
    href: "/projects",
    title: "Projects",
    description: "Conservation and field initiatives across Nepal.",
  },
  {
    href: "/research",
    title: "Research",
    description: "Reports, studies, and publication highlights.",
  },
  {
    href: "/team",
    title: "Team",
    description: "Meet the people behind our research and programs.",
  },
  {
    href: "/news",
    title: "News",
    description: "Events, announcements, and community updates.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-2xl bg-emerald-900 px-8 py-10 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Greenalaya Nepal</h1>
        <p className="mt-3 max-w-2xl text-lg text-emerald-50">
          Environmental research, conservation, and sustainable development for
          communities and ecosystems in Nepal.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
          >
            About us
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-emerald-900">Explore</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
            >
              <h3 className="font-semibold text-emerald-900">{section.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
