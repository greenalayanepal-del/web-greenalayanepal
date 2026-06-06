type ContactPayload = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
};

function isContactEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_NOTIFY_EMAIL &&
      process.env.CONTACT_FROM_EMAIL
  );
}

export async function notifyStaffOfContactSubmission(
  payload: ContactPayload
): Promise<void> {
  if (!isContactEmailConfigured()) return;

  const subjectLine = payload.subject
    ? `[Greenalaya] ${payload.subject}`
    : "[Greenalaya] New contact form message";

  const text = [
    "New contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.subject ? `Subject: ${payload.subject}` : null,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_NOTIFY_EMAIL],
      reply_to: payload.email,
      subject: subjectLine,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Contact notification email failed:", await response.text());
  }
}
