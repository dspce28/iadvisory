import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Loan Calculators — EMI, Eligibility, Transfer and Prepayment',
  description:
    'Free calculators for EMI, loan eligibility, balance transfer savings and prepayment impact. No sign-up, nothing stored, no data collected.',
  alternates: { canonical: '/calculators/' },
};

const TOOLS = [
  { href: '/emi-calculator/', icon: '📊', name: 'EMI Calculator', d: 'Your monthly instalment, and how much of the repayment is interest rather than principal.' },
  { href: '/calculators/eligibility/', icon: '🎯', name: 'Eligibility Calculator', d: 'How much a lender is likely to advance on your income, after existing EMIs are counted.' },
  { href: '/calculators/balance-transfer/', icon: '🔁', name: 'Balance Transfer', d: 'Whether moving your loan to a lower rate actually pays once switching costs are counted.' },
  { href: '/calculators/prepayment/', icon: '⏩', name: 'Prepayment Impact', d: 'What a lump sum saves you, and how much that depends on when you make it.' },
];

export default function Calculators() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Loan <span style={{ color: 'var(--red)' }}>Calculators</span></h1>
          <p>Run the numbers yourself. Nothing is stored and nothing is sent anywhere.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap">
          <div className="bcards">
            {TOOLS.map((t, i) => (
              <Reveal key={t.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link prefetch={false} className="bcard" href={t.href}>
                  <div className="bimg" aria-hidden="true">{t.icon}</div>
                  <h2 className="bcard-title">{t.name}</h2>
                  <p>{t.d}</p>
                  <div className="bmeta"><span>Free · no sign-up</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
