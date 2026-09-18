import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact iAdvisory — Free Loan Consultation',
  description: `Talk to a loan advisor in ${site.address.locality}. Call ${site.phoneDisplay}, message on WhatsApp, or send an enquiry. Free consultation, no upfront fees.`,
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <h1>Contact <span style={{ color: 'var(--red)' }}>Us</span></h1>
          <p>A named advisor, not a call centre. {site.hours}.</p>
        </div>
      </div>
      <section className="sec">
        <div className="wrap contact-grid">
          <div>
            <h2 className="h" style={{ textAlign: 'left' }}>Reach us directly</h2>
            <ul className="contact-list">
              <li><span>📞</span><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
              <li><span>💬</span><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><span>✉️</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><span>📍</span><span>{site.address.locality}, {site.address.region} — {site.address.postalCode}</span></li>
              <li><span>🕐</span><span>{site.hours}</span></li>
            </ul>
          </div>
          <div className="fcard">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
