import Link from 'next/link';
import Image from 'next/image';
import { loanProducts, site, yearsInBusiness } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg5">
          <div>
            <div className="logo" style={{ marginBottom: '1.25rem' }}>
              <Image
                src="/assets/img-1329a877e0.webp"
                alt=""
                width={220}
                height={220}
                style={{ height: 44, width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
              <div className="logo-name" style={{ color: '#fff' }}>
                <span style={{ color: '#ff7a7a' }}>i</span>
                <span>Advisory</span>
              </div>
            </div>
            <p>
              India&rsquo;s trusted loan advisory — connecting borrowers with {site.stats.partnerBanks}{' '}
              partner banks and NBFCs since {site.since}. Expert guidance, transparent comparisons,
              no upfront fees.
            </p>
            <div className="fsoc">
              <a
                className="fsl"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
              >
                wa
              </a>
            </div>
          </div>

          <div>
            <h4>Loan Services</h4>
            <ul>
              {loanProducts.map((p) => (
                <li key={p.slug}>
                  <Link prefetch={false} href={`/loans/${p.slug}/`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link prefetch={false} href="/about/">About Us</Link></li>
              <li><Link prefetch={false} href="/calculators/">Loan Calculators</Link></li>
              <li><Link prefetch={false} href="/compare/">Loan Comparisons</Link></li>
              <li><Link prefetch={false} href="/cibil-score/">Check CIBIL Score</Link></li>
              <li><Link prefetch={false} href="/blog/">Blog &amp; Insights</Link></li>
              <li><Link prefetch={false} href="/privacy-policy/">Privacy Policy</Link></li>
              <li><Link prefetch={false} href="/terms/">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <span>📍</span>
                <span>
                  {site.address.locality}, {site.address.region} — {site.address.postalCode}
                </span>
              </li>
              <li>
                <span>📞</span>
                <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              </li>
              <li>
                <span>✉️</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span>🕐</span>
                <span>{site.hours}</span>
              </li>
            </ul>
            <div className="fbadges">
              <div className="fbadge">🔒 SSL Secure</div>
              <div className="fbadge">🤝 No Upfront Fees</div>
            </div>
          </div>
        </div>

        <div className="fdisc">
          {site.name} is a loan advisory and facilitation service. We are not a bank or an NBFC and
          we do not lend. Loan sanction, final interest rate and disbursement timelines rest solely
          with the lending institution. Interest rates shown are indicative and subject to change.
          {' '}Advising borrowers since {site.since} ({yearsInBusiness()} years).
        </div>

        <div className="fbot">
          <span>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </span>
          <div className="fbot-links">
            <Link prefetch={false} href="/privacy-policy/">Privacy</Link>
            <Link prefetch={false} href="/terms/">Terms</Link>
            <Link prefetch={false} href="/contact/">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
