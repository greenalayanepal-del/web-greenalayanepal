import Link from "next/link";
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
    return {
      items: [],
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
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
      {error ? (
        <DataError message={error} />
      ) : (
        <ul className="mt-8 space-y-6">
          {displayItems.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <h2 className="text-xl font-semibold text-emerald-900">
                <Link
                  href={`/research/${item.slug}`}
                  className="hover:underline"
                >
                  {item.title}
                </Link>
              </h2>
              {item.published_date ? (
                <p className="mt-1 text-sm text-neutral-500">
                  {formatDate(item.published_date)}
                </p>
              ) : null}
              {item.abstract ? (
                <p className="mt-2 text-neutral-700">{item.abstract}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
