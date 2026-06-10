import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getSeedResearch } from "@/lib/content/seed";
import { articleJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { resolvePublicationPdfUrl } from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { JsonLd } from "@/components/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadResearchItem(slug: string) {
  let item = getSeedResearch(slug);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("research")
      .select("id, title, slug, abstract, pdf_url, published_date")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      item = data;
    }
  }

  return item;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await loadResearchItem(slug);

  if (!item) {
    return pageMetadata({
      title: "Research",
      description: "Research publication from Greenalaya Nepal",
      path: `/research/${slug}`,
    });
  }

  return pageMetadata({
    title: item.title,
    description: item.abstract ?? "Research publication from Greenalaya Nepal",
    path: `/research/${item.slug}`,
  });
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await loadResearchItem(slug);

  if (!item) {
    notFound();
  }

  const pdfUrl = resolvePublicationPdfUrl(item.pdf_url);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: item.title,
          description: item.abstract ?? "Research publication",
          path: `/research/${item.slug}`,
          datePublished: item.published_date,
        })}
      />
      <PageShell
        title={item.title}
        description={
          item.published_date
            ? `Published ${formatDate(item.published_date)}`
            : "Research publication"
        }
      >
        <p className="mt-6">
          <Link
            href="/research"
            className="text-sm text-emerald-700 hover:underline"
          >
            ← All research
          </Link>
        </p>

        {item.abstract ? (
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">
            {item.abstract}
          </p>
        ) : (
          <p className="mt-6 text-neutral-500">No abstract available.</p>
        )}

        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
          >
            Download PDF
          </a>
        ) : null}
      </PageShell>
    </>
  );
}
