'use client';
import { useMemo, useState } from 'react';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const emiOf = (p: number, annual: number, months: number) => {
  const r = annual / 12 / 100;
  return r === 0 ? p / months : (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};

/**
 * A transfer only pays if the interest saved clears the switching cost.
 * Showing the break-even month is the part that changes decisions.
 */
export default function BalanceTransferCalculator() {
  const [outstanding, setOutstanding] = useState(3000000);
  const [oldRate, setOldRate] = useState(9.5);
  const [newRate, setNewRate] = useState(8.4);
  const [monthsLeft, setMonthsLeft] = useState(180);
  const [cost, setCost] = useState(25000);

  const r = useMemo(() => {
    const oldEmi = emiOf(outstanding, oldRate, monthsLeft);
    const newEmi = emiOf(outstanding, newRate, monthsLeft);
    const monthly = oldEmi - newEmi;
    const gross = monthly * monthsLeft;
    const net = gross - cost;
    const breakEven = monthly > 0 ? Math.ceil(cost / monthly) : Infinity;
    return { oldEmi, newEmi, monthly, gross, net, breakEven };
  }, [outstanding, oldRate, newRate, monthsLeft, cost]);

  const worth = r.net > 0 && r.breakEven <= monthsLeft;

  return (
    <div className="emi">
      <div className="emi-head">Net saving after switching costs</div>
      <div className="emi-val" style={{ color: worth ? '#047857' : 'var(--red)' }}>
        {r.net >= 0 ? inr(r.net) : '−' + inr(Math.abs(r.net))}
      </div>

      <div className="cf">
        <label>Outstanding balance <span>{inr(outstanding)}</span></label>
        <input type="range" min={100000} max={20000000} step={50000} value={outstanding}
          onChange={(e) => setOutstanding(+e.target.value)} aria-label="Outstanding balance" />
      </div>
      <div className="cf">
        <label>Your current rate <span>{oldRate.toFixed(2)}%</span></label>
        <input type="range" min={6} max={20} step={0.05} value={oldRate}
          onChange={(e) => setOldRate(+e.target.value)} aria-label="Current interest rate" />
      </div>
      <div className="cf">
        <label>Rate offered <span>{newRate.toFixed(2)}%</span></label>
        <input type="range" min={6} max={20} step={0.05} value={newRate}
          onChange={(e) => setNewRate(+e.target.value)} aria-label="New interest rate" />
      </div>
      <div className="cf">
        <label>Months remaining <span>{monthsLeft} ({(monthsLeft / 12).toFixed(1)} yrs)</span></label>
        <input type="range" min={6} max={360} value={monthsLeft}
          onChange={(e) => setMonthsLeft(+e.target.value)} aria-label="Months remaining" />
      </div>
      <div className="cf">
        <label>Switching cost <span>{inr(cost)}</span></label>
        <input type="range" min={0} max={200000} step={1000} value={cost}
          onChange={(e) => setCost(+e.target.value)} aria-label="Total switching cost" />
      </div>

      <dl className="emi-out">
        <div><dt>EMI now</dt><dd>{inr(r.oldEmi)}</dd></div>
        <div><dt>EMI after transfer</dt><dd>{inr(r.newEmi)}</dd></div>
        <div><dt>Monthly saving</dt><dd>{inr(r.monthly)}</dd></div>
        <div>
          <dt>Break-even</dt>
          <dd>{Number.isFinite(r.breakEven) ? `month ${r.breakEven}` : 'never'}</dd>
        </div>
      </dl>
      <p className="emi-note">
        {worth
          ? `You recover the switching cost in month ${r.breakEven} of ${monthsLeft} remaining, so the transfer is worth doing on these numbers.`
          : 'On these numbers the switch does not pay for itself before the loan ends. A transfer rewards a large balance with a long tenure left — late in a loan it rarely does.'}
        {' '}Switching cost means processing, legal, valuation and any foreclosure charge on the old loan.
      </p>
    </div>
  );
}
