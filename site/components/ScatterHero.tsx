'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import ScatterIcon from '@/components/ScatterIcon';
import { buildField } from '@/lib/scatter';
import { site } from '@/lib/site';

/** Where the dot sits inside logo-mark.webp, measured off the asset itself:
 *  41.92% across, 11.28% down, diameter 60.38% of its width. The flight is
 *  anchored on that point, so the camera goes through the dot and not past it. */
const DOT = { x: 41.92, y: 11.28, d: 60.38 };

/** How far the mark grows. Enough that the dot alone is wider than any
 *  viewport, which is what turns it from a mark into the ground. */
const MAX = 62;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function ScatterHero() {
  const root = useRef<HTMLElement>(null);
  const field = useMemo(() => buildField(), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    el.dataset.on = '';

    let frame = 0;
    let wasInk = false;
    const measure = () => {
      frame = 0;
      const travel = el.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = clamp(-el.getBoundingClientRect().top / travel);

      // 1. The field disperses.
      const push = clamp(p / 0.4);
      // 2. The camera goes into the dot. Geometric, so the approach reads
      //    at a constant rate rather than stalling then lurching.
      const dive = clamp((p - 0.34) / 0.44);
      const scale = (1 + push * 0.22) * Math.pow(MAX, dive);
      // 3. The red it leaves behind clears.
      const flash = 1 - clamp((p - 0.78) / 0.1);
      // 4. What you arrive at — only once the red has actually gone.
      const end = clamp((p - 0.87) / 0.11);

      // The dot sits on the transform origin, so its centre never moves on
      // screen. Sizing it directly instead of scaling it means the circle is
      // rasterised at its real size every frame and its edge stays hard;
      // a scaled element is a texture, and a texture blown up 60 times is a
      // blurry texture.
      const mark = el.querySelector('.sc-i') as HTMLElement | null;
      const stage = el.querySelector('.sc-stage') as HTMLElement | null;
      if (mark && stage) {
        const iw = mark.offsetWidth;
        const ih = mark.offsetHeight;
        const left = (stage.clientWidth - iw) / 2;
        const top = (stage.clientHeight - ih) / 2;
        const diag = Math.hypot(stage.clientWidth, stage.clientHeight);
        el.style.setProperty('--dot-x', `${(left + (DOT.x / 100) * iw).toFixed(1)}px`);
        el.style.setProperty('--dot-y', `${(top + (DOT.y / 100) * ih).toFixed(1)}px`);
        el.style.setProperty(
          '--dot-d',
          `${Math.min((DOT.d / 100) * iw * scale, diag * 2.4).toFixed(1)}px`,
        );
      }

      el.style.setProperty('--push', push.toFixed(4));
      el.style.setProperty('--fade', (1 - clamp(p / 0.32)).toFixed(3));
      el.style.setProperty('--scale', scale.toFixed(3));
      el.style.setProperty('--flash', flash.toFixed(3));
      el.style.setProperty('--end', end.toFixed(3));
      el.style.setProperty('--hint', (1 - clamp(p * 7)).toFixed(3));

      // The bar sits over brand red for the middle of the flight.
      const ink = p > 0.5 && p < 0.86;
      if (ink !== wasInk) {
        wasInk = ink;
        if (ink) el.setAttribute('data-ink', '');
        else el.removeAttribute('data-ink');
        window.dispatchEvent(new Event('scroll'));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      delete el.dataset.on;
      el.removeAttribute('data-ink');
    };
  }, []);

  return (
    <section className="sc" ref={root} aria-label={`${site.name} — loan advisory`}>
      <div className="sc-stage">
        {/* The field: what people come here asking about, before it is sorted. */}
        <div className="sc-field" aria-hidden="true">
          {field.map((it, i) => (
            <span
              key={`${it.value}-${i}`}
              className={`sc-item${it.accent ? ' on' : ''}${it.kind === 'icon' ? ' ic' : ''}`}
              style={
                {
                  '--x': `${it.x}%`,
                  '--y': `${it.y}%`,
                  '--dx': it.dx.toFixed(3),
                  '--dy': it.dy.toFixed(3),
                  '--dist': it.dist.toFixed(1),
                  '--rot': `${it.rot.toFixed(1)}deg`,
                  '--sz': it.size.toFixed(2),
                  '--lead': it.lead.toFixed(2),
                } as React.CSSProperties
              }
            >
              {it.kind === 'icon' ? <ScatterIcon name={it.value} /> : it.value}
            </span>
          ))}
        </div>

        {/* The mark, and the dot the camera flies through. The dot is a real
            circle rather than part of the bitmap, so the fill stays perfectly
            round and hard-edged at sixty times its size. */}
        <div className="sc-mark" aria-hidden="true">
          <div className="sc-i">
            <Image src="/assets/logo-mark.webp" alt="" width={260} height={696} priority />
          </div>
        </div>
        {/* An SVG circle rather than a border-radius box: at two viewport
            diagonals across, a CSS corner radius shows visible stair-stepping
            on the arc and an SVG circle does not. */}
        <svg className="sc-dot" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="50" fill="var(--brand)" />
        </svg>

        <div className="sc-hint small" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>

        {/* What the field resolves into. */}
        <div className="sc-end">
          <div className="sc-end-copy">
            <span className="eyebrow">Loan advisory · {site.address.locality}</span>
            <h1 className="sc-h1">
              Every loan question,
              <br />
              one straight answer.
            </h1>
            <p className="sc-lede">
              We are not a lender and not a lead farm. We read your profile, shortlist the banks
              that will actually sanction it, and run the file to disbursement.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-accent btn-lg" href="/apply/" prefetch={false}>
                Start an application
              </Link>
              <Link className="btn btn-line btn-lg" href="/emi-calculator/" prefetch={false}>
                Calculate an EMI
              </Link>
            </div>
          </div>
          <div className="sc-end-mark">
            <Image src="/assets/logo-mark.webp" alt={site.name} width={260} height={696} />
          </div>
        </div>
      </div>
    </section>
  );
}
