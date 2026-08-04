# Portfolio — Tushar Lachman

The source for my personal site: four project write-ups, each with a trailer, a
full walkthrough recording and screenshots.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

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
src/data/projects.ts     every project's copy, stack, media and accent colour
src/app/page.tsx         the whole page — hero, project blocks, skills, contact
src/components/Media.tsx video and screenshot slots, with placeholder fallbacks
public/media/            trailers, walkthroughs and screenshots
design-system/           standalone HTML previews of each component
```

Adding or editing a project means editing `src/data/projects.ts` and dropping
files into `public/media/`. Nothing else has to be wired up: a media slot whose
file is missing renders a labelled placeholder naming the exact filename it
wants, so the layout never breaks half-finished.

## Design system

`design-system/` builds a set of self-contained HTML previews — one per
component, plus the foundations and the whole page — with the tokens inlined as
plain CSS and the screenshots embedded, so each file opens and renders on its
own with no build step.

```bash
npx tsx design-system/build.ts   # rebuild bundle/ from src/data/projects.ts
node design-system/verify.mjs    # screenshot every card, fail on breakage
```

`design-system/tokens.ts` mirrors the Tailwind classes used in `page.tsx` and
`globals.css`. It's a mirror, not a source of truth — a change made in a design
tool has to be carried back into the React components by hand.

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
