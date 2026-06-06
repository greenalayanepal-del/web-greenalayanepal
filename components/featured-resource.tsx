"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PdfPreviewModal } from "@/components/pdf-preview-modal";

export type FeaturedResourceProps = {
  title: string;
  description: string;
  published: string;
  pdfUrl: string;
  coverImage: string;
  pageCount?: number;
  researchSlug?: string;
};

export function FeaturedResource({
  title,
  description,
  published,
  pdfUrl,
  coverImage,
  pageCount,
  researchSlug,
}: FeaturedResourceProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <article className="mb-16 grid items-center gap-10 rounded-3xl border-2 border-[#4caf50] bg-gradient-to-br from-emerald-50 to-white p-8 shadow-md sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="flex flex-col">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white">
            Featured Publication
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-6 text-sm text-neutral-800">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Published</dt>
              <dd>{published}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Format</dt>
              <dd>PDF</dd>
            </div>
            {pageCount ? (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Pages</dt>
                <dd>{pageCount} pages</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Download PDF
            </a>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 px-6 py-3.5 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-sm"
            >
              Preview
            </button>
            {researchSlug ? (
              <Link
                href={`/research/${researchSlug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition hover:border-emerald-300"
              >
                View in Research
              </Link>
            ) : null}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={coverImage}
            alt={`${title} cover`}
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      </article>

      <PdfPreviewModal
        title={title}
        pdfUrl={pdfUrl}
        pageCount={pageCount}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
