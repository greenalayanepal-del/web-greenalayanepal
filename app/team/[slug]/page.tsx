import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getTeamMemberBySlug } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Matches next.config.ts remotePatterns (Supabase storage); other external hosts aren't optimizable. */
function isOptimizableRemotePhoto(url: string): boolean {
  return /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//.test(url);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return pageMetadata({
      title: "Team",
      description: "Greenalaya Nepal team member",
      path: `/team/${slug}`,
    });
  }

  return pageMetadata({
    title: member.name,
    description: member.position ?? "Greenalaya Nepal team member",
    path: `/team/${member.slug}`,
  });
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <PageShell
      title={member.name}
      description={member.position ?? "Greenalaya Nepal team member"}
    >
      <p className="mt-6">
        <Link href="/team" className="text-sm text-primary hover:underline">
          ← All team members
        </Link>
      </p>

      {member.photo_url ? (
        <Image
          src={member.photo_url}
          alt={member.name}
          width={192}
          height={192}
          className="mt-6 h-48 w-48 rounded-lg object-cover"
          unoptimized={
            member.photo_url.startsWith("http") &&
            !isOptimizableRemotePhoto(member.photo_url)
          }
        />
      ) : null}

      {member.bio ? (
        <p className="mt-6 text-lg leading-relaxed text-foreground">
          {member.bio}
        </p>
      ) : (
        <p className="mt-6 text-muted-foreground">Bio coming soon.</p>
      )}
    </PageShell>
  );
}
