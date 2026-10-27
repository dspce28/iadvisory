'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LoanProduct } from '@/lib/site';

/**
 * The six products as the leaves of a book.
 *
 * Each product is a spread: its picture on the left page, its details on the
 * right. That falls out of how a book is actually bound — the verso of leaf k
 * and the recto of leaf k+1 face each other — so leaf k carries the details
 * of product k on its front and the picture of product k+1 on its back.
 *
 * Clicking the right page turns forward, the left page turns back, and the
 * link inside the right page stops the click so it can do its own job.
 * Click-to-turn is a mouse affordance only: the arrows are real buttons and
 * the arrow keys work, so nothing here depends on being able to click a div.
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

  const plate = (p: LoanProduct, eager: boolean) => (
    <span className="plate">
      <img
        src={p.image}
        alt=""
        width={400}
        height={400}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="plate-name">{p.name}</span>
    </span>
  );

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
        {/* The left page before anything has been turned: the first picture. */}
        <div className="book-left" onClick={() => go(-1)} aria-hidden="true">
          {plate(products[0], true)}
        </div>

        {products.map((p, i) => {
          const current = i === turned;
          const facing = products[i + 1];
          return (
            <div
              key={p.slug}
              className={`leaf${i < turned ? ' turned' : ''}`}
              style={{ zIndex: i < turned ? i + 1 : products.length * 2 - i }}
            >
              {/* Recto: the details. */}
              <div
                className="face face-front"
                onClick={() => go(1)}
                aria-hidden={current ? undefined : true}
              >
                {/* Only ever seen in the no-JS grid, where a card with no
                    picture would be a worse card. */}
                <span className="plate plate-flat">
                  <img src={p.image} alt="" width={400} height={400} loading="lazy" decoding="async" />
                </span>
                <span className="face-rate">From {p.rateFrom}</span>
                <span className="face-name">{p.name}</span>
                <span className="face-blurb">{p.blurb}</span>
                <span className="face-meta">
                  <span>Up to {p.maxAmount}</span>
                  <span>Tenure {p.maxTenure}</span>
                </span>
                <Link
                  className="face-open"
                  href={`/loans/${p.slug}/`}
                  prefetch={false}
                  tabIndex={current ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                >
                  Open this loan
                </Link>
                <span className="face-folio">{String(i + 1).padStart(2, '0')}</span>
              </div>

              {/* Verso: the picture of the product this page faces. */}
              <div className="face face-back" onClick={() => go(-1)} aria-hidden="true">
                {facing ? plate(facing, i === 0) : <span className="plate-end">iAdvisory</span>}
              </div>
            </div>
          );
        })}

        {/* The thumb controls, over the pages rather than beneath the book. */}
        <div className="book-nav" aria-hidden={false}>
          <button
            type="button"
            className="book-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
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
            className="book-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            disabled={turned === last}
            aria-label="Next product"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
