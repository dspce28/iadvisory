import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms governing use of ${site.name}'s loan advisory services.`,
  alternates: { canonical: '/terms/' },
};

export default function Terms() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Terms &amp; <span style={{ color: 'var(--red)' }}>Conditions</span></h1>
          <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap prose">
          <p>By using {site.name}&rsquo;s services you accept these Terms and Conditions.</p>

          <h2>Nature of our services</h2>
          <p>{site.name} is a loan advisory and facilitation platform. <strong>We are not a bank or an NBFC and we do not lend.</strong> Final loan approval, the interest rate offered and the disbursement timeline rest solely with the lending institution.</p>

          <h2>No guarantee</h2>
          <p>We do not guarantee loan approval, a particular interest rate, or a particular timeline. Rates shown on this website are indicative, are sourced from partner lenders, and change without notice.</p>

          <h2>Your responsibilities</h2>
          <p>You agree to give accurate and complete information. Submitting false information to a lender may have legal consequences and is grounds for us to stop acting for you.</p>

          <h2>Fees</h2>
          <p>Our advisory service is free to you and we do not take an upfront fee. We are compensated by the lender when a loan completes. Any processing, legal or valuation fee charged by the lender is disclosed to you before your application is submitted.</p>

          <h2>Calculators and content</h2>
          <p>The EMI calculator and articles on this site are provided for general information. They are not financial, tax or legal advice, and they do not account for your full circumstances.</p>

          <h2>Governing law</h2>
          <p>These Terms are governed by Indian law. Disputes fall under the jurisdiction of the courts of {site.address.locality}, {site.address.region}.</p>

          <h2>Contact</h2>
          <p><a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
        </div>
      </section>
    </>
  );
}
