import Link from 'next/link';
import ZoomHero from '@/components/ZoomHero';
import Reveal from '@/components/Reveal';
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

          <div className="work-grid">
            {loanProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i % 2}>
                <Link className="work" href={`/loans/${p.slug}/`} prefetch={false}>
                  <div className="work-media">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="work-info">
                    <span className="work-rate">From {p.rateFrom}</span>
                    <h3 className="h2" style={{ fontSize: 'clamp(1.25rem,2vw,1.7rem)' }}>
                      {p.name}
                    </h3>
                    <p className="body" style={{ marginTop: '.6rem', fontSize: '.93rem' }}>
                      {p.blurb}
                    </p>
                    <div className="work-meta">
                      <span>Up to {p.maxAmount}</span>
                      <span>Tenure {p.maxTenure}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
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
