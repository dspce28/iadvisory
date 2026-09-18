import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — Loans, Credit and Financial Planning',
  description:
    'Practical guidance on credit scores, home loans, business borrowing and financial planning from the iAdvisory team.',
  alternates: { canonical: '/blog/' },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Blog() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Insights &amp; <span style={{ color: 'var(--red)' }}>Guides</span></h1>
          <p>Straight answers on loans, credit and planning — no sales pitch.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap">
          <div className="bcards">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link prefetch={false} className="bcard" href={`/blog/${p.slug}/`}>
                  <div className="bimg" aria-hidden="true">{p.icon}</div>
                  <div className="bcat">{p.category}</div>
                  <h2 className="bcard-title">{p.title}</h2>
                  <p>{p.excerpt}</p>
                  <div className="bmeta">
                    <time dateTime={p.date}>{fmt(p.date)}</time>
                    <span>{p.readMins} min read</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
