/**
 * The field that shows through the hero letterforms.
 *
 * Every variant here is drawn from hard-edged primitives — strokes, points,
 * flat fills — never from a soft gradient alone. That is deliberate: the
 * canvas never scales, only the mask does, so whatever is on the canvas is
 * what the viewer arrives at full screen. A gradient has nothing to focus
 * on, which is why flying into one reads as the picture going out of focus
 * rather than as arriving somewhere.
 */

export type FieldVariant = 'engrave' | 'particles' | 'metal' | 'solid' | 'light';

export const VARIANTS: { id: FieldVariant; name: string; note: string }[] = [
  {
    id: 'engrave',
    name: 'Engraving',
    note: 'Guilloché line work — the geometry on banknotes and share certificates. Crisp strokes, unmistakably financial.',
  },
  {
    id: 'particles',
    name: 'Deep field',
    note: 'A field of points with real depth, drifting toward you. The one variant where the zoom and the media agree about direction.',
  },
  {
    id: 'metal',
    name: 'Brushed metal',
    note: 'Fine machined grain under a travelling highlight. Quiet, heavy, expensive.',
  },
  {
    id: 'solid',
    name: 'Flat brand red',
    note: 'No texture at all. The letterforms are simply the brand red, and the arrival is a wall of it.',
  },
  {
    id: 'light',
    name: 'Architectural light',
    note: 'The current one: a measured grid under broad shafts of light.',
  },
];

export type Field = (t: number, w: number, h: number) => void;

const BRAND = '248,0,0';

/** Deterministic noise, so a reload does not reshuffle the composition. */
const rnd = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

export function createField(ctx: CanvasRenderingContext2D, variant: FieldVariant): Field {
  if (variant === 'solid') return solid(ctx);
  if (variant === 'engrave') return engrave(ctx);
  if (variant === 'particles') return particles(ctx);
  if (variant === 'metal') return metal(ctx);
  return light(ctx);
}

/* ── Flat brand red ──────────────────────────────────────────────── */
function solid(ctx: CanvasRenderingContext2D): Field {
  return (t, w, h) => {
    ctx.fillStyle = '#F80000';
    ctx.fillRect(0, 0, w, h);
    // A single slow sheen, so it is a surface and not a swatch.
    const x = ((t * 0.00004) % 1) * (w + h) - h / 2;
    const g = ctx.createLinearGradient(x, 0, x + h * 0.9, h);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.5, 'rgba(255,255,255,.1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    vignette(ctx, w, h, 0.5);
  };
}

