import type { Metadata } from 'next';
import { Cormorant, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ScrollProgress from '@/components/ScrollProgress';
import { site } from '@/lib/site';
import './globals.css';

// Self-hosted at build time: no render-blocking request to fonts.googleapis.com.
// Only the weights the stylesheet actually asks for: every extra weight is
// another font file on the critical path.
const display = Cormorant({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>
        <ScrollProgress />
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
