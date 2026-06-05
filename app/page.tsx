import Link from "next/link";
import { thematicAreas } from "@/lib/site";

const exploreSections = [
  {
    href: "/projects",
    title: "Our Work",
    description: "Seven thematic focus areas guiding conservation and innovation.",
  },
  {
    href: "/research",
    title: "Research",
    description: "Reports, studies, and publication highlights.",
  },
  {
    href: "/resources",
    title: "Resources",
    description: "Downloadable publications, toolkits, and reference materials.",
  },
  {
    href: "/contact",
    title: "Get Involved",
    description: "Volunteer, partner, or collaborate with our team.",
  },
];

const pillars = [
  {
    title: "People",
    description:
      "Empowering communities through education, training, and participatory conservation.",
  },
  {
    title: "Technology",
    description:
      "Leveraging AI, GIS, and data systems for smart environmental monitoring.",
  },
  {
    title: "Research",
    description:
      "Conducting credible environmental research to inform evidence-based action.",
  },
  {
    title: "Nature",
    description:
      "Protecting and restoring ecosystems, biodiversity, and natural resources.",
  },
  {
    title: "Collaboration",
    description:
      "Partnering with communities, organizations, and government for systemic change.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-2xl bg-emerald-900 px-8 py-10 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
          Research &amp; Innovation for Nature
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Building a Resilient Nepal Through Data-Driven Conservation
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-emerald-50">
          Greenalaya Nepal leverages research, technological innovation, and green
          enterprise to deliver data-driven solutions for resilient ecosystems
          through collaboration.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
          >
            Explore our work
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Get involved
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-emerald-900">
          Strategic pillars
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <h3 className="font-semibold text-emerald-900">{pillar.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-emerald-900">
          Thematic areas of focus
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          Seven key thematic areas drive our work, addressing emerging
          environmental challenges through innovation, research, and community
          engagement.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {thematicAreas.map((area, index) => (
            <li
              key={area.title}
              className="rounded-lg border border-neutral-200 bg-white p-4"
            >
              <span className="text-xs font-bold text-emerald-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-semibold text-emerald-900">
                {area.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">{area.description}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/projects"
          className="mt-4 inline-block text-sm font-medium text-emerald-800 hover:underline"
        >
          View all focus areas →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-emerald-900">Explore</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {exploreSections.map((section) => (
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
