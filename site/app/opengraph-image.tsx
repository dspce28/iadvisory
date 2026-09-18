import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

// Rendered once at build time; static export has no server to render it on demand.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.tagline}`;

export default function OG() {
  // Satori requires an explicit display on any element with several children,
  // so every node below carries exactly one string.
  const sub = `One application, compared across ${site.stats.partnerBanks} partner banks and NBFCs.`;
  const meta = `No upfront fees · Advising since ${site.since} · ${site.address.locality}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0A1628',
          padding: 80,
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#ff7a7a' }}>i</div>
          <div style={{ fontSize: 56, fontWeight: 700 }}>Advisory</div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>Smart Loan Solutions</div>
        <div style={{ fontSize: 34, color: '#C8A96E', marginTop: 28, lineHeight: 1.4 }}>{sub}</div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.65)', marginTop: 52 }}>{meta}</div>
      </div>
    ),
    size,
  );
}
