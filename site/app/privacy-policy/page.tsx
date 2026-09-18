import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Privacy <span style={{ color: 'var(--red)' }}>Policy</span></h1>
          <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap prose">
          <p>{site.legalName} is committed to protecting your privacy. This policy explains what we collect, why, and what you can ask us to do about it.</p>

          <h2>Information we collect</h2>
          <p>When you use our advisory services we collect your name, contact details, city, employment and income information, and the loan amount you are seeking. Where a lender requires it, we also handle identity and financial documents such as PAN, Aadhaar, salary slips and bank statements.</p>

          <h2>What our website collects</h2>
          <p>Our enquiry and application forms deliberately do not ask for PAN, Aadhaar or date of birth. Those are collected by your advisor over a channel we control, not through this website. Details you submit through our forms are sent to our team over WhatsApp and recorded in our lead system so your enquiry is not lost.</p>

          <h2>How we use your information</h2>
          <p>To assess your eligibility, give you tailored advice, present your application to partner banks and NBFCs with your consent, and to improve our services.</p>

          <h2>Data sharing</h2>
          <p>We share your information with partner lenders only to process an application you have asked us to pursue, and with authorities where Indian law requires it. We do not sell your data.</p>

          <h2>Analytics</h2>
          <p>We use privacy-respecting web analytics to understand which pages are useful. This records page views and aggregate behaviour. It is not used to identify you personally.</p>

          <h2>Data security</h2>
          <p>Our website is served over HTTPS with TLS encryption. Internally we apply role-based access controls and share documents with lenders only through their own secure channels.</p>

          <h2>Your rights</h2>
          <p>You may ask us to show you what we hold, correct it, or delete it. Write to <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a reasonable period.</p>

          <h2>Contact</h2>
          <p>For any privacy question: <a href={`mailto:${site.email}`}>{site.email}</a> or <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>
        </div>
      </section>
    </>
  );
}
