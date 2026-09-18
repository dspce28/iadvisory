import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import HeroCards from '@/components/HeroCards';
import Reveal from '@/components/Reveal';
import { loanProducts, site } from '@/lib/site';

export default function Home() {
  return (
    <>
      <section id="hero">
        <HeroCanvas variant="hero" />
        <div className="hero-inner">
          <div>
            <div className="hero-pill">🏆 Loan advisory since {site.since}</div>
            <h1 className="hero-h">
              Fast, Trusted &amp;<br />
              <em>Smart Loan</em>
              <br />
              <span className="gld">Solutions</span>
            </h1>
            <p className="hero-sub">
              Expert guidance and one application across our partner lenders. Compare real offers
              side by side — no upfront fees, no hidden charges.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-red btn-xl" href="/apply/">
                Apply Now — Free
              </Link>
              <Link className="btn btn-ghost btn-xl" href="/emi-calculator/">
                Calculate EMI
              </Link>
            </div>
            <div className="hero-kpis">
              <div className="kpi">
                <div className="n">{site.stats.loansApproved}</div>
                <div className="l">Loans Approved</div>
              </div>
              <div className="kpi">
                <div className="n">{site.stats.successRate}</div>
                <div className="l">Success Rate</div>
              </div>
              <div className="kpi">
                <div className="n">{site.stats.partnerBanks}</div>
                <div className="l">Partner Banks</div>
              </div>
            </div>
          </div>
          <HeroCards />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <h2 className="h">Complete Loan Solutions</h2>
          </Reveal>
          <div className="svc-grid">
            {loanProducts.map((p, i) => (
              <Reveal key={p.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link prefetch={false} className="scard" href={`/loans/${p.slug}/`}>
                  <div className="scard-img">
                    <img src={p.image} alt={p.name} width={400} height={400} loading="lazy" decoding="async" />
                  </div>
                  <div className="scard-body">
                    <div className="scard-rate">From {p.rateFrom}</div>
                    <div className="scard-title">{p.name}</div>
                    <p className="scard-desc">{p.blurb}</p>
                    <div className="scard-link">Learn more →</div>
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
