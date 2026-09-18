export const site = {
  name: 'iAdvisory',
  legalName: 'iAdvisory Financial Services Pvt. Ltd.',
  // Update this once, before launch, and every canonical/OG/sitemap URL follows.
  url: 'https://iadvisory.in',
  since: 2017,
  tagline: 'Smart Loan Solutions',
  description:
    'iAdvisory is a loan advisory service in Ahmedabad. Compare personal, home, business and car loan offers across 30+ partner banks and NBFCs — free advice, no upfront fees.',
  phone: '+919601050241',
  phoneDisplay: '+91 96010 50241',
  whatsapp: '919601050241',
  email: 'info@iadvisory.in',
  address: {
    locality: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380009',
    country: 'IN',
  },
  hours: 'Mon–Sat: 9 AM – 7 PM',
  // Only figures the business has confirmed. Anything unverified stays off the site.
  stats: {
    loansApproved: '50,000+',
    successRate: '98%',
    partnerBanks: '30+',
  },
} as const;

export const yearsInBusiness = () => new Date().getFullYear() - site.since;

export type LoanProduct = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  image: string;
  rateFrom: string;
  maxAmount: string;
  maxTenure: string;
  blurb: string;
  metaTitle: string;
  metaDescription: string;
  highlights: string[];
  eligibility: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
};

