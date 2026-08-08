# Portfolio — Tushar Lachman

The source for my personal site: a scrolling home page plus a dedicated sheet
for each of five projects and seven academic units, most with a trailer, a full
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
design-system/           standalone HTML previews (see the note below)
```

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
been regenerated for the current one. They still build and still read the real
project data, but the components they draw are the old ones. Either regenerate
them against `globals.css` or delete the folder — don't treat them as the source
of truth for how the site looks now.

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
- **Bets** — no captures at all. Its sheet says so rather than filling the space.

## Where the numbers come from

Every figure on the site is countable in the repository it describes, so any of
them can be checked in an interview:

| Claim | Source |
|---|---|
| 66 edge functions | `supabase/functions/*` in the medical repo |
| 31 migrations | `supabase/migrations/*` |
| 269 unit tests | `npx vitest run` — 17 files, 269 passing |
| 38 REST endpoints | `src/app/api/**/route.ts` in Jarvis |
| 10 migrations | `supabase/migrations/*` in Jarvis |
| 104 API + edge functions | 66 + 38 |
| ~5,000 lines of TypeScript | the twelve modules in the Locked In repo |
| ~3,500 lines of Python | `wc -l *.py` in Kitchen OS (3,484) |
| 66 backend functions | `def` count in Kitchen OS's `backend.py` |
