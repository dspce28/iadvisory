'use client';
import { useMemo, useState } from 'react';

const inr = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN');

export default function EmiWidget({
  compact = false,
  defaultAmount = 500000,
  defaultRate = 10.5,
  defaultYears = 5,
}: {
  compact?: boolean;
  defaultAmount?: number;
  defaultRate?: number;
  defaultYears?: number;
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(Number.isFinite(defaultRate) ? defaultRate : 10.5);
  const [years, setYears] = useState(defaultYears);

  const { emi, total, interest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: e, total: e * n, interest: e * n - amount };
  }, [amount, rate, years]);

  const pct = (interest / (amount + interest)) * 100;

  return (
    <div className={compact ? 'emi emi-compact' : 'emi'}>
      <div className="emi-head">Monthly EMI</div>
      <div className="emi-val">{inr(emi)}</div>

      <div className="cf">
        <label>
          Loan Amount <span>{inr(amount)}</span>
        </label>
        <input
          type="range"
          min={100000}
          max={10000000}
          step={50000}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          aria-label="Loan amount"
        />
      </div>
      <div className="cf">
        <label>
          Interest Rate <span>{rate.toFixed(1)}%</span>
        </label>
        <input
          type="range"
          min={6}
          max={24}
          step={0.5}
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          aria-label="Interest rate"
        />
      </div>
      <div className="cf">
        <label>
          Tenure <span>{years} {years === 1 ? 'Year' : 'Years'}</span>
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          aria-label="Loan tenure in years"
        />
      </div>

      <dl className="emi-out">
        <div><dt>Principal</dt><dd>{inr(amount)}</dd></div>
        <div><dt>Total interest</dt><dd>{inr(interest)}</dd></div>
        <div><dt>Total payable</dt><dd>{inr(total)}</dd></div>
      </dl>
      <div className="emi-bar" role="img" aria-label={`Interest is ${Math.round(pct)}% of total payable`}>
        <span style={{ width: `${100 - pct}%` }} />
      </div>
      <p className="emi-note">
        Interest is {Math.round(pct)}% of what you repay. Indicative only — your actual rate is set
        by the lender.
      </p>
    </div>
  );
}
