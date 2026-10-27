'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LoanProduct } from '@/lib/site';

/**
 * The six products as the leaves of a book.
 *
 * Each leaf is hinged at the spine (transform-origin at its left edge) inside
 * a container that carries the perspective, and holds two faces with their
 * backs hidden — the recto is the product, the verso is the back of that
 * printed page. Turning a leaf is one rotateY to -180°.
 *
 * Without JavaScript the 3D never switches on and the same markup lays out
 * as a plain grid of six cards, because a book you cannot turn is worse than
 * no book at all.
 */
export default function ProductBook({ products }: { products: LoanProduct[] }) {
  const [turned, setTurned] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const last = products.length - 1;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.book = 'on';
    return () => {
      delete el.dataset.book;
    };
  }, []);

  const go = (d: -1 | 1) => setTurned((v) => Math.min(last, Math.max(0, v + d)));

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div className="bookwrap">
      <div
        className="book"
        ref={root}
        onKeyDown={onKey}
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label={`Loan products, page ${turned + 1} of ${products.length}`}
      >
        {/* The left-hand page, only ever seen before the first turn. */}
        <div className="book-left" aria-hidden="true">
          <span className="eyebrow eyebrow-plain">Six products</span>
          <p className="book-left-t">One application, and the same set of lenders behind all of it.</p>
          <span className="book-left-h">Turn the page</span>
        </div>

        {products.map((p, i) => {
          const isTurned = i < turned;
          const current = i === turned;
          return (
            <div
              key={p.slug}
              className={`leaf${isTurned ? ' turned' : ''}`}
              style={{ zIndex: isTurned ? i + 1 : products.length * 2 - i }}
            >
              {/* Recto: the product. */}
              <Link
                className="face face-front"
                href={`/loans/${p.slug}/`}
                prefetch={false}
                tabIndex={current ? 0 : -1}
                aria-hidden={current ? undefined : true}
              >
                <span className="face-plate">
                  <img
                    src={p.image}
                    alt=""
                    width={400}
                    height={400}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </span>
                <span className="face-rate">From {p.rateFrom}</span>
                <span className="face-name">{p.name}</span>
                <span className="face-blurb">{p.blurb}</span>
                <span className="face-meta">
                  <span>Up to {p.maxAmount}</span>
                  <span>Tenure {p.maxTenure}</span>
                </span>
                <span className="face-open">Open this loan</span>
                <span className="face-folio">{String(i + 1).padStart(2, '0')}</span>
              </Link>

              {/* Verso: the back of that printed page. */}
              <span className="face face-back" aria-hidden="true">
                <span className="verso-mark">i</span>
                <span className="verso-name">{p.name}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="book-ctl">
        <button
          type="button"
          className="book-arrow"
          onClick={() => go(-1)}
          disabled={turned === 0}
          aria-label="Previous product"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="book-folio" aria-live="polite">
          <strong>{String(turned + 1).padStart(2, '0')}</strong>
          <i />
          {String(products.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          className="book-arrow"
          onClick={() => go(1)}
          disabled={turned === last}
          aria-label="Next product"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
