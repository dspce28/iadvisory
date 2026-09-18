'use client';
import { useState } from 'react';
import Link from 'next/link';
import LeadFallback from './LeadFallback';
import { deliverLead, type LeadField } from '@/lib/lead';

const LOAN_TYPES = [
  'Personal Loan', 'Home Loan', 'Business Loan', 'Car Loan',
  'Loan Against Property', 'Education Loan', 'CIBIL Help', 'General Enquiry',
];

export default function ContactForm() {
  const [sent, setSent] = useState<{ ref: string; url: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const fields: LeadField[] = [
      { label: 'Full Name', value: String(fd.get('name') ?? '') },
      { label: 'Mobile', value: String(fd.get('mobile') ?? '') },
      { label: 'Email', value: String(fd.get('email') ?? '') },
      { label: 'Loan Interest', value: String(fd.get('loanType') ?? '') },
      { label: 'Message', value: String(fd.get('message') ?? '') },
    ];
    const { ref, url } = deliverLead('Enquiry', fields);
    setSent({ ref, url });
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="form-done">
        <div className="form-done-ic">✅</div>
        <h3>Enquiry sent</h3>
        <p>We have your details. An advisor will be in touch shortly.</p>
        <LeadFallback url={sent.url} reference={sent.ref} />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="lead-form">
      <div className="fg2">
        <div className="fg">
          <label htmlFor="c-name">Full Name *</label>
          <input id="c-name" name="name" type="text" placeholder="Your name" required />
        </div>
        <div className="fg">
          <label htmlFor="c-mobile">Mobile *</label>
          <input
            id="c-mobile" name="mobile" type="tel" required
            placeholder="+91 00000 00000"
            pattern="[0-9+\s-]{10,16}"
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="fg">
        <label htmlFor="c-email">Email *</label>
        <input id="c-email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
      </div>
      <div className="fg">
        <label htmlFor="c-type">Loan Interest</label>
        <select id="c-type" name="loanType" defaultValue="">
          <option value="">Select loan type…</option>
          {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="fg">
        <label htmlFor="c-msg">Message *</label>
        <textarea id="c-msg" name="message" rows={5} required placeholder="How can we help?" />
      </div>
      <label className="consent">
        <input type="checkbox" required />
        <span>
          I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to being
          contacted by iAdvisory.
        </span>
      </label>
      <button type="submit" className="btn btn-red btn-lg" disabled={busy} style={{ width: '100%' }}>
        {busy ? 'Sending…' : 'Send Message — Free Consultation'}
      </button>
    </form>
  );
}
