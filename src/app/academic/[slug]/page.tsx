import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/Sheet';
import { ACADEMIC } from '@/data/projects';

/** Every academic unit shares one accent — they belong to the degree rather
 * than to five separate products, and giving each its own colour would make
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

  return {
    title: item.name,
    description: `${item.course} at RMIT. ${item.blurb.slice(0, 160)}`,
    openGraph: {
      title: `${item.name} — Tushar Lachman`,
      description: item.tagline,
    },
  };
}

export default async function AcademicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = ACADEMIC.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const item = ACADEMIC[index];
  const next = ACADEMIC[(index + 1) % ACADEMIC.length];
  const prev = ACADEMIC[(index - 1 + ACADEMIC.length) % ACADEMIC.length];

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
      notes={item.points}
      shots={[]}
      repoNote="Coursework — repository and report available on request."
      index={index}
      total={ACADEMIC.length}
      prevHref={`/academic/${prev.slug}`}
      nextHref={`/academic/${next.slug}`}
      nextName={next.name}
      nextAccent={ACADEMIC_ACCENT}
      moreToAdd="Coursework, so the code and the marked report stay with RMIT rather than on GitHub. Happy to walk through either."
    />
  );
}
