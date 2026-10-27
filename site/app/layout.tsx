import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import Motion from '@/components/Motion';
import { site } from '@/lib/site';
import './globals.css';

// Self-hosted at build time: no render-blocking request to fonts.googleapis.com.
// One family, variable weight. The reference site runs on Switzer; Inter Tight
// is the closest open equivalent — same tight apertures, same -0.04em display
// tracking — and it ships as a single variable file instead of four static ones.
const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // Set GSC_VERIFICATION to the code Google Search Console gives you and it
  // renders the meta tag. Verification only; it loads no script and collects
  // nothing. DNS verification works too and needs no code at all.
  ...(process.env.GSC_VERIFICATION
    ? { verification: { google: process.env.GSC_VERIFICATION } }
    : {}),
};

// LocalBusiness markup is what puts a service business into Google's local results.
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  foundingDate: String(site.since),
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  openingHours: 'Mo-Sa 09:00-19:00',
  // Stated plainly in the markup as well as the footer: we are an intermediary.
  disambiguatingDescription:
    'Loan advisory and facilitation service. Not a bank or NBFC; does not lend.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-IN" className={sans.variable}>
      <body>
        <Motion />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {ga ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
