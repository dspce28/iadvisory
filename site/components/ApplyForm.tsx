'use client';
import { useState } from 'react';
import LeadFallback from './LeadFallback';
import { deliverLead, type LeadField } from '@/lib/lead';
import { loanProducts } from '@/lib/site';

const STEPS = ['Personal', 'Employment', 'Loan'] as const;

type Data = Record<string, string>;

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<{ ref: string; url: string } | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const required: Record<number, string[]> = {
    0: ['name', 'mobile', 'email', 'city'],
    1: ['employment', 'income'],
    2: ['loanType', 'amount'],
  };
  const canAdvance = required[step].every((k) => (data[k] ?? '').trim().length > 0);

  async function submit() {
    if (busy) return;
    setBusy(true);
    const fields: LeadField[] = [
      { label: 'Full Name', value: data.name ?? '' },
      { label: 'Mobile Number', value: data.mobile ?? '' },
      { label: 'Email Address', value: data.email ?? '' },
      { label: 'Current City', value: data.city ?? '' },
      { label: 'Employment Type', value: data.employment ?? '' },
      { label: 'Company / Business', value: data.company ?? '' },
      { label: 'Monthly Income', value: data.income ?? '' },
      { label: 'Loan Type', value: data.loanType ?? '' },
      { label: 'Loan Amount', value: data.amount ?? '' },
      { label: 'Existing EMIs', value: data.emis ?? '' },
      { label: 'Purpose', value: data.purpose ?? '' },
    ];
    const { ref, url } = deliverLead('Loan application', fields);
    setSent({ ref, url });
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="fcard form-done">
        <div className="form-done-ic">🎊</div>
        <h3>Application sent</h3>
        <p>
          Your details are with our team. A relationship manager will call you within 2 business
          hours to confirm the next steps and collect your documents securely.
        </p>
        <LeadFallback url={sent.url} reference={sent.ref} />
      </div>
    );
  }

  return (
    <div>
      <ol className="steps" aria-label="Application progress">
        {STEPS.map((s, i) => (
          <li key={s} className={`step ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}>
            <span className="sdot">{i < step ? '✓' : i + 1}</span>
            <span className="slbl">{s}</span>
          </li>
        ))}
      </ol>

      <div className="fcard">
        {step === 0 && (
          <>
            <h3 className="fcard-h">Personal details</h3>
            <div className="fg2">
              <div className="fg">
                <label htmlFor="a-name">Full Name *</label>
                <input id="a-name" value={data.name ?? ''} onChange={set('name')} autoComplete="name" />
              </div>
              <div className="fg">
                <label htmlFor="a-mobile">Mobile Number *</label>
                <input id="a-mobile" type="tel" value={data.mobile ?? ''} onChange={set('mobile')} autoComplete="tel" />
              </div>
              <div className="fg">
                <label htmlFor="a-email">Email Address *</label>
                <input id="a-email" type="email" value={data.email ?? ''} onChange={set('email')} autoComplete="email" />
              </div>
              <div className="fg">
                <label htmlFor="a-city">Current City *</label>
                <input id="a-city" value={data.city ?? ''} onChange={set('city')} placeholder="Ahmedabad" />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="fcard-h">Employment &amp; income</h3>
            <div className="fg2">
              <div className="fg full">
                <label htmlFor="a-emp">Employment Type *</label>
                <select id="a-emp" value={data.employment ?? ''} onChange={set('employment')}>
                  <option value="">Select…</option>
                  <option>Salaried</option>
                  <option>Self-Employed</option>
                  <option>Business Owner</option>
                  <option>Professional (CA / Doctor / Lawyer)</option>
                </select>
              </div>
              <div className="fg">
                <label htmlFor="a-co">Company / Business</label>
                <input id="a-co" value={data.company ?? ''} onChange={set('company')} />
              </div>
              <div className="fg">
                <label htmlFor="a-inc">Net Monthly Income (₹) *</label>
                <input id="a-inc" type="number" inputMode="numeric" value={data.income ?? ''} onChange={set('income')} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="fcard-h">What you need</h3>
            <div className="fg2">
              <div className="fg">
                <label htmlFor="a-type">Loan Type *</label>
                <select id="a-type" value={data.loanType ?? ''} onChange={set('loanType')}>
                  <option value="">Select…</option>
                  {loanProducts.map((p) => <option key={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div className="fg">
                <label htmlFor="a-amt">Loan Amount (₹) *</label>
                <input id="a-amt" type="number" inputMode="numeric" value={data.amount ?? ''} onChange={set('amount')} />
              </div>
              <div className="fg">
                <label htmlFor="a-emi">Existing EMIs (₹)</label>
                <input id="a-emi" type="number" inputMode="numeric" value={data.emis ?? ''} onChange={set('emis')} />
              </div>
              <div className="fg">
                <label htmlFor="a-pur">Purpose</label>
                <input id="a-pur" value={data.purpose ?? ''} onChange={set('purpose')} />
              </div>
            </div>
            <p className="note">
              We do not ask for PAN, Aadhaar or documents on this form. Your advisor collects those
              on the call, over a channel we control.
            </p>
          </>
        )}

        <div className="fnav">
          {step > 0 ? (
            <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>← Back</button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <button className="btn btn-red" disabled={!canAdvance} onClick={() => setStep((s) => s + 1)}>
              Next: {STEPS[step + 1]} →
            </button>
          ) : (
            <button className="btn btn-red btn-lg" disabled={!canAdvance || busy} onClick={submit}>
              {busy ? 'Sending…' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
