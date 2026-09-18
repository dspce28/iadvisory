export type Post = {
  slug: string;
  title: string;
  category: string;
  icon: string;
  date: string;
  readMins: number;
  excerpt: string;
  body: { h?: string; p: string }[];
};

export const posts: Post[] = [
  {
    slug: 'why-loan-applications-get-rejected',
    title: 'Why Loan Applications Get Rejected — and What to Fix First',
    category: 'Applications',
    icon: '\u26A0\uFE0F',
    date: '2026-08-26',
    readMins: 6,
    excerpt:
      'Rejection is rarely about the number on your salary slip. These are the reasons we see most often, in the order worth fixing them.',
    body: [
      { p: 'A rejection letter almost never explains itself. Lenders decline without reasons, which leaves applicants guessing and, worse, applying again immediately \u2014 which makes the next attempt harder still. These are the causes we see most, roughly in order of frequency.' },
      { h: 'Too many recent applications', p: 'Each formal application creates a hard enquiry on your credit report. Four or five inside a couple of months reads as credit hunger and pushes your score down at precisely the moment you need it up. If you have applied recently and been declined, the single most useful thing you can do is wait three months before trying again.' },
      { h: 'Banking conduct, not income', p: 'Credit officers read your statements more carefully than your salary slip. Average balance near zero after each credit, cheque returns, or a pattern of borrowing from apps and settling late all weigh heavily. Three months of clean conduct before applying changes outcomes more reliably than a raise does.' },
      { h: 'Undisclosed existing debt', p: 'Everything appears on the bureau report anyway. Omitting a loan does not hide it \u2014 it just means the lender discovers a discrepancy between what you declared and what they can see, and that reads as a character problem rather than an arithmetic one.' },
      { h: 'A small overdue amount you forgot', p: 'An unpaid \u20B9800 credit card balance from two years ago, still marked overdue, can block a \u20B950 lakh home loan. Pull your own report before applying and settle anything showing as outstanding, then get written confirmation.' },
      { h: 'Employer or profile category', p: 'Many lenders grade employers into internal categories, and a small or unlisted company can mean a lower sanction or a higher rate even on a good salary. This is not something you can fix, but it is worth knowing, because it means a decline from one lender says little about the next.' },
      { h: 'Property or documentation issues', p: 'On secured loans the property is assessed as carefully as you are. An unclear title chain, an unapproved construction or a missing link document will stop an application that was otherwise clean. Assemble the chain before you apply.' },
      { h: 'What to do after a rejection', p: 'Stop applying. Get your bureau report, identify which of the above applies, fix it, and wait a quarter. Applying to a second lender the same week \u2014 the instinctive response \u2014 is the one action that reliably makes things worse.' },
    ],
  },
  {
    slug: 'documents-checklist-before-you-apply',
    title: 'The Document Checklist to Assemble Before You Apply',
    category: 'Applications',
    icon: '\U0001F4C4',
    date: '2026-08-05',
    readMins: 5,
    excerpt:
      'Most delays are not credit decisions. They are a missing paper nobody asked for until week three. Here is what to gather first.',
    body: [
      { p: 'Applications rarely stall because a lender is thinking. They stall because something is missing and everyone is waiting on it. Assembling the full set before you apply typically removes one to two weeks from the process.' },
      { h: 'Everyone needs these', p: 'PAN card, Aadhaar, a passport-sized photograph, and proof of current address if it differs from your Aadhaar. Where your name is spelled differently across documents \u2014 common with initials and surnames \u2014 sort that out first, because it will otherwise surface at the worst moment.' },
      { h: 'If you are salaried', p: 'Last three months of salary slips, last six months of bank statements for the salary account, Form 16 for the last two years, and an employment certificate or offer letter. If you changed jobs recently, keep the relieving letter from the previous employer to hand.' },
      { h: 'If you are self-employed', p: 'Last two to three years of ITR with the computation of income, audited financials where applicable, twelve months of business bank statements, GST returns, and proof of business continuity such as registration or a licence. The bank statements matter most.' },
      { h: 'For any property-backed loan', p: 'The complete chain of title documents, the sale agreement or allotment letter, approved building plans, the occupancy or completion certificate where applicable, and current property tax receipts. A break in the title chain is the most common cause of a stalled secured loan.' },
      { h: 'Gather the awkward ones early', p: 'A no-objection certificate from a previous lender, a release deed on an inherited property, a society share certificate \u2014 these take weeks to obtain and nobody asks for them until late. If you know one applies to you, start it before you apply for anything.' },
      { h: 'One practical habit', p: 'Keep a single folder, physical or digital, with everything above, and refresh the bank statements and salary slips each quarter. Borrowers who do this get decisions faster, and speed genuinely matters when a property deal or a business opportunity has a deadline.' },
    ],
  },
  {
    slug: 'understanding-loan-charges',
    title: 'The Charges Nobody Mentions Until You Sign',
    category: 'Costs',
    icon: '\U0001F4B8',
    date: '2026-07-01',
    readMins: 6,
    excerpt:
      'The interest rate is the number you compare. It is rarely the number that decides which loan costs less.',
    body: [
      { p: 'Two loans quoted at the same rate can differ by tens of thousands of rupees over their life. The difference sits in charges that are disclosed, technically, but never in the conversation where you choose.' },
      { h: 'Processing fee', p: 'Usually 0.5\u20133% plus GST, and often deducted from the disbursed amount rather than charged separately \u2014 so on a \u20B95 lakh sanction you may receive \u20B94.85 lakh while paying interest on \u20B95 lakh. Always ask what actually reaches your account.' },
      { h: 'Legal and technical valuation', p: 'On secured loans, the lender charges you for its own lawyer\u2019s title check and its own valuer\u2019s inspection. Typically \u20B95,000\u201315,000 combined, payable whether or not the loan completes.' },
      { h: 'Foreclosure and part-payment charges', p: 'On floating-rate home loans to individuals these cannot be charged. On fixed-rate loans, personal loans and business loans they very much can \u2014 commonly 2\u20135% of the outstanding. If there is any chance you will repay early, this clause matters more than a small rate difference.' },
      { h: 'Bundled insurance', p: 'A loan protection policy is often added at sanction, sometimes financed into the loan itself so you pay interest on the premium for the full tenure. Insurance may well be sensible, but it should be a decision you make, not a line you discover.' },
      { h: 'Conversion and switch fees', p: 'Moving from a higher spread to a lower one with your existing lender \u2014 or from fixed to floating \u2014 usually carries a fee of around 0.5% of outstanding. Worth knowing, because it is often cheaper than a full balance transfer to a new lender.' },
      { h: 'Penal and administrative charges', p: 'Late payment penalties, cheque bounce charges, duplicate statement fees, and a charge for the no-objection certificate at closure. Individually small, collectively a nuisance, and all avoidable with an auto-debit mandate.' },
      { h: 'How to compare properly', p: 'Ask every lender for the total amount you will repay over the full tenure, including all charges, and the amount that will actually reach your account on day one. Those two numbers decide which loan is cheaper. The headline rate, on its own, does not.' },
    ],
  },
  {
    slug: 'improve-cibil-score-600-to-750',
    title: 'How to Improve Your CIBIL Score from 600 to 750',
    category: 'Credit Score',
    icon: '📊',
    date: '2026-07-14',
    readMins: 6,
    excerpt:
      'A 600 score does not block you from borrowing — it makes borrowing expensive. Here is what actually moves the number, and how long each step takes.',
    body: [
      {
        p: 'A CIBIL score below 650 rarely means outright rejection. It means a higher rate, a smaller sanction and a shorter tenure. On a ₹20 lakh loan, the gap between a 650 profile and a 780 profile is frequently two percentage points, which is several lakh rupees over the full term.',
      },
      {
        h: 'Fix your credit utilisation first',
        p: 'Utilisation — the share of your card limit you actually use — is the fastest lever you control. Lenders react badly above 30%. Paying a card down from 80% to 25% utilisation typically shows up in your score within one or two billing cycles, which makes it the highest-return action available to you.',
      },
      {
        h: 'Never miss a payment, even a small one',
        p: 'Payment history carries the most weight of any factor. A single 30-day delinquency can cost 50 to 80 points and stays on the report for years. Set auto-debit for at least the minimum due on every card and loan; a missed ₹500 minimum damages your file exactly as a missed ₹50,000 EMI does.',
      },
      {
        h: 'Stop applying to multiple lenders at once',
        p: 'Every formal application creates a hard enquiry. Several inside a few weeks reads as credit hunger and pushes the score down precisely when you need it up. This is the single most common self-inflicted wound we see, and it is the reason we assess your profile before approaching any lender.',
      },
      {
        h: 'Do not close your oldest card',
        p: 'Length of credit history matters. Closing the card you have held longest shortens your average account age and removes its limit from your utilisation calculation, so the score can drop twice over. Keep it open with a small recurring spend.',
      },
      {
        h: 'Dispute the errors — there are more than you think',
        p: 'A meaningful share of reports carry an error: a closed loan showing open, a payment marked late that was not, or an account that is not yours. You can raise a dispute with CIBIL directly at no cost, and corrections typically resolve in about 30 days. Pull your report before you apply, not after you are declined.',
      },
      {
        h: 'A realistic timeline',
        p: 'Utilisation improvements can register within 30 to 60 days. Error corrections take roughly a month once raised. Rebuilding after a delinquency takes 12 to 18 months of clean conduct. Anyone promising to move you from 600 to 750 in a week is selling something that does not exist.',
      },
    ],
  },
  {
    slug: 'home-loan-vs-rent',
    title: 'Home Loan vs Rent: Running the Numbers Honestly',
    category: 'Home Loan',
    icon: '🏠',
    date: '2026-06-02',
    readMins: 7,
    excerpt:
      'Buying is not automatically better than renting. The answer turns on how long you will stay and what your down payment would otherwise earn.',
    body: [
      {
        p: 'The case for buying is usually argued emotionally: rent is money down the drain, EMI builds an asset. Both halves of that are incomplete. In the early years of a 20-year home loan, the large majority of each EMI is interest, which is every bit as gone as rent is.',
      },
      {
        h: 'The costs people leave out',
        p: 'Buying carries stamp duty and registration, brokerage, interiors, annual maintenance, property tax and the opportunity cost of the down payment. A ₹20 lakh down payment invested elsewhere compounds; inside your home it does not. Any honest comparison prices that in.',
      },
      {
        h: 'Time horizon decides it',
        p: 'Transaction costs on purchase commonly run 7 to 10% of the property value. If you sell within three or four years, price appreciation usually has not covered those costs, and renting would have left you better off. Past roughly seven years the arithmetic generally turns in favour of buying.',
      },
      {
        h: 'The rent-to-price ratio',
        p: 'Compare annual rent against property price. In much of urban India this lands between 2% and 3%, meaning a ₹1 crore flat rents for ₹2 to 3 lakh a year. When a home loan costs 8.5% and renting the same home costs 2.5% of its value, renting and investing the difference can be the stronger financial choice — though it demands the discipline to actually invest the difference.',
      },
      {
        h: 'What buying genuinely gives you',
        p: 'Security of tenure, freedom to modify, a forced savings habit, a hedge against rent inflation and tax deductions under Sections 80C and 24(b). These are real. They are simply not the same argument as "rent is wasted money", and they deserve to be weighed on their own terms.',
      },
    ],
  },
  {
    slug: 'business-loan-documents-checklist',
    title: 'Business Loan Documents: What Lenders Actually Check',
    category: 'Business Loan',
    icon: '💼',
    date: '2026-04-21',
    readMins: 5,
    excerpt:
      'The document list is the easy part. What decides your application is what those documents reveal about how you run your bank account.',
    body: [
      {
        p: 'Most business loan rejections are not caused by missing paperwork. They are caused by what the paperwork shows. Understanding what a credit officer looks for lets you fix problems before applying rather than after being declined.',
      },
      {
        h: 'Bank statements matter more than your ITR',
        p: 'Twelve months of statements are read closely: average monthly balance, the consistency of credits, cheque returns and whether balances collapse right after every inflow. A business showing ₹50 lakh turnover with an average balance of ₹15,000 and three bounced cheques will struggle regardless of what the ITR says.',
      },
      {
        h: 'ITR and GST must agree',
        p: 'Lenders cross-check turnover declared in GST returns against income declared in your ITR. Divergence between the two is a red flag that is difficult to explain after the fact. Reconcile them before you apply.',
      },
      {
        h: 'Business vintage and continuity proof',
        p: 'Most lenders want two to three years of operating history, evidenced by registration documents, GST registration date, and continuity of the same bank account. Switching your primary account shortly before applying removes the very history the lender wants to examine.',
      },
      {
        h: 'Existing obligations',
        p: 'Every current loan, overdraft and equipment lease is counted. Undisclosed borrowing surfaces in the credit bureau report anyway, and discovering it there damages your credibility far more than disclosing it would have.',
      },
      {
        h: 'Three months of preparation is usually enough',
        p: 'Maintain higher average balances, clear any cheque return history, reconcile GST with ITR, and avoid new borrowing in the run-up. In our experience that preparation changes the offer more reliably than negotiating after submission ever does.',
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
