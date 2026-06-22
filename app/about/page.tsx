import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/seo";
import { thematicAreas } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Greenalaya Nepal connects environmental research, technology, and community action for conservation across Nepal.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      title="About Greenalaya Nepal"
      description="Environmental research and development for conservation and community resilience."
    >
      <div className="mt-8 space-y-6 text-foreground leading-relaxed">
        <p>
          Greenalaya Nepal is a national environmental NGO that leverages
          research, technological innovation, and green enterprise to deliver
          data-driven solutions for resilient ecosystems through collaboration.
        </p>
        <p>
          We work at the intersection of nature and technology, empowering
          communities to conserve and restore ecosystems while fostering
          sustainable green innovative enterprises in balance with nature.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-secondary-foreground">Vision</h2>
          <p className="mt-2">
            A resilient Nepal where empowered communities conserve ecosystems
            and foster sustainable green innovative enterprises in balance with
            nature and technology.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-secondary-foreground">Mission</h2>
          <p className="mt-2">
            To generate credible environmental knowledge, advance
            community-centered conservation, and catalyze innovative eco-business
            solutions that protect biodiversity, strengthen local livelihoods,
            and influence sustainable development pathways in Nepal.
          </p>
        </div>

        <div id="strategic-pillars" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Strategic pillars
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>People — education, training, and participatory conservation</li>
            <li>Technology — AI, GIS, and data systems for environmental monitoring</li>
            <li>Research — credible science for evidence-based action</li>
            <li>Nature — protecting and restoring ecosystems and biodiversity</li>
            <li>Collaboration — partnerships for systemic change</li>
          </ul>
        </div>

        <div id="thematic-areas" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Thematic areas of focus
          </h2>
          <p className="mt-2">
            Seven key thematic areas drive our work across Nepal, from emerging
            research questions to policy and community stewardship.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            {thematicAreas.map((area) => (
              <li key={area.title}>
                <span className="font-medium text-secondary-foreground">{area.title}</span>
                {" — "}
                {area.description}
              </li>
            ))}
          </ol>
          <Link
            href="/projects"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Explore our work →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
