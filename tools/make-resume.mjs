/**
 * Renders the résumé sources in resume/ to PDFs through headless Chrome.
 *
 *   node tools/make-resume.mjs [outDir ...]
 *
 * Writes public/Tushar-Lachman-Resume.pdf (two pages) and
 * public/Tushar-Lachman-Resume-1-page.pdf (one), plus a copy of each into every
 * extra directory named on the command line — the dated folder under
 * Documents/CVs is passed that way rather than hard-coded, since it lives
 * outside this repository.
 *
 * Each variant declares its page count and neither is written unless it matches.
 * A résumé that quietly grows a page is the single most likely thing to go wrong
 * when a project is added, and it is invisible from the source file.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const COPIES = process.argv.slice(2);

const VARIANTS = [
  {
    source: 'resume/resume.html',
    out: 'public/Tushar-Lachman-Resume.pdf',
    copyAs: 'Tushar Ajit Lachman Resume.pdf',
    pages: 2,
  },
  {
    source: 'resume/resume-onepage.html',
    out: 'public/Tushar-Lachman-Resume-1-page.pdf',
    copyAs: 'Tushar Ajit Lachman Resume (1 page).pdf',
    pages: 1,
  },
];

const profile = mkdtempSync(join(tmpdir(), 'resume-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--force-color-profile=srgb',
  '--font-render-hinting=none',
  '--remote-debugging-port=9488',
  `--user-data-dir=${profile}`,
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9488/json/new?about:blank', { method: 'PUT' });
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

const failures = [];

for (const variant of VARIANTS) {
  const source = join(ROOT, variant.source);
  await send('Page.navigate', { url: `file:///${source.replace(/\\/g, '/')}` });
  await sleep(1200);
  // Poppins comes over the network. Chrome will happily print a frame before
  // the faces land, which silently sets the whole document in the fallback
  // stack and reflows every line — so the page count itself depends on this
  // having resolved.
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
  await sleep(400);

  const printed = await send('Page.printToPDF', {
    // A4 in inches, matching the @page rule. preferCSSPageSize keeps Chrome
    // from rescaling to fit its own idea of the paper — the CSS is authored in
    // pixels at 96dpi, and a scale other than 1 would carry every measured
    // metric off.
    paperWidth: 8.27,
    paperHeight: 11.69,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    scale: 1,
    preferCSSPageSize: true,
    printBackground: true,
  });

  if (!printed.result?.data) throw new Error(`Chrome printed nothing for ${variant.source}`);
  const pdf = Buffer.from(printed.result.data, 'base64');

  // Count the page objects rather than trusting the render. `/Type /Page` also
  // matches `/Type /Pages`, so the trailing delimiter has to be excluded.
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (pages !== variant.pages) {
    const rejected = join(tmpdir(), `${basename(variant.out, '.pdf')}-rejected.pdf`);
    writeFileSync(rejected, pdf);
    failures.push(
      `${variant.source} came out ${pages} page${pages === 1 ? '' : 's'}, not ${variant.pages}. ` +
        `Cut prose rather than shrinking the type. Rejected render: ${rejected}`,
    );
    continue;
  }

  writeFileSync(join(ROOT, variant.out), pdf);
  for (const dir of COPIES) writeFileSync(join(dir, variant.copyAs), pdf);

  console.log(`${basename(variant.out)} — ${pages} page${pages === 1 ? '' : 's'}, ${(pdf.length / 1024).toFixed(0)} KB`);
  for (const dir of COPIES) console.log(`  copied to ${dir} as "${variant.copyAs}"`);
}

ws.close();
chrome.kill();

// Both variants are attempted before anything throws, so one that no longer
// fits does not hide the state of the other.
if (failures.length) throw new Error(`\n${failures.join('\n')}`);
process.exit(0);
