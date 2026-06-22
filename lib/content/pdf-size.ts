import { stat } from "node:fs/promises";
import path from "node:path";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns a label like "PDF 746 KB" for files in /public. */
export async function getLocalPdfSizeLabel(
  pdfUrl: string,
): Promise<string | null> {
  if (!pdfUrl.startsWith("/")) return null;

  try {
    const filePath = path.join(process.cwd(), "public", pdfUrl);
    const stats = await stat(filePath);
    return `PDF ${formatFileSize(stats.size)}`;
  } catch {
    return null;
  }
}
