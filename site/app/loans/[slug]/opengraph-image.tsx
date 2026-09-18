import { ImageResponse } from 'next/og';
import { loanProducts, site } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return loanProducts.map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = loanProducts.find((x) => x.slug === slug);
  const name = p?.name ?? 'Loans';
  const facts = `From ${p?.rateFrom ?? ''} · up to ${p?.maxAmount ?? ''}`;
  const sub = `Compared across ${site.stats.partnerBanks} partner banks and NBFCs. Free advisory, no upfront fees.`;
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: '#ff7a7a' }}>i</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Advisory</div>
        </div>
        <div style={{ fontSize: 78, fontWeight: 700, marginTop: 34, lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontSize: 36, color: '#C8A96E', marginTop: 20 }}>{facts}</div>
        <div style={{ fontSize: 27, color: 'rgba(255,255,255,0.65)', marginTop: 44, lineHeight: 1.45 }}>
          {sub}
        </div>
      </div>
    ),
    size,
  );
}
