export type ContactFormState = {
  ok: boolean;
  message: string;
};

export const contactFormInitialState: ContactFormState = {
  ok: false,
  message: "",
};
