'use client';
import { useEffect, useRef, useState } from 'react';
import { createField, VARIANTS, type FieldVariant } from '@/lib/heroField';
import { site } from '@/lib/site';

const MAX_SCALE = 34;

/**
 * Side-by-side bench for the hero field.
 *
 * The scrub bar stands in for the scroll, so the whole flight — the resting
 * wordmark through to the full-screen arrival — can be compared between
 * variants in a second rather than by scrolling three screens each time.
 * Not linked from anywhere and marked noindex: it exists to settle a
 * decision, not to be a page on the site.
 */
export default function HeroLab() {
  const [variant, setVariant] = useState<FieldVariant>('engrave');
  const [p, setP] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d', { alpha: false });
    if (!ctx) return;
    const field = createField(ctx, variant);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const size = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size, { passive: true });
    let raf = 0;
    let painted = 0;
    const draw: FrameRequestCallback = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - painted < 32) return;
      painted = t;
      field(t, w, h);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, [variant]);

  const s = Math.pow(MAX_SCALE, p);
  const veil = 1 - Math.min(1, Math.max(0, (p - 0.82) / 0.18));
  const active = VARIANTS.find((v) => v.id === variant);

  return (
    <div className="lab">
      <div
        className="lab-stage"
        style={{ ['--s' as string]: s.toFixed(3), ['--veil' as string]: veil.toFixed(3) }}
      >
        <canvas className="zoom-canvas" ref={canvas} aria-hidden="true" />
        <span className="zoom-grain" aria-hidden="true" />
        <svg className="zoom-mask" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <mask id="lab-cut" maskUnits="userSpaceOnUse" x="-4800" y="-3000" width="10800" height="6600">
              <rect x="-4800" y="-3000" width="10800" height="6600" fill="#fff" />
              <text
                className="zoom-word"
                x="600"
                y="300"
                textLength="1080"
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#000"
              >
                {site.name}
              </text>
            </mask>
          </defs>
          <rect x="-4800" y="-3000" width="10800" height="6600" fill="#FFFFFF" mask="url(#lab-cut)" />
        </svg>
      </div>

      <div className="lab-ctl">
        <div className="lab-pills">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`lab-pill${v.id === variant ? ' on' : ''}`}
              onClick={() => setVariant(v.id)}
            >
              {v.name}
            </button>
          ))}
        </div>

        <p className="lab-note">{active?.note}</p>

        <label className="lab-scrub">
          <span>Scrub the flight</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.005}
            value={p}
            onChange={(e) => setP(+e.target.value)}
            aria-label="Scroll position through the hero zoom"
          />
          <em>{p === 0 ? 'at rest' : p >= 0.995 ? 'arrived' : `${Math.round(p * 100)}%`}</em>
        </label>
      </div>
    </div>
  );
}
