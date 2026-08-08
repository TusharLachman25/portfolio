import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sheet } from '@/components/Sheet';
import { PROJECTS } from '@/data/projects';

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

  return {
    title: project.name,
    description: `${project.tagline} ${project.blurb.slice(0, 160)}`,
    openGraph: {
      title: `${project.name} — Tushar Lachman`,
      description: project.tagline,
      images: project.shots[0]?.src ?? project.trailerPoster,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];

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
      panel={project.flows?.[0]?.steps[0]?.src ?? project.shots[0]?.src ?? project.trailerPoster}
      shots={project.shots}
      flows={project.flows}
      mediaNote={project.note}
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
      moreToAdd={
        project.shots.length === 0
          ? 'No screenshots on file for this one yet — it is the smallest thing here and the only one without captures. The write-up above is from the source.'
          : undefined
      }
    />
  );
}