/* ── Guilloché engraving ─────────────────────────────────────────── */
function engrave(ctx: CanvasRenderingContext2D): Field {
  // Each family is a hypotrochoid: the rosette engine on banknotes. The
  // geometry never changes — only its rotation does — so each family is
  // rasterised once and then spun, instead of eleven thousand line segments
  // being re-stroked sixty times a second.
  const families = [
    { R: 1.0, r: 0.236, d: 0.62, lines: 7, spread: 0.012, speed: 0.000035, a: 0.5, warm: false },
    { R: 0.74, r: 0.137, d: 0.47, lines: 6, spread: 0.014, speed: -0.000052, a: 0.36, warm: true },
    { R: 1.28, r: 0.311, d: 0.38, lines: 5, spread: 0.018, speed: 0.000026, a: 0.24, warm: false },
  ];

  // Two plates, not three: compositing three full-size rotated bitmaps every
  // frame cost more than the scroll could afford on a desktop viewport. The
  // outer families share one plate; the inner family keeps its own, sized to
  // itself, and counter-rotates — which is the part that makes guilloché
  // look alive rather than printed.
  const reachOf = (f: (typeof families)[number], unit: number) =>
    (f.R - f.r + (f.d + f.lines * f.spread) * f.r) * unit;

  const plate = (group: typeof families, unit: number) => {
    const reach = Math.max(...group.map((f) => reachOf(f, unit)));
    const box = Math.ceil(reach * 2 * 1.04);
    const c = document.createElement('canvas');
    c.width = box;
    c.height = box;
    const g = c.getContext('2d');
    if (g) {
      g.translate(box / 2, box / 2);
      g.lineWidth = 1;
      g.globalCompositeOperation = 'lighter';
      for (const fam of group) {
        for (let k = 0; k < fam.lines; k++) {
          const d = fam.d + k * fam.spread;
          const R = fam.R * unit;
          const r = fam.r * unit;
          const k2 = (R - r) / r;
          g.strokeStyle = fam.warm
            ? `rgba(255,${120 - k * 9},${112 - k * 9},${fam.a * 0.5})`
            : `rgba(${BRAND},${fam.a * (0.55 - k * 0.045)})`;
          g.beginPath();
          const STEPS = 900;
          for (let i = 0; i <= STEPS; i++) {
            const a = (i / STEPS) * Math.PI * 2 * 7;
            const x = (R - r) * Math.cos(a) + d * r * Math.cos(k2 * a);
            const y = (R - r) * Math.sin(a) - d * r * Math.sin(k2 * a);
            if (i === 0) g.moveTo(x, y);
            else g.lineTo(x, y);
          }
          g.stroke();
        }
      }
    }
    return { c, box };
  };

  let outer: { c: HTMLCanvasElement; box: number } | null = null;
  let inner: { c: HTMLCanvasElement; box: number } | null = null;
  let builtFor = '';

  return (t, w, h) => {
    const unit = Math.min(w, h) * 0.46;
    const key = unit.toFixed(1);
    if (key !== builtFor) {
      outer = plate([families[0], families[2]], unit);
      inner = plate([families[1]], unit);
      builtFor = key;
    }

    ctx.fillStyle = '#0A0506';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w * 0.5, h * 0.46);
    ctx.globalCompositeOperation = 'lighter';
    for (const [p, speed] of [
      [outer, 0.000031],
      [inner, -0.000052],
    ] as const) {
      if (!p) continue;
      ctx.save();
      ctx.rotate(t * speed);
      ctx.drawImage(p.c, -p.box / 2, -p.box / 2);
      ctx.restore();
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
    vignette(ctx, w, h, 0.8);
  };
}

/* ── Deep field ──────────────────────────────────────────────────── */
function particles(ctx: CanvasRenderingContext2D): Field {
  const N = 1700;
  const r = rnd(20260127);
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const pz = new Float32Array(N);
  const hot = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    px[i] = r() * 2 - 1;
    py[i] = r() * 2 - 1;
    pz[i] = r();
    hot[i] = r() < 0.16 ? 1 : 0;
  }
  let last = 0;
  return (t, w, h) => {
    const dt = last ? Math.min(64, t - last) : 16;
    last = t;

    ctx.fillStyle = '#08080A';
    ctx.fillRect(0, 0, w, h);

    // A faint core, so the resting wordmark is not nine black letters on
    // white with nothing visible through them.
    const core = ctx.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, Math.max(w, h) * 0.34);
    core.addColorStop(0, `rgba(${BRAND},.42)`);
    core.addColorStop(0.45, `rgba(${BRAND},.12)`);
    core.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, w, h);

    const f = Math.min(w, h) * 0.9;
    for (let i = 0; i < N; i++) {
      pz[i] -= dt * 0.000046;
      if (pz[i] <= 0.02) {
        pz[i] = 1;
        px[i] = r() * 2 - 1;
        py[i] = r() * 2 - 1;
      }
      const s = f / (pz[i] * 7 + 0.6);
      const x = w / 2 + px[i] * s;
      const y = h * 0.46 + py[i] * s;
      if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

      const near = 1 - pz[i];
      const size = Math.max(1, Math.round(1 + near * near * 3.6));
      ctx.fillStyle = hot[i]
        ? `rgba(255,${110 + near * 120},${104 + near * 120},${0.5 + near * 0.5})`
        : `rgba(${BRAND},${0.42 + near * 0.58})`;

      // The near ones trail, so the field states a direction instead of
      // just sitting there as dust.
      if (near > 0.55) {
        const ps = f / ((pz[i] + 0.055) * 7 + 0.6);
        ctx.fillRect(
          Math.round(w / 2 + px[i] * ps),
          Math.round(h * 0.46 + py[i] * ps),
          size,
          size,
        );
      }
      ctx.fillRect(Math.round(x), Math.round(y), size, size);
    }
    vignette(ctx, w, h, 0.55);
  };
}

