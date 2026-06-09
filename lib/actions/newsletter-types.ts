export type NewsletterFormState = {
  ok: boolean;
  message: string | null;
};

export const newsletterFormInitialState: NewsletterFormState = {
  ok: false,
  message: null,
};
