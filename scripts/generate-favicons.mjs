import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

const source = path.resolve(process.argv[2] ?? path.join(root, "brand", "logo-source.png"));

const input = readFileSync(source);
const bg = { r: 0, g: 0, b: 0, alpha: 1 };

async function writePng(size, filename) {
  const buf = await sharp(input)
    .resize(size, size, { fit: "contain", background: bg })
    .png({ compressionLevel: 9 })
    .toBuffer();
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

const png16 = await writePng(16, "favicon-16x16.png");
const png32 = await writePng(32, "favicon-32x32.png");
const png48 = await writePng(48, "favicon-48x48.png");
await writePng(180, "apple-touch-icon.png");
await writePng(128, "logo.png");

const ico = pngBuffersToIco([png16, png32, png48]);
writeFileSync(path.join(publicDir, "favicon.ico"), ico);
writeFileSync(path.join(appDir, "favicon.ico"), ico);

await sharp(input).resize(32, 32, { fit: "contain", background: bg }).png().toFile(path.join(appDir, "icon.png"));
await sharp(input)
  .resize(180, 180, { fit: "contain", background: bg })
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

console.log("Generated favicons from", source);
console.log("favicon.ico", ico.length, "bytes, magic", ico.slice(0, 4).toString("hex"));
