const BUCKET = "public-assets";

/** Public URL for a file in the public-assets storage bucket. */
export function publicAssetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return path;
  const normalized = path.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${normalized}`;
}

export const storageBucket = BUCKET;
