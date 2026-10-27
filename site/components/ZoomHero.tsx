'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { site } from '@/lib/site';

/** How far the wordmark grows by the end of the scroll. Large enough that a
 *  single letterform is wider than any viewport we care about. */
const MAX_SCALE = 34;

/** Where the camera flies. Must land on ink — on the knocked-out letterform,
 *  not on the white plane — or the zoom never opens onto the media.
 *  This sits on the bowl of the "d" in iAdvisory. */
const ORIGIN = { x: 36, y: 50 };

export default function ZoomHero() {
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

    // Architectural light: a measured grid under broad shafts of light.
    //
    // The grid is what the eye focuses on. It is drawn at device resolution
    // on half-pixel centres, so the lines stay one pixel wide and hard-edged
    // however far the mask has been scaled over them — the canvas never
    // scales, only the mask does, which is the whole reason this reads as
    // arriving somewhere rather than as a picture going soft.
    const GRID = 54;
    const SHAFTS = [
      { w: 0.3, speed: 0.0000138, phase: 0, hot: 0.5 },
      { w: 0.17, speed: 0.0000206, phase: 0.42, hot: 0.86 },
      { w: 0.46, speed: 0.0000096, phase: 0.74, hot: 0.26 },
      { w: 0.12, speed: 0.0000262, phase: 0.19, hot: 1 },
    ];
    const TILT = (-22 * Math.PI) / 180;

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
      },
      { rootMargin: '10% 0px' },
    );
    io.observe(el);

    function draw(t: number) {
      raf = visible ? requestAnimationFrame(draw) : 0;
      if (!ctx) return;

      ctx.fillStyle = '#08090A';
      ctx.fillRect(0, 0, w, h);

      // ── The grid ────────────────────────────────────────────────
      ctx.lineWidth = 1;
      for (let i = 0, x = 0; x <= w; i++, x += GRID) {
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(248,0,0,.16)' : 'rgba(255,255,255,.052)';
        ctx.beginPath();
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
        ctx.stroke();
      }
      for (let i = 0, y = 0; y <= h; i++, y += GRID) {
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(248,0,0,.16)' : 'rgba(255,255,255,.052)';
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
        ctx.stroke();
      }

      // ── The shafts ──────────────────────────────────────────────
      // Drawn in a rotated frame, so one axis is "across the beam" and the
      // gradient can run along it without any per-pixel work.
      const diag = Math.hypot(w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(TILT);
      ctx.globalCompositeOperation = 'lighter';
      for (const s of SHAFTS) {
        const span = diag * 1.6;
        const pos = (((t * s.speed + s.phase) % 1) + 1) % 1;
        const cx = -span / 2 + pos * span;
        const half = (s.w * diag) / 2;
        const g = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
        g.addColorStop(0, 'rgba(248,0,0,0)');
        g.addColorStop(0.42, `rgba(255,${Math.round(46 * s.hot)},${Math.round(38 * s.hot)},${0.14 + s.hot * 0.16})`);
        g.addColorStop(0.5, `rgba(255,${Math.round(168 * s.hot)},${Math.round(158 * s.hot)},${0.2 + s.hot * 0.4})`);
        g.addColorStop(0.58, `rgba(248,${Math.round(34 * s.hot)},${Math.round(28 * s.hot)},${0.14 + s.hot * 0.16})`);
        g.addColorStop(1, 'rgba(248,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(cx - half, -diag, half * 2, diag * 2);
      }
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over';

      // ── Fall-off ────────────────────────────────────────────────
      const v = ctx.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, Math.max(w, h) * 0.78);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(0.62, 'rgba(0,0,0,.18)');
      v.addColorStop(1, 'rgba(0,0,0,.72)');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

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
