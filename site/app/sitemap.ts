import type { MetadataRoute } from 'next';
import { loanProducts, site } from '@/lib/site';
import { posts } from '@/lib/posts';
import { comparisons } from '@/lib/comparisons';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = [
    { path: '/', priority: 1.0 },
    { path: '/loans/', priority: 0.9 },
    { path: '/apply/', priority: 0.9 },
    { path: '/compare/', priority: 0.8 },
    { path: '/calculators/', priority: 0.8 },
    { path: '/emi-calculator/', priority: 0.8 },
    { path: '/calculators/eligibility/', priority: 0.8 },
    { path: '/calculators/balance-transfer/', priority: 0.7 },
    { path: '/calculators/prepayment/', priority: 0.7 },
    { path: '/cibil-score/', priority: 0.7 },
    { path: '/about/', priority: 0.6 },
    { path: '/contact/', priority: 0.7 },
    { path: '/blog/', priority: 0.6 },
    { path: '/privacy-policy/', priority: 0.2 },
    { path: '/terms/', priority: 0.2 },
  ];
  return [
    ...fixed.map((f) => ({
      url: `${site.url}${f.path}`,
      lastModified: now,
      priority: f.priority,
    })),
    ...loanProducts.map((p) => ({
      url: `${site.url}/loans/${p.slug}/`,
      lastModified: now,
      priority: 0.9,
    })),
    ...comparisons.map((c) => ({
      url: `${site.url}/compare/${c.slug}/`,
      lastModified: now,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      priority: 0.5,
    })),
  ];
}
