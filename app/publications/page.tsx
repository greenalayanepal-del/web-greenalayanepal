import { Playfair_Display } from "next/font/google";
import { DataError } from "@/components/data-status";
import { JsonLd } from "@/components/json-ld";
import { PublicationsPageContent } from "@/components/publications-page-content";
import { getPublicationsPageData } from "@/lib/content/resources";
import { publicationJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { butterflyPublication } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = pageMetadata({
  title: "Publications",
  description:
    "Browse research reports and open publications from Greenalaya Nepal.",
  path: "/publications",
});

export default async function PublicationsPage() {
  const { all, error } = await getPublicationsPageData();
  const primary = all[0];

  return (
    <div className={playfair.className}>
      {primary ? (
        <JsonLd
          data={publicationJsonLd({
            title: primary.title,
            description: primary.abstract ?? butterflyPublication.description,
            path: `/publications/${primary.slug}`,
            datePublished: primary.publishedDateIso,
            numberOfPages: butterflyPublication.pageCount,
          })}
        />
      ) : null}

      {error ? (
        <div className="px-5 pt-28">
          <div className="mx-auto max-w-6xl">
            <DataError message={error} />
          </div>
        </div>
      ) : null}

      <PublicationsPageContent publications={all} />
    </div>
  );
}
