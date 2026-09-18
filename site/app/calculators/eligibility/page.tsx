import type { Metadata } from 'next';
import Link from 'next/link';
import EligibilityCalculator from '@/components/EligibilityCalculator';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Loan Eligibility Calculator — How Much Can You Borrow?',
  description: 'Work out the loan amount a lender is likely to approve on your income, after existing EMIs and the lender FOIR limit are taken into account.',
  alternates: { canonical: '/calculators/eligibility/' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Eligibility Calculator — How Much Can You Borrow?',
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
            <span aria-current="page">Eligibility Calculator</span>
          </nav>
          <h1>Eligibility Calculator</h1>
          <p>Work out the loan amount a lender is likely to approve on your income, after existing EMIs and the lender FOIR limit are taken into account.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <EligibilityCalculator />
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
