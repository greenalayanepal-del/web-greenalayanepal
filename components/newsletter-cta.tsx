"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { newsletterFormInitialState } from "@/lib/actions/newsletter-types";

export function NewsletterCta() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    newsletterFormInitialState
  );

  if (state.ok && state.message) {
    return (
      <section className="rounded-3xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-12 text-center text-white sm:px-12 sm:py-14">
        <h3 className="font-display text-3xl font-bold">Stay Updated</h3>
        <p
          role="status"
          className="mx-auto mt-8 max-w-xl text-sm font-semibold text-emerald-100 sm:text-base"
        >
          {state.message}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-12 text-center text-white sm:px-12 sm:py-14">
      <h3 className="font-display text-3xl font-bold">Stay Updated</h3>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/95 sm:text-lg">
        Subscribe to receive new research alerts, publication announcements, and
        exclusive resources directly to your inbox.
      </p>
      <form
        action={formAction}
        className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="newsletter-company">Company</label>
          <input
            id="newsletter-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.message && !state.ok ? (
          <p role="alert" className="w-full text-sm font-semibold text-red-100">
            {state.message}
          </p>
        ) : null}

        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="min-w-[200px] flex-1 rounded-full border-0 px-6 py-4 text-base text-neutral-900 outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#2e7d32] transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
    </section>
  );
}
