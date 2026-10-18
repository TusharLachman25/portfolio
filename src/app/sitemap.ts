import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { ACADEMIC, PROJECTS } from '@/data/projects';
import { SITE_URL as BASE } from '@/data/site';

/** When a page's words last changed: the last commit to touch the files it is
 * built from. Read once at build time. A build with no git history to ask —
 * a tarball, a shallow CI checkout — falls back to the build itself, which
 * is at worst a few days generous. */
function lastChanged(...paths: string[]): Date {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    /* no git, or not a repository */
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Every project and unit is written in projects.ts, so they share its date;
  // the home page also carries the copy in site.ts and the page itself.
  const sheets = lastChanged('src/data/projects.ts', 'src/components/Sheet.tsx', 'public/media');
  const home = lastChanged('src/data', 'src/app/page.tsx', 'public/media');

  return [
    { url: BASE, lastModified: home, changeFrequency: 'monthly', priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: sheets,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...ACADEMIC.map((a) => ({
      url: `${BASE}/academic/${a.slug}`,
      lastModified: sheets,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
