import Link from 'next/link';
import ZoomHero from '@/components/ZoomHero';
import Reveal from '@/components/Reveal';
import EmiWidget from '@/components/EmiWidget';
import ProgramCards from '@/components/ProgramCards';
import ProductBook from '@/components/ProductBook';
import ScoreEstimator from '@/components/ScoreEstimator';
import { loanProducts, site, yearsInBusiness } from '@/lib/site';

const partners = [
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India', 'Kotak Mahindra',
  'Bajaj Finserv', 'Tata Capital', 'IDFC First', 'Yes Bank', 'IIFL Finance',
  'L&T Finance', 'Federal Bank',
];

const pillars = [
  {
    n: '01',
    title: 'Advice before application',
    body:
      'We read your profile first — income, obligations, credit record — and tell you where you will actually be sanctioned. That conversation costs you nothing and takes about five minutes.',
    href: '/contact/',
  },
  {
    n: '02',
    title: 'Offers side by side',
    body:
      'Rate is the headline; processing fee, insurance loading, prepayment terms and break-even are where the money is. You see all of it in writing, including the lender we would not use.',
    href: '/compare/',
    ink: true,
  },
  {
    n: '03',
    title: 'The file, run properly',
    body:
      'One set of documents, submitted once, followed through to disbursement. Most rejections we see are avoidable paperwork failures, not credit failures.',
    href: '/apply/',
  },
];

const steps = [
  {
    n: 'STEP 01',
    title: 'Tell us what the money is for',
    body:
      'A call or a WhatsApp message. No documents, no credit pull, no commitment — we need your income shape and your existing EMIs, nothing more.',
  },
  {
    n: 'STEP 02',
    title: 'We shortlist the lenders that will say yes',
    body:
      'Every lender has a policy that is not published: minimum income, employer category, property type, acceptable credit history. Applying blind is how people collect rejections, and every rejection marks your bureau file.',
  },
  {
    n: 'STEP 03',
    title: 'You get the real numbers',
    body:
      'Indicative rate, processing fee, insurance, total interest over the tenure, and the break-even on a balance transfer if that is what you are weighing.',
  },
  {
    n: 'STEP 04',
    title: 'One application, followed to disbursement',
    body:
      'We compile the file, raise it with the lender, and chase it. You hear from us, not from four different relationship managers.',
  },
];

const faqs = [
  {
    q: 'What do you charge?',
    a: 'Nothing, to you. Our advisory and application support are free. Lenders pay us a distribution fee when a loan is disbursed. Any fee the lender charges you — processing, legal, valuation — is disclosed before your application goes in, and we never collect it on their behalf.',
  },
  {
    q: 'Are you a bank?',
    a: 'No. iAdvisory is a loan advisory and facilitation service. We do not lend and we do not sanction. The lending institution decides your rate, your limit and your timeline; we get your file in front of the right one and argue your case.',
  },
  {
    q: 'Will applying through you hurt my credit score?',
    a: 'A formal application triggers a hard enquiry, and several in a short window do read badly. That is precisely the reason to shortlist first: we aim for one application to the lender most likely to approve, instead of five speculative ones.',
  },
  {
    q: 'My CIBIL score is below 700. Is it worth talking to you?',
    a: 'Often yes, but be ready for a different answer than you want. Some lenders price for a 650 file; some will not touch it at any price. In a few cases the honest advice is to spend three months repairing the report before applying at all, and we will say so.',
  },
  {
    q: 'How long does a loan take?',
    a: 'A personal loan on a clean salaried profile can disburse in two to five working days. A home loan runs three to six weeks, because the property and title are being assessed, not just you. Anyone promising a sanctioned home loan in 48 hours is selling you something.',
  },
];

const direct = [
  {
    q: 'Who picks the lender',
    a: 'You do, from whoever advertised at you this week.',
    b: 'We do, from the ones whose written policy your profile already fits.',
  },
  {
    q: 'What a rejection costs',
    a: 'A hard enquiry on your bureau file, and the next lender sees it.',
    b: 'We aim for one application, to the lender most likely to say yes.',
  },
  {
    q: 'What you are quoted',
    a: 'The headline rate. Fees surface at sanction.',
    b: 'Rate, processing fee, insurance loading and total interest, before you sign.',
  },
  {
    q: 'Who chases the file',
    a: 'You, between four relationship managers.',
    b: 'One named advisor, through to disbursement.',
  },
  {
    q: 'What it costs you',
    a: 'Nothing — but nobody is working for you either.',
    b: 'Nothing. The lender pays a distribution fee once your loan disburses.',
  },
];

