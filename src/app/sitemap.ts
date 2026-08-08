import type { MetadataRoute } from 'next';
import { ACADEMIC, PROJECTS } from '@/data/projects';

const BASE = 'https://tusharlachman.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...ACADEMIC.map((a) => ({
      url: `${BASE}/academic/${a.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
