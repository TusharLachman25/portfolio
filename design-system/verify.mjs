// Screenshots every preview so a broken card is caught here rather than
// after it is sitting in the design project.
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Bundle path may be passed in so this can run from wherever playwright is
// installed — bare ESM imports resolve against the script's own location.
const HERE = dirname(fileURLToPath(import.meta.url));
const BUNDLE = process.argv[2] ? resolve(process.argv[2]) : join(HERE, 'bundle');
const SHOTS = join(BUNDLE, '..', '.verify');
mkdirSync(SHOTS, { recursive: true });

const cards = JSON.parse(readFileSync(join(BUNDLE, 'cards.json'), 'utf8'));

const browser = await chromium.launch({ channel: 'chrome' });
let bad = 0;

for (const card of cards) {
  const page = await browser.newPage({ viewport: { width: card.width, height: card.height ?? 800 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto(pathToFileURL(join(BUNDLE, card.path)).href, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(600);

  const health = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    return {
      imgs: imgs.length,
      brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      textNodes: document.body.innerText.trim().length,
    };
  });

  const overflow = health.scrollW > health.clientW + 1;
  const ok = errors.length === 0 && health.brokenImgs === 0 && !overflow && health.textNodes > 0;
  if (!ok) bad += 1;

  console.log(
    `${ok ? 'ok  ' : 'FAIL'}  ${card.path.padEnd(34)} imgs ${health.imgs - health.brokenImgs}/${health.imgs}` +
      `  text ${health.textNodes}` +
      (overflow ? `  OVERFLOW ${health.scrollW}>${health.clientW}` : '') +
      (errors.length ? `  ERR ${errors[0].slice(0, 90)}` : ''),
  );

  await page.screenshot({
    path: join(SHOTS, card.path.replace(/[\\/]/g, '-').replace('.html', '.png')),
    fullPage: card.path.startsWith('pages/'),
  });
  await page.close();
}

await browser.close();
console.log(bad === 0 ? '\nall previews render clean' : `\n${bad} preview(s) need attention`);
process.exit(bad === 0 ? 0 : 1);