const documents = [
  {
    t: 'Identity and address',
    d: 'PAN and Aadhaar. Both, in every case — PAN is how the bureau file is pulled.',
  },
  {
    t: 'Income, if you are salaried',
    d: 'Last three salary slips, six months of bank statements for the salary account, and Form 16 or two years of ITR.',
  },
  {
    t: 'Income, if you are self-employed',
    d: 'Two to three years of ITR with computation, audited financials where applicable, GST returns and twelve months of current-account statements.',
  },
  {
    t: 'Property, for a secured loan',
    d: 'Sale agreement or allotment letter, chain of title, approved plan and the latest tax receipt.',
  },
];

const eligibility = [
  { t: 'Age', d: '21 at application, and under 60–65 at the end of the tenure.' },
  { t: 'Income', d: 'Varies by city and lender. In Ahmedabad, most salaried programmes start around ₹25,000 net a month.' },
  { t: 'Credit score', d: '700+ opens the widest set. 650–700 still gets sanctioned, usually priced higher.' },
  { t: 'Obligations', d: 'Existing EMIs plus the new one should stay under roughly 50–60% of net income.' },
  { t: 'Stability', d: 'Six months in the current job for salaried; two to three years of business vintage otherwise.' },
  { t: 'Banking conduct', d: 'No cheque returns or EMI bounces in the last six months. This fails more files than the score does.' },
];

const stats = [
  { n: site.stats.loansApproved, l: 'Loans facilitated' },
  { n: site.stats.partnerBanks, l: 'Partner lenders' },
  { n: `${yearsInBusiness()} yrs`, l: `Advising since ${site.since}` },
];

