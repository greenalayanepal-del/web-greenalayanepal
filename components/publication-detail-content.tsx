"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PdfPreviewModal } from "@/components/pdf-preview-modal";
import { PublicationMetadataSection } from "@/components/publication-metadata";
import type { PublicationDetail } from "@/lib/content/resources";

type PublicationDetailContentProps = {
  publication: PublicationDetail;
  pdfSizeLabel: string | null;
  pageCount?: number;
};

function formatPostedDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `Posted on ${month}, ${year}`;
}

export function PublicationDetailContent({
  publication,
  pdfSizeLabel,
  pageCount,
}: PublicationDetailContentProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const postedOn = formatPostedDate(publication.publishedDateIso);

  return (
    <>
      <main className="bg-background px-5 pt-28 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/publications" className="text-primary hover:underline">
                  Publications
                </Link>
              </li>
            </ol>
          </nav>

          <header className="mt-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {publication.title}
            </h1>
            {postedOn ? (
              <p className="mt-4 text-base italic text-muted-foreground">{postedOn}</p>
            ) : null}
          </header>

          {publication.abstract ? (
            <p className="mt-8 text-base leading-relaxed text-foreground sm:text-lg">
              {publication.abstract}
            </p>
          ) : null}

          <div className="mt-10">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={publication.coverImage}
                alt={publication.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>

          {publication.metadata ? (
            <PublicationMetadataSection metadata={publication.metadata} />
          ) : null}

          <section aria-labelledby="publication-download-heading" className="mt-12">
            <h2
              id="publication-download-heading"
              className="text-xl font-bold text-foreground"
            >
              Download
            </h2>
            {pdfSizeLabel ? (
              <p className="mt-2 text-sm text-muted-foreground">{pdfSizeLabel}</p>
            ) : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={publication.pdfUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-6 py-3.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
              >
                Preview
              </button>
            </div>
          </section>
        </article>
      </main>

      <PdfPreviewModal
        title={publication.title}
        pdfUrl={publication.pdfUrl}
        pageCount={pageCount}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
