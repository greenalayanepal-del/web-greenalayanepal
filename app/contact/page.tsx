import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { siteContact } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default function ContactPage() {
  const formEnabled = isSupabaseConfigured();

  return (
    <PageShell
      title="Contact"
      description="Get in touch with Greenalaya Nepal."
    >
      <div className="mt-8 space-y-8 text-neutral-700">
        <p>
          For collaborations, research inquiries, volunteering, or media
          requests, reach us through the form below or the channels listed.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-emerald-900">
              Send a message
            </h2>
            {formEnabled ? (
              <div className="mt-4">
                <ContactForm />
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-600">
                The contact form is not available yet. Please email us at{" "}
                <a
                  href={`mailto:${siteContact.email}`}
                  className="font-medium text-emerald-800 hover:underline"
                >
                  {siteContact.email}
                </a>
                .
              </p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-900">
              Direct contact
            </h2>
            <dl className="mt-4 space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
              <div>
                <dt className="text-sm font-semibold text-emerald-900">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="font-medium text-emerald-800 hover:underline"
                  >
                    {siteContact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-emerald-900">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${siteContact.phone.replace(/[^+\d]/g, "")}`}
                    className="font-medium text-emerald-800 hover:underline"
                  >
                    {siteContact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-emerald-900">Location</dt>
                <dd className="mt-1">{siteContact.location}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="rounded-lg bg-emerald-50 p-6">
          <h2 className="text-lg font-semibold text-emerald-900">
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

        <p className="text-sm text-neutral-500">
          <Link href="/resources" className="text-emerald-800 hover:underline">
            Browse our resources
          </Link>{" "}
          while you wait for a reply.
        </p>
      </div>
    </PageShell>
  );
}
