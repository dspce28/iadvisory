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
  /**
   * Shutting the book from the back is not six turns at once: the reference
   * folds the stack back one leaf at a time, last leaf first, each 83ms
   * behind the one in front of it. `lead` is while they are in the air, when
   * the leaf furthest along is the one you see; `land` is from the moment the
   * first one comes down, after which the cover is on top because it is the
   * last to arrive. Both measured off the reference, not guessed.
   */
  const [closing, setClosing] = useState<null | 'lead' | 'land'>(null);
  /**
   * The leaf that is mid-turn. z-index cannot be animated, so without this
   * the leaf you just turned drops under the stack on the first frame and
   * the page beneath it is simply uncovered: the next page appears to arrive
   * before the turn rather than because of it. A turning leaf stays on top
   * of everything until it lands.
   */
  const [turning, setTurning] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const lastSpread = products.length; // leaf index of the final right-hand page
  const shutBack = lastSpread + 1; // every leaf turned: the back cover alone
  const open = turned > 0 && turned <= lastSpread;
  const atBack = turned === shutBack;

  const LEAF_STEP = 83; // ms between one leaf starting and the next
  const LEAF_FALL = 470; // ms a single leaf takes on the way back

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.book = 'on';
    return () => {
      delete el.dataset.book;
    };
  }, []);

  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /** Fold the whole stack back onto the front cover. */
  const shut = () => {
    timers.current.forEach(clearTimeout);
    setTurning(null);
    setClosing('lead');
    setTurned(0);
    timers.current = [
      window.setTimeout(() => setClosing('land'), LEAF_FALL),
      window.setTimeout(() => setClosing(null), LEAF_FALL + lastSpread * LEAF_STEP + 80),
    ];
  };

  /**
   * Forward from the last spread shuts the book onto its back cover, and
   * forward from there folds the whole stack back to the front.
   */
  const next = () => {
    if (turned === shutBack) return shut();
    setTurning(turned);
    setTurned(turned + 1);
  };
  const prev = () => {
    if (turned <= 0) return;
    setTurning(turned - 1);
    setTurned(turned - 1);
  };

  /** The leaf has landed, so it goes back to its place in the stack. */
  const settle = (leaf: number) => () => setTurning((t) => (t === leaf ? null : t));

  const stack = (leaf: number) => {
    // In the air the leaf furthest along leads; once they start landing the
    // cover is on top, because it is the one that comes down last.
    if (closing) return closing === 'lead' ? leaf : (products.length + 1) * 2 - leaf;
    if (turning === leaf) return 999;
    return leaf < turned ? leaf + 1 : (products.length + 1) * 2 - leaf;
  };
  /** Last leaf first, each one a step behind the one in front of it. */
  const fall = (leaf: number) =>
    closing ? { transitionDelay: `${(lastSpread - leaf) * LEAF_STEP}ms` } : undefined;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const plate = (p: LoanProduct, n: number, eager: boolean) => (
    <span className="plate">
      <span className="plate-n" aria-hidden="true">{String(n).padStart(2, '0')}</span>
      <span className="plate-ring" aria-hidden="true" />
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
        data-open={open ? 'yes' : atBack ? 'back' : 'no'}
        data-closing={closing ?? undefined}
        onKeyDown={onKey}
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label={
          open
            ? `Loan products, page ${turned} of ${products.length}`
            : atBack
              ? 'Loan products, back cover. Close the book.'
              : 'Loan products, closed. Open the book.'
        }
      >
        {/* The pages already turned rest on this. */}
        <span className="book-board" aria-hidden="true" />

        {/* Leaf 0: the cover. */}
        <div
          className={`leaf leaf-cover${turned > 0 ? ' turned' : ''}`}
          style={{ zIndex: stack(0), ...fall(0) }}
          onTransitionEnd={settle(0)}
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
            {plate(products[0], 1, true)}
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
              style={{ zIndex: stack(leaf), ...fall(leaf) }}
              onTransitionEnd={settle(leaf)}
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
                {/* The right page had a hole in the middle of it. These are
                    the product's own highlights, so it fills with something
                    worth reading rather than with spacing. */}
                <span className="face-points">
                  {p.highlights.slice(0, 2).map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </span>
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

              <div
                className={`face face-back${facing ? '' : ' face-rear'}`}
                onClick={facing ? prev : shut}
                aria-hidden={!facing && atBack ? undefined : true}
              >
                {facing ? (
                  plate(facing, idx + 2, false)
                ) : (
                  <>
                    <span className="cover-mark" aria-hidden="true">i</span>
                    <span className="cover-rule" />
                    <span className="cover-t">That is all six</span>
                    <span className="cover-s">One form, one set of documents, and the whole panel of lenders behind it.</span>
                    <Link
                      className="rear-cta"
                      href="/apply/"
                      prefetch={false}
                      tabIndex={atBack ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Start an application
                    </Link>
                    <span className="rear-shut">Close the book</span>
                    <span className="cover-brand">{site.name}</span>
                  </>
                )}
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
              <strong>{atBack ? 'Back' : 'Cover'}</strong>
            )}
          </span>

          <button
            type="button"
            className="book-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={atBack ? 'Back to the cover' : turned === lastSpread ? 'Back cover' : 'Next page'}
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
