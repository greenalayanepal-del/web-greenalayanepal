import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PublicationDetailContent } from "@/components/publication-detail-content";
import { getLocalPdfSizeLabel } from "@/lib/content/pdf-size";
import { getPublicationBySlug } from "@/lib/content/resources";
import { articleJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { butterflyPublication } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    return pageMetadata({
      title: "Publication",
      description: "Publication from Greenalaya Nepal",
      path: `/publications/${slug}`,
    });
  }

  return pageMetadata({
    title: publication.title,
    description: publication.abstract ?? "Publication from Greenalaya Nepal",
    path: `/publications/${publication.slug}`,
  });
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const pdfSizeLabel = await getLocalPdfSizeLabel(publication.pdfUrl);
  const pageCount =
    publication.slug === butterflyPublication.slug
      ? butterflyPublication.pageCount
      : undefined;

  return (
    <div className={playfair.className}>
      <JsonLd
        data={articleJsonLd({
          title: publication.title,
          description: publication.abstract ?? "Publication from Greenalaya Nepal",
          path: `/publications/${publication.slug}`,
          datePublished: publication.publishedDateIso,
        })}
      />
      <PublicationDetailContent
        publication={publication}
        pdfSizeLabel={pdfSizeLabel}
        pageCount={pageCount}
      />
    </div>
  );
}
