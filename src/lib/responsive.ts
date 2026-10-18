import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from './imageSize';

/** The widths tools/make-thumbs.mjs writes for every screenshot. */
export const THUMB_WIDTHS = [640, 1040];

export interface Responsive {
  srcSet?: string;
  width?: number;
  height?: number;
}

/** /media/medical-overview.png → /media/thumbs/medical-overview */
function thumbStem(src: string): string {
  const file = src.split('/').pop() ?? src;
  return `/media/thumbs/${file.replace(/\.(png|jpe?g)$/i, '')}`;
}

/** A srcset for `src`: the WebP copies tools/make-thumbs.mjs wrote for it, then
 * the original as the largest candidate, plus the original's own size.
 *
 * The captures are 1,600px PNGs and most of them are drawn about 550px wide,
 * so a browser given only the original downloads three times the pixels it
 * paints — around a megabyte on the home page alone. A copy is only listed if
 * its file exists, so an image nobody has run the tool on still renders,
 * from the original, as it always did.
 *
 * Server-side only, like imageSize: it reads /public at build time. */
export function responsive(src: string, widths: number[] = THUMB_WIDTHS): Responsive {
  const size = imageSize(src);
  if (!size) return {};

  const stem = thumbStem(src);
  const copies = widths
    .filter((w) => w < size.width)
    .filter((w) => existsSync(join(process.cwd(), 'public', `${stem}-${w}.webp`)))
    .map((w) => `${stem}-${w}.webp ${w}w`);

  return {
    srcSet: copies.length > 0 ? [...copies, `${src} ${size.width}w`].join(', ') : undefined,
    width: size.width,
    height: size.height,
  };
}
