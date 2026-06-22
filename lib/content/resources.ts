import { seedResearch } from "@/lib/content/seed";
import {
  defaultPublicationCover,
  getPublicationMetadata,
  publicationAssets,
  resolvePublicationPdfUrl,
  type PublicationMetadata,
} from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Research } from "@/lib/types/research";

export type PublicationCard = {
  id: string;
  title: string;
  slug: string;
  year: string;
  coverImage: string;
  pdfUrl: string;
  locationLabel?: string;
  abstract: string | null;
  publishedDateIso: string | null;
  metadata: PublicationMetadata | null;
};

export type PublicationsPageData = {
  all: PublicationCard[];
  error: string | null;
};

function publicationYear(value: string | null) {
  if (!value) return new Date().getFullYear().toString();
  return new Date(value).getFullYear().toString();
}

function toPublicationCard(item: Research): PublicationCard | null {
  const pdfUrl = resolvePublicationPdfUrl(item.pdf_url);
  if (!pdfUrl) return null;

  const assets = publicationAssets[item.slug];

  const year = publicationYear(item.published_date);

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    year,
    coverImage: assets?.coverImage ?? defaultPublicationCover,
    pdfUrl,
    locationLabel: assets?.locationLabel,
    abstract: item.abstract,
    publishedDateIso: item.published_date,
    metadata: getPublicationMetadata(item.slug, year),
  };
}

export async function getPublicationsPageData(): Promise<PublicationsPageData> {
  if (!isSupabaseConfigured()) {
    const all = seedResearch
      .map(toPublicationCard)
      .filter((item): item is PublicationCard => item !== null);

    return {
      all,
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research")
    .select("id, title, slug, abstract, pdf_url, published_date")
    .order("published_date", { ascending: false });

  if (error) {
    return { all: [], error: error.message };
  }

  const all = (data ?? [])
    .map(toPublicationCard)
    .filter((item): item is PublicationCard => item !== null);

  return {
    all,
    error: null,
  };
}

export type PublicationDetail = PublicationCard;

export async function getPublicationBySlug(
  slug: string,
): Promise<PublicationDetail | null> {
  const { all } = await getPublicationsPageData();
  return all.find((item) => item.slug === slug) ?? null;
}
