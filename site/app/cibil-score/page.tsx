import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CIBIL Score — What It Means and How to Improve It',
  description:
    'Understand what your CIBIL score means for loan eligibility and pricing, what drives it, and the steps that genuinely raise it. Free guidance from iAdvisory.',
  alternates: { canonical: '/cibil-score/' },
};

const BANDS = [
  { range: '750 – 900', label: 'Excellent', note: 'Best rates and the widest choice of lenders.', color: '#047857' },
  { range: '700 – 749', label: 'Good', note: 'Approved by most lenders, pricing slightly above best.', color: '#0F766E' },
  { range: '650 – 699', label: 'Fair', note: 'Approvals happen, but expect a higher rate or smaller sanction.', color: '#B45309' },
  { range: '550 – 649', label: 'Poor', note: 'Limited options. Worth repairing before applying.', color: '#B91C1C' },
  { range: 'Below 550', label: 'Very poor', note: 'Focus on repair first; applying now mostly costs you enquiries.', color: '#7F1D1D' },
];

const FACTORS = [
  { w: '~35%', t: 'Payment history', d: 'Whether you pay on time, every time. The heaviest single factor.' },
  { w: '~30%', t: 'Credit utilisation', d: 'How much of your available limit you use. Stay under 30%.' },
  { w: '~15%', t: 'Length of history', d: 'How long your accounts have been open. Keep your oldest card.' },
  { w: '~10%', t: 'Credit mix', d: 'A balance of secured and unsecured borrowing reads better than one type.' },
  { w: '~10%', t: 'Recent enquiries', d: 'Several applications in a short window reads as credit hunger.' },
];

export default function Cibil() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What CIBIL score do I need for a loan?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most lenders look for 700 or above. Above 750 you get the sharpest pricing and the widest choice. Between 650 and 700 approvals still happen, but usually at a higher rate or a smaller sanction.' },
      },
      {
        '@type': 'Question',
        name: 'Does checking my own CIBIL score reduce it?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Checking your own report is a soft enquiry and has no effect. Only a formal application to a lender creates a hard enquiry, and it is several of those in a short window that pull the score down.' },
      },
      {
        '@type': 'Question',
        name: 'How quickly can I improve my score?',
        acceptedAnswer: { '@type': 'Answer', text: 'Reducing credit utilisation can show up within one or two billing cycles. Correcting a reporting error takes roughly 30 days once disputed. Recovering from a missed payment takes 12 to 18 months of clean conduct.' },
      },
    ],
  };

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Your <span style={{ color: 'var(--red)' }}>CIBIL Score</span></h1>
          <p>What the number means, what moves it, and what to do before you apply.</p>
        </div>
      </div>

      <section className="sec">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal>
            <h2 className="h" style={{ textAlign: 'left' }}>What the bands mean</h2>
            <div className="bands">
              {BANDS.map((b) => (
                <div className="band" key={b.range}>
                  <span className="band-dot" style={{ background: b.color }} aria-hidden="true" />
                  <div>
                    <strong>{b.range} — {b.label}</strong>
                    <p>{b.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="h" style={{ textAlign: 'left', marginTop: '3rem' }}>What drives the number</h2>
            <div className="factors">
              {FACTORS.map((f) => (
                <div className="factor" key={f.t}>
                  <span className="factor-w">{f.w}</span>
                  <div><strong>{f.t}</strong><p>{f.d}</p></div>
                </div>
              ))}
            </div>
            <p className="note">
              Weightings are approximate and CIBIL does not publish an exact formula. The ordering,
              however, is consistent: payment history and utilisation dominate.
            </p>
          </Reveal>

          <Reveal>
            <div className="aside-box" style={{ marginTop: '3rem' }}>
              <h4>Check your own report free</h4>
              <p style={{ color: 'var(--txt2)', fontSize: '.9rem', lineHeight: 1.8 }}>
                Every credit bureau in India must give you one free full report each year. Get yours
                directly from CIBIL, Experian, Equifax or CRIF High Mark. {site.name} does not
                resell credit reports and will never ask you to pay us for one.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link className="btn btn-red" href="/contact/">Ask us to read your report</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
