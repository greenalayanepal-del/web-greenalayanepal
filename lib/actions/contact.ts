"use server";

import { notifyStaffOfContactSubmission } from "@/lib/notify-contact";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if (formData.get("website")) {
    return {
      ok: true,
      message: "Thank you. We will get back to you soon.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "The contact form is temporarily unavailable. Please email us directly.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 120) {
    return { ok: false, message: "Please enter your name (max 120 characters)." };
  }

  if (!email || !isValidEmail(email) || email.length > 254) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (subject.length > 200) {
    return { ok: false, message: "Subject is too long (max 200 characters)." };
  }

  if (message.length < 10 || message.length > 5000) {
    return {
      ok: false,
      message: "Message must be between 10 and 5000 characters.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    return {
      ok: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }

  void notifyStaffOfContactSubmission({
    name,
    email,
    subject: subject || null,
    message,
  });

  return {
    ok: true,
    message: "Thank you for reaching out. We will respond as soon as we can.",
  };
}

export { initialState as contactFormInitialState };
