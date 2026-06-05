import { PageShell } from "@/components/page-shell";

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Get in touch with Greenalaya Nepal."
    >
      <div className="mt-8 space-y-4 text-neutral-700">
        <p>
          For collaborations, research inquiries, or media requests, contact us
          at:
        </p>
        <p>
          <a
            href="mailto:info@greenalayanepal.org.np"
            className="font-medium text-emerald-800 hover:underline"
          >
            info@greenalayanepal.org.np
          </a>
        </p>
        <p className="text-sm text-neutral-500">
          A contact form with database storage will be added in a later step.
        </p>
      </div>
    </PageShell>
  );
}
