/** Builds the Claude Design bundle.
 *
 * Each preview is a standalone HTML file that inlines the tokens and its own
 * markup, so nothing in the bundle depends on Tailwind, Next, or a network
 * fetch. Media is downscaled and embedded as data: URIs for the same reason —
 * a preview that renders a broken-image icon is worse than no preview.
 *
 * Run with:  npx tsx design-system/build.ts
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PROJECTS, ACADEMIC, type Project } from '../src/data/projects';
import { ACCENTS, BASE_CSS, COLOR } from './tokens';

const HERE = dirname(fileURLToPath(import.meta.url));
const MEDIA = join(HERE, '..', 'public', 'media');
const OUT = join(HERE, 'bundle');
const CACHE = join(HERE, '.media-cache');

const SKILLS = [
  { label: 'Languages', items: 'Python · TypeScript · JavaScript · Java · C · C++ · SQL · Prolog' },
  { label: 'Frameworks', items: 'React · React Native (Expo) · Next.js · Node.js · Flask · Streamlit · Tailwind CSS' },
  { label: 'Cloud & DevOps', items: 'AWS (EC2, ECS, S3, DynamoDB) · Docker · Vercel · EAS Build · Firebase Cloud Messaging · Git' },
  { label: 'Backend & data', items: 'PostgreSQL · Supabase · REST API design · serverless functions · OAuth 2.0 · schema design & migrations' },
  { label: 'AI & data science', items: 'Claude API · Google Gemini (text & vision) · scikit-learn · pandas · NLTK · transformers · NetworkX' },
];

// ---- media ----------------------------------------------------------------

const dataUriCache = new Map<string, string>();

/** Downscales an image to `width` and returns it as a data: URI. Posters run
 * 30–160 KB at full size; at 640px they land around 25 KB, which keeps a
 * whole-page preview with fourteen media slots under a megabyte. */
function inlineImage(publicPath: string, width = 640): string {
  const key = `${publicPath}@${width}`;
  const hit = dataUriCache.get(key);
  if (hit) return hit;

  const src = join(MEDIA, publicPath.replace('/media/', ''));
  if (!existsSync(src)) {
    dataUriCache.set(key, '');
    return '';
  }

  mkdirSync(CACHE, { recursive: true });
  const dst = join(CACHE, `${width}-${publicPath.replace('/media/', '').replace(/[^\w.-]/g, '_')}.jpg`);
  execFileSync('ffmpeg', ['-v', 'error', '-i', src, '-vf', `scale=${width}:-2`, '-q:v', '5', dst, '-y']);

  const uri = `data:image/jpeg;base64,${readFileSync(dst).toString('base64')}`;
  dataUriCache.set(key, uri);
  return uri;
}

// ---- html helpers ---------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

interface CardMeta {
  group: string;
  name: string;
  subtitle: string;
  width: number;
  height?: number;
}

function page(meta: CardMeta, body: string): string {
  // The first line has to be the @dsCard marker — the Design System pane
  // indexes on it.
  return `<!-- @dsCard group="${meta.group}" name="${meta.name}" subtitle="${meta.subtitle}" -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${meta.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
    <style>
      :root { --font-inter: "Inter"; --font-mono: "JetBrains Mono"; }
${BASE_CSS}
    </style>
  </head>
  <body>
${body}
  </body>
</html>
`;
}

function write(path: string, meta: CardMeta, body: string): CardMeta & { path: string } {
  const full = join(OUT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, page(meta, body), 'utf8');
  return { ...meta, path };
}

// ---- component markup -----------------------------------------------------

const headerHtml = `
    <header class="site-header">
      <div class="inner">
        <a class="wordmark" href="#">TL</a>
        <nav>
          <a href="#">Work</a>
          <a href="#">Academic</a>
          <a href="#">Skills</a>
          <a href="#">Contact</a>
          <a class="btn" href="#">R&eacute;sum&eacute;</a>
        </nav>
      </div>
    </header>`;

const heroHtml = `
      <section style="padding: 112px 0">
        <p class="eyebrow">Melbourne, Australia</p>
        <h1 class="h1" style="margin-top: 20px">Tushar Lachman</h1>
        <p class="lead" style="margin-top: 24px">
          Computer Science student at RMIT University, minoring in Artificial Intelligence &amp; Machine Learning.
          I build full-stack software end to end &mdash; and then get it into people&rsquo;s hands.
          <span class="em">One of my projects is now sold on a monthly subscription and runs a medical practice in Jakarta every day.</span>
        </p>
        <p class="sub" style="margin-top: 20px">
          Most of what I build starts as a problem I actually have. Graduating July 2027 and looking for a software
          engineering internship or graduate role.
        </p>
        <div style="margin-top: 36px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
          <a class="btn btn-primary" href="#">Get in touch</a>
          <a class="btn" href="#">GitHub</a>
          <a class="btn" href="#">LinkedIn</a>
        </div>
      </section>`;

