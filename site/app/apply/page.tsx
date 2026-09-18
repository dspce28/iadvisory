import type { Metadata } from 'next';
import ApplyForm from '@/components/ApplyForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Apply for a Loan — Free Advisory, No Upfront Fees',
  description: `Start a loan application with iAdvisory. One profile compared across ${site.stats.partnerBanks} partner banks and NBFCs. Free advisory, no upfront fees.`,
  alternates: { canonical: '/apply/' },
};

export default function Apply() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Apply for <span style={{ color: 'var(--red)' }}>Your Loan</span></h1>
          <p>Three short steps. No upfront fees. We handle the paperwork.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <ApplyForm />
        </div>
      </section>
    </>
  );
}