export const loanProducts: LoanProduct[] = [
  {
    slug: 'home-loan',
    name: 'Home Loan',
    short: 'Home',
    icon: '🏠',
    image: '/assets/img-b55452f1b6.webp',
    rateFrom: '8.4% p.a.',
    maxAmount: '₹5 Crore',
    maxTenure: '30 years',
    blurb:
      'Finance a new, resale or under-construction home, or transfer an existing loan to a lower rate. Special rates are available for women borrowers.',
    metaTitle: 'Home Loan in Ahmedabad — Rates from 8.4% p.a.',
    metaDescription:
      'Compare home loan offers from 30+ partner banks and NBFCs. Up to ₹5 Crore, tenure up to 30 years, rates from 8.4% p.a. Free advisory, no upfront fees.',
    highlights: [
      'New, resale and under-construction properties',
      'Balance transfer from your existing lender',
      'Special rates for women borrowers',
      'Top-up against an existing home loan',
    ],
    eligibility: [
      'Salaried or self-employed, aged 21–65 at maturity',
      'Stable income for the last 2 years',
      'CIBIL score of 700 or above improves your options',
      'Property with a clear, marketable title',
    ],
    documents: [
      'PAN and Aadhaar',
      'Last 3 months salary slips or 2 years ITR',
      'Last 6 months bank statements',
      'Property documents and sale agreement',
    ],
    faqs: [
      {
        q: 'How much home loan can I get on my salary?',
        a: 'Most lenders cap the EMI at 50–60% of your net monthly income and fund up to 75–90% of the property value. On a ₹1,00,000 net salary with no existing EMIs, that typically supports a loan in the range of ₹50–65 lakh over 20 years, depending on the lender and your credit profile.',
      },
      {
        q: 'Does a balance transfer actually save money?',
        a: 'It can, but only if the rate difference covers the processing and legal costs and you still have a long tenure left. We compare your outstanding loan against current offers and tell you the break-even point before you switch — including when the answer is that you should stay put.',
      },
      {
        q: 'Do you charge for home loan advice?',
        a: 'No. Our advisory is free and we do not take an upfront fee from you. Any processing or legal fee charged by the lender is disclosed to you before your application is submitted.',
      },
          {
        q: 'What is the minimum down payment on a home loan?',
        a: 'Lenders fund 75–90% of the property value depending on the loan size, so you need 10–25% yourself. Crucially, that percentage is of the lender\'s valuation, not the price you agreed. Stamp duty and registration — roughly 5–7% in Gujarat — are also excluded, so budget for them separately rather than discovering them at the end.',
      },
      {
        q: 'Should I choose a fixed or floating interest rate?',
        a: 'Most Indian home loans are floating, linked to an external benchmark such as the repo rate. Fixed rates are usually priced 1–2 percentage points higher for the certainty they give, and many so-called fixed loans reset after two or three years anyway. Over a 20-year tenure, floating has historically cost less; fixed makes sense mainly if a rate rise would genuinely break your budget.',
      },
      {
        q: 'Does a joint home loan help?',
        a: 'Usually yes. A co-applicant\'s income raises eligibility, and if both are co-owners both can claim the tax deductions separately. Adding a woman as the primary applicant also attracts a concessional rate from many lenders. The catch is real: a co-applicant is equally liable, and a default damages both credit records.',
      },
      {
        q: 'How much tax can I actually save?',
        a: 'Under the old regime, Section 24(b) allows up to ₹2 lakh a year on interest for a self-occupied property and Section 80C up to ₹1.5 lakh on principal, though 80C is shared with your other investments. Under the new regime these deductions are largely unavailable for a self-occupied home. Never buy property for the tax break alone — it is a rebate on money you have already spent.',
      },
      {
        q: 'What happens if I prepay part of the loan?',
        a: 'On a floating-rate home loan taken by an individual, lenders cannot charge a prepayment penalty. Prepaying early is powerful, because the early years are almost entirely interest — a single prepayment in year three saves far more than the same amount in year twelve. Ask for the tenure to be reduced rather than the EMI, as that is where the saving is.',
      },
      {
        q: 'Can I get a home loan if I am self-employed?',
        a: 'Yes, though the assessment differs. Lenders look at two to three years of ITR, business vintage and banking conduct rather than salary slips, and they tend to lend against declared profit. Under-declaring income to save tax directly reduces how much you can borrow — a trade-off worth planning two years before you intend to buy.',
      },
    ],
  },
  {
    slug: 'personal-loan',
    name: 'Personal Loan',
    short: 'Personal',
    icon: '💳',
    image: '/assets/img-0e713b359b.webp',
    rateFrom: '10.5% p.a.',
    maxAmount: '₹40 Lakh',
    maxTenure: '7 years',
    blurb:
      'Unsecured funding for a wedding, medical expense, education, travel or debt consolidation, with minimal documentation and no collateral.',
    metaTitle: 'Personal Loan in Ahmedabad — Rates from 10.5% p.a.',
    metaDescription:
      'Compare personal loan offers across 30+ lenders. Up to ₹40 Lakh, no collateral, minimal documentation. Free advisory from iAdvisory, no upfront fees.',
    highlights: [
      'No collateral or guarantor required',
      'Minimal documentation for salaried applicants',
      'Consolidate costlier credit card debt',
      'Flexible tenure from 1 to 7 years',
    ],
    eligibility: [
      'Salaried or self-employed, aged 21–60',
      'Net monthly income from ₹25,000 upward',
      'CIBIL score of 750+ gets the sharpest rates',
      'At least 1 year in your current job or business',
    ],
    documents: [
      'PAN and Aadhaar',
      'Last 3 months salary slips',
      'Last 6 months bank statements',
      'Employment proof or business registration',
    ],
    faqs: [
      {
        q: 'What interest rate will I actually get?',
        a: 'Personal loan pricing is driven by your credit score, employer category and existing obligations. Advertised rates start at 10.5% p.a., but the rate offered to you is set by the lender after assessment. We show you the real offers you qualify for rather than the headline number.',
      },
      {
        q: 'Will applying to several lenders hurt my credit score?',
        a: 'Yes — each formal application triggers a hard enquiry, and several in a short window lowers your score. That is precisely why we assess your profile first and approach only the lenders you are likely to qualify with.',
      },
      {
        q: 'Can I use a personal loan to clear credit card debt?',
        a: 'Often it is the single best use of one. Credit cards commonly charge 36–42% annualised, so moving that balance to a personal loan at a much lower rate reduces both your interest cost and your monthly outgo.',
      },
          {
        q: 'How fast can a personal loan actually be disbursed?',
        a: 'For a salaried applicant with a clean profile and a pre-approved offer, same-day or next-day disbursal is genuinely common. For everyone else, three to seven working days is realistic once documents are complete. Any timeline promised before your documents have been seen is a sales figure, not a commitment.',
      },
      {
        q: 'What is a fair processing fee?',
        a: 'Typically 1–3% of the loan amount plus GST, deducted from the disbursed sum — so on a ₹5 lakh loan you may receive ₹4.85 lakh while repaying interest on ₹5 lakh. Compare offers on the total cost, not the headline rate, and ask for the fee in writing before signing.',
      },
      {
        q: 'Can I get a personal loan with a low credit score?',
        a: 'Below roughly 650 the mainstream lenders usually decline, and what remains is priced at 20% and above. In most cases the better move is to spend three to six months repairing the score rather than locking into expensive debt — unless the need is genuinely urgent, in which case a secured option is normally cheaper than a high-rate personal loan.',
      },
      {
        q: 'Is there a penalty for closing the loan early?',
        a: 'Commonly 2–5% of the outstanding principal, and many lenders bar foreclosure for the first 6–12 months. This varies more between lenders than the interest rate does, so if you expect a bonus or maturity that would let you close early, weigh the foreclosure terms as heavily as the rate.',
      },
      {
        q: 'Does a personal loan affect my home loan eligibility later?',
        a: 'Yes, directly. An existing EMI reduces the income a lender counts as available, and home loan eligibility is largely a function of that figure. Taking a large personal loan within a year or two of a planned home purchase can cut your housing eligibility by several lakh.',
      },
      {
        q: 'Should I take a top-up instead of a new loan?',
        a: 'If you already hold a home loan, a top-up is almost always cheaper than a fresh personal loan, because it is secured against the property. The trade-off is that you stretch a short-term need across a long tenure, so a ₹3 lakh need repaid over 15 years can cost more in total interest despite the lower rate. Match the tenure to the purpose.',
      },
    ],
  },
  {
    slug: 'business-loan',
    name: 'Business Loan',
    short: 'Business',
    icon: '💼',
    image: '/assets/img-e62d81f729.webp',
    rateFrom: '11% p.a.',
    maxAmount: '₹1 Crore',
    maxTenure: '5 years',
    blurb:
      'Unsecured working capital, expansion funding and equipment finance for proprietors, partnerships and private limited companies.',
    metaTitle: 'Business Loan in Ahmedabad — Up to ₹1 Crore',
    metaDescription:
      'Unsecured business loans up to ₹1 Crore with no collateral. Working capital, expansion and equipment finance compared across 30+ lenders. Free advisory.',
    highlights: [
      'No collateral for eligible profiles',
      'Working capital, expansion and equipment finance',
      'Proprietorship, partnership and Pvt Ltd accepted',
      'Overdraft and term loan structures compared',
    ],
    eligibility: [
      'Business vintage of at least 2–3 years',
      'Annual turnover above ₹40 lakh, lender dependent',
      'Filed ITR and GST returns',
      'Healthy bank statement conduct',
    ],
    documents: [
      'PAN and Aadhaar of proprietor or directors',
      'Last 2 years ITR with computation',
      'Last 12 months bank statements',
      'GST returns and business registration proof',
    ],
    faqs: [
      {
        q: 'Can I get a business loan without collateral?',
        a: 'Yes. Unsecured business loans are common for businesses with 2–3 years of vintage, filed returns and clean banking conduct. Rates run higher than secured lending, so where you do have property to offer, we will show you both options side by side.',
      },
      {
        q: 'What matters most in a business loan decision?',
        a: 'Bank statement conduct, usually more than the profit figure in your ITR. Lenders look at average balances, cheque bounces and the consistency of credits. Cleaning up three months of banking conduct before applying frequently changes the offer materially.',
      },
      {
        q: 'How is a term loan different from an overdraft?',
        a: 'A term loan gives a lump sum repaid on a fixed EMI schedule, which suits one-off purchases like equipment. An overdraft is a limit you draw on as needed and pay interest only on what you use, which suits fluctuating working capital.',
      },
          {
        q: 'Why was my business loan rejected despite good profit?',
        a: 'Most often, banking conduct. Credit officers read twelve months of statements for average balance, cheque returns and whether credits are consistent or lumpy. A profitable business that runs its account near zero, or bounces the occasional cheque, reads as higher risk than the ITR suggests.',
      },
      {
        q: 'Is a secured or unsecured business loan better?',
        a: 'Secured borrowing against property is materially cheaper and allows longer tenure and larger amounts. Unsecured is faster and puts no asset at risk. If the need is working capital that turns over quickly, unsecured often justifies its cost; if it is a long-term investment such as machinery or premises, the secured rate usually wins.',
      },
      {
        q: 'What is a CGTMSE-backed loan?',
        a: 'The Credit Guarantee Fund Trust for Micro and Small Enterprises guarantees part of the lender\'s exposure, letting banks lend to small businesses without collateral. It carries a guarantee fee and lenders apply their own eligibility on top, but for a young business without property it is frequently the only route to reasonably priced credit.',
      },
      {
        q: 'How much can my business borrow?',
        a: 'Unsecured lending commonly lands between 1.5 and 3 times monthly turnover, or is sized against declared profit, depending on the lender\'s model. Secured lending is governed by the property valuation instead. Both are then capped by whether your existing obligations leave room to service the new EMI.',
      },
      {
        q: 'Do I need GST registration?',
        a: 'Most lenders ask for GST returns as income evidence, and for a business above the registration threshold their absence is a serious obstacle. Some lenders assess non-GST businesses on banking conduct alone, but the pricing is worse and the amounts smaller.',
      },
      {
        q: 'Should I choose an overdraft or a term loan?',
        a: 'An overdraft charges interest only on what you draw, which suits fluctuating working capital and seasonal businesses. A term loan gives a lump sum on a fixed schedule, which suits a defined purchase. Businesses often take a term loan for convenience and then pay interest on idle funds — worth checking before you decide.',
      },
    ],
  },
  {
    slug: 'car-loan',
    name: 'Car Loan',
    short: 'Car',
    icon: '🚗',
    image: '/assets/img-34bb957ba9.webp',
    rateFrom: '7.2% p.a.',
    maxAmount: '100% on-road',
    maxTenure: '7 years',
    blurb:
      'New and used car finance with funding up to the full on-road price for strong profiles, and quick turnaround at the dealership.',
    metaTitle: 'Car Loan in Ahmedabad — Rates from 7.2% p.a.',
    metaDescription:
      'New and used car loans with up to 100% on-road funding and tenure to 7 years. Compare offers across 30+ lenders with iAdvisory. Free advisory, no upfront fees.',
    highlights: [
      'Up to 100% on-road funding for eligible profiles',
      'New and pre-owned vehicles',
      'Tenure up to 7 years',
      'Dealer-tied offers compared against bank offers',
    ],
    eligibility: [
      'Salaried or self-employed, aged 21–65',
      'Net monthly income from ₹20,000 upward',
      'CIBIL score of 700 or above',
      'Valid driving licence',
    ],
    documents: [
      'PAN and Aadhaar',
      'Last 3 months salary slips or 2 years ITR',
      'Last 6 months bank statements',
      'Vehicle quotation or proforma invoice',
    ],
    faqs: [
      {
        q: 'Is dealership finance cheaper than a bank?',
        a: 'Not usually, though it is faster. Dealer-arranged finance often carries a margin built into the rate. It is worth comparing the dealer offer against a direct bank offer before signing — the difference over a five year tenure is frequently significant.',
      },
      {
        q: 'Can I finance a used car?',
        a: 'Yes, though lenders cap the funding by vehicle age and valuation, typically 70–85% of value for cars under a certain age. Rates are higher than new car finance.',
      },
      {
        q: 'Should I choose a longer tenure to reduce the EMI?',
        a: 'It lowers the monthly outgo but raises total interest, and a car is a depreciating asset. We generally suggest the shortest tenure your budget comfortably supports.',
      },
          {
        q: 'Should I take the longest tenure available?',
        a: 'Rarely. A car depreciates while the loan amortises, so a seven-year tenure can leave you owing more than the vehicle is worth for much of the term. If you might sell or upgrade within four years, that negative equity becomes a real cash problem. Take the shortest tenure your budget genuinely supports.',
      },
      {
        q: 'Is a used car loan worth it?',
        a: 'It can be, but expect a higher rate, a shorter tenure and funding capped at 70–85% of the lender\'s valuation rather than the asking price. Lenders also restrict vehicle age, commonly declining cars that would be more than 8–10 years old at loan maturity.',
      },
      {
        q: 'What does \'on-road price\' include?',
        a: 'Ex-showroom price plus road tax, registration, insurance and any dealer handling charge. Finance is often quoted against ex-showroom while the amount you actually need is the on-road figure, which is why buyers are surprised by a shortfall at delivery. Always compare the sanction against the on-road price.',
      },
      {
        q: 'Can I transfer a car loan to another person?',
        a: 'Technically yes, but it requires the lender\'s approval, a fresh credit assessment of the buyer and a transfer of the RC and insurance. Many lenders simply decline. In practice most private sales are settled by closing the loan and releasing the hypothecation first.',
      },
      {
        q: 'Does the dealer\'s zero-interest offer really cost nothing?',
        a: 'Almost never. The cost is usually recovered through a reduced discount, an inflated processing fee, or a bundled insurance and accessory package. Ask for the cash price without finance and compare the two totals — the difference is the real interest.',
      },
      {
        q: 'How do I remove the hypothecation after repayment?',
        a: 'Once the loan closes, collect the no-objection certificate and Form 35 from the lender, then apply to the RTO to remove the hypothecation from the RC. Skipping this is common and causes real delays when you eventually sell, because the RC still shows the lender as a lienholder.',
      },
    ],
  },
  {
    slug: 'loan-against-property',
    name: 'Loan Against Property',
    short: 'LAP',
    icon: '🏢',
    image: '/assets/img-483ddee7ed.webp',
    rateFrom: '9.5% p.a.',
    maxAmount: '₹10 Crore',
    maxTenure: '15 years',
    blurb:
      'Raise secured funding against residential or commercial property you already own, at rates well below unsecured borrowing.',
    metaTitle: 'Loan Against Property in Ahmedabad — From 9.5% p.a.',
    metaDescription:
      'Loan against residential or commercial property, up to ₹10 Crore and 15 year tenure at rates from 9.5% p.a. Compared across 30+ lenders by iAdvisory.',
    highlights: [
      'Residential, commercial and industrial property',
      'Materially cheaper than unsecured borrowing',
      'Tenure up to 15 years keeps the EMI manageable',
      'Usable for business or personal needs',
    ],
    eligibility: [
      'You own a property with clear title',
      'Demonstrable repayment capacity',
      'Aged 21–70 at loan maturity',
      'Property free of legal dispute',
    ],
    documents: [
      'PAN and Aadhaar',
      'Income proof — salary slips or 2 years ITR',
      'Last 6–12 months bank statements',
      'Full property chain documents',
    ],
    faqs: [
      {
        q: 'How much can I raise against my property?',
        a: 'Lenders typically fund 50–70% of the assessed market value, not your expected value. The lender’s own valuation governs, and it is often more conservative than a broker estimate.',
      },
      {
        q: 'Why is it cheaper than a personal loan?',
        a: 'Because the lender holds security. If repayment fails they can recover against the property, so they price the risk lower. The flip side is real: you are putting an asset at stake, so borrow only what the cash flow genuinely supports.',
      },
      {
        q: 'Can I let out the property during the loan?',
        a: 'Generally yes for residential and commercial property, though the lender’s terms govern and rental income may even strengthen your eligibility. Confirm the specific condition before you sign.',
      },
          {
        q: 'How is my property valued?',
        a: 'By a valuer the lender appoints, not by you or your broker. The figure is typically conservative and considers location, age, construction quality, title clarity and comparable transactions. It is normal for it to come in below your expectation, and the funding percentage applies to that number.',
      },
      {
        q: 'What can I use the money for?',
        a: 'Almost any legitimate purpose — business expansion, a medical need, education, or consolidating costlier debt. Lenders generally exclude speculative use such as buying securities. You will be asked to state the purpose, and it should match what the funds are actually used for.',
      },
      {
        q: 'Can I raise a loan against a property that is let out?',
        a: 'Yes, and the rental income may strengthen your eligibility. Some lenders offer lease rental discounting specifically for commercial property with a registered lease, which prices against the rental stream rather than your personal income.',
      },
      {
        q: 'What if the property is jointly owned?',
        a: 'Every co-owner must join the application as a co-applicant and sign. There is no way around it — the lender needs a charge over the whole property. This is the most common reason a family-held property stalls at the documentation stage.',
      },
      {
        q: 'How long does it take?',
        a: 'Longer than unsecured borrowing: typically two to four weeks, because legal and technical verification of the property sits in the middle. Incomplete chain documents are the usual cause of delay, so assembling them before applying saves real time.',
      },
      {
        q: 'What is the biggest risk?',
        a: 'That you are securing a short-term need against the roof over your head. Default means the lender can enforce against the property under the SARFAESI Act. Borrow against property only where the repayment is supported by dependable cash flow, not by an outcome you are hoping for.',
      },
    ],
  },
  {
    slug: 'education-loan',
    name: 'Education Loan',
    short: 'Education',
    icon: '🎓',
    image: '/assets/img-601e658aed.webp',
    rateFrom: '8.9% p.a.',
    maxAmount: '₹1.5 Crore',
    maxTenure: '15 years',
    blurb:
      'Funding for study in India or abroad, covering tuition, living costs and travel, with repayment beginning after your course ends.',
    metaTitle: 'Education Loan in Ahmedabad — Study in India or Abroad',
    metaDescription:
      'Education loans up to ₹1.5 Crore for study in India and abroad, with a moratorium during the course. Compared across 30+ lenders by iAdvisory. Free advisory.',
    highlights: [
      'Study in India or overseas',
      'Covers tuition, living costs and travel',
      'Moratorium through the course plus grace period',
      'Tax deduction on interest under Section 80E',
    ],
    eligibility: [
      'Confirmed admission to a recognised institution',
      'Indian citizen, typically 18–35',
      'Co-applicant, usually a parent or guardian',
      'Collateral required above lender-set limits',
    ],
    documents: [
      'Admission letter and fee schedule',
      'Academic records and entrance scores',
      'Co-applicant income and KYC documents',
      'Collateral documents where applicable',
    ],
    faqs: [
      {
        q: 'When do repayments start?',
        a: 'Most education loans allow a moratorium covering the course duration plus 6–12 months. Interest usually accrues during that period, so paying simple interest while studying, where you can, materially reduces the final burden.',
      },
      {
        q: 'Is collateral always needed?',
        a: 'No. Loans up to roughly ₹7.5 lakh are commonly unsecured with a co-applicant. Above that, most lenders ask for collateral, although some make exceptions for premier institutions.',
      },
      {
        q: 'Does the interest qualify for tax relief?',
        a: 'Section 80E allows a deduction on the interest paid on an education loan for up to 8 years, with no upper limit on the amount. Confirm your own position with a tax adviser.',
      },
          {
        q: 'Does an education loan cover living costs?',
        a: 'Usually yes for studying abroad — tuition, living expenses, travel, insurance, a laptop and examination fees are commonly included. For domestic courses the coverage is narrower and often restricted to tuition plus limited incidentals. Check the specific inclusions, because the gap is what parents end up funding.',
      },
      {
        q: 'Who can be a co-applicant?',
        a: 'Normally a parent, guardian or spouse. Their income and credit record largely determine the sanction, since the student typically has no income yet. A co-applicant with a weak credit history can sink an otherwise strong application, so it is worth checking their report early.',
      },
      {
        q: 'Should I pay interest during the course?',
        a: 'If you can, yes. Interest accrues through the moratorium and is capitalised, so you end up paying interest on interest. Servicing even simple interest while studying reduces the final outstanding materially, and many lenders offer a small rate concession for doing so.',
      },
      {
        q: 'Is a government scheme better than a private lender?',
        a: 'Public sector banks under the IBA model scheme usually price lower and offer interest subsidy schemes for eligible income brackets, but are slower and stricter on collateral. Private lenders and NBFCs move faster and lend larger amounts for overseas study, at a higher rate. For most families the answer depends on the deadline as much as the cost.',
      },
      {
        q: 'What if I do not get a job after the course?',
        a: 'Speak to the lender before the first EMI is due, not after. Extensions of the moratorium and restructuring are possible and are handled far more sympathetically before a default than after one. A missed EMI damages both your credit record and your co-applicant\'s.',
      },
      {
        q: 'Is collateral required for studying abroad?',
        a: 'Above roughly ₹7.5 lakh most lenders ask for it, typically property or a fixed deposit. Some lenders waive collateral for admissions to a defined list of premier institutions, which is one of the few cases where the choice of university directly changes your financing terms.',
      },
    ],
  },
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/loans/', label: 'Loans' },
  { href: '/compare/', label: 'Compare' },
  { href: '/calculators/', label: 'Calculators' },
  { href: '/cibil-score/', label: 'CIBIL' },
  { href: '/blog/', label: 'Guides' },
  { href: '/contact/', label: 'Contact' },
];
