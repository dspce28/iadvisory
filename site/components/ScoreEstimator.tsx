'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

/**
 * A credit-health estimator, not a bureau lookup.
 *
 * We have no CIBIL integration, so this cannot and does not report anyone's
 * real score. It models the published weightings against what the visitor
 * tells us and returns a band. Calling that a "score check" would be the
 * same kind of claim this site had to have removed from it once already,
 * so the component says what it is, everywhere it appears.
 */

const BANDS = [
  { min: 750, label: 'Excellent', note: 'Best pricing, widest choice of lenders.', c: '#047857' },
  { min: 700, label: 'Good', note: 'Approved by most lenders, a notch above the sharpest rate.', c: '#0F766E' },
  { min: 650, label: 'Fair', note: 'Approvals happen, usually at a higher rate or a smaller sanction.', c: '#B45309' },
  { min: 550, label: 'Poor', note: 'Limited options. Usually worth repairing before applying.', c: '#B91C1C' },
  { min: 0, label: 'Very poor', note: 'Repair first — applying now mostly costs you hard enquiries.', c: '#7F1D1D' },
];

const ONTIME = [
  { v: 'always', l: 'Always on time', s: 1 },
  { v: 'late1', l: 'One or two late payments', s: 0.62 },
  { v: 'late3', l: 'Several late payments', s: 0.3 },
  { v: 'default', l: 'A default or settlement', s: 0.04 },
];
const AGE = [
  { v: '0', l: 'Under 1 year', s: 0.25 },
  { v: '1', l: '1 – 3 years', s: 0.55 },
  { v: '3', l: '3 – 7 years', s: 0.82 },
  { v: '7', l: 'Over 7 years', s: 1 },
];
const MIX = [
  { v: 'none', l: 'No credit yet', s: 0.2 },
  { v: 'one', l: 'Only cards, or only a loan', s: 0.6 },
  { v: 'both', l: 'Both cards and a loan', s: 1 },
];

export default function ScoreEstimator({ compact = false }: { compact?: boolean }) {
  const [ontime, setOntime] = useState('always');
  const [util, setUtil] = useState(30);
  const [age, setAge] = useState('3');
  const [mix, setMix] = useState('both');
  const [enq, setEnq] = useState(1);

  const { score, band } = useMemo(() => {
    const pay = ONTIME.find((o) => o.v === ontime)?.s ?? 1;
    // Utilisation is scored against the 30% line lenders actually watch.
    const u = util <= 30 ? 1 - (util / 30) * 0.12 : Math.max(0, 0.88 - ((util - 30) / 70) * 0.85);
    const a = AGE.find((o) => o.v === age)?.s ?? 0.8;
    const m = MIX.find((o) => o.v === mix)?.s ?? 0.8;
    const e = Math.max(0, 1 - enq * 0.17);

    // The weightings CIBIL publishes: payment history, utilisation, age of
    // file, credit mix, recent enquiries.
    const w = pay * 0.35 + u * 0.3 + a * 0.15 + m * 0.1 + e * 0.1;
    const s = Math.round(300 + w * 600);
    return { score: s, band: BANDS.find((b) => s >= b.min) ?? BANDS[BANDS.length - 1] };
  }, [ontime, util, age, mix, enq]);

  // 300–900 across a half-circle. The arc is a true semicircle, so its length
  // is pi*r — not the 240-degree sweep an earlier version of this assumed.
  const R = 86;
  const LEN = Math.PI * R;
  const pct = (score - 300) / 600;

  return (
    <div className={compact ? 'emi emi-compact score' : 'emi score'}>
      <div className="emi-head">Estimated band</div>

      <div className="score-dial">
        <svg viewBox="0 0 220 126" aria-hidden="true">
          {/* stroke is set through CSS, not as an attribute: a presentation
              attribute cannot resolve a custom property. */}
          <path
            className="score-track"
            d="M24 110 A 86 86 0 0 1 196 110"
            fill="none"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M24 110 A 86 86 0 0 1 196 110"
            fill="none"
            stroke={band.c}
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={`${(LEN * pct).toFixed(1)} ${LEN.toFixed(1)}`}
            style={{ transition: 'stroke-dasharray .5s var(--ease), stroke .5s var(--ease)' }}
          />
        </svg>
        <div className="score-read">
          <strong>{score}</strong>
          <span style={{ color: band.c }}>{band.label}</span>
        </div>
      </div>

      <p className="score-note">{band.note}</p>

      <div className="score-fields">
        <div className="fg">
          <label htmlFor="se-pay">Repayment record</label>
          <select id="se-pay" value={ontime} onChange={(e) => setOntime(e.target.value)}>
            {ONTIME.map((o) => (
              <option key={o.v} value={o.v}>{o.l}</option>
            ))}
          </select>
        </div>

        <div className="cf">
          <label htmlFor="se-util">
            Card limit in use <span>{util}%</span>
          </label>
          <input
            id="se-util"
            type="range"
            min={0}
            max={100}
            step={5}
            value={util}
            onChange={(e) => setUtil(+e.target.value)}
          />
        </div>

        <div className="fg2">
          <div className="fg">
            <label htmlFor="se-age">Oldest account</label>
            <select id="se-age" value={age} onChange={(e) => setAge(e.target.value)}>
              {AGE.map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </div>
          <div className="fg">
            <label htmlFor="se-mix">What you hold</label>
            <select id="se-mix" value={mix} onChange={(e) => setMix(e.target.value)}>
              {MIX.map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="cf" style={{ marginBottom: 0 }}>
          <label htmlFor="se-enq">
            Loan or card applications in the last 6 months <span>{enq}</span>
          </label>
          <input
            id="se-enq"
            type="range"
            min={0}
            max={6}
            step={1}
            value={enq}
            onChange={(e) => setEnq(+e.target.value)}
          />
        </div>
      </div>

      <p className="emi-note">
        <strong>This is an estimate, not your score.</strong> We are not a credit bureau and this
        does not read your report. It applies CIBIL&rsquo;s published weightings to what you entered,
        to show you roughly where you stand. Your real score is free once a year from{' '}
        <a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer">
          CIBIL
        </a>
        , and checking it yourself never lowers it.
      </p>

      <div className="hero-actions" style={{ marginTop: '1.2rem' }}>
        <Link className="btn btn-accent" href="/apply/" prefetch={false}>
          See what you qualify for
        </Link>
        <Link className="btn btn-line" href="/cibil-score/" prefetch={false}>
          How to improve it
        </Link>
      </div>
    </div>
  );
}