function statusChip(p: Project): string {
  if (!p.status) return '';
  return `<span class="chip" style="background: ${p.accent}14; color: ${p.accent}; border: 1px solid ${p.accent}33">${esc(p.status)}</span>`;
}

function projectHeadHtml(p: Project): string {
  return `
        <div class="proj-head">
          <h3 class="h3">${esc(p.name)}</h3>
          ${statusChip(p)}
        </div>
        <p class="tagline">${esc(p.tagline)} <span class="period">&middot; ${esc(p.period)}</span></p>`;
}

function highlightsHtml(p: Project): string {
  const items = p.highlights
    .map((h) => `<li><span class="dot" style="background: ${p.accent}"></span><span>${esc(h)}</span></li>`)
    .join('\n          ');
  return `<ul class="highlights">\n          ${items}\n        </ul>`;
}

function stackHtml(p: Project): string {
  return `<div class="stack">${p.stack.map((s) => `<span class="pill">${esc(s)}</span>`).join('')}</div>`;
}

function repoHtml(p: Project): string {
  if (p.repo) return `<p class="repo"><a href="${p.repo}">View source on GitHub &rarr;</a></p>`;
  if (p.repoNote) return `<p class="repo">${esc(p.repoNote)}</p>`;
  return '';
}

/** Videos are shown as their poster frame with a play affordance: a preview
 * only has to communicate the design, and a real <video> would drag several
 * megabytes into every card. */
function videoFigure(src: string | undefined, poster: string | undefined, caption: string, accent: string, posterW = 720): string {
  if (!src) return '';
  const uri = poster ? inlineImage(poster, posterW) : '';
  const inner = uri
    ? `<img class="frame" src="${uri}" alt="" />`
    : `<div class="frame" style="background: radial-gradient(circle at 50% 40%, ${accent}22, transparent 70%)"></div>`;
  return `
        <figure style="margin-top: 32px">
          <div style="position: relative">
            ${inner}
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none">
              <div style="height: 58px; width: 58px; border-radius: 999px; background: rgba(6,8,12,0.62); border: 1px solid ${accent}55; display: flex; align-items: center; justify-content: center">
                <div style="width: 0; height: 0; margin-left: 4px; border-left: 15px solid ${accent}; border-top: 9px solid transparent; border-bottom: 9px solid transparent"></div>
              </div>
            </div>
          </div>
          <figcaption>${esc(caption)}</figcaption>
        </figure>`;
}

function shotsHtml(p: Project, shotW = 640): string {
  if (p.shots.length === 0) return '';
  const cells = p.shots
    .map((s) => {
      const uri = inlineImage(s.src, shotW);
      const img = uri
        ? `<img src="${uri}" alt="" />`
        : `<div style="position:absolute;inset:0;background: radial-gradient(circle at 50% 40%, ${p.accent}22, transparent 70%)"></div>`;
      return `
          <figure>
            <div class="shot-frame">${img}</div>
            <figcaption>${esc(s.caption)}</figcaption>
          </figure>`;
    })
    .join('');
  return `<div class="shots">${cells}\n        </div>`;
}

function walkthroughCaption(p: Project): string {
  return p.videoNote ?? (p.trailer ? 'Full walkthrough — the app running, unedited' : 'Walkthrough');
}

/** The whole-page preview repeats this four times, so it asks for smaller
 * thumbnails — at 720px the inlined media alone pushed the file past the
 * 256 KiB the design project accepts per file. */
function projectBlockHtml(p: Project, posterW = 720, shotW = 640): string {
  return `
      <article>
${projectHeadHtml(p)}
        <p class="blurb">${esc(p.blurb)}</p>
        ${highlightsHtml(p)}
        ${stackHtml(p)}
        ${repoHtml(p)}
${videoFigure(p.trailer, p.trailerPoster, 'Trailer', p.accent, posterW)}
${videoFigure(p.video, p.poster, walkthroughCaption(p), p.accent, posterW)}
        ${shotsHtml(p, shotW)}
      </article>`;
}

const academicHtml = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
${ACADEMIC.map(
  (a) => `        <article class="card">
          <h3>${esc(a.name)}</h3>
          <p class="course">${esc(a.course)}</p>
          <p class="body">${esc(a.blurb)}</p>
          <div class="stack" style="margin-top: 16px">${a.stack.map((s) => `<span class="pill">${esc(s)}</span>`).join('')}</div>
        </article>`,
).join('\n')}
      </div>`;

const skillsHtml = `
      <dl class="skills">
