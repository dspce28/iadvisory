'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { createField, type FieldVariant } from '@/lib/heroField';
import { site } from '@/lib/site';

/** How far the wordmark grows by the end of the scroll. Large enough that a
 *  single letterform is wider than any viewport we care about. */
const MAX_SCALE = 34;

/** Where the camera flies. Must land on ink — on the knocked-out letterform,
 *  not on the white plane — or the zoom never opens onto the media.
 *  This sits on the bowl of the "d" in iAdvisory. */
const ORIGIN = { x: 36, y: 50 };

export default function ZoomHero({ variant = 'light' }: { variant?: FieldVariant }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // ── Scroll → progress ──────────────────────────────────────────
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    el.dataset.zoom = 'on';

    let frame = 0;
    let wasInk = false;
    const measure = () => {
      frame = 0;
      const travel = el.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const raw = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel));

      // Scale geometrically, not linearly: doubling per equal scroll step is
      // what reads as a constant rate of approach. A linear ramp in scale
      // feels like it stalls at the start and lurches at the end.
      const s = Math.pow(MAX_SCALE, raw);

      // The last stretch cross-fades the white plane out, so the reveal
      // completes cleanly whatever the glyph under the origin happens to be.
      const veil = 1 - Math.min(1, Math.max(0, (raw - 0.82) / 0.18));
      const copy = Math.min(1, Math.max(0, (raw - 0.74) / 0.22));

      el.style.setProperty('--s', s.toFixed(3));
      el.style.setProperty('--veil', veil.toFixed(3));
      el.style.setProperty('--copy', copy.toFixed(3));
      el.style.setProperty('--hint', (1 - Math.min(1, raw * 6)).toFixed(3));

      // Once the plane has thinned out, the bar is over media, not paper.
      // The header reads this on its own scroll frame, which may already have
      // run by now — so when the state flips, nudge it to look again. If the
      // visitor stops scrolling on exactly this frame, a stale white bar over
      // black media is what they would otherwise be left looking at.
      const wantsInk = raw > 0.6;
      if (wantsInk !== wasInk) {
        wasInk = wantsInk;
        if (wantsInk) el.setAttribute('data-ink', '');
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
      delete el.dataset.zoom;
      el.removeAttribute('data-ink');
    };
  }, []);

  // ── The media the letterforms are a window onto ────────────────
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

    // The field is capped at ~30fps. Everything in it moves slowly enough
    // that the cap is invisible, and during the flight the mask is being
    // re-rasterised at scale on the same thread — paying for sixty field
    // frames there costs the scroll itself, which is the part the eye
    // actually judges.
    let painted = 0;
    const draw: FrameRequestCallback = (t) => {
      raf = visible ? requestAnimationFrame(draw) : 0;
      if (t - painted < 32) return;
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
        <canvas className="zoom-canvas" ref={canvas} aria-hidden="true" />
        <span className="zoom-grain" aria-hidden="true" />

        {/*
          A white plane with the wordmark cut out of it, rather than the
          wordmark filled with the media. Same picture at rest, but scaling the
          plane up flies the camera through the letterform and opens onto what
          is behind it, which filling the glyphs could never do.

          The mask text is inline SVG, so it uses the page's own webfont — an
          SVG loaded as an image could not, and would silently fall back to
          whatever the system had.
        */}
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
          {/* Oversized, so the plane still covers the viewport once "meet"
              has letterboxed the viewBox on a tall screen. */}
          <rect
            x="-4800"
            y="-3000"
            width="10800"
            height="6600"
            fill="#FFFFFF"
            mask="url(#zoom-cut)"
          />
        </svg>

        <div className="zoom-hint small" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>

        <div className="zoom-scrim" aria-hidden="true" />

        <div className="zoom-copy">
          <h1 className="zoom-h1">
            Borrow on terms you were<br />
            actually going to get.
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
