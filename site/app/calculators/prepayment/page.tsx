import type { Metadata } from 'next';
import Link from 'next/link';
import PrepaymentCalculator from '@/components/PrepaymentCalculator';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Prepayment Calculator — What a Lump Sum Really Saves',
  description: 'See how much interest a prepayment saves and how sharply that depends on when in the tenure you make it.',
  alternates: { canonical: '/calculators/prepayment/' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Prepayment Calculator — What a Lump Sum Really Saves',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function Page() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span>{' '}
            <Link href="/calculators/">Calculators</Link> <span>/</span>{' '}
            <span aria-current="page">Prepayment Calculator</span>
          </nav>
          <h1>Prepayment Calculator</h1>
          <p>See how much interest a prepayment saves and how sharply that depends on when in the tenure you make it.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <PrepaymentCalculator />
          <p className="note" style={{ marginTop: '2rem' }}>
            Indicative only. {site.name} does not set rates or eligibility — the lender does. Nothing
            you type here is stored or sent anywhere.
          </p>
          <div className="prose-cta" style={{ marginTop: '2.5rem' }}>
            <h3>Want this checked against real offers?</h3>
            <p>A short call with an advisor costs nothing and there is no upfront fee.</p>
            <Link className="btn btn-red btn-lg" href="/contact/">Talk to an advisor</Link>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