export default function Home() {
  return (
    <>
      <ZoomHero />

      {/* ── Lender marquee ───────────────────────────────────── */}
      <div className="strip" aria-label="Partner banks and NBFCs">
        <div className="strip-label small">Partner lenders</div>
        <div className="marquee">
          <div className="marquee-row">
            {[...partners, ...partners].map((p, i) => (
              <span key={`${p}-${i}`} aria-hidden={i >= partners.length}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── What we do ───────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            What we do
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '22ch' }}>
              Three things, done properly.
            </h2>
          </Reveal>

          <div className="offset-grid">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i}>
                <Link
                  href={p.href}
                  prefetch={false}
                  className={`ocard${p.ink ? ' ocard-ink' : ''}`}
                >
                  <div className="ocard-top">
                    <span className="ocard-n">{p.n}</span>
                    <span className="ocard-arrow" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                          d="M1 12 12 1M12 1H4.5M12 1v7.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="ocard-body">
                    <h3 className="h3">{p.title}</h3>
                    <p className="body" style={{ marginTop: '.7rem', fontSize: '.93rem' }}>
                      {p.body}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────────── */}
      <section className="section section-warm" id="tools">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Work it out first
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '24ch' }}>
              Know the number before a bank does.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="body" style={{ marginTop: '1.2rem' }}>
              Two things decide what you will be offered: what the EMI does to your monthly budget,
              and what your credit file looks like to an underwriter. Both are worth knowing before
              anyone pulls your bureau report.
            </p>
          </Reveal>

          <div className="tools">
            <Reveal>
              <EmiWidget />
              <p className="small" style={{ marginTop: '1rem' }}>
                Reducing-balance method, the same one every Indian lender uses.{' '}
                <Link href="/emi-calculator/" prefetch={false} style={{ color: 'var(--accent-ink)', fontWeight: 600 }}>
                  Full calculator, with the amortisation split
                </Link>
                .
              </p>
            </Reveal>
            <Reveal delay={1}>
              <ScoreEstimator />
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="tool-links">
              <Link className="tool-link" href="/calculators/eligibility/" prefetch={false}>
                <span>Eligibility</span>
                How much you can borrow on your income
              </Link>
              <Link className="tool-link" href="/calculators/balance-transfer/" prefetch={false}>
                <span>Balance transfer</span>
                Whether switching lender actually saves you money
              </Link>
              <Link className="tool-link" href="/calculators/prepayment/" prefetch={false}>
                <span>Prepayment</span>
                What one lump sum takes off your interest
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="section section-warm">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            What we arrange
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '26ch' }}>
              Six products. One application.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <ProductBook products={loanProducts} />
          </Reveal>
        </div>
      </section>

      {/* ── Process rail ─────────────────────────────────────── */}
      <section className="section section-ink" data-ink>
        <div className="wrap rail">
          <div className="rail-sticky">
            <Reveal className="eyebrow" as="div">
              How it runs
            </Reveal>
            <Reveal>
              <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '16ch' }}>
                From question to disbursement.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="body" style={{ marginTop: '1.4rem' }}>
                Four steps, and you are only asked for documents at the third one.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div style={{ marginTop: '2rem' }}>
                <Link className="btn btn-line btn-lg" href="/apply/" prefetch={false}>
                  Begin
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.n} className="step" delay={i} as="div">
                <span className="step-n">{s.n}</span>
                <div>
                  <h3 className="h2" style={{ fontSize: 'clamp(1.2rem,1.9vw,1.6rem)' }}>
                    {s.title}
                  </h3>
                  <p className="body" style={{ marginTop: '.7rem' }}>
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct vs advised ────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Why go through an advisor at all
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '22ch' }}>
              The same loan, two different outcomes.
            </h2>
          </Reveal>

          <div className="vs">
            <div className="vs-head" aria-hidden="true">
              <span />
              <span>Applying direct</span>
              <span className="vs-ours">Through iAdvisory</span>
            </div>
            {direct.map((r, i) => (
              <Reveal key={r.q} className="vs-row" delay={i} as="div">
                <h3 className="vs-q">{r.q}</h3>
                <p className="vs-a">{r.a}</p>
                <p className="vs-b">{r.b}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <p className="small" style={{ marginTop: '1.8rem', maxWidth: '64ch' }}>
              The fee we are paid is set by the lender and does not change your rate. If a lender
              paying us less is the right answer for you, that is the one we will put you in front
              of — and we will tell you that is what we have done.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Eligibility ──────────────────────────────────────── */}
      <section className="section section-warm">
        <div className="wrap rail">
          <div className="rail-sticky">
            <Reveal className="eyebrow" as="div">
              Before you apply
            </Reveal>
            <Reveal>
              <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '15ch' }}>
                What lenders are actually checking.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="body" style={{ marginTop: '1.3rem' }}>
                None of this is secret, but almost none of it is published either. Six things decide
                most files.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div style={{ marginTop: '1.8rem' }}>
                <Link className="btn btn-accent btn-lg" href="/calculators/eligibility/" prefetch={false}>
                  Check your eligibility
                </Link>
              </div>
            </Reveal>
          </div>

          <ProgramCards items={eligibility} />
        </div>
      </section>

      {/* ── Documents ────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            What to keep ready
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', maxWidth: '24ch' }}>
              One set of documents. Submitted once.
            </h2>
          </Reveal>

          <div className="docs">
            {documents.map((d, i) => (
              <Reveal key={d.t} delay={i} as="div">
                <div className="note-card">
                {/* Pinned to the board: the tilt alternates per card and
                    straightens under the cursor, as if pressed flat. */}
                <span className="note-pin" aria-hidden="true">
                  <svg viewBox="0 0 40 46" fill="none">
                    <ellipse cx="20" cy="41" rx="9" ry="3.2" fill="rgba(15,16,17,.22)" />
                    <path d="M20 20 L20 41" stroke="#8C8C86" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="20" cy="15" r="13" fill="var(--brand)" />
                    <circle cx="15.5" cy="10.5" r="4.2" fill="rgba(255,255,255,.55)" />
                  </svg>
                </span>
                <span className="note-n">{String(i + 1).padStart(2, '0')}</span>
                <div className="note-panel">
                  <h3 className="note-t">{d.t}</h3>
                  <p className="note-d">{d.d}</p>
                </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <div className="note" style={{ marginTop: '2rem', maxWidth: '72ch' }}>
              We never ask for your PAN or Aadhaar number over WhatsApp or a web form, and nothing
              you send us is passed to a lender until you have seen the offer and told us to proceed.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Where we stand
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i}>
                <div className="stat-n">{s.n}</div>
                <div className="stat-l">{s.l}</div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={3}>
            <p className="small" style={{ marginTop: '2.4rem', maxWidth: '58ch' }}>
              Figures as confirmed by the business. We publish no approval-rate claim, because we
              have nothing audited to back one — and a number you cannot verify is not a reason to
              trust anybody with your loan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section section-warm">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Straight answers
          </Reveal>
          <Reveal>
            <h2 className="h1" style={{ marginTop: '1.1rem', marginBottom: 'clamp(28px,4vw,52px)' }}>
              Questions worth asking.
            </h2>
          </Reveal>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="body" style={{ maxWidth: '72ch' }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="section section-ink" data-ink>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="display" style={{ maxWidth: '18ch', marginInline: 'auto' }}>
              Let&rsquo;s look at your numbers.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="body" style={{ marginInline: 'auto', marginTop: '1.4rem' }}>
              A five-minute conversation tells you whether a loan makes sense at all. We will tell
              you if it does not.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div
              className="hero-actions"
              style={{ justifyContent: 'center', marginTop: '2.2rem' }}
            >
              <Link className="btn btn-accent btn-lg" href="/apply/" prefetch={false}>
                Start an application
              </Link>
              <a
                className="btn btn-line btn-lg"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