${SKILLS.map(
  (s) => `        <div>
          <dt>${s.label.toUpperCase()}</dt>
          <dd>${esc(s.items)}</dd>
        </div>`,
).join('\n')}
      </dl>`;

const contactHtml = `
      <p style="max-width: 42rem; font-size: 17px; line-height: 1.625; color: var(--slate-300)">
        I&rsquo;m looking for a software engineering internship or graduate role, and I&rsquo;m happy to walk through
        any of the private projects above in detail.
      </p>
      <div style="margin-top: 28px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
        <a class="btn btn-primary" href="#">tusharbudhrani@gmail.com</a>
        <a class="btn" href="#">Download r&eacute;sum&eacute;</a>
      </div>`;

const footerHtml = `
    <footer class="site-footer">
      <div class="shell"><p>&copy; 2026 TUSHAR LACHMAN</p></div>
    </footer>`;

// ---- previews -------------------------------------------------------------

const wrap = (note: string, inner: string) =>
  `    <div class="preview">\n      <p class="preview-note">${note}</p>\n      <div class="shell" style="padding:0">${inner}\n      </div>\n    </div>`;

rmSync(OUT, { recursive: true, force: true });
const cards: (CardMeta & { path: string })[] = [];

// Foundations
const swatches = [
  ['Background', COLOR.bg],
  ['Ink', COLOR.ink],
  ['Slate 300', COLOR.slate300],
  ['Slate 400', COLOR.slate400],
  ['Slate 500', COLOR.slate500],
  ['Slate 600', COLOR.slate600],
  ['Sky 400 — primary', COLOR.sky400],
  ['Sky 300 — primary hover', COLOR.sky300],
];
cards.push(
  write(
    'foundations/color.html',
    { group: 'Foundations', name: 'Colour', subtitle: 'Neutral ramp, primary, per-project accents', width: 900 },
    wrap(
      'Foundations · colour',
      `
        <div class="swatches">
${swatches.map(([n, v]) => `          <div class="swatch"><div class="chipblk" style="background:${v}"></div><div class="meta"><div class="nm">${n}</div><div class="hex">${v}</div></div></div>`).join('\n')}
        </div>
        <p class="preview-note" style="margin-top:36px">Per-project accents</p>
        <div class="swatches">
