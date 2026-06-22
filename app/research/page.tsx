import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { DataError } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { seedResearch } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Research } from "@/lib/types/research";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "Publications and studies from Greenalaya Nepal, including urban biodiversity documentation.",
  path: "/research",
});

async function getResearch(): Promise<{
  items: Research[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed research data."
    );
    return {
      items: [],
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research")
    .select("id, title, slug, abstract, pdf_url, published_date")
    .order("published_date", { ascending: false });

  if (error) {
    return { items: [], error: error.message };
  }

  return { items: data ?? [], error: null };
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ResearchPage() {
  const { items, error } = await getResearch();
  const displayItems = !error && items.length === 0 ? seedResearch : items;

  return (
    <PageShell
      title="Research"
      description="Publications, reports, and studies from Greenalaya Nepal."
    >
      <p className="mt-6 text-sm text-muted-foreground">
        Downloadable PDFs and reference materials are available on our{" "}
        <Link href="/publications" className="font-semibold text-primary hover:underline">
          Publications
        </Link>
        page.
      </p>
      {error ? (
        <DataError message={error} />
      ) : (
        <ul className="mt-8 space-y-6">
          {displayItems.map((item) => (
            <li key={item.id}>
              <ContentCard>
              <h2 className="text-xl font-semibold text-secondary-foreground">
                <Link
                  href={`/research/${item.slug}`}
                  className="hover:underline"
                >
                  {item.title}
                </Link>
              </h2>
              {item.published_date ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(item.published_date)}
                </p>
              ) : null}
              {item.abstract ? (
                <p className="mt-2 text-foreground">{item.abstract}</p>
              ) : null}
              </ContentCard>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
