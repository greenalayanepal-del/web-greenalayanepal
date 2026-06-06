"use client";

import { useActionState } from "react";
import {
  contactFormInitialState,
  submitContactForm,
} from "@/lib/actions/contact";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    contactFormInitialState
  );

  if (state.ok && state.message) {
    return (
      <div
        role="status"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
      >
        <p className="font-medium">Message sent</p>
        <p className="mt-2 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-emerald-900">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-emerald-900">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-emerald-900">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-emerald-900">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-900 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
