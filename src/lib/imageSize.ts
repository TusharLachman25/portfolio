import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface ImageSize {
  width: number;
  height: number;
}

/** Intrinsic size of a file under /public, read at build time.
 *
 * The hero screenshot is the only image on a sheet that loads eagerly, and
 * without width and height on the tag the whole page jumps when it arrives.
 * The captures are not all one shape — 1600×900, 1600×1000 and 1600×1400 all
 * appear — so the number has to come from the file rather than from a constant
 * that is right for three projects out of five.
 *
 * Server-side only: every page that calls this is statically rendered, so the
 * read happens during `next build` and never at request time. */
export function imageSize(publicPath: string): ImageSize | undefined {
  try {
    const buf = readFileSync(join(process.cwd(), 'public', publicPath));
    return png(buf) ?? jpeg(buf);
  } catch {
    // A missing or unreadable file shouldn't fail the build — the tag simply
    // goes out without dimensions, exactly as it did before.
    return undefined;
  }
}

/** PNG keeps its dimensions in the IHDR chunk, always the first one. */
function png(buf: Buffer): ImageSize | undefined {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return undefined;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** JPEG needs the segment chain walked until a start-of-frame marker. */
function jpeg(buf: Buffer): ImageSize | undefined {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return undefined;

  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    // SOF0-SOF15, excluding the four that aren't frame headers.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return undefined;
}
