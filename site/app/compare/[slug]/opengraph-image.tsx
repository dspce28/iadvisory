import { ImageResponse } from 'next/og';
import { comparisons, getComparison } from '@/lib/comparisons';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  // Satori needs a single child per node, so every string is precomputed.
  const a = c?.optionA ?? '';
  const b = c?.optionB ?? '';
  const foot = `Compared honestly · ${site.name} · ${site.address.locality}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', background: '#0A1628', padding: 80,
          color: '#ffffff', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 38, fontWeight: 700, color: '#ff7a7a' }}>i</div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Advisory</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 40, lineHeight: 1.1 }}>{a}</div>
        <div style={{ fontSize: 40, color: '#C8A96E', marginTop: 10 }}>versus</div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 10, lineHeight: 1.1 }}>{b}</div>
        <div style={{ fontSize: 25, color: 'rgba(255,255,255,0.6)', marginTop: 46 }}>{foot}</div>
      </div>
    ),
    size,
  );
}
