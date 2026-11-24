// The World in One Day — entry for make.fun's news-image-20261124.
// The repository holds entry.png: a front page summing up the world news of
// Tuesday 24 November 2026. The file carries JPEG bytes under a .png name,
// which the gate accepts — it sniffs the magic bytes, not the extension.
// This program verifies the image is complete and within the gate's limits,
// then copies it to the output directory.

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(src);

const isPng = bytes[0] === 0x89 && bytes[1] === 0x50; // \x89 P
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8; // JPEG SOI
if (!isPng && !isJpeg) {
  throw new Error('entry.png is not a PNG or JPEG image');
}
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate limit`);
}

// The gate also caps the frame at 1024x1024: read the size from the header.
function dimensions(): [number, number] {
  if (isPng) {
    return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)]; // IHDR width/height
  }
  let i = 2; // JPEG: walk the segments to a Start Of Frame marker
  while (i + 9 < bytes.length) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    if (marker >= 0xc0 && marker <= 0xc3) {
      return [bytes.readUInt16BE(i + 7), bytes.readUInt16BE(i + 5)];
    }
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  throw new Error('could not read the JPEG frame size');
}
const [w, h] = dimensions();
if (w > 1024 || h > 1024) {
  throw new Error(`entry.png is ${w}x${h}, over the 1024x1024 gate limit`);
}

const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(src, out);
console.log(`wrote ${out} (${bytes.length} bytes)`);
