/**
 * Builds public/og.png — the 1200×630 card every pasted link renders as.
 *
 * It exists as a script rather than as a hand-made image because the four
 * numbers on it are the same four in `HERO_STATS`, and a card built by hand
 * drifts from them the first time a project ships. This reads them out of
 * `src/data/site.ts` so the two cannot disagree.
 *
 * Composed centred rather than left-aligned: WhatsApp shows a link preview as
 * a small centre-cropped square, so everything that has to survive sits inside
 * the middle 630×630.
 *
 *   node tools/make-og.mjs
 *
 * Then bump the `?v=` on OG_IMAGE in src/app/layout.tsx — WhatsApp and LinkedIn
 * key their preview cache on the URL and hold it for a long time, so a new card
 * at the same path keeps showing the old one to anyone already sent the link.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// Read the stats straight out of the site data rather than restating them.
const site = readFileSync(join(ROOT, 'src/data/site.ts'), 'utf8');
const block = site.slice(site.indexOf('HERO_STATS'), site.indexOf('SKILLS'));
const STATS = [...block.matchAll(/\{\s*value:\s*'([^']+)',\s*label:\s*'([^']+)'\s*\}/g)].map(
  (m) => ({ value: m[1], label: m[2] }),
);
if (STATS.length !== 4) throw new Error(`Expected 4 hero stats, found ${STATS.length}`);

const portrait = readFileSync(join(ROOT, 'public/tushar-lachman.jpg')).toString('base64');

const HTML = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{
    background:#0a0e13;
    font-family:'Space Grotesk',system-ui,sans-serif;
    color:#e9eef4;
    display:flex;align-items:center;justify-content:center;
    position:relative;overflow:hidden;
  }
  /* The same 32px grid and teal wash the site itself paints, so a preview and
     the page it opens read as one thing. */
  .grid{
    position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,.032) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.032) 1px,transparent 1px);
    background-size:32px 32px;
  }
  .wash{
    position:absolute;left:50%;top:-14%;transform:translateX(-50%);
    width:1100px;height:760px;
    background:radial-gradient(ellipse at center,rgba(14,165,233,.16),rgba(14,165,233,0) 62%);
  }
  .inner{position:relative;text-align:center;width:1200px;padding:0 60px}
  .face{
    width:136px;height:136px;border-radius:50%;
    object-fit:cover;display:block;margin:0 auto;
    border:3px solid #38bdf8;
    box-shadow:0 0 0 8px rgba(56,189,248,.10);
  }
  .avail{
    margin-top:28px;
    font-family:'JetBrains Mono',ui-monospace,monospace;
    font-size:14px;font-weight:500;letter-spacing:.19em;
    color:#38bdf8;text-transform:uppercase;
  }
  .avail b{font-size:15px;line-height:0;vertical-align:middle;margin-right:9px}
  h1{margin-top:14px;font-size:72px;font-weight:600;letter-spacing:-.022em;line-height:1.02}
  .disc{margin-top:12px;font-size:31px;font-weight:400;color:#9fb2c6;letter-spacing:.005em}
  .desc{
    margin:20px auto 0;max-width:690px;
    font-size:20px;line-height:1.44;color:#7d8a99;
  }
  .stats{margin-top:32px;display:flex;gap:13px;justify-content:center}
  .stat{
    width:186px;padding:15px 0 16px;
    background:#121821;border:1px solid rgba(255,255,255,.09);border-radius:13px;
  }
  .stat .v{font-size:35px;font-weight:600;line-height:1;letter-spacing:-.02em}
  .stat .l{
    margin-top:9px;
    font-family:'JetBrains Mono',ui-monospace,monospace;
    font-size:11px;letter-spacing:.15em;color:#7d8a99;text-transform:uppercase;
  }
</style></head>
<body>
  <div class="grid"></div><div class="wash"></div>
  <div class="inner">
    <img class="face" src="data:image/jpeg;base64,${portrait}" alt="">
    <div class="avail"><b>&#9679;</b>Open to software, data &amp; AI/ML roles</div>
    <h1>Tushar Lachman</h1>
    <div class="disc">Software &middot; Data &middot; AI/ML</div>
    <div class="desc">Six products built end to end. One runs a family practice in Jakarta every day, on a paid subscription.</div>
    <div class="stats">
      ${STATS.map((s) => `<div class="stat"><div class="v">${s.value}</div><div class="l">${s.label}</div></div>`).join('\n      ')}
    </div>
  </div>
</body></html>`;

const work = mkdtempSync(join(tmpdir(), 'og-'));
const page = join(work, 'og.html');
writeFileSync(page, HTML);

const profile = mkdtempSync(join(tmpdir(), 'og-profile-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--force-color-profile=srgb',
  '--font-render-hinting=none',
  '--hide-scrollbars',
  '--remote-debugging-port=9477',
  `--user-data-dir=${profile}`,
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9477/json/new?about:blank', { method: 'PUT' });
      return (await res.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Chrome never came up');
}

const ws = new WebSocket(await targetWs());
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1200,
  height: 630,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.navigate', { url: `file:///${page.replace(/\\/g, '/')}` });
await sleep(1200);
// Google Fonts are fetched over the network and Chrome will happily paint a
// frame before either face has landed, which silently swaps the whole card to
// the fallback stack. Waiting on document.fonts is the only reliable gate.
await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
await sleep(400);

const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(join(ROOT, 'public/og.png'), Buffer.from(shot.result.data, 'base64'));

ws.close();
chrome.kill();
console.log('public/og.png written —', STATS.map((s) => `${s.value} ${s.label}`).join(' · '));
process.exit(0);
