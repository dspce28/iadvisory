import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { comparisons, getComparison } from '@/lib/comparisons';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const url = `${site.url}/compare/${c.slug}/`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url, type: 'article' },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${site.url}/compare/` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/compare/${c.slug}/` },
    ],
  };

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/compare/">Comparisons</Link>{' '}
            <span>/</span> <span aria-current="page">{c.title}</span>
          </nav>
          <h1>{c.h1}</h1>
          <p>{c.metaDescription}</p>
        </div>
      </div>

      <section className="sec">
        <div className="wrap prose">
          <p className="lede">{c.intro}</p>

          <Reveal>
            <h2>Side by side</h2>
            <div className="table-scroll">
              <table className="cmp">
                <thead>
                  <tr>
                    <th scope="col">Factor</th>
                    <th scope="col">{c.optionA}</th>
                    <th scope="col">{c.optionB}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r) => (
                    <tr key={r.factor}>
                      <th scope="row">{r.factor}</th>
                      <td>{r.a}</td>
                      <td>{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <div className="choose">
              <div className="choose-col">
                <h3>Choose {c.optionA} if…</h3>
                <ul className="ticks">
                  {c.chooseA.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div className="choose-col">
                <h3>Choose {c.optionB} if…</h3>
                <ul className="ticks">
                  {c.chooseB.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2>Our view</h2>
            <p>{c.verdict}</p>
          </Reveal>

          <Reveal>
            <h2>Common questions</h2>
            <div className="faqs">
              {c.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <div className="prose-cta">
            <h3>Not sure which applies to you?</h3>
            <p>A short call with an advisor costs nothing and there is no upfront fee.</p>
            <Link className="btn btn-red btn-lg" href="/contact/">Talk to an advisor</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
