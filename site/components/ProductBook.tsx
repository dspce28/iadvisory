'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LoanProduct } from '@/lib/site';
import { site } from '@/lib/site';

/**
 * The six products as a book, with a cover.
 *
 * Leaf 0 is the cover; leaves 1..6 are the products. Each product is a
 * spread — picture on the left page, details on the right — which falls out
 * of how a book is bound: the verso of one leaf faces the recto of the next,
 * so leaf k carries product k's details on its front and the next product's
 * picture on its back.
 *
 * `turned` is how many leaves have been turned. 0 means the book is shut and
 * only the cover is showing; 6 is the last spread. Turning past the last
 * spread shuts the book again.
 */
export default function ProductBook({ products }: { products: LoanProduct[] }) {
  const [turned, setTurned] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const lastSpread = products.length; // leaf index of the final right-hand page
  const open = turned > 0;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.book = 'on';
    return () => {
      delete el.dataset.book;
    };
  }, []);

  /** Forward from the last spread shuts the book rather than stopping dead. */
  const next = () => setTurned((v) => (v >= lastSpread ? 0 : v + 1));
  const prev = () => setTurned((v) => Math.max(0, v - 1));

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
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
        data-open={open ? 'yes' : 'no'}
        onKeyDown={onKey}
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label={open ? `Loan products, page ${turned} of ${products.length}` : 'Loan products, closed. Open the book.'}
      >
        {/* The pages already turned rest on this. */}
        <span className="book-board" aria-hidden="true" />

        {/* Leaf 0: the cover. */}
        <div
          className={`leaf leaf-cover${turned > 0 ? ' turned' : ''}`}
          style={{ zIndex: turned > 0 ? 1 : (products.length + 1) * 2 }}
        >
          <div className="face face-cover" onClick={next} aria-hidden={open ? true : undefined}>
            <span className="cover-mark">i</span>
            <span className="cover-rule" />
            <span className="cover-t">Six products</span>
            <span className="cover-s">One application, and the same set of lenders behind all of it.</span>
            <span className="cover-cta">Open the book</span>
            <span className="cover-brand">{site.name}</span>
          </div>
          <div className="face face-back" onClick={prev} aria-hidden="true">
            {plate(products[0], true)}
          </div>
        </div>

        {products.map((p, idx) => {
          const leaf = idx + 1;
          const current = leaf === turned;
          const facing = products[idx + 1];
          return (
            <div
              key={p.slug}
              className={`leaf${leaf < turned ? ' turned' : ''}`}
              style={{ zIndex: leaf < turned ? leaf + 1 : (products.length + 1) * 2 - leaf }}
            >
              <div className="face face-front" onClick={next} aria-hidden={current ? undefined : true}>
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
                <span className="face-folio">{String(leaf).padStart(2, '0')}</span>
              </div>

              <div className="face face-back" onClick={prev} aria-hidden="true">
                {facing ? plate(facing, false) : <span className="plate-end">{site.name}</span>}
              </div>
            </div>
          );
        })}

        <div className="book-nav">
          <button
            type="button"
            className="book-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            disabled={!open}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <span className="book-folio" aria-live="polite">
            {open ? (
              <>
                <strong>{String(turned).padStart(2, '0')}</strong>
                <i />
                {String(products.length).padStart(2, '0')}
              </>
            ) : (
              <strong>Cover</strong>
            )}
          </span>

          <button
            type="button"
            className="book-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={turned >= lastSpread ? 'Close the book' : 'Next page'}
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