/* ── Brushed metal ───────────────────────────────────────────────── */
function metal(ctx: CanvasRenderingContext2D): Field {
  const r = rnd(991);
  const grain = Array.from({ length: 900 }, () => r());
  let plate: HTMLCanvasElement | null = null;
  let builtFor = '';

  return (t, w, h) => {
    const key = `${Math.round(w)}x${Math.round(h)}`;
    if (key !== builtFor) {
      // The grain is fixed: one hairline per column, drawn once.
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(w));
      c.height = Math.max(1, Math.round(h));
      const g = c.getContext('2d');
      if (g) {
        g.fillStyle = '#121214';
        g.fillRect(0, 0, w, h);
        g.lineWidth = 1;
        for (let i = 0, x = 0; x <= w; i++, x += 2) {
          const v = grain[i % grain.length];
          g.strokeStyle = `rgba(255,255,255,${0.012 + v * 0.05})`;
          g.beginPath();
          g.moveTo(Math.round(x) + 0.5, 0);
          g.lineTo(Math.round(x) + 0.5 + 14, h);
          g.stroke();
        }
      }
      plate = c;
      builtFor = key;
    }

    if (plate) ctx.drawImage(plate, 0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    for (const [off, col, wid] of [
      [0, '255,255,255', 0.3],
      [0.38, BRAND, 0.22],
    ] as const) {
      const p = (((t * 0.000031 + off) % 1) + 1) % 1;
      const cx = -w * 0.4 + p * w * 1.8;
      const g = ctx.createLinearGradient(cx - w * wid, 0, cx + w * wid, h);
      g.addColorStop(0, `rgba(${col},0)`);
      g.addColorStop(0.5, `rgba(${col},${col === BRAND ? 0.4 : 0.2})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';
    vignette(ctx, w, h, 0.5);
  };
}

/* ── Architectural light (the current field) ─────────────────────── */
function light(ctx: CanvasRenderingContext2D): Field {
  const GRID = 54;
  const SHAFTS = [
    { w: 0.3, speed: 0.0000138, phase: 0, hot: 0.5 },
    { w: 0.17, speed: 0.0000206, phase: 0.42, hot: 0.86 },
    { w: 0.46, speed: 0.0000096, phase: 0.74, hot: 0.26 },
    { w: 0.12, speed: 0.0000262, phase: 0.19, hot: 1 },
  ];
  const TILT = (-22 * Math.PI) / 180;
  return (t, w, h) => {
    ctx.fillStyle = '#08090A';
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (let i = 0, x = 0; x <= w; i++, x += GRID) {
      ctx.strokeStyle = i % 4 === 0 ? `rgba(${BRAND},.16)` : 'rgba(255,255,255,.052)';
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, 0);
      ctx.lineTo(Math.round(x) + 0.5, h);
      ctx.stroke();
    }
    for (let i = 0, y = 0; y <= h; i++, y += GRID) {
      ctx.strokeStyle = i % 4 === 0 ? `rgba(${BRAND},.16)` : 'rgba(255,255,255,.052)';
      ctx.beginPath();
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(w, Math.round(y) + 0.5);
      ctx.stroke();
    }
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
      g.addColorStop(0, `rgba(${BRAND},0)`);
      g.addColorStop(0.42, `rgba(255,${Math.round(46 * s.hot)},${Math.round(38 * s.hot)},${0.14 + s.hot * 0.16})`);
      g.addColorStop(0.5, `rgba(255,${Math.round(168 * s.hot)},${Math.round(158 * s.hot)},${0.2 + s.hot * 0.4})`);
      g.addColorStop(0.58, `rgba(248,${Math.round(34 * s.hot)},${Math.round(28 * s.hot)},${0.14 + s.hot * 0.16})`);
      g.addColorStop(1, `rgba(${BRAND},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(cx - half, -diag, half * 2, diag * 2);
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
    vignette(ctx, w, h, 0.72);
  };
}

function vignette(ctx: CanvasRenderingContext2D, w: number, h: number, strength: number) {
  const v = ctx.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, Math.max(w, h) * 0.78);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(0.62, `rgba(0,0,0,${0.25 * strength})`);
  v.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
}
