# Portfolio design system — Tushar Lachman

Every file here is a standalone HTML preview of one piece of the portfolio at
`portfolio/`. Nothing depends on Tailwind, Next.js, or a network fetch: the
tokens are inlined as plain CSS and the screenshots are embedded as `data:`
URIs, so each file opens and renders on its own.

The first line of each file is a `@dsCard` marker naming the group it belongs
to.

## Cards

| File | Group | What it is |
|---|---|---|
| `foundations/color.html` | Foundations | Neutral ramp, primary, the four per-project accents, lines and surfaces |
| `foundations/type.html` | Foundations | Type scale — Inter for text, JetBrains Mono for labels |
| `components/header.html` | Chrome | Sticky blurred header with the résumé action |
| `components/footer.html` | Chrome | Hairline rule, mono copyright |
| `components/hero.html` | Sections | Eyebrow, name, positioning statement, three actions |
| `components/skills.html` | Sections | Five labelled rows on hairline rules |
| `components/academic.html` | Sections | Two-up card grid with course codes |
| `components/contact.html` | Sections | Closing statement and two actions |
| `components/project-header.html` | Project block | Title + status chip + tagline, shown in all four accents |
| `components/highlights.html` | Project block | Accent-bulleted list at its real measure |
| `components/stack.html` | Project block | Mono stack pills, all four projects |
| `components/media-figure.html` | Project block | Trailer and walkthrough figures with poster and caption |
| `components/shot-grid.html` | Project block | Two-up 16:10 captioned screenshots |
| `components/project-block.html` | Project block | One whole project, everything assembled |
| `pages/full-page.html` | Pages | The entire page, top to bottom |

`cards.json` lists the same thing in machine-readable form, including the
viewport width each card is designed to be judged at.

## What is real and what is a stand-in

- The copy, project names, stack lists and captions are the live site's.
- Videos are shown as their **poster frame with a play triangle** rather than a
  real `<video>` — a preview only has to communicate the design, and the four
  trailers are several megabytes each.
- Screenshots are downscaled. The full-page preview uses smaller thumbnails
  than the component previews so the file stays under the 256 KiB per-file
  limit.

## Regenerating

From `portfolio/`:

```
npx tsx design-system/build.ts     # rebuild bundle/ from src/data/projects.ts
node design-system/verify.mjs      # screenshot every card, fail on breakage
```

`design-system/tokens.ts` mirrors the Tailwind classes in `src/app/page.tsx`
and `src/app/globals.css`. It is a mirror, not a source of truth — a change
made in Claude Design has to be carried back into the React components by
hand.
