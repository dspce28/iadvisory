'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const path = usePathname();
  const [lifted, setLifted] = useState(false);
  const [onInk, setOnInk] = useState(false);
  const [open, setOpen] = useState(false);

  // The bar is translucent, so over a dark section a white header cuts a seam
  // straight across it. Instead it inverts: we ask, once per frame, whether a
  // section marked data-ink is crossing the header band.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setLifted(window.scrollY > 24);
      const band = 34;
      let dark = false;
      for (const s of Array.from(document.querySelectorAll('[data-ink]'))) {
        const r = s.getBoundingClientRect();
        if (r.top <= band && r.bottom >= band) {
          dark = true;
          break;
        }
      }
      setOnInk(dark);
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [path]);

  useEffect(() => setOpen(false), [path]);

  // Lock the page behind the open drawer, so the menu is not scrolled away
  // from under the finger that opened it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isOn = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''));

  return (
    <header className={`hdr${lifted ? ' lifted' : ''}${onInk && !open ? ' ink' : ''}`}>
      <Link className="hdr-logo" href="/" aria-label={`${site.name} — home`}>
        <Image
          className="lg-dark"
          src="/assets/logo-horizontal.webp"
          alt={site.name}
          width={480}
          height={162}
          priority
        />
        <Image
          className="lg-light"
          src="/assets/logo-horizontal-light.webp"
          alt=""
          aria-hidden="true"
          width={480}
          height={162}
        />
      </Link>

      <nav id="nav" className={`nav${open ? ' open' : ''}`}>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            prefetch={false}
            aria-current={isOn(l.href) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hdr-cta">
        <Link className="btn btn-line" href="/cibil-score/" prefetch={false}>
          Check CIBIL
        </Link>
        <Link className="btn btn-dark" href="/apply/" prefetch={false}>
          Apply
        </Link>
        <button
          className="burger"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
