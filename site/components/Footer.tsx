import Link from 'next/link';
import Image from 'next/image';
import { loanProducts, site, yearsInBusiness } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="ftr" data-ink>
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Image
              src="/assets/logo-horizontal-light.webp"
              alt={site.name}
              width={480}
              height={162}
              style={{ width: 148, height: 'auto' }}
            />
            <p className="small" style={{ margin: '1.2rem 0 1.6rem', maxWidth: '34ch' }}>
              Loan advisory in {site.address.locality} since {site.since}. We compare offers across
              our partner lenders, explain the trade-offs, and charge you nothing for it.
            </p>
            <a className="btn btn-line" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
              WhatsApp us
            </a>
          </div>

          <div>
            <h4>Loans</h4>
            <ul>
              {loanProducts.map((p) => (
                <li key={p.slug}>
                  <Link prefetch={false} href={`/loans/${p.slug}/`}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><Link prefetch={false} href="/about/">About</Link></li>
              <li><Link prefetch={false} href="/calculators/">Calculators</Link></li>
              <li><Link prefetch={false} href="/compare/">Comparisons</Link></li>
              <li><Link prefetch={false} href="/cibil-score/">CIBIL score</Link></li>
              <li><Link prefetch={false} href="/blog/">Guides</Link></li>
              <li><Link prefetch={false} href="/contact/">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Reach us</h4>
            <ul>
              <li>
                {site.address.locality}, {site.address.region} — {site.address.postalCode}
              </li>
              <li><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>

        <p className="ftr-note">
          {site.name} is a loan advisory and facilitation service. We are not a bank or an NBFC and
          we do not lend. Loan sanction, the final interest rate and disbursement timelines rest
          solely with the lending institution. Interest rates shown anywhere on this site are
          indicative, change without notice, and are not an offer of credit. Advising borrowers
          since {site.since} ({yearsInBusiness()} years).
        </p>

        <div className="ftr-bot">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <div style={{ display: 'flex', gap: '1.4rem', flexWrap: 'wrap' }}>
            <Link prefetch={false} href="/privacy-policy/">Privacy</Link>
            <Link prefetch={false} href="/terms/">Terms</Link>
            <Link prefetch={false} href="/contact/">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
