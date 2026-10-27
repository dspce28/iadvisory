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
      {/* The mark and its arc. The arc is a thin rim sitting just above the
          i — the same read as an eclipse edge, not a ring around the whole
          composition. */}
      <div className="ws-mark" aria-hidden="true">
        <span className="ws-glow" />
        <svg className="ws-arc" viewBox="-200 -200 400 400" fill="none">
          <defs>
            {/* Brightest at the crown, gone at the ends — a rim light rather
                than a drawn line, which is what the reference reads as. */}
            <linearGradient id="ws-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F84800" stopOpacity="0" />
              <stop offset="22%" stopColor="#F84800" stopOpacity=".55" />
              <stop offset="50%" stopColor="#F84800" stopOpacity="1" />
              <stop offset="78%" stopColor="#F84800" stopOpacity=".55" />
              <stop offset="100%" stopColor="#F84800" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* A true circular crown: radius 125 about the mark's centre,
              swept from 200° to 340°, so it is symmetric by construction
              rather than by eye. */}
          <path
            className="ws-arc-halo"
            d="M -117.5 -42.8 A 125 125 0 0 1 117.5 -42.8"
            stroke="url(#ws-rim)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity=".34"
          />
          <path
            d="M -117.5 -42.8 A 125 125 0 0 1 117.5 -42.8"
            stroke="url(#ws-rim)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <svg className="ws-i" viewBox="0 0 120 300" fill="none">
          <circle cx="60" cy="30" r="25" fill="#F84800" />
          <rect x="35" y="80" width="50" height="190" rx="10" fill="#F84800" />
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
