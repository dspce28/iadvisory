'use client';
import { useEffect, useRef, useState } from 'react';

type Dir = 'up' | 'left' | 'right' | 'scale';

/** Scroll-triggered reveal. Renders visible immediately when the viewer
 *  prefers reduced motion, so content is never hidden behind an animation. */
export default function Reveal({
  children,
  dir = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  dir?: Dir;
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 0;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['r', dir, delay ? `d${delay}` : '', shown ? 'show' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cls}>
      {children}
    </Tag>
  );
}
