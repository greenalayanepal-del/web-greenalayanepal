import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/seo";
import { getContactIntent, siteContact, socialProfiles } from "@/lib/site";
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

  return (
    <PageShell
      title="Contact"
      description="Get in touch with Greenalaya Nepal."
    >
      <div className="mt-8 space-y-8 text-foreground">
        <p>
          {intent
            ? intent.description
            : "For collaborations, research inquiries, volunteering, or media requests, reach us through the form below or the channels listed."}
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-secondary-foreground">
              Send a message
            </h2>
            {formEnabled ? (
              <div className="mt-4">
                <ContactForm defaultSubject={intent?.subject} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                The contact form is not available yet. Please email us at{" "}
                <a
                  href={`mailto:${siteContact.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {siteContact.email}
                </a>
                .
              </p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-secondary-foreground">
              Direct contact
            </h2>
            <dl className="mt-4 space-y-4 rounded-lg border border-border bg-card p-6">
              <div>
                <dt className="text-sm font-semibold text-secondary-foreground">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteContact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-secondary-foreground">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${siteContact.phone.replace(/[^+\d]/g, "")}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteContact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-secondary-foreground">Location</dt>
                <dd className="mt-1">{siteContact.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-secondary-foreground">Social</dt>
                <dd className="mt-2 space-y-2">
                  {socialProfiles.map(({ label, href }) => (
                    <div key={label}>
                      <a
                        href={href}
                        className="font-medium text-primary hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {label}
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="rounded-lg bg-accent p-6 text-accent-foreground">
          <h2 className="text-lg font-semibold">
            Join our movement
          </h2>
          <p className="mt-2 text-sm">
            Whether you are a researcher, community member, student, or
            organization, there are many ways to contribute to Nepal&apos;s
            environmental resilience.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
            <li>Become a volunteer</li>
            <li>Apply for a research internship</li>
            <li>Partner with us on conservation initiatives</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          <Link href="/publications" className="text-primary hover:underline">
            Browse our publications
          </Link>{" "}
          while you wait for a reply.
        </p>
      </div>
    </PageShell>
  );
}
