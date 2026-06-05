import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { butterflyPublication } from "@/lib/site";

export default function ResourcesPage() {
  return (
    <PageShell
      title="Resources"
      description="Knowledge hub — research reports, toolkits, and reference materials for evidence-based conservation in Nepal."
    >
      <div className="mt-8">
        <article className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            Featured publication
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-emerald-900">
            {butterflyPublication.title}
          </h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            {butterflyPublication.abstract}
          </p>
          <dl className="mt-4 flex flex-wrap gap-6 text-sm text-neutral-600">
            <div>
              <dt className="font-semibold text-neutral-800">Published</dt>
              <dd>{butterflyPublication.publishedDate}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-800">Format</dt>
              <dd>PDF</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-800">Species</dt>
              <dd>174 documented</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={butterflyPublication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
            >
              Download PDF
            </a>
            <Link
              href={`/research/${butterflyPublication.slug}`}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:border-emerald-300"
            >
              View in Research
            </Link>
          </div>
        </article>

        <p className="mt-8 text-sm text-neutral-600">
          More publications and datasets will be added as they become available.
          For collaboration or resource submissions, please{" "}
          <Link href="/contact" className="text-emerald-800 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
