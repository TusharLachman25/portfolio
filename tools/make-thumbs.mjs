/**
 * Writes the WebP copies the site serves in place of its full-size captures:
 * 640px and 1040px wide for every screenshot in public/media, and 208px and
 * 312px for the portrait, all into public/media/thumbs.
 *
 * The captures are 1,600px PNGs and the grid draws most of them about 550px
 * wide, so a browser handed only the original downloads three times the
 * pixels it paints. src/lib/responsive.ts lists a copy in an image's srcset
 * only if its file is here, with the original always the largest candidate —
 * a capture nobody has run this on still renders, and the viewer still opens
 * the full-size file.
 *
 *   node tools/make-thumbs.mjs           only what is missing or older than its capture
 *   node tools/make-thumbs.mjs --force   all of them
 *
 * Copies of a capture that no longer exists are deleted. Video posters are
 * skipped: they are only ever a <video poster>, never an <img>.
 *
 * sharp is the image library Next.js itself installs, so there is nothing
 * extra to add.
 */
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MEDIA = join(ROOT, 'public', 'media');
const OUT = join(MEDIA, 'thumbs');
const force = process.argv.includes('--force');

// Keep in step with THUMB_WIDTHS in src/lib/responsive.ts, and with the two
// widths the home page asks for the portrait (104px on screen, at 2× and 3×).
const JOBS = [
  ...readdirSync(MEDIA)
    .filter((f) => /\.(png|jpe?g)$/i.test(f) && !/-poster\.jpe?g$/i.test(f))
    .map((f) => ({ src: join(MEDIA, f), name: f, widths: [640, 1040] })),
  { src: join(ROOT, 'public', 'tushar-lachman.jpg'), name: 'tushar-lachman.jpg', widths: [208, 312] },
];

mkdirSync(OUT, { recursive: true });

const keep = new Set();
let written = 0;
let skipped = 0;
for (const job of JOBS) {
  const { width } = await sharp(job.src).metadata();
  const stem = job.name.replace(/\.(png|jpe?g)$/i, '');
  for (const w of job.widths) {
    // Never upscale: where the capture is narrower, the original is the copy.
    if (w >= width) continue;
    const out = join(OUT, `${stem}-${w}.webp`);
    keep.add(out);
    if (!force && existsSync(out) && statSync(out).mtimeMs >= statSync(job.src).mtimeMs) {
      skipped++;
      continue;
    }
    // Quality 82 keeps UI text crisp at these widths; below about 75 the
    // edges of small type start to smear.
    await sharp(job.src).resize({ width: w }).webp({ quality: 82, effort: 5 }).toFile(out);
    written++;
  }
}

let removed = 0;
for (const f of readdirSync(OUT)) {
  const p = join(OUT, f);
  if (!keep.has(p)) {
    unlinkSync(p);
    removed++;
  }
}

const size = (dir, files) => files.reduce((n, f) => n + statSync(join(dir, f)).size, 0);
const thumbs = readdirSync(OUT);
console.log(
  `${written} written, ${skipped} already current, ${removed} removed — ` +
    `${thumbs.length} copies, ${(size(OUT, thumbs) / 1048576).toFixed(1)} MB`,
);
