export type Row = { factor: string; a: string; b: string };

export type Comparison = {
  slug: string;
  title: string;
  h1: string;
  optionA: string;
  optionB: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  rows: Row[];
  chooseA: string[];
  chooseB: string[];
  verdict: string;
  faqs: { q: string; a: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: 'home-loan-vs-loan-against-property',
    title: 'Home Loan vs Loan Against Property',
    h1: 'Home Loan vs Loan Against Property',
    optionA: 'Home Loan',
    optionB: 'Loan Against Property',
    metaTitle: 'Home Loan vs Loan Against Property — Which Should You Take?',
    metaDescription:
      'Both are secured against property, but they are not interchangeable. Compare rates, tenure, funding limits, tax treatment and risk before choosing.',
    intro:
      'Both loans are secured against property, which is why they get confused. The difference is what the money is for: a home loan buys the property that secures it, while a loan against property unlocks value from a property you already own. That distinction drives everything else — the rate, the tenure, the funding percentage and the tax treatment.',
    rows: [
      { factor: 'Purpose', a: 'Buying or constructing the property being financed', b: 'Any legitimate purpose, using property you already own' },
      { factor: 'Typical rate', a: 'From about 8.4% p.a.', b: 'From about 9.5% p.a.' },
      { factor: 'Funding', a: '75–90% of property value', b: '50–70% of property value' },
      { factor: 'Maximum tenure', a: 'Up to 30 years', b: 'Up to 15 years' },
      { factor: 'Tax relief', a: 'Sections 24(b) and 80C available under the old regime', b: 'Only if funds are used for business or for buying another house' },
      { factor: 'Processing time', a: '1–3 weeks', b: '2–4 weeks' },
      { factor: 'What is at risk', a: 'The property you are buying', b: 'A property you already own and may live in' },
    ],
    chooseA: [
      'You are buying, constructing or extending a home',
      'You want the longest tenure and the lowest rate available',
      'You want the interest and principal deductions',
    ],
    chooseB: [
      'You already own property and need funds for something else',
      'You are replacing costlier unsecured debt',
      'You need a larger sum than unsecured lending will give you',
    ],
    verdict:
      'If you are buying a home, a home loan is simply the cheaper and longer instrument and there is no real argument for the alternative. A loan against property is a different tool for a different job — and it deserves more caution, because you are putting an asset you already own behind a need that may be short-term. Borrow against property only where repayment rests on dependable cash flow.',
    faqs: [
      { q: 'Can I take a loan against a property that still has a home loan on it?', a: 'Yes, as a top-up on the existing loan or, less commonly, as a second charge with the first lender’s consent. A top-up from your current lender is usually simpler and cheaper than arranging separate borrowing.' },
      { q: 'Is a loan against property cheaper than a personal loan?', a: 'Substantially, because the lender holds security. The trade-off is real: an unpaid personal loan damages your credit record, while an unpaid loan against property can cost you the asset.' },
      { q: 'Do I get tax benefits on a loan against property?', a: 'Only conditionally. Interest may be claimed under Section 37(1) where funds are used for business purposes, or under Section 24(b) where used to buy another residential property. Using the money for a wedding or a holiday attracts no relief.' },
    ],
  },
  {
    slug: 'fixed-vs-floating-interest-rate',
    title: 'Fixed vs Floating Interest Rate',
    h1: 'Fixed vs Floating Interest Rate',
    optionA: 'Fixed Rate',
    optionB: 'Floating Rate',
    metaTitle: 'Fixed vs Floating Interest Rate — Which Costs Less in India?',
    metaDescription:
      'Fixed rates buy certainty at a price. Compare cost, prepayment rules, reset clauses and who each one actually suits before you sign.',
    intro:
      'A fixed rate stays the same for an agreed period. A floating rate moves with an external benchmark, usually the RBI repo rate, so your EMI or tenure changes as that benchmark changes. The honest framing is that you are not choosing the cheaper option — you are choosing whether to pay a premium for predictability.',
    rows: [
      { factor: 'Rate today', a: 'Typically 1–2 percentage points higher', b: 'Lower at the outset' },
      { factor: 'If rates rise', a: 'You are protected for the fixed period', b: 'Your cost rises' },
      { factor: 'If rates fall', a: 'You keep paying the higher rate', b: 'You benefit automatically' },
      { factor: 'Prepayment penalty', a: 'Often charged, even for individuals', b: 'Not permitted on floating home loans to individuals' },
      { factor: 'Reset clause', a: 'Many "fixed" loans reset after 2–3 years', b: 'Repriced with the benchmark, typically quarterly' },
      { factor: 'Budget planning', a: 'EMI is predictable', b: 'EMI or tenure can change' },
    ],
    chooseA: [
      'A rate rise would genuinely strain your household budget',
      'You are borrowing over a short tenure where certainty matters more than cost',
      'You believe rates are near the bottom of the cycle',
    ],
    chooseB: [
      'You have some headroom in your budget for a higher EMI',
      'You expect to prepay, since floating carries no prepayment penalty',
      'You are borrowing over 15 years or more',
    ],
    verdict:
      'For most Indian home loan borrowers, floating has been the cheaper choice over a full tenure, and the absence of a prepayment penalty is worth more than it first appears. Fixed is worth its premium only when a rate rise would genuinely hurt. Read the reset clause before you accept any fixed offer — a rate fixed for two years on a twenty-year loan is mostly a marketing description.',
    faqs: [
      { q: 'Can I switch from fixed to floating later?', a: 'Usually yes, for a conversion fee, though the lender sets the terms and is not obliged to agree. Factor that fee in rather than assuming the switch is free.' },
      { q: 'When rates rise, does my EMI or my tenure change?', a: 'Most lenders extend the tenure first and keep the EMI level, which is easier on cash flow but increases total interest. You can usually ask for the EMI to rise instead, and on a long loan that is generally the cheaper response.' },
      { q: 'What is a repo-linked lending rate?', a: 'A floating rate tied directly to the RBI repo rate plus a fixed spread. It moves faster and more transparently than the older MCLR-linked loans, which is better for you when rates fall and worse when they rise.' },
    ],
  },
  {
    slug: 'personal-loan-vs-gold-loan',
    title: 'Personal Loan vs Gold Loan',
    h1: 'Personal Loan vs Gold Loan',
    optionA: 'Personal Loan',
    optionB: 'Gold Loan',
    metaTitle: 'Personal Loan vs Gold Loan — Which Is Cheaper for Urgent Needs?',
    metaDescription:
      'For a short-term need, a gold loan is usually far cheaper than a personal loan. Compare rates, tenure, credit-score impact and the real risks.',
    intro:
      'For an urgent, short-term need, these are the two options most Indian households actually weigh. A personal loan is unsecured and priced on your credit profile. A gold loan is secured against jewellery you already own, which makes it cheaper and faster but introduces a risk people consistently underestimate.',
    rows: [
      { factor: 'Typical rate', a: 'From about 10.5% p.a., often higher', b: 'Frequently 9–12% p.a. from banks' },
      { factor: 'Credit score requirement', a: 'Important — drives approval and pricing', b: 'Largely irrelevant; the gold is the security' },
      { factor: 'Disbursal', a: 'Same day to a week', b: 'Often within hours' },
      { factor: 'Typical tenure', a: '1–7 years', b: '3 months to 3 years' },
      { factor: 'Amount', a: 'Based on income, up to ₹40 lakh', b: 'Up to 75% of the gold value (RBI cap)' },
      { factor: 'Risk of default', a: 'Credit record damaged; recovery action', b: 'Your jewellery is auctioned' },
    ],
    chooseA: [
      'You need a larger sum than your gold supports',
      'You want to repay over several years',
      'You have a strong credit score that earns a competitive rate',
    ],
    chooseB: [
      'You need money within a day',
      'Your credit score is weak or you have no credit history',
      'You are confident of repaying within a year or two',
    ],
    verdict:
      'If you own gold and the need is short-term, a gold loan is usually the cheaper answer, and it does not depend on your credit score. But be clear about the downside: miss the repayments and the jewellery is auctioned, and in most Indian families that jewellery is not a financial asset so much as an irreplaceable one. Never take a gold loan for a repayment plan you are not confident about.',
    faqs: [
      { q: 'How much can I borrow against my gold?', a: 'The RBI caps bank lending at 75% of the gold’s value, assessed on the weight and purity of the metal alone. Making charges and stones are excluded, so the valuation is typically well below what you paid.' },
      { q: 'Is a gold loan from an NBFC safe?', a: 'With a regulated, established NBFC, yes — but read the storage terms, the auction notice period and the true annualised cost including charges. Small unregulated lenders are a different matter entirely and are best avoided.' },
      { q: 'Does a gold loan affect my credit score?', a: 'It is reported to the bureaus like any other loan, so timely repayment helps and default hurts. The difference is that approval does not depend on your score in the first place.' },
    ],
  },
  {
    slug: 'prepay-loan-or-invest',
    title: 'Prepay Your Loan or Invest the Money?',
    h1: 'Prepay Your Loan or Invest?',
    optionA: 'Prepay the loan',
    optionB: 'Invest the money',
    metaTitle: 'Should You Prepay Your Home Loan or Invest the Money?',
    metaDescription:
      'Prepaying gives a guaranteed, tax-free return equal to your interest rate. Investing might beat it. Here is how to work out which applies to you.',
    intro:
      'You have a surplus. The arithmetic looks simple — compare your loan rate against your expected investment return — but that comparison is usually done wrong, because it sets a guaranteed return against a hoped-for one and ignores tax on both sides.',
    rows: [
      { factor: 'Return', a: 'Guaranteed, equal to your interest rate', b: 'Uncertain, and possibly negative' },
      { factor: 'Tax', a: 'Saving is tax-free, but you may lose a deduction', b: 'Gains are taxable' },
      { factor: 'Liquidity', a: 'Money is locked into the asset', b: 'Usually accessible' },
      { factor: 'Emotional effect', a: 'Debt shrinks; stress falls', b: 'Debt persists alongside the portfolio' },
      { factor: 'Best timing', a: 'Early in the tenure, when interest dominates the EMI', b: 'When the horizon is long enough to absorb volatility' },
    ],
    chooseA: [
      'Your loan rate is high — personal loans, credit cards, anything in double digits',
      'You are in the first third of a long loan, where interest dominates',
      'The debt genuinely worries you, whatever the arithmetic says',
    ],
    chooseB: [
      'Your loan rate is low and you have a long investment horizon',
      'You do not yet have an emergency fund — build that first',
      'Employer matching or a tax-advantaged option is on the table',
    ],
    verdict:
      'Clear expensive debt first, always: nothing reliably beats the return from not paying 18% interest. On a cheap home loan the answer is genuinely finer, and it is reasonable to do both — prepay once a year and invest the rest. One rule overrides the arithmetic: keep an emergency fund of six months’ expenses before doing either, because a prepayment cannot be withdrawn when you need it.',
    faqs: [
      { q: 'Does prepaying hurt my credit score?', a: 'No. Closing a loan early is recorded as full repayment and is neutral to mildly positive. The one small effect is losing an active account from your credit mix, which is not a reason to keep expensive debt.' },
      { q: 'Should I reduce the EMI or the tenure when I prepay?', a: 'Reduce the tenure. Keeping the EMI level and shortening the term saves far more interest than lowering the EMI over the original term, though the lender will often default to the option that saves you less.' },
      { q: 'Is it worth prepaying in the last few years of a loan?', a: 'Much less so. By then most of each EMI is principal and little interest remains to save, so the same money invested usually does more for you.' },
    ],
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
