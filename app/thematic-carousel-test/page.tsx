import Link from "next/link";
import { ThematicCarouselTestPreview } from "@/components/thematic-carousel-test-preview";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thematic Areas Grid Test",
  description:
    "Internal preview of the thematic areas card grid.",
  path: "/thematic-carousel-test",
  noIndex: true,
});

export default function ThematicCarouselTestPage() {
  return (
    <main className="scroll-mt-24 px-5 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2e7d32]">
          Preview only
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Thematic Areas Grid
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This page mirrors the card grid used on the homepage{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">#thematic</code>{" "}
          section.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <Link href="/" className="font-semibold text-[#2e7d32] hover:underline">
            ← Back to homepage
          </Link>
        </p>

        <section className="mt-12" aria-label="Thematic areas grid preview">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Thematic Areas
          </h2>
          <ThematicCarouselTestPreview />
        </section>
      </div>
    </main>
  );
}
