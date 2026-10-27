'use client';
import { useRef } from 'react';

/**
 * Cards that lift, glow under the cursor, take an accent border and get a
 * single shimmer sweep on hover.
 *
 * The glow follows the pointer, which needs the cursor's position inside the
 * card. That is two custom properties written on the element itself, batched
 * into one animation frame — a React state update per mousemove would re-run
 * the whole list on every pixel of travel.
 */
export default function ProgramCards({ items }: { items: { t: string; d: string }[] }) {
  const frame = useRef(0);
  const pending = useRef<{ el: HTMLElement; x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    pending.current = { el, x: e.clientX - r.left, y: e.clientY - r.top };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const p = pending.current;
      if (!p) return;
      p.el.style.setProperty('--px', `${p.x.toFixed(0)}px`);
      p.el.style.setProperty('--py', `${p.y.toFixed(0)}px`);
    });
  };

  return (
    <div className="facts">
      {items.map((e, i) => (
        // The reveal and the hover transform cannot share an element: the
        // entrance rule sets transform:none at a higher specificity and
        // silently cancels the lift. One wrapper animates in, the card
        // inside it handles the pointer.
        <div key={e.t} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
          <div className="pcard" onPointerMove={onMove}>
            <span className="pcard-glow" aria-hidden="true" />
            <span className="pcard-shine" aria-hidden="true" />
            <div className="pcard-body">
              <h3 className="h3">{e.t}</h3>
              <p className="small" style={{ marginTop: '.45rem' }}>
                {e.d}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
