'use client';
import { useEffect } from 'react';

/**
 * Turns scroll motion on, once, from the client.
 *
 * Everything in the stylesheet is visible by default and only hides itself
 * under [data-motion="on"]. So if this never runs — script blocked, JS error,
 * an old browser — the page is simply a readable page. Nothing is stranded
 * at opacity 0 waiting for an observer that is never coming.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    root.setAttribute('data-motion', 'on');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    // Re-scan after navigation: the App Router swaps children without remounting
    // this component, so a single pass at mount would leave later pages hidden.
    const scan = () => {
      document.querySelectorAll('.reveal:not(.in),.line:not(.in)').forEach((el) => io.observe(el));
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.removeAttribute('data-motion');
    };
  }, []);

  return null;
}
