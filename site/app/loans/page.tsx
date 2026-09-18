import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { loanProducts, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Loan Products — Home, Personal, Business & More',
  description: `Compare home, personal, business, car, education and property loans across ${site.stats.partnerBanks} partner banks and NBFCs. Free advisory from iAdvisory, no upfront fees.`,
  alternates: { canonical: '/loans/' },
};

export default function Loans() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Our <span style={{ color: 'var(--red)' }}>Loan Products</span></h1>
          <p>One profile, compared across {site.stats.partnerBanks} lenders. Pick the product you need.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap">
          <div className="scards">
            {loanProducts.map((p, i) => (
              <Reveal key={p.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link prefetch={false} className="scard" href={`/loans/${p.slug}/`}>
                  <div className="scard-ic">{p.icon}</div>
                  <div className="scard-title">{p.name}</div>
                  <p>{p.blurb}</p>
                  <div className="scard-rate">From {p.rateFrom} · up to {p.maxAmount}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
