import type { Metadata } from 'next';
import Link from 'next/link';
import BalanceTransferCalculator from '@/components/BalanceTransferCalculator';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Balance Transfer Calculator — Is Switching Lenders Worth It?',
  description: 'See whether moving your loan to a lower rate actually saves money once processing, legal and foreclosure costs are counted, and when you break even.',
  alternates: { canonical: '/calculators/balance-transfer/' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Balance Transfer Calculator — Is Switching Lenders Worth It?',
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
            <span aria-current="page">Balance Transfer Calculator</span>
          </nav>
          <h1>Balance Transfer Calculator</h1>
          <p>See whether moving your loan to a lower rate actually saves money once processing, legal and foreclosure costs are counted, and when you break even.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <BalanceTransferCalculator />
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
