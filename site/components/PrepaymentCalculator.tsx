'use client';
import { useMemo, useState } from 'react';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/** Amortises month by month so the answer reflects where in the tenure the
 *  prepayment lands — which is the whole point. */
function schedule(principal: number, annual: number, emi: number, lump: number, atMonth: number) {
  const r = annual / 12 / 100;
  let bal = principal;
  let interest = 0;
  let m = 0;
  while (bal > 0 && m < 720) {
    m += 1;
    const i = bal * r;
    interest += i;
    bal = bal + i - emi;
    if (m === atMonth) bal -= lump;
    if (bal < 0) bal = 0;
  }
  return { months: m, interest };
}

export default function PrepaymentCalculator() {
  const [principal, setPrincipal] = useState(3000000);
  const [rate, setRate] = useState(8.75);
  const [years, setYears] = useState(20);
  const [lump, setLump] = useState(300000);
  const [atYear, setAtYear] = useState(3);

  const out = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const base = schedule(principal, rate, emi, 0, -1);
    const withPre = schedule(principal, rate, emi, lump, atYear * 12);
    return {
      emi,
      saved: base.interest - withPre.interest,
      monthsSaved: base.months - withPre.months,
      newTerm: withPre.months,
      baseTerm: base.months,
    };
  }, [principal, rate, years, lump, atYear]);

  return (
    <div className="emi">
      <div className="emi-head">Interest saved by prepaying</div>
      <div className="emi-val" style={{ color: '#047857' }}>{inr(out.saved)}</div>

      <div className="cf">
        <label>Loan amount <span>{inr(principal)}</span></label>
        <input type="range" min={100000} max={20000000} step={50000} value={principal}
          onChange={(e) => setPrincipal(+e.target.value)} aria-label="Loan amount" />
      </div>
      <div className="cf">
        <label>Interest rate <span>{rate.toFixed(2)}%</span></label>
        <input type="range" min={6} max={24} step={0.25} value={rate}
          onChange={(e) => setRate(+e.target.value)} aria-label="Interest rate" />
      </div>
      <div className="cf">
        <label>Original tenure <span>{years} years</span></label>
        <input type="range" min={2} max={30} value={years}
          onChange={(e) => setYears(+e.target.value)} aria-label="Original tenure" />
      </div>
      <div className="cf">
        <label>Prepayment amount <span>{inr(lump)}</span></label>
        <input type="range" min={10000} max={5000000} step={10000} value={lump}
          onChange={(e) => setLump(+e.target.value)} aria-label="Prepayment amount" />
      </div>
      <div className="cf">
        <label>Made in year <span>{atYear}</span></label>
        <input type="range" min={1} max={Math.max(1, years - 1)} value={Math.min(atYear, years - 1)}
          onChange={(e) => setAtYear(+e.target.value)} aria-label="Year of prepayment" />
      </div>

      <dl className="emi-out">
        <div><dt>EMI</dt><dd>{inr(out.emi)}</dd></div>
        <div><dt>Tenure without prepaying</dt><dd>{(out.baseTerm / 12).toFixed(1)} years</dd></div>
        <div><dt>Tenure after prepaying</dt><dd>{(out.newTerm / 12).toFixed(1)} years</dd></div>
        <div><dt>Time saved</dt><dd>{(out.monthsSaved / 12).toFixed(1)} years</dd></div>
      </dl>
      <p className="emi-note">
        Move the year slider to see the point most clearly: the same amount saves far more in year
        three than in year twelve, because early EMIs are almost entirely interest. This assumes
        the tenure shortens and the EMI stays level, which saves more than the reverse.
      </p>
    </div>
  );
}
