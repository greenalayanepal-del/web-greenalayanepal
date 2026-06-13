import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");
const brandDir = path.join(root, "brand");

const logoSource = path.resolve(
  process.argv[2] ?? path.join(brandDir, "logo-source.png")
);

/** Site theme surfaces — keep in sync with header/footer/OG styling. */
const theme = {
  header: { r: 255, g: 255, b: 255, alpha: 1 },
  footer: { r: 236, g: 253, b: 245, alpha: 1 }, // emerald-50
  og: { r: 236, g: 253, b: 245, alpha: 1 },
  transparent: { r: 0, g: 0, b: 0, alpha: 0 },
};

const sourceInput = readFileSync(logoSource);

/** Turn the logo's black letterbox into transparency so it sits on any surface. */
async function withTransparentBackground(input, threshold = 48) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function renderLogo(size, background) {
  const transparent = await withTransparentBackground(sourceInput);
  let pipeline = transparent.resize(size, size, {
    fit: "contain",
    background: theme.transparent,
  });

  if (background) {
    pipeline = pipeline.flatten({ background });
  }

  return pipeline.ensureAlpha().png({ compressionLevel: 9 }).toBuffer();
}

async function writeFaviconPng(size, filename, background) {
  const buf = await renderLogo(size, background);
  writeFileSync(path.join(publicDir, filename), buf);
  return buf;
}

function pngBuffersToIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const parts = [header];

  pngBuffers.forEach((data, index) => {
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    const entry = Buffer.alloc(16);
    entry[0] = width >= 256 ? 0 : width;
    entry[1] = height >= 256 ? 0 : height;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entry.copy(header, 6 + index * 16);
    offset += data.length;
    parts.push(data);
  });

  return Buffer.concat(parts);
}

// Favicons: transparent so they read cleanly on light and dark browser chrome.
const png16 = await writeFaviconPng(16, "favicon-16x16.png", null);
const png32 = await writeFaviconPng(32, "favicon-32x32.png", null);
const png48 = await writeFaviconPng(48, "favicon-48x48.png", null);
await writeFaviconPng(180, "apple-touch-icon.png", theme.header);

const ico = pngBuffersToIco([png16, png32, png48]);
writeFileSync(path.join(publicDir, "favicon.ico"), ico);
writeFileSync(path.join(appDir, "favicon.ico"), ico);

// Next.js file-based metadata: serve ≥48×48 so Google Search accepts the auto /icon route.
const icon512 = await renderLogo(512, null);
writeFileSync(path.join(appDir, "icon.png"), icon512);
const apple180 = await renderLogo(180, theme.header);
writeFileSync(path.join(appDir, "apple-icon.png"), apple180);

// PWA / manifest sizes (Google also crawls manifest icons).
await writeFaviconPng(192, "icon-192.png", theme.header);
await writeFaviconPng(512, "icon-512.png", theme.header);

// UI logo: transparent PNG for header (white) and footer (emerald-50).
writeFileSync(path.join(publicDir, "logo.png"), icon512);

// Social preview: emerald-50 canvas matching the footer band.
const ogLogo = await renderLogo(520, null);
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: theme.og,
  },
})
  .composite([{ input: ogLogo, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("Logo source:", logoSource);
console.log("favicon.ico", ico.length, "bytes, magic", ico.slice(0, 4).toString("hex"));
