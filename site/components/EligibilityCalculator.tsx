'use client';
import { useMemo, useState } from 'react';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/**
 * Eligibility is driven by the FOIR: the share of net income a lender will
 * let your total EMIs consume. Existing EMIs come straight off the top,
 * which is the part borrowers usually forget.
 */
export default function EligibilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [emis, setEmis] = useState(0);
  const [rate, setRate] = useState(8.75);
  const [years, setYears] = useState(20);
  const [foir, setFoir] = useState(55);

  const { affordable, eligible } = useMemo(() => {
    const capacity = Math.max(0, (income * foir) / 100 - emis);
    const r = rate / 12 / 100;
    const n = years * 12;
    const principal = r === 0 ? capacity * n : (capacity * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    return { affordable: capacity, eligible: principal };
  }, [income, emis, rate, years, foir]);

  return (
    <div className="emi">
      <div className="emi-head">Indicative loan you could raise</div>
      <div className="emi-val">{inr(eligible)}</div>

      <div className="cf">
        <label>Net monthly income <span>{inr(income)}</span></label>
        <input type="range" min={15000} max={1000000} step={5000} value={income}
          onChange={(e) => setIncome(+e.target.value)} aria-label="Net monthly income" />
      </div>
      <div className="cf">
        <label>Existing EMIs <span>{inr(emis)}</span></label>
        <input type="range" min={0} max={300000} step={1000} value={emis}
          onChange={(e) => setEmis(+e.target.value)} aria-label="Existing monthly EMIs" />
      </div>
      <div className="cf">
        <label>Interest rate <span>{rate.toFixed(2)}%</span></label>
        <input type="range" min={6} max={24} step={0.25} value={rate}
          onChange={(e) => setRate(+e.target.value)} aria-label="Interest rate" />
      </div>
      <div className="cf">
        <label>Tenure <span>{years} years</span></label>
        <input type="range" min={1} max={30} value={years}
          onChange={(e) => setYears(+e.target.value)} aria-label="Tenure in years" />
      </div>
      <div className="cf">
        <label>Lender&rsquo;s FOIR limit <span>{foir}%</span></label>
        <input type="range" min={35} max={70} value={foir}
          onChange={(e) => setFoir(+e.target.value)} aria-label="FOIR limit" />
      </div>

      <dl className="emi-out">
        <div><dt>EMI you could service</dt><dd>{inr(affordable)}</dd></div>
        <div><dt>Income committed to EMIs</dt><dd>{foir}%</dd></div>
      </dl>
      <p className="emi-note">
        FOIR is the share of net income a lender lets your combined EMIs take — commonly 50–60%,
        lower at modest incomes and higher at high ones. Existing EMIs come off first, which is why
        clearing a small loan before applying often raises eligibility by more than a raise would.
      </p>
    </div>
  );
}
