import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { PublicationCard } from "@/lib/content/resources";

type PublicationCardProps = {
  publication: PublicationCard;
};

export function PublicationCardItem({ publication }: PublicationCardProps) {
  return (
    <article className="group">
      <Link
        href={`/publications/${publication.slug}`}
        className="block no-underline"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={publication.coverImage}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {publication.locationLabel ? (
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-[#1f4d3a]/90 px-3 py-2.5 text-sm text-white">
              <MapPin className="size-4 shrink-0" aria-hidden />
              <span>{publication.locationLabel}</span>
            </div>
          ) : null}
        </div>
        <h3 className="mt-4 text-lg leading-snug font-normal text-foreground transition group-hover:text-primary sm:text-xl">
          {publication.title}
        </h3>
        <p className="mt-2 text-base italic text-muted-foreground">
          {publication.year}
        </p>
      </Link>
    </article>
  );
}
