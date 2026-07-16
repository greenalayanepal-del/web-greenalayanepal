"use client";

import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";
import { collaboratorPhotoUrl } from "@/lib/content/collaborator-photo";
import { teamPhotoUrl } from "@/lib/content/team-photo";
import { cn } from "@/lib/utils";

type PersonMarqueeMember = {
  id: string;
  name: string;
  slug: string;
  position: string | null;
  photo_url: string | null;
};

type PhotoSource = "team" | "collaborator";

const photoResolvers: Record<
  PhotoSource,
  (member: { photo_url: string | null }) => string
> = {
  team: teamPhotoUrl,
  collaborator: collaboratorPhotoUrl,
};

type AboutPeopleMarqueeProps = {
  title: string;
  members: PersonMarqueeMember[];
  error?: string | null;
  direction?: "left" | "right";
  speed?: number;
  photoSource: PhotoSource;
  linkPrefix?: string;
  className?: string;
  imageFit?: "cover" | "contain";
  variant?: "portrait" | "logo";
  maxItems?: number;
  loop?: boolean;
  logoSizeClass?: string;
  logoImageSizes?: string;
  logoUnoptimized?: boolean;
};

function expandMembersForMarquee<T>(members: T[]): T[] {
  if (members.length === 0) return members;
  const expanded = [...members];
  while (expanded.length < 6) {
    expanded.push(...members);
  }
  return expanded;
}

function PersonCard({
  member,
  index,
  photo,
  linkPrefix,
  imageFit = "cover",
  variant = "portrait",
  logoSizeClass,
  logoImageSizes,
  logoUnoptimized = false,
}: {
  member: PersonMarqueeMember;
  index: number;
  photo: string;
  linkPrefix?: string;
  imageFit?: "cover" | "contain";
  variant?: "portrait" | "logo";
  logoSizeClass?: string;
  logoImageSizes?: string;
  logoUnoptimized?: boolean;
}) {
  const card =
    variant === "logo" ? (
      <div
        className={cn(
          "group/card relative shrink-0",
          logoUnoptimized && "overflow-hidden rounded-xl bg-white/95 p-2",
          logoSizeClass ?? "h-[59px] w-[59px] sm:h-[67px] sm:w-[67px]",
        )}
      >
        <Image
          alt={member.name}
          className="object-contain object-center"
          fill
          sizes={logoImageSizes ?? "67px"}
          src={photo}
          unoptimized={logoUnoptimized}
        />
      </div>
    ) : (
      <div className="group/card flex w-64 shrink-0 flex-col">
        <div className="relative h-[23rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#161c17]">
          <Image
            alt={member.name}
            className={cn(
              "transition-all duration-300 group-hover/card:grayscale-0",
              imageFit === "contain"
                ? "object-contain bg-white/95 p-8 grayscale"
                : "object-cover grayscale",
            )}
            fill
            sizes="256px"
            src={photo}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-[#0a0f0a]/85 p-3 backdrop-blur-sm">
            <h3 className="font-semibold text-white">{member.name}</h3>
            {member.position ? (
              <p className="mt-0.5 text-sm text-white/65">{member.position}</p>
            ) : null}
          </div>
        </div>
      </div>
    );

  if (linkPrefix && member.slug) {
    return (
      <Link
        href={`${linkPrefix}/${member.slug}`}
        className="shrink-0"
        key={`${member.id}-${index}`}
      >
        {card}
      </Link>
    );
  }

  return (
    <div className="shrink-0" key={`${member.id}-${index}`}>
      {card}
    </div>
  );
}

export function AboutPeopleMarquee({
  title,
  members,
  error,
  direction = "left",
  speed = 50,
  photoSource,
  linkPrefix,
  className,
  imageFit = "cover",
  variant = "portrait",
  maxItems,
  loop = true,
  logoSizeClass,
  logoImageSizes,
  logoUnoptimized = false,
}: AboutPeopleMarqueeProps) {
  if (error || members.length === 0) {
    return null;
  }

  const limitedMembers = typeof maxItems === "number" ? members.slice(0, maxItems) : members;
  const marqueeMembers = loop ? expandMembersForMarquee(limitedMembers) : limitedMembers;
  const resolvePhoto = photoResolvers[photoSource];

  return (
    <section className={cn("relative mt-16 w-full lg:mt-24", className)}>
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center px-2 text-center lg:mb-16">
        <h2 className="font-display text-3xl font-bold uppercase text-white lg:text-4xl">
          {title}
        </h2>
      </div>

      <div className="relative w-full">
        {loop ? (
          <>
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#0a0f0a] to-transparent sm:w-32" />
            <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#0a0f0a] to-transparent sm:w-32" />

            <Marquee
              className="[--gap:1.5rem]"
              direction={direction}
              pauseOnHover
              speed={speed}
            >
              {marqueeMembers.map((member, index) => (
                <PersonCard
                  key={`${member.id}-${index}`}
                  imageFit={imageFit}
                  index={index}
                  linkPrefix={linkPrefix}
                  logoUnoptimized={logoUnoptimized}
                  logoImageSizes={logoImageSizes}
                  logoSizeClass={logoSizeClass}
                  member={member}
                  photo={resolvePhoto(member)}
                  variant={variant}
                />
              ))}
            </Marquee>
          </>
        ) : (
          <div className="mx-auto flex w-full max-w-xl justify-center gap-[1.5rem]">
            {marqueeMembers.map((member, index) => (
              <PersonCard
                key={`${member.id}-${index}`}
                imageFit={imageFit}
                index={index}
                linkPrefix={linkPrefix}
                logoUnoptimized={logoUnoptimized}
                logoImageSizes={logoImageSizes}
                logoSizeClass={logoSizeClass}
                member={member}
                photo={resolvePhoto(member)}
                variant={variant}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
