'use client';
import { useMemo } from 'react';
import { buildWordSpace } from '@/lib/wordspace';

/**
 * What the dive opens onto: the vocabulary of the business, floating on black
 * around the mark, each word swapping between white and orange under the
 * cursor. Purely decorative as far as assistive technology is concerned —
 * the page's actual heading and actions sit below it.
 */
export default function WordSpace() {
  const words = useMemo(() => buildWordSpace(), []);

  return (
    <div className="ws">
      <div className="ws-arc" aria-hidden="true">
        {/* The halo: one stroked circle, glowing, most of it below the fold
            so only the crown of the arc reads. */}
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="ws-halo" cx="50%" cy="50%" r="50%">
              <stop offset="58%" stopColor="rgba(255,79,24,0)" />
              <stop offset="82%" stopColor="rgba(255,79,24,.22)" />
              <stop offset="100%" stopColor="rgba(255,79,24,0)" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="560" r="330" fill="url(#ws-halo)" />
          {/* The glow is three concentric strokes rather than a drop-shadow
              filter. A filter on a 1500px SVG is re-rasterised on every frame
              of the flight and cost two thirds of the desktop frame rate. */}
          <circle cx="500" cy="560" r="330" fill="none" stroke="rgba(255,79,24,.10)" strokeWidth="26" />
          <circle cx="500" cy="560" r="330" fill="none" stroke="rgba(255,79,24,.22)" strokeWidth="11" />
          <circle cx="500" cy="560" r="330" fill="none" stroke="#FF4F18" strokeWidth="3.5" />
        </svg>
      </div>

      {/* The mark, drawn rather than placed: a circle and a stem, so it stays
          sharp at any size and can carry the same glow as the arc. */}
      <div className="ws-i" aria-hidden="true">
        <span className="ws-i-glow" />
        <svg viewBox="0 0 120 300" fill="none">
          <circle cx="60" cy="34" r="26" fill="#FF4F18" />
          <rect x="34" y="84" width="52" height="186" rx="12" fill="#FF4F18" />
        </svg>
      </div>

      <div className="ws-words" aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={`${w.text}-${i}`}
            className={`ws-w${w.light ? '' : ' hot'}`}
            data-low={w.y > 56 || w.mobHide ? '' : undefined}
            style={
              {
                '--x': `${w.x}%`,
                '--y': `${w.y}%`,
                '--sz': w.size.toFixed(2),
                '--dur': `${w.dur.toFixed(2)}s`,
                '--delay': `${w.delay.toFixed(2)}s`,
                '--drift': `${w.drift.toFixed(1)}px`,
              } as React.CSSProperties
            }
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
}
