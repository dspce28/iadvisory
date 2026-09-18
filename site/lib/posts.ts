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
