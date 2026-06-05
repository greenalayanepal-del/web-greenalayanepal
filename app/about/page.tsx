import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell
      title="About Greenalaya Nepal"
      description="Environmental research and development for conservation and community resilience."
    >
      <div className="mt-8 space-y-6 text-neutral-700 leading-relaxed">
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
          <h2 className="text-lg font-semibold text-emerald-900">Vision</h2>
          <p className="mt-2">
            A resilient Nepal where empowered communities conserve ecosystems
            and foster sustainable green innovative enterprises in balance with
            nature and technology.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-emerald-900">Mission</h2>
          <p className="mt-2">
            To generate credible environmental knowledge, advance
            community-centered conservation, and catalyze innovative eco-business
            solutions that protect biodiversity, strengthen local livelihoods,
            and influence sustainable development pathways in Nepal.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-emerald-900">
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
      </div>
    </PageShell>
  );
}
