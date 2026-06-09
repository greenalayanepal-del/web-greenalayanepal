"use server";

import type { NewsletterFormState } from "@/lib/actions/newsletter-types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  if (formData.get("company")) {
    return {
      ok: true,
      message: "Thank you for subscribing!",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "Newsletter signup is temporarily unavailable. Please contact us directly.",
    };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !isValidEmail(email) || email.length > 254) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email });

  if (error) {
    if (error.code === "23505") {
      return {
        ok: true,
        message: "You are already subscribed. Thank you!",
      };
    }

    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  return {
    ok: true,
    message: "Thank you for subscribing!",
  };
}
