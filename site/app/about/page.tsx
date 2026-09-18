import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { site, yearsInBusiness } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About iAdvisory — Loan Advisory in Ahmedabad Since 2017',
  description: `iAdvisory has advised borrowers since ${site.since}, connecting them with ${site.stats.partnerBanks} partner banks and NBFCs. We are an advisory service, not a lender.`,
  alternates: { canonical: '/about/' },
};

export default function About() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>About <span style={{ color: 'var(--red)' }}>iAdvisory</span></h1>
          <p>Advising borrowers since {site.since} — {yearsInBusiness()} years.</p>
        </div>
      </div>

      <section className="sec">
        <div className="wrap about-grid">
          <Reveal dir="left">
            <h2 className="h" style={{ textAlign: 'left' }}>Who we are</h2>
            <p className="sub">
              Founded in {site.since}, iAdvisory bridges borrowers and lenders. We assess your
              profile first, then approach only the lenders you are likely to qualify with — which
              protects your credit score and gets you a straighter answer.
            </p>
            <p className="sub">
              Our advisory team works to simplify the whole journey, from first enquiry to
              disbursement and beyond.
            </p>
            <p className="sub">
              <strong>We are not a bank or an NBFC and we do not lend.</strong> We are paid by the
              lender when a loan completes, never by you. That is why our advice costs you nothing
              and why we will tell you when the answer is to wait or not to borrow at all.
            </p>
            <div className="astat-grid">
              <div className="astat"><div className="astat-n">{site.stats.loansApproved}</div><div className="astat-l">Loans Approved</div></div>
              <div className="astat"><div className="astat-n">{site.stats.partnerBanks}</div><div className="astat-l">Partner Banks</div></div>
              <div className="astat"><div className="astat-n">{site.since}</div><div className="astat-l">Advising Since</div></div>
              <div className="astat"><div className="astat-n">{site.stats.successRate}</div><div className="astat-l">Success Rate</div></div>
            </div>
            <div className="hero-actions" style={{ marginTop: '2rem' }}>
              <Link className="btn btn-red btn-lg" href="/apply/">Apply Now</Link>
              <Link className="btn btn-ghost btn-lg" href="/contact/">Contact Us</Link>
            </div>
          </Reveal>
          <Reveal dir="right">
            <Image src="/assets/img-f91855b0ec.webp" alt="The iAdvisory advisory team" width={500} height={500} className="about-img" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
