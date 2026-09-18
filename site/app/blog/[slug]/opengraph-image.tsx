import { ImageResponse } from 'next/og';
import { getPost, posts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const title = p?.title ?? 'Guides';
  const cat = (p?.category ?? '').toUpperCase();
  const foot = `${p?.readMins ?? ''} min read · ${site.name}`;
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
          <div style={{ fontSize: 36, fontWeight: 700, color: '#ff7a7a' }}>i</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>Advisory</div>
        </div>
        <div style={{ fontSize: 24, color: '#C8A96E', marginTop: 40, letterSpacing: 3 }}>{cat}</div>
        <div style={{ fontSize: 62, fontWeight: 700, marginTop: 18, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 25, color: 'rgba(255,255,255,0.6)', marginTop: 46 }}>{foot}</div>
      </div>
    ),
    size,
  );
}
