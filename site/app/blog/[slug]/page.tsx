import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, posts } from '@/lib/posts';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = `${site.url}/blog/${p.slug}/`;
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.excerpt,
      url,
      publishedTime: p.date,
    },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
  };

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/blog/">Blog</Link>{' '}
            <span>/</span> <span aria-current="page">{p.category}</span>
          </nav>
          <h1>{p.title}</h1>
          <p>
            <time dateTime={p.date}>{fmt(p.date)}</time> · {p.readMins} min read
          </p>
        </div>
      </div>
      <section className="sec">
        <article className="wrap prose">
          <p className="lede">{p.excerpt}</p>
          {p.body.map((b, i) => (
            <div key={i}>
              {b.h ? <h2>{b.h}</h2> : null}
              <p>{b.p}</p>
            </div>
          ))}
          <div className="prose-cta">
            <h3>Want this applied to your own situation?</h3>
            <p>A short call with an advisor costs nothing and there is no upfront fee.</p>
            <Link className="btn btn-red btn-lg" href="/contact/">Talk to an advisor</Link>
          </div>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
