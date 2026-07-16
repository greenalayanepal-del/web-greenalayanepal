import Image from "next/image";

import type { aboutWhatWeDo } from "@/lib/site";

type AboutPageIntroProps = {
  title: string;
  whatWeDo: typeof aboutWhatWeDo;
};

export function AboutPageIntro({ title, whatWeDo }: AboutPageIntroProps) {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-80 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-[#4caf50]/10 blur-[300px]"
      />

      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="font-display text-3xl font-bold uppercase text-white lg:text-4xl xl:text-5xl">
          {title}
        </h1>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-10 lg:mt-16 lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40 lg:rounded-[2rem]">
            <Image
              src={whatWeDo.image}
              alt="Greenalaya Nepal team and community collaboration"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:py-6">
          <div className="inline-block">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#81c784] lg:text-base">
              {whatWeDo.heading}
            </p>
            <div className="mt-3 h-1 w-full rounded-full bg-[#4caf50] lg:mt-4 lg:h-1.5" />
          </div>

          <div className="mt-8 space-y-5 lg:mt-10 lg:space-y-6">
            {whatWeDo.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-sm leading-relaxed text-white/70 lg:text-base lg:leading-7"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
