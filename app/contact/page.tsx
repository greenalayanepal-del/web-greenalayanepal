import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { pageMetadata } from "@/lib/seo";
import { getContactIntent } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Collaborate, volunteer, or reach Greenalaya Nepal for research and conservation inquiries.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent: intentParam } = await searchParams;
  const intent = getContactIntent(intentParam);
  const formEnabled = isSupabaseConfigured();
  const description =
    intent?.description ??
    "For collaborations, research inquiries, volunteering, or media requests, reach us through the form or the channels listed.";

  return (
    <main className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-28">
      <ContactSection
        description={description}
        formEnabled={formEnabled}
        defaultSubject={intent?.subject}
      />

      {formEnabled && (
        <p className="mt-8 text-lg text-foreground">
          <Link href="/publications" className="text-foreground hover:underline">
            Browse our publications
          </Link>{" "}
          while you wait for a reply.
        </p>
      )}
    </main>
  );
}
