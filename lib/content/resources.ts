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



function seedPublicationCards(): PublicationCard[] {

  return seedResearch

    .map(toPublicationCard)

    .filter((item): item is PublicationCard => item !== null);

}



export function researchHasPublication(item: Research): boolean {

  return resolvePublicationPdfUrl(item.pdf_url) !== null;

}



export async function getPublicationsPageData(): Promise<PublicationsPageData> {

  if (!isSupabaseConfigured()) {

    return {

      all: seedPublicationCards(),

      error: null,

    };

  }



  const supabase = await createClient();

  const { data, error } = await supabase

    .from("research")

    .select("id, title, slug, abstract, pdf_url, published_date")

    .order("published_date", { ascending: false });



  if (error) {

    console.warn(

      "Could not load research from Supabase. Falling back to seed data.",

      error.message,

    );

    return { all: seedPublicationCards(), error: null };

  }



  const rows = data ?? [];

  if (rows.length === 0) {

    return { all: seedPublicationCards(), error: null };

  }



  const all = rows

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

  if (!isSupabaseConfigured()) {

    const seed = seedResearch.find((item) => item.slug === slug);

    return seed ? toPublicationCard(seed) : null;

  }



  const supabase = await createClient();

  const { data, error } = await supabase

    .from("research")

    .select("id, title, slug, abstract, pdf_url, published_date")

    .eq("slug", slug)

    .maybeSingle();



  if (error || !data) {

    const seed = seedResearch.find((item) => item.slug === slug);

    return seed ? toPublicationCard(seed) : null;

  }



  return toPublicationCard(data);

}


