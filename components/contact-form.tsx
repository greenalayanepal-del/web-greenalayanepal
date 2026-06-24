"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { contactFormInitialState } from "@/lib/actions/contact-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    contactFormInitialState
  );

  if (state.ok && state.message) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-accent p-6 text-accent-foreground"
      >
        <p className="font-medium">Message sent</p>
        <p className="mt-2 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
            Name <span className="text-red-600">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
            Email <span className="text-red-600">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="Your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-foreground">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          maxLength={200}
          defaultValue={defaultSubject ?? ""}
          key={defaultSubject ?? "default"}
          placeholder="What is this regarding?"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
          Message <span className="text-red-600">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Your message"
        />
      </div>

      <Button type="submit" disabled={pending} size="lg" className="w-full">
        <Send className="h-4 w-4" aria-hidden />
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
