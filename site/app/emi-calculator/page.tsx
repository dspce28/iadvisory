import type { Metadata } from 'next';
import EmiWidget from '@/components/EmiWidget';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'EMI Calculator — Work Out Your Monthly Instalment',
  description:
    'Free EMI calculator for home, personal, business and car loans. See your monthly instalment, total interest and what the loan really costs before you borrow.',
  alternates: { canonical: '/emi-calculator/' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'iAdvisory EMI Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function Emi() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>EMI <span style={{ color: 'var(--red)' }}>Calculator</span></h1>
          <p>
            Move the sliders to see the instalment — and, more usefully, how much of your repayment
            is interest rather than principal.
          </p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <EmiWidget />
          <p className="note" style={{ marginTop: '2rem' }}>
            This is a standard reducing-balance EMI calculation. It excludes processing fees,
            insurance and any lender charges, so treat the figure as indicative. {site.name} does
            not set rates — the lender does.
          </p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
