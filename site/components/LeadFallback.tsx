import { site } from '@/lib/site';

/** Shown after a submission. If the WhatsApp tab was blocked, this is the
 *  visible path that stops the lead being lost in silence. */
export default function LeadFallback({ url, reference }: { url: string; reference: string }) {
  return (
    <div className="lead-fallback">
      WhatsApp did not open?{' '}
      <a href={url} target="_blank" rel="noopener">
        Tap here to send it
      </a>
      <br />
      or call{' '}
      <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
      <br />
      <span className="lead-ref">Your reference: {reference}</span>
    </div>
  );
}
