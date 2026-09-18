import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { comparisons } from '@/lib/comparisons';

export const metadata: Metadata = {
  title: 'Loan Comparisons — Which Option Actually Suits You',
  description:
    'Straight comparisons of the borrowing decisions people actually face: home loan vs loan against property, fixed vs floating, personal vs gold loan, prepay vs invest.',
  alternates: { canonical: '/compare/' },
};

export default function CompareIndex() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Loan <span style={{ color: 'var(--red)' }}>Comparisons</span></h1>
          <p>The decisions worth getting right, argued both ways.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap">
          <div className="bcards">
            {comparisons.map((c, i) => (
              <Reveal key={c.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link prefetch={false} className="bcard" href={`/compare/${c.slug}/`}>
                  <div className="bcat">Comparison</div>
                  <h2 className="bcard-title">{c.title}</h2>
                  <p>{c.intro.slice(0, 165)}…</p>
                  <div className="bmeta">
                    <span>{c.optionA}</span>
                    <span>vs</span>
                    <span>{c.optionB}</span>
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
