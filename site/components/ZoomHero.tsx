'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { createField, type FieldVariant } from '@/lib/heroField';
import WordSpace from '@/components/WordSpace';
import { site } from '@/lib/site';

/** How far the plane grows. Enough that the tittle alone is wider than any
 *  viewport, which is what turns a dot into the ground. */
const MAX_SCALE = 44;

/** Which character the camera goes through: the "i" of Advisory.
 *  "iAdvisory" → i A d v i s o r y, so index 4. */
const TITTLE_CHAR = 4;

/** Where the tittle's ink sits inside that character's cell, as a fraction of
 *  the cell. Measured off the rendered glyph rather than guessed — see the
 *  note in the component. */
const TITTLE = { x: 0.6, y: 0.227 };

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function ZoomHero({ variant = 'engrave' }: { variant?: FieldVariant }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const word = useRef<SVGTextElement>(null);
  /** The field stops painting once it is fully behind the word space. */
  const fieldLive = useRef(true);

  // ── Anchor the flight on the tittle ─────────────────────────────
  useEffect(() => {
    const el = root.current;
    const text = word.current;
    if (!el || !text) return;

    const place = () => {
      const svg = text.ownerSVGElement;
      if (!svg) return;
      let ext: { x: number; y: number; width: number; height: number };
      try {
        ext = text.getExtentOfChar(TITTLE_CHAR);
      } catch {
        return; // font not ready yet; the resize/fonts handler will retry
      }
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = ext.x + ext.width * TITTLE.x;
      pt.y = ext.y + ext.height * TITTLE.y;
      const s = pt.matrixTransform(ctm);
      const r = svg.getBoundingClientRect();
      el.style.setProperty('--ox', `${(((s.x - r.left) / r.width) * 100).toFixed(2)}%`);
      el.style.setProperty('--oy', `${(((s.y - r.top) / r.height) * 100).toFixed(2)}%`);
    };

    place();
    // The glyph moves when the webfont swaps in, so place it again then.
    document.fonts?.ready.then(place).catch(() => {});
    window.addEventListener('resize', place, { passive: true });
    return () => window.removeEventListener('resize', place);
  }, []);

  // ── Scroll → progress ───────────────────────────────────────────
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    el.dataset.zoom = 'on';

    let frame = 0;
    let wasInk = false;
    let wasSpace = false;
    let wasNear = false;
    const measure = () => {
      frame = 0;
      const travel = el.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const raw = clamp(-el.getBoundingClientRect().top / travel);

      // Three acts, with a deliberate hold between the second and the third
      // so the scene is allowed to be just the scene before anything else
      // asks for attention.
      //
      //   0.00 – 0.44  the dive, through the tittle
      //   0.44 – 0.64  the hold: the image, and nothing else
      //   0.64 – 0.94  the resolve: copy rises, mark goes right, the arc
      //                swings under it, the words go to ground

      // Geometric, so the approach reads at a constant rate rather than
      // stalling and then lurching.
      const s = Math.pow(MAX_SCALE, clamp(raw / 0.44));
      const veil = 1 - clamp((raw - 0.32) / 0.12);
      // The engraving hands over to the word space on the way through.
      const media = 1 - clamp((raw - 0.26) / 0.14);
      const space = clamp((raw - 0.28) / 0.16);

      const t3 = clamp((raw - 0.64) / 0.3);
      // The words leave before the copy is strong enough to compete with
      // them, so the crossover is a handover rather than two things shouting
      // over each other at half opacity.
      const words = clamp(1 - t3 * 2);
      // Eased, so the copy arrives rather than slides in at constant speed.
      const e3 = 1 - Math.pow(1 - clamp((t3 - 0.22) / 0.78), 3);

      el.style.setProperty('--s', s.toFixed(3));
      el.style.setProperty('--veil', veil.toFixed(3));
      el.style.setProperty('--media', media.toFixed(3));
      el.style.setProperty('--space', space.toFixed(3));
      el.style.setProperty('--copy', e3.toFixed(3));
      el.style.setProperty('--copy-y', `${((1 - e3) * 64).toFixed(1)}px`);
      el.style.setProperty('--mark-x', `${(e3 * 26).toFixed(2)}vw`);
      el.style.setProperty('--arc-rot', `${(e3 * 180).toFixed(1)}deg`);
      el.style.setProperty('--words', words.toFixed(3));
      el.style.setProperty('--hint', (1 - clamp(raw * 6)).toFixed(3));

      // The bar is over black from here, and the words only become
      // hoverable once they are actually on screen.
      const ink = raw > 0.42;
      if (ink !== wasInk) {
        wasInk = ink;
        if (ink) el.setAttribute('data-ink', '');
        else el.removeAttribute('data-ink');
        window.dispatchEvent(new Event('scroll'));
      }
      fieldLive.current = media > 0.01;

      const near = raw > 0.2;
      if (near !== wasNear) {
        wasNear = near;
        if (near) el.setAttribute('data-near', '');
        else el.removeAttribute('data-near');
      }

      // The words are hoverable only while they are actually there to hover.
      const live = space > 0.9 && words > 0.35;
      if (live !== wasSpace) {
        wasSpace = live;
        if (live) el.setAttribute('data-space', '');
        else el.removeAttribute('data-space');
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
      delete el.dataset.zoom;
      el.removeAttribute('data-ink');
      el.removeAttribute('data-space');
      el.removeAttribute('data-near');
    };
  }, []);

  // ── The media the letterforms are a window onto ─────────────────
  useEffect(() => {
    const c = canvas.current;
    const el = root.current;
    if (!c || !el) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const ctx = c.getContext('2d', { alpha: false });
    if (!ctx) return;

    const field = createField(ctx, variant);
    let raf = 0;
    let visible = true;

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

    let painted = 0;
    const draw: FrameRequestCallback = (t) => {
      raf = visible ? requestAnimationFrame(draw) : 0;
      if (t - painted < 32) return;
      // Nothing to paint once the word space has covered it.
      if (!fieldLive.current) return;
      painted = t;
      field(t, w, h);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
      },
      { rootMargin: '10% 0px' },
    );
    io.observe(el);

    raf = requestAnimationFrame(draw);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, [variant]);

  return (
    <section className="zoom" ref={root} aria-label={`${site.name} — loan advisory`}>
      <div className="zoom-stage">
        {/* Bottom: where the dive lands. */}
        <div className="zoom-space">
          <WordSpace />
        </div>

        {/* Middle: what shows through the letterforms on the way in. */}
        <canvas className="zoom-canvas" ref={canvas} aria-hidden="true" />
        <span className="zoom-grain" aria-hidden="true" />

        {/* Top: a white plane with the wordmark cut out of it. Scaling the
            plane about the tittle flies the camera through that dot and
            opens onto what is behind it; filling the glyphs could not. */}
        <svg
          className="zoom-mask"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <mask id="zoom-cut" maskUnits="userSpaceOnUse" x="-4800" y="-3000" width="10800" height="6600">
              <rect x="-4800" y="-3000" width="10800" height="6600" fill="#fff" />
              <text
                ref={word}
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
          <rect x="-4800" y="-3000" width="10800" height="6600" fill="#FFFFFF" mask="url(#zoom-cut)" />
        </svg>

        <div className="zoom-hint small" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>

        <div className="zoom-scrim" aria-hidden="true" />

        <div className="zoom-copy">
          <h1 className="zoom-h1">
            Every loan question,
            <br />
            one straight answer.
          </h1>
          <p className="zoom-lede">
            We are not a lender and not a lead farm. We read your profile, shortlist the banks that
            will actually sanction it, and run the file to disbursement.
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
      </div>
    </section>
  );
}
