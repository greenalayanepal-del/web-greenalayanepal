"use client";

import { Search } from "lucide-react";

type PublicationsSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PublicationsSearchBar({
  value,
  onChange,
}: PublicationsSearchBarProps) {
  return (
    <div className="border-b border-border bg-secondary px-5 py-10 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <label htmlFor="publications-search" className="sr-only">
          Search publications
        </label>
        <div className="relative">
          <input
            id="publications-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Type the keyword here"
            className="w-full rounded-full border border-primary bg-card py-3.5 pr-12 pl-6 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-primary"
          />
        </div>
      </div>
    </div>
  );
}
