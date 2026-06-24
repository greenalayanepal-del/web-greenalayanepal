import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { Card } from "@/components/ui/card";
import { siteContact } from "@/lib/site";

type ContactSectionProps = {
  description: string;
  formEnabled: boolean;
  defaultSubject?: string;
};

export function ContactSection({
  description,
  formEnabled,
  defaultSubject,
}: ContactSectionProps) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Get in Touch</h2>
          <p className="mt-4 text-lg text-foreground">{description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" aria-hidden />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Email</h3>
              <a
                href={`mailto:${siteContact.email}`}
                className="text-foreground hover:underline"
              >
                {siteContact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Phone className="h-6 w-6 text-primary" aria-hidden />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Phone</h3>
              <a
                href={`tel:${siteContact.phone.replace(/[^+\d]/g, "")}`}
                className="text-foreground hover:underline"
              >
                {siteContact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <MapPin className="h-6 w-6 text-primary" aria-hidden />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Location</h3>
              <p className="text-foreground">{siteContact.location}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-foreground">Follow us</h3>
          <SocialLinks
            className="flex gap-3"
            iconClassName="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-foreground transition hover:bg-primary/20"
          />
        </div>
      </div>

      <Card className="p-8">
        {formEnabled ? (
          <ContactForm defaultSubject={defaultSubject} />
        ) : (
          <div className="space-y-4 text-sm text-foreground">
            <p>
              The contact form is not available yet. Please email us at{" "}
              <a
                href={`mailto:${siteContact.email}`}
                className="font-medium text-foreground hover:underline"
              >
                {siteContact.email}
              </a>
              .
            </p>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 font-medium text-foreground hover:underline"
            >
              Browse our publications
              <Send className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
