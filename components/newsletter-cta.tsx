"use client";

import { FormEvent, useState } from "react";

export function NewsletterCta() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-12 text-center text-white sm:px-12 sm:py-14">
      <h3 className="font-display text-3xl font-bold">Stay Updated</h3>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/95 sm:text-lg">
        Subscribe to receive new research alerts, publication announcements, and
        exclusive resources directly to your inbox.
      </p>
      {submitted ? (
        <p className="mt-8 text-sm font-semibold text-emerald-100">
          Thank you for subscribing!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="min-w-[200px] flex-1 rounded-full border-0 px-6 py-4 text-base text-neutral-900 outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#2e7d32] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
