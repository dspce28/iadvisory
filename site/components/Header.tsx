'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const isOn = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''));

  return (
    <header id="hdr" className={scrolled ? 'scrolled' : ''}>
      <Link className="logo" href="/" aria-label={`${site.name} — home`}>
        <Image src="/assets/img-1329a877e0.webp" alt="" width={220} height={220} priority />
        <span className="logo-name">
          <span className="la">Advisory</span>
        </span>
      </Link>

      <nav id="nav" className={open ? 'open' : ''}>
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className={isOn(l.href) ? 'on' : ''}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hdr-cta">
        <Link className="btn btn-ghost" href="/cibil-score/">
          Check CIBIL
        </Link>
        <Link className="btn btn-red" href="/apply/">
          Apply Now →
        </Link>
      </div>

      <button
        className="ham"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
