import Link from "next/link";
import { DataError } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/seo";
import { butterflyPublication, resolvePublicationPdfUrl } from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Research } from "@/lib/types/research";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "Free publications and reference materials from Greenalaya Nepal, including the Kathmandu Valley butterfly guide.",
  path: "/resources",
});

async function getFeaturedResearch(): Promise<{
  item: Research | null;
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return { item: null, error: null };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research")
    .select("id, title, slug, abstract, pdf_url, published_date")
    .eq("slug", butterflyPublication.slug)
    .maybeSingle();

  if (error) {
    return { item: null, error: error.message };
  }

  return { item: data, error: null };
}

function formatDate(value: string | null) {
  if (!value) return butterflyPublication.publishedDate;
  return new Date(value).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "long",
  });
}

export default async function ResourcesPage() {
  const { item, error } = await getFeaturedResearch();

  const title = item?.title ?? butterflyPublication.title;
  const slug = item?.slug ?? butterflyPublication.slug;
  const abstract = item?.abstract ?? butterflyPublication.abstract;
  const pdfUrl =
    resolvePublicationPdfUrl(item?.pdf_url) ?? butterflyPublication.pdfUrl;
  const published = formatDate(item?.published_date ?? null);

  return (
    <PageShell
      title="Resources"
      description="Knowledge hub — research reports, toolkits, and reference materials for evidence-based conservation in Nepal."
    >
      <div className="mt-8">
        {error && <DataError message={error} />}

        <article className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            Featured publication
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-emerald-900">
            {title}
          </h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">{abstract}</p>
          <dl className="mt-4 flex flex-wrap gap-6 text-sm text-neutral-600">
            <div>
              <dt className="font-semibold text-neutral-800">Published</dt>
              <dd>{published}</dd>
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
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
            >
              Download PDF
            </a>
            <Link
              href={`/research/${slug}`}
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
