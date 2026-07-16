import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { getAdvisors } from "@/lib/content/advisors";
import { pageMetadata } from "@/lib/seo";
import { contactHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Advisors & Partners",
  description:
    "Scientific advisors and partner organizations collaborating with Greenalaya Nepal on conservation, research, and community programs.",
  path: "/advisors",
});

export default async function AdvisorsPage() {
  const { members: advisors } = await getAdvisors();

  return (
    <PageShell
      title="Advisors & Partners"
      description="Collaborators who strengthen our research, conservation, and community programs across Nepal."
    >
      <div className="mt-8 space-y-6 text-foreground leading-relaxed">
        <p>
          Greenalaya Nepal works with researchers, institutions, and community
          organizations that share our commitment to credible environmental science
          and locally rooted conservation action.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Scientific advisors
          </h2>
          <p className="mt-2">
            Advisors help guide study design, field methods, and the interpretation
            of biodiversity and environmental data.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {advisors.map((advisor) => (
              <li key={advisor.id}>{advisor.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-secondary-foreground">
            Partner organizations
          </h2>
          <p className="mt-2">
            We collaborate with universities, NGOs, and community groups on research,
            restoration, and capacity-building initiatives. Partner highlights will
            appear here soon.
          </p>
        </div>

        <div>
          <Link
            href={contactHref("partner")}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Partner with us
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