${ACCENTS.map((a) => `          <div class="swatch"><div class="chipblk" style="background:${a.value}"></div><div class="meta"><div class="nm">${a.name}</div><div class="hex">${a.value}</div></div></div>`).join('\n')}
        </div>
        <p class="preview-note" style="margin-top:36px">Lines and surfaces on the page background</p>
        <div class="swatches">
          <div class="swatch"><div class="chipblk" style="background:rgba(255,255,255,0.02)"></div><div class="meta"><div class="nm">Surface</div><div class="hex">#fff / 2%</div></div></div>
          <div class="swatch"><div class="chipblk" style="background:rgba(255,255,255,0.03)"></div><div class="meta"><div class="nm">Surface raised</div><div class="hex">#fff / 3%</div></div></div>
          <div class="swatch"><div class="chipblk" style="background:rgba(255,255,255,0.06)"></div><div class="meta"><div class="nm">Hairline</div><div class="hex">#fff / 6%</div></div></div>
          <div class="swatch"><div class="chipblk" style="background:rgba(255,255,255,0.15)"></div><div class="meta"><div class="nm">Border, loud</div><div class="hex">#fff / 15%</div></div></div>
        </div>`,
    ),
  ),
);

cards.push(
  write(
    'foundations/type.html',
    { group: 'Foundations', name: 'Type scale', subtitle: 'Inter for text, JetBrains Mono for labels', width: 900 },
    wrap(
      'Foundations · type',
      `
        <div class="rail">
          <div><p class="preview-note">Eyebrow · mono 12 / .22em</p><p class="eyebrow">Melbourne, Australia</p></div>
          <div><p class="preview-note">Section label · mono 12 / .22em</p><h2 class="section-label" style="margin-bottom:0">Selected work</h2></div>
          <div><p class="preview-note">H1 · 60 / 600 / -0.025em</p><h1 class="h1">Tushar Lachman</h1></div>
          <div><p class="preview-note">H3 · 28 / 600</p><h3 class="h3">Locked In &mdash; Social Fitness App</h3></div>
          <div><p class="preview-note">Lead · 19 / 1.625</p><p class="lead">I build full-stack software end to end &mdash; and then get it into people&rsquo;s hands. <span class="em">One of my projects runs a medical practice in Jakarta every day.</span></p></div>
          <div><p class="preview-note">Body · 15.5 / 1.625</p><p class="blurb" style="margin-top:0">Training alone is easy to skip, so I built the accountability in. Locked In is part workout log, part social feed.</p></div>
          <div><p class="preview-note">Caption · 13</p><figcaption>Full walkthrough &mdash; the app running, unedited</figcaption></div>
          <div><p class="preview-note">Mono pill · 11.5</p><div class="stack" style="margin-top:0"><span class="pill">React Native</span><span class="pill">Supabase</span><span class="pill">EAS Build</span></div></div>
        </div>`,
    ),
  ),
);

// Chrome
cards.push(
  write('components/header.html', { group: 'Chrome', name: 'Header', subtitle: 'Sticky, blurred, résumé call to action', width: 1200, height: 160 },
    `${headerHtml}\n    <div style="height:120px"></div>`),
);
cards.push(
  write('components/footer.html', { group: 'Chrome', name: 'Footer', subtitle: 'Hairline rule, mono copyright', width: 1200, height: 160 },
    `<div style="height:60px"></div>${footerHtml}`),
);

// Sections
cards.push(write('components/hero.html', { group: 'Sections', name: 'Hero', subtitle: 'Eyebrow, name, positioning, three actions', width: 1200 },
  `    <div class="shell">${heroHtml}\n    </div>`));

cards.push(write('components/skills.html', { group: 'Sections', name: 'Skills table', subtitle: 'Five labelled rows on hairline rules', width: 1100 },
  wrap('Sections · skills', skillsHtml)));

cards.push(write('components/academic.html', { group: 'Sections', name: 'Academic cards', subtitle: 'Two-up grid, course code, stack pills', width: 1100 },
  wrap('Sections · academic work', academicHtml)));

cards.push(write('components/contact.html', { group: 'Sections', name: 'Contact', subtitle: 'Closing statement and two actions', width: 1100 },
  wrap('Sections · contact', contactHtml)));

// Project pieces, shown across all four accents where the accent matters
const medical = PROJECTS[0];
const lockedIn = PROJECTS.find((p) => p.slug === 'locked-in')!;

cards.push(write('components/project-header.html', { group: 'Project block', name: 'Project header', subtitle: 'Title, status chip, tagline — all four accents', width: 1100 },
  wrap('Project block · header', PROJECTS.map((p) => `\n        <div style="margin-bottom:28px">${projectHeadHtml(p)}</div>`).join(''))));

cards.push(write('components/highlights.html', { group: 'Project block', name: 'Highlights', subtitle: 'Accent bullet, 14.5px, 48rem measure', width: 1000 },
  wrap('Project block · highlights', `\n        ${highlightsHtml(medical)}`)));

cards.push(write('components/stack.html', { group: 'Project block', name: 'Stack pills', subtitle: 'Mono, hairline border, raised surface', width: 1000 },
  wrap('Project block · stack', PROJECTS.map((p) => `\n        <div style="margin-bottom:16px">${stackHtml(p)}</div>`).join(''))));

cards.push(write('components/media-figure.html', { group: 'Project block', name: 'Video figure', subtitle: 'Trailer and walkthrough, poster + caption', width: 1100 },
  wrap('Project block · video figure',
    `${videoFigure(medical.trailer, medical.trailerPoster, 'Trailer', medical.accent)}${videoFigure(lockedIn.video, lockedIn.poster, walkthroughCaption(lockedIn), lockedIn.accent)}`)));

cards.push(write('components/shot-grid.html', { group: 'Project block', name: 'Screenshot grid', subtitle: 'Two-up, 16:10, captioned', width: 1100 },
  wrap('Project block · screenshots', `\n        ${shotsHtml(medical)}`)));

cards.push(write('components/project-block.html', { group: 'Project block', name: 'Project block, whole', subtitle: 'Everything one project renders', width: 1200 },
  wrap('Project block · assembled', projectBlockHtml(lockedIn))));

// The page
const fullPage = `${headerHtml}
    <main class="shell">
${heroHtml}
      <section style="padding-bottom: 32px">
        <h2 class="section-label">Selected work</h2>
        <div style="display: flex; flex-direction: column; gap: 96px">
${PROJECTS.map((p) => projectBlockHtml(p, 420, 380)).join('\n')}
        </div>
      </section>
      <section style="padding-top: 96px">
        <h2 class="section-label">Academic work</h2>
${academicHtml}
      </section>
      <section style="padding: 96px 0">
        <h2 class="section-label">Skills</h2>
${skillsHtml}
      </section>
      <section style="padding-bottom: 96px">
        <h2 class="section-label">Contact</h2>
${contactHtml}
      </section>
    </main>
${footerHtml}`;

cards.push(write('pages/full-page.html', { group: 'Pages', name: 'Full portfolio page', subtitle: 'The whole thing, top to bottom', width: 1280, height: 900 }, fullPage));

writeFileSync(join(OUT, 'cards.json'), JSON.stringify(cards, null, 2), 'utf8');

const kb = (p: string) => Math.round(readFileSync(join(OUT, p)).length / 1024);
for (const c of cards) console.log(`  ${String(kb(c.path)).padStart(5)} KB  ${c.path}`);
console.log(`\n${cards.length} previews written to ${OUT}`);
