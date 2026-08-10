import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/Sheet';
import { heroShot, PROJECTS } from '@/data/projects';
import { imageSize } from '@/lib/imageSize';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  // Search engines cut a description around 155 characters, so this takes whole
  // sentences up to that length rather than slicing mid-word.
  const description = clamp(`${project.tagline} ${project.blurb}`, 155);
  const card = heroShot(project);

  return {
    title: project.name,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      url: `/work/${project.slug}`,
      title: `${project.name} — Tushar Lachman`,
      description: project.tagline,
      images: card,
    },
    twitter: { card: 'summary_large_image', images: card },
  };
}

/** Trim to whole sentences within `max`, falling back to a word boundary. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const lastStop = head.lastIndexOf('. ');
  if (lastStop > max * 0.5) return head.slice(0, lastStop + 1);
  return `${head.slice(0, head.lastIndexOf(' '))}…`;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const panel = heroShot(project);

  return (
    <Sheet
      crumb="Projects"
      crumbHref="/#work"
      name={project.name}
      kind={project.kind}
      status={project.status}
      tagline={project.tagline}
      period={project.period}
      role={project.role}
      accent={project.accent}
      logo={project.logo}
      blurb={project.blurb}
      layers={project.layers}
      stack={project.stack}
      metrics={project.metrics}
      notes={project.highlights}
      panel={panel}
      panelSize={panel ? imageSize(panel) : undefined}
      shots={project.shots}
      flows={project.flows}
      portraitShots={project.portraitShots}
      mediaNote={project.note}
      testimonial={project.testimonial}
      trailer={project.trailer}
      trailerPoster={project.trailerPoster}
      trailerNote={project.trailerNote}
      video={project.video}
      poster={project.poster}
      videoNote={project.videoNote}
      repo={project.repo}
      repoNote={project.repoNote}
      index={index}
      total={PROJECTS.length}
      prevHref={`/work/${prev.slug}`}
      nextHref={`/work/${next.slug}`}
      nextName={next.name}
      nextAccent={next.accent}
    />
  );
}
