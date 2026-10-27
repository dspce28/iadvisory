/** Deterministic scatter for the hero word field.
 *
 *  Seeded rather than random so the server and the client lay the field out
 *  identically — a Math.random() here would mismatch on hydration and React
 *  would throw the whole subtree away and rebuild it.
 */
const rnd = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export const WORDS = [
  'HOME LOAN', 'PERSONAL', 'BUSINESS', 'CAR LOAN', 'EMI', 'CIBIL', 'TENURE',
  'BALANCE TRANSFER', 'TOP-UP', 'ELIGIBILITY', 'PROPERTY', 'EDUCATION',
  'SANCTION', 'DISBURSAL', 'NBFC', 'PREPAY', 'CREDIT', 'FORECLOSURE',
  'LOAN AGAINST PROPERTY', 'OVERDRAFT', 'INTEREST', 'PROCESSING FEE',
  'APPROVAL', 'DOWN PAYMENT', 'CO-APPLICANT', 'AMORTISATION', 'REPO RATE',
  'DOCUMENTS', 'ADVISORY', 'RATE', 'LENDER', 'OFFER',
  // A handful scrambled, because the field is the question before it is
  // the answer — they unscramble as the page resolves.
  'NAOL', 'IBLIC', 'SRETETNI', 'EMOH',
];

export const ICONS = [
  'home', 'car', 'building', 'doc', 'shield', 'wallet',
  'chart', 'key', 'calendar', 'percent', 'bank', 'check',
] as const;

export type ScatterItem = {
  kind: 'word' | 'icon';
  value: string;
  /** Position, in percent of the stage. */
  x: number;
  y: number;
  /** Unit vector away from the centre, and how far it travels. */
  dx: number;
  dy: number;
  dist: number;
  rot: number;
  size: number;
  accent: boolean;
  /** Staggers the exit so the field disperses rather than snapping. */
  lead: number;
};

export function buildField(): ScatterItem[] {
  const r = rnd(81451);
  const out: ScatterItem[] = [];
  const COLS = 7;
  const ROWS = 7;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = ((col + 0.5) / COLS) * 100 + (r() - 0.5) * 9;
      const y = ((row + 0.5) / ROWS) * 100 + (r() - 0.5) * 9;

      // Keep the middle clear: the mark lives there.
      const nx = (x - 50) / 50;
      const ny = (y - 50) / 50;
      if (Math.hypot(nx * 1.5, ny) < 0.52) continue;

      const len = Math.max(0.0001, Math.hypot(nx, ny));
      const isIcon = r() < 0.34;
      out.push({
        kind: isIcon ? 'icon' : 'word',
        value: isIcon
          ? ICONS[Math.floor(r() * ICONS.length)]
          : WORDS[Math.floor(r() * WORDS.length)],
        x,
        y,
        dx: nx / len,
        dy: ny / len,
        dist: 72 + r() * 68,
        rot: (r() - 0.5) * 16,
        size: isIcon ? 0.9 + r() * 0.75 : 0.72 + r() * 0.62,
        accent: r() < 0.26,
        lead: r() * 0.3,
      });
    }
  }
  return out;
}
