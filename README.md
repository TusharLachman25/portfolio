# Portfolio — Tushar Lachman

The source for my personal site: a scrolling home page plus a dedicated sheet
for each of six projects and nine academic units, most with a trailer, a full
walkthrough recording and screenshots.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
Every page is statically generated.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

`next start` serves the last build — after changing anything you have to
rebuild *and* restart, not just rebuild.

## Layout

```
src/data/projects.ts     every project and unit: copy, stack, layers, metrics, media
src/data/site.ts         email, links, skills, hero stats, title block, education
src/app/page.tsx         the home page
src/app/work/[slug]/     one sheet per project
src/app/academic/[slug]/ one sheet per academic unit
src/components/Shell.tsx sidebar, icon rail, mobile drawer, theme, ⌘K palette
src/components/Sheet.tsx the sheet layout both routes render into
src/app/globals.css      the whole design system as CSS custom properties
public/media/            trailers, walkthroughs and screenshots
resume/resume.css        typography shared by both résumé variants
resume/resume.html       the two-page résumé
resume/resume-onepage.html   the one-page cut
tools/make-resume.mjs    prints both to PDF; each must hit its page count
tools/make-og.mjs        rebuilds public/og.png from the hero stats
design-system/           standalone HTML previews (see the note below)
```

```bash
npm run resume     # rebuild both PDFs
npm run resume "path/to/dated/folder"   # ...and drop copies alongside them
npm run og         # rebuild the link-preview card
```

### The two résumés

`resume.html` is the full one at two pages, and the site links to it.
`resume-onepage.html` is a genuinely different document rather than the same one
with things switched off — four projects and an "also built" line instead of
six entries, one or two bullets each, no academic section, and experience
carrying its description on the line under the title. Plenty of graduate and
internship postings ask for one page and mean it; plenty of others reward the
detail. Both are kept so neither has to be reconstructed under time pressure.

`make-resume.mjs` **refuses to write a variant that misses its page count** — two
for the long one, one for the short. A résumé that quietly grows a page is the
most likely thing to break when a project is added, and it is invisible from the
source. When it refuses, cut prose; do not shrink the type. The one-pager's
`<style>` block overrides the space between blocks and nothing else, for the same
reason: a one-page résumé set smaller than the two-page one is a worse document,
not a shorter one.

Both generators drive headless Chrome and fetch Poppins from Google, so they need
a network connection. The résumé had no source file at all until these existed —
the PDF was rebuilt once by measuring the old one's content stream, which is not
a thing to do twice. After `npm run og`, bump the `?v=` on `OG_IMAGE` in
`src/app/layout.tsx`: WhatsApp and LinkedIn cache a preview by URL and hold it
for a long time.

Adding a project means adding an entry to `src/data/projects.ts` and dropping
files into `public/media/`. The route, the sidebar entry, the command-palette
entry, the prev/next pager and the sitemap all come from that array.

## Design notes worth knowing before editing

- **The theme and rail are DOM attributes, not React state.** An inline script
  in `<head>` restores `data-theme` and `data-rail` from `localStorage` before
  the first paint. Both the expanded sidebar and the icon rail are always in the
  DOM; CSS picks one. Deriving either from React state reintroduces a flash on
  every cold load.
- **Responsive behaviour is pure CSS**, driven off two breakpoints — 1180px
  (columns collapse) and 780px (the sidebar becomes an off-canvas drawer behind
  a 61px sticky top bar). No viewport measuring in JavaScript, so a phone never
  paints a frame without navigation.
- **Scroll reveal is opt-in and fail-safe.** `[data-reveal]` elements are only
  hidden once the boot script has confirmed scripting is on, and a timeout
  un-hides everything regardless. The hero is deliberately *not* revealed — it
  is above the fold and must never wait on a bundle.
- `--pad`, the grid column templates and the sidebar width are all custom
  properties set once at the top of `globals.css`; per-project accent colours
  ride on `--accent` so a card recolours from one declaration.

## Design system

`design-system/` builds self-contained HTML previews with tokens inlined and
screenshots embedded, so each file opens and renders with no build step.

```bash
npx tsx design-system/build.ts   # rebuild bundle/ from src/data/projects.ts
node design-system/verify.mjs    # screenshot every card, fail on breakage
```

⚠️ **These previews document the pre-redesign visual language** and have not
been regenerated for the current one. The components they draw are the old ones,
and the checked-in `bundle/` also holds project copy that has since changed —
the medical platform's counts and its assistant's tool count are both stale in
there. Either regenerate them against `globals.css` or delete the folder; don't
treat them as the source of truth for how the site looks or what it says.

## A note on the media

Everything on screen is the real application. The data in it is not always
real, and where it isn't, that's deliberate:

- **Medical platform** — invented demo patients only. No document is shown at
  all: the letterhead carries a real doctor's registration numbers, signature
  seal and bank details.
- **Jarvis** — my own account, with the financial figures masked in the rendered
  page before capture. The masking is display-only and never touched the
  database; balances are scaled by a constant factor so the totals still add up.
- **Locked In** — the squad stopped using the app, so the leaderboard totals are
  placeholders written into the page at capture time. The names, the ranking
  logic and the app itself are real.
- **Kitchen OS** — a demo pantry, seeded through the app's own functions rather
  than written straight into the tables, so ingredient lookup and the pantry
  write ran exactly as they do in use.
- **Bets** — invented wagers between invented people, driven end to end against
  a stubbed network so every state change on screen is a real write.
- **FitScroll** — no captures at all, and its sheet says so rather than filling
  the space. It is a native Android app built around a camera, so the headless
  Chrome trick every other sheet was shot with does not apply to it.

## Where the numbers come from

Every figure on the site is countable in the repository it describes, so any of
them can be checked in an interview:

| Claim | Source |
|---|---|
| 73 edge functions | `supabase/functions/*` in the medical repo |
| 39 migrations | `supabase/migrations/*` |
| 637 unit tests | `npx vitest run` — 39 files, 637 passing (10 skipped) |
| 38 assistant tools | `supabase/functions/_shared/aiTools/*` |
| 125 unit tests | `./gradlew testDebugUnitTest` in FitScroll — `@Test` count, 125 |
| 38 REST endpoints | `src/app/api/**/route.ts` in Jarvis |
| 10 migrations | `supabase/migrations/*` in Jarvis |
| 111 API + edge functions | 73 + 38 |
| 762 unit tests | 637 + 125 |
| ~5,000 lines of TypeScript | the twelve modules in the Locked In repo |
| ~3,500 lines of Python | `wc -l *.py` in Kitchen OS (3,484) |
| 66 backend functions | `def` count in Kitchen OS's `backend.py` |
