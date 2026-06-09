import Link from "next/link";
import { DataError } from "@/components/data-status";
import { FeaturedResource } from "@/components/featured-resource";
import { JsonLd } from "@/components/json-ld";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PageHero } from "@/components/page-hero";
import { publicationJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import {
  butterflyPublication,
  resolvePublicationPdfUrl,
  siteConfig,
} from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Research } from "@/lib/types/research";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "Access research reports, toolkits, datasets, and multimedia resources to support evidence-based conservation and environmental action across Nepal.",
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
  const description = item?.abstract ?? butterflyPublication.description;
  const pdfUrl =
    resolvePublicationPdfUrl(item?.pdf_url) ?? butterflyPublication.pdfUrl;
  const published = formatDate(item?.published_date ?? null);

  return (
    <>
      <JsonLd data={publicationJsonLd()} />
      <PageHero
        title="Knowledge Hub & Resources"
        description="Access research reports, toolkits, datasets, and multimedia resources to support evidence-based conservation and environmental action across Nepal."
        backgroundImage={siteConfig.images.resourcesHeader}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <main className="px-5 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {error && <DataError message={error} />}

          <FeaturedResource
            title={title}
            description={description}
            published={published}
            pdfUrl={pdfUrl}
            coverImage={butterflyPublication.coverImage}
            pageCount={butterflyPublication.pageCount}
            researchSlug={slug}
          />

          <NewsletterCta />

          <p className="mt-12 text-center text-sm text-neutral-600">
            More publications and datasets will be added as they become available.
            For collaboration or resource submissions, please{" "}
            <Link href="/contact" className="font-semibold text-[#2e7d32] hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
