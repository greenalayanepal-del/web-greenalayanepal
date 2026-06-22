import type { PublicationMetadata } from "@/lib/site";

type PublicationMetadataSectionProps = {
  metadata: PublicationMetadata;
};

type MetadataRow = {
  label: string;
  value: string | undefined;
};

function MetadataRowItem({ label, value }: MetadataRow) {
  return (
    <div className="flex flex-wrap gap-x-1 text-base leading-relaxed text-foreground">
      <dt className="font-bold">{label}:</dt>
      <dd>{value ?? ""}</dd>
    </div>
  );
}

export function PublicationMetadataSection({
  metadata,
}: PublicationMetadataSectionProps) {
  const rows: MetadataRow[] = [
    { label: "Language", value: metadata.language },
    { label: "Published", value: metadata.published },
    { label: "Publisher(s)", value: metadata.publishers },
    { label: "ISBN", value: metadata.isbn },
  ];

  return (
    <section aria-label="Publication details" className="mt-8">
      <dl className="space-y-2">
        {rows.map((row) => (
          <MetadataRowItem key={row.label} label={row.label} value={row.value} />
        ))}
      </dl>
    </section>
  );
}
