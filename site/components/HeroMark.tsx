import { site } from '@/lib/site';

/**
 * The hero wordmark the whole page is built around: real text, in the real
 * typeface, with the moving texture painted into the glyphs themselves via
 * background-clip. The reference site pushes a video through its letterforms;
 * a layered gradient reads the same at this size and costs no bytes at all.
 *
 * Browsers without background-clip:text fall back to a filled dark wordmark
 * rather than invisible text, because -webkit-text-fill-color is only applied
 * inside the @supports block.
 */
export default function HeroMark() {
  return (
    <div className="hero-mark-wrap">
      <span className="line">
        <span className="hero-mark" aria-hidden="true">
          {site.name.replace(/^i/, 'i')}
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
      <span className="hero-grain" aria-hidden="true" />
    </div>
  );
}
