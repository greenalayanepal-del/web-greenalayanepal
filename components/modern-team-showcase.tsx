"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useState, type SVGProps } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import type {
  TeamShowcaseMember,
  TeamSocialKey,
} from "@/lib/content/team-showcase";
import { cn } from "@/lib/utils";

const SOCIAL_KEYS: TeamSocialKey[] = ["github", "linkedin", "twitter"];

function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTwitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap = {
  github: IconGithub,
  linkedin: IconLinkedin,
  twitter: IconTwitter,
} as const;

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.15,
    },
  }),
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function SocialIcon({
  socialKey,
  href,
  memberName,
  index,
}: {
  socialKey: TeamSocialKey;
  href?: string;
  memberName: string;
  index: number;
}) {
  const Icon = iconMap[socialKey];
  const className = cn(
    "text-muted-foreground transition-all duration-300 opacity-0 group-hover:opacity-100",
    href
      ? "hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-full"
      : "opacity-0 group-hover:opacity-40 pointer-events-none",
  );
  const style = { transitionDelay: `${index * 100}ms` };

  if (href) {
    return (
      <a
        href={href}
        aria-label={`${memberName}'s ${socialKey}`}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-5" />
      </a>
    );
  }

  return (
    <span aria-hidden className={className} style={style}>
      <Icon className="size-5" />
    </span>
  );
}

const TeamMemberCard = memo(function TeamMemberCard({
  member,
  index,
  reducedMotion,
}: {
  member: TeamShowcaseMember;
  index: number;
  reducedMotion: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reducedMotion, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reducedMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      className="group relative mx-auto flex min-h-[20rem] w-full max-w-[15rem] flex-col rounded-xl border border-border bg-card px-4 py-5 text-center shadow-sm"
    >
      <div
        style={
          reducedMotion
            ? undefined
            : { transform: "translateZ(50px)", transformStyle: "preserve-3d" }
        }
        className="flex flex-1 flex-col items-center"
      >
        <div className="relative mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-border">
          <Image
            alt={`Portrait of ${member.name}`}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            sizes="128px"
            src={member.avatar}
            unoptimized={member.avatar.startsWith("http")}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <h3 className="text-balance text-xl font-semibold leading-snug text-card-foreground">
          {member.name}
        </h3>
        <p className="mt-1 text-primary">{member.title}</p>

        <div className="mt-auto flex w-full items-center justify-center gap-4 pt-4">
          {SOCIAL_KEYS.map((key, i) => (
            <SocialIcon
              key={key}
              href={member.socials[key]}
              index={i}
              memberName={member.name}
              socialKey={key}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

type ModernTeamShowcaseProps = {
  teamMembers: TeamShowcaseMember[];
  tagline?: string;
};

export function ModernTeamShowcase({
  teamMembers,
  tagline = "Researchers and leaders working on conservation, research, and sustainable development at Greenalaya Nepal.",
}: ModernTeamShowcaseProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-8 pt-28 md:p-16 md:pt-32">
      <div className="aurora-bg absolute inset-0 z-0 opacity-20">
        <div className="aurora-shape-1" />
        <div className="aurora-shape-2" />
      </div>

      <div className="relative z-10 mb-16 flex flex-col items-center text-center">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold tracking-tighter text-foreground md:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        >
          Our Team
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-2xl text-lg text-muted-foreground"
          initial={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
        >
          {tagline}
        </motion.p>
      </div>

      {teamMembers.length === 0 ? (
        <p className="relative z-10 text-center text-muted-foreground">
          No team members yet.
        </p>
      ) : (
        <div className="responsive-grid relative z-10 w-full max-w-6xl">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              index={index}
              member={member}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}
    </div>
  );
}
