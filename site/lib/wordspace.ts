/** The field that waits on the other side of the dive.
 *
 *  Seeded, not random: the server and the client must lay it out identically
 *  or React throws the subtree away on hydration and rebuilds it.
 */
const rnd = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const WORDS = [
  'Home Loan', 'Personal Loan', 'Business Loan', 'Car Loan', 'Education Loan',
  'Loan Against Property', 'EMI', 'Interest', 'Tenure', 'CIBIL', 'Eligibility',
  'Balance Transfer', 'Top-up', 'Prepayment', 'Foreclosure', 'Processing Fee',
  'Sanction', 'Disbursal', 'Down Payment', 'Co-applicant', 'Credit Score',
  'Repo Rate', 'Amortisation', 'Overdraft', 'Collateral', 'Moratorium',
  'Gold Loan', 'Working Capital', 'Refinance', 'Equated Instalment',
  'Documents', 'Approval', 'NBFC', 'Fixed Rate', 'Floating Rate', 'Tax Benefit',
];

export type Word = {
  text: string;
  x: number;
  y: number;
  size: number;
  /** true = starts white, hovers to orange. false = the other way round. */
  light: boolean;
  /** Collides with a neighbour once phone type widens everything: shown on
   *  desktop, dropped on a phone. */
  mobHide: boolean;
  dur: number;
  delay: number;
  drift: number;
};

export function buildWordSpace(): Word[] {
  const r = rnd(529941);
  const out: Word[] = [];
  const placed: { x0: number; x1: number; y0: number; y1: number }[] = [];
  const COLS = 6;
  const ROWS = 8;

  // Estimated box, in percent of a nominal 1440x900 stage. The grid alone
  // does not stop collisions, because a phrase like "Loan Against Property"
  // is four times the width of "EMI" and the jitter moves both.
  const box = (text: string, size: number, x: number, y: number) => {
    const px = size * 16;
    const w = ((text.length * px * 0.56) / 1440) * 100;
    const h = ((px * 1.35) / 900) * 100;
    return { x0: x - w / 2, x1: x + w / 2, y0: y - h / 2, y1: y + h / 2 };
  };
  const hits = (b: ReturnType<typeof box>) =>
    placed.some((p) => b.x0 < p.x1 + 1.4 && b.x1 > p.x0 - 1.4 && b.y0 < p.y1 + 1.2 && b.y1 > p.y0 - 1.2);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // Inset from the edges: these are centred on their own position, so a
      // long phrase at 95% hangs half of itself off the screen.
      const x = 7 + (((col + 0.5) / COLS) * 100 + (r() - 0.5) * 11) * 0.86;
      // Inset from the top too: the header is fixed over this stage, so a
      // word in the first band is both clipped and unhoverable.
      const y = 12 + (((row + 0.5) / ROWS) * 100 + (r() - 0.5) * 8) * 0.8;

      // Leave the middle alone: the mark and its arc live there.
      if (Math.hypot((x - 50) / 26, (y - 48) / 30) < 1) continue;
      // And leave the lower left alone: the heading and the buttons land
      // there, and white words under white words is no heading at all.
      if (x < 56 && y > 60) continue;

      const text = WORDS[(row * COLS + col) % WORDS.length];
      const size = 0.74 + r() * 0.72;
      const b = box(text, size, x, y);
      // Off the edges, or on top of something already placed: drop it. A
      // sparser field reads better than an unreadable one.
      if (b.x0 < 2 || b.x1 > 98 || hits(b)) continue;
      placed.push(b);

      out.push({
        text,
        x,
        y,
        size,
        light: r() < 0.68,
        mobHide: false,
        dur: 5.5 + r() * 6,
        delay: -r() * 8,
        drift: 5 + r() * 9,
      });
    }
  }
  // Second pass, in phone proportions. At 390px the same phrases are about
  // twice as wide relative to the stage, so a pair that clears on a desktop
  // can collide on a phone. Those lose their place on the phone only.
  const mplaced: { x0: number; x1: number; y0: number; y1: number }[] = [];
  for (const w of out) {
    if (w.y > 56) continue; // already dropped on phones
    const px = w.size * 9.75;
    const bw = ((w.text.length * px * 0.56) / 390) * 100;
    const bh = ((px * 1.35) / 844) * 100;
    const b = { x0: w.x - bw / 2, x1: w.x + bw / 2, y0: w.y - bh / 2, y1: w.y + bh / 2 };
    if (
      b.x0 < 1 ||
      b.x1 > 99 ||
      mplaced.some((q) => b.x0 < q.x1 + 1 && b.x1 > q.x0 - 1 && b.y0 < q.y1 + 1 && b.y1 > q.y0 - 1)
    ) {
      w.mobHide = true;
      continue;
    }
    mplaced.push(b);
  }

  return out;
}
