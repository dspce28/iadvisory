/**
 * The field that shows through the hero letterforms.
 *
 * Soft bodies of colour, deliberately. An earlier version of this carried a
 * lattice and rings because the flight used to *arrive* on the field, and a
 * gradient has nothing to focus on. The flight now hands over to the word
 * space instead, so the field is only ever seen through the glyphs and on
 * the way through — which is the one place softness is an asset rather than
 * a problem.
 *
 * The reds run warm toward the orange the scene is lit in, so the handover
 * is a change of place rather than a change of palette.
 */
type Blob = {
  c: [number, number, number];
  /** Radius, as a fraction of the larger viewport dimension. */
  r: number;
  /** Drift amplitude and speed per axis, and where it sits at rest. */
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  px: number;
  py: number;
};

const BLOBS: Blob[] = [
  { c: [248, 0, 0], r: 0.3, ax: 0.15, ay: 0.12, sx: 0.00019, sy: 0.00015, px: 0.36, py: 0.46 },
  { c: [255, 106, 60], r: 0.17, ax: 0.2, ay: 0.15, sx: -0.00013, sy: 0.00023, px: 0.6, py: 0.42 },
  { c: [255, 198, 170], r: 0.05, ax: 0.2, ay: 0.15, sx: -0.00013, sy: 0.00023, px: 0.6, py: 0.42 },
  { c: [122, 16, 4], r: 0.55, ax: 0.13, ay: 0.17, sx: 0.0001, sy: -0.00017, px: 0.5, py: 0.64 },
  { c: [52, 6, 2], r: 0.9, ax: 0.1, ay: 0.1, sx: -0.00007, sy: 0.00009, px: 0.44, py: 0.52 },
];

export type Field = (t: number, w: number, h: number) => void;

export function createField(ctx: CanvasRenderingContext2D): Field {
  return (t, w, h) => {
    ctx.fillStyle = '#0B0506';
    ctx.fillRect(0, 0, w, h);

    const unit = Math.max(w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (const b of BLOBS) {
      const x = (b.px + Math.sin(t * b.sx) * b.ax) * w;
      const y = (b.py + Math.cos(t * b.sy) * b.ay) * h;
      const r = b.r * unit * 0.5;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},.95)`);
      g.addColorStop(0.3, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},.5)`);
      g.addColorStop(0.62, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},.13)`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  };
}
