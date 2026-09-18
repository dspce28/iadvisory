import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import EmiWidget from '@/components/EmiWidget';
import { loanProducts, site } from '@/lib/site';

export function generateStaticParams() {
  return loanProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = loanProducts.find((x) => x.slug === slug);
  if (!p) return {};
  const url = `${site.url}/loans/${p.slug}/`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url,
      type: 'article',
      // og:image intentionally omitted: the sibling opengraph-image.tsx
      // supplies a proper 1200x630 card. Setting it here would override that.
    },
  };
}

export default async function LoanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = loanProducts.find((x) => x.slug === slug);
  if (!p) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Loans', item: `${site.url}/loans/` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${site.url}/loans/${p.slug}/` },
    ],
  };

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/loans/">Loans</Link>{' '}
            <span>/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <h1>
            {p.name} <span style={{ color: 'var(--red)' }}>in {site.address.locality}</span>
          </h1>
          <p>{p.blurb}</p>
          <div className="pfacts">
            <div><strong>{p.rateFrom}</strong><span>Rates from</span></div>
            <div><strong>{p.maxAmount}</strong><span>Maximum</span></div>
            <div><strong>{p.maxTenure}</strong><span>Max tenure</span></div>
          </div>
          <div className="hero-actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn-red btn-lg" href="/apply/">Apply Now — Free</Link>
            <a className="btn btn-ghost btn-lg" href={`tel:${site.phone}`}>Talk to an Advisor</a>
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap lp-grid">
          <div>
            <Reveal>
              <h2 className="h" style={{ textAlign: 'left' }}>What this covers</h2>
              <ul className="ticks">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="h" style={{ textAlign: 'left', marginTop: '3rem' }}>Who qualifies</h2>
              <ul className="ticks">
                {p.eligibility.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="h" style={{ textAlign: 'left', marginTop: '3rem' }}>
                Documents you will need
              </h2>
              <ul className="ticks">
                {p.documents.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <p className="note">
                Share documents with your advisor directly. Never upload identity documents to a
                page that does not clearly tell you where they are going.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="h" style={{ textAlign: 'left', marginTop: '3rem' }}>
                Common questions
              </h2>
              <div className="faqs">
                {p.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lp-aside">
            <Image src={p.image} alt={p.name} width={400} height={400} className="lp-img" />
            <EmiWidget compact defaultRate={parseFloat(p.rateFrom)} />
            <div className="aside-box">
              <h4>Why apply through us</h4>
              <div className="ali">Free advisory — no upfront fees</div>
              <div className="ali">One profile, compared across {site.stats.partnerBanks} lenders</div>
              <div className="ali">We flag the offers you will not qualify for</div>
              <div className="ali">A named advisor, not a call centre</div>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
