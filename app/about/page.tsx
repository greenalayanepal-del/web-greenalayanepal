import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell
      title="About Greenalaya Nepal"
      description="Environmental research and development for conservation and community resilience."
    >
      <div className="mt-8 space-y-4 text-neutral-700 leading-relaxed">
        <p>
          Greenalaya Nepal is an environmental research and development
          organization focused on biodiversity conservation, wetland protection,
          and sustainable community development across Nepal.
        </p>
        <p>
          We combine field research, local partnerships, and evidence-based
          policy support to address climate change and ecosystem degradation.
        </p>
        <p>
          This page will be expanded with your full organizational history,
          mission, and programs as content is migrated from the previous site.
        </p>
      </div>
    </PageShell>
  );
}
