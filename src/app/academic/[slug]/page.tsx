import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/Sheet';
import { ACADEMIC } from '@/data/projects';
import { OG_IMAGE } from '@/data/site';
import { imageSize } from '@/lib/imageSize';
import { clamp } from '@/lib/text';

/** Every academic unit shares one accent — they belong to the degree rather
 * than to seven separate products, and giving each its own colour would make
 * coursework read as loud as the shipped work. */
const ACADEMIC_ACCENT = '#818cf8';

export function generateStaticParams() {
  return ACADEMIC.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = ACADEMIC.find((a) => a.slug === slug);
  if (!item) return {};

  // Everything here has to be said outright. A page's `openGraph` and
  // `twitter` replace the layout's wholesale rather than merging with them,
  // and `alternates` is inherited as it stands — so without these lines every
  // unit told search engines it was the home page, previewed with no image,
  // and on X carried the home page's title and description.
  const url = `/academic/${item.slug}`;
  // The two units that produced figures lead with the first one; the rest
  // fall back to the site's own card.
  const figure = item.shots?.[0]?.src;
  const images = figure ? [{ url: figure, alt: `${item.name} — ${item.shots?.[0]?.title}` }] : [OG_IMAGE];

  return {
    title: item.name,
    description: clamp(`${item.course} at RMIT. ${item.blurb}`, 155),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${item.name} — Tushar Lachman`,
      description: item.tagline,
      images,
    },
    twitter: { card: 'summary_large_image', images },
  };
}

export default async function AcademicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = ACADEMIC.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const item = ACADEMIC[index];
  const next = ACADEMIC[(index + 1) % ACADEMIC.length];
  const prev = ACADEMIC[(index - 1 + ACADEMIC.length) % ACADEMIC.length];

  // Two units produced real figures; the other five produced a report and a
  // grade. Where figures exist the first one leads the sheet, and where they
  // don't the hero says so rather than reaching for a stock image.
  const shots = item.shots ?? [];
  const panel = shots[0]?.src;

  return (
    <Sheet
      crumb="Academic projects"
      crumbHref="/#academic"
      name={item.name}
      kind={item.kind}
      status={item.unit}
      tagline={item.tagline}
      period={`${item.course} · ${item.term}`}
      role={item.role}
      accent={ACADEMIC_ACCENT}
      blurb={item.blurb}
      layers={item.stack}
      stack={item.stack}
      metrics={[]}
      notes={item.points.map((body) => ({ body }))}
      panel={panel}
      panelSize={panel ? imageSize(panel) : undefined}
      shots={shots}
      mediaNote={
        shots.length > 0
          ? 'Every figure here was written by the project’s own code — matplotlib and seaborn output from the notebook and the experiment scripts, exported unedited. Nothing on this page is a mock-up or a redrawing.'
          : undefined
      }
      index={index}
      total={ACADEMIC.length}
      prevHref={`/academic/${prev.slug}`}
      nextHref={`/academic/${next.slug}`}
      nextName={next.name}
      nextAccent={ACADEMIC_ACCENT}
    />
  );
}
