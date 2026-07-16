"use client";

import { useMemo, useState } from "react";
import { PublicationCardItem } from "@/components/publication-card";
import { PublicationsSearchBar } from "@/components/publications-search-bar";
import type { PublicationCard } from "@/lib/content/resources";

type PublicationsPageContentProps = {
  publications: PublicationCard[];
};

function filterPublications(items: PublicationCard[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.year.includes(normalized) ||
      (item.locationLabel?.toLowerCase().includes(normalized) ?? false),
  );
}

export function PublicationsPageContent({
  publications,
}: PublicationsPageContentProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterPublications(publications, query),
    [publications, query],
  );

  return (
    <>
      <PublicationsSearchBar value={query} onChange={setQuery} />

      <main className="bg-background px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <section className="mt-14 sm:mt-16">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
              Publications
            </h2>

            {filtered.length === 0 ? (
              <p className="mt-8 text-center text-muted-foreground">
                {publications.length === 0
                  ? "No publications are available yet."
                  : "No publications match your search."}
              </p>
            ) : (
              <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                {filtered.map((publication) => (
                  <li key={publication.id}>
                    <PublicationCardItem publication={publication} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
