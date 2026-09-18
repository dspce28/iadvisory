import { site } from './site';

export type LeadField = { label: string; value: string };

/** Fields never sent over WhatsApp or to a third-party webhook. The advisor
 *  collects these on the call, over a channel the business controls. */
const SENSITIVE = /\bpan\s*(number|card|no\.?)\b|\baadha?ar\b|\bdate of birth\b|\bdob\b/i;

export const reference = () =>
  `IAD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export function composeMessage(
  kind: 'Enquiry' | 'Loan application',
  ref: string,
  fields: LeadField[],
) {
  const safe = fields.filter((f) => f.value && !SENSITIVE.test(f.label));
  const lines = safe.map((f) => `${f.label}: ${f.value}`).join('\n');
  const omitted = fields.length !== safe.length;
  return (
    `New ${kind.toLowerCase()} from ${site.url.replace('https://', '')}\n` +
    `Reference: ${ref}\n\n${lines}` +
    (omitted
      ? '\n\nNote: PAN, Aadhaar and date of birth were deliberately not sent here. Collect them on the call.'
      : '')
  );
}

/** Fire-and-forget copy of the lead to the durable store.
 *
 *  Deliberately not awaited by the caller, and deliberately not
 *  `application/json`: a custom Content-Type triggers a CORS preflight, and a
 *  Google Apps Script web app — the likely endpoint — does not answer OPTIONS,
 *  so the POST would never arrive. `text/plain` is CORS-safelisted, and Apps
 *  Script reads the body from e.postData.contents either way. `keepalive`
 *  lets it complete even if the page is navigating away.
 */
function storeLead(
  endpoint: string,
  kind: string,
  ref: string,
  fields: LeadField[],
): void {
  try {
    void fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        kind,
        reference: ref,
        receivedAt: new Date().toISOString(),
        page: typeof location !== 'undefined' ? location.pathname : '',
        fields: fields.filter((f) => f.value && !SENSITIVE.test(f.label)),
      }),
    }).catch(() => {
      /* the WhatsApp handoff and the on-screen fallback still carry the lead */
    });
  } catch {
    /* never let storage failure block the handoff */
  }
}

/**
 * Deliver a lead.
 *
 * Synchronous on purpose. window.open must run inside the click that called
 * this, or the popup blocker cancels the WhatsApp handoff — awaiting a network
 * round trip first would break exactly that.
 */
export function deliverLead(
  kind: 'Enquiry' | 'Loan application',
  fields: LeadField[],
): { ref: string; url: string } {
  const ref = reference();
  const url = waLink(composeMessage(kind, ref, fields));

  if (typeof window !== 'undefined') {
    // 1. Hand off while still inside the user gesture.
    window.open(url, '_blank', 'noopener');

    // 2. Then record it, without blocking anything.
    const endpoint = process.env.NEXT_PUBLIC_LEAD_WEBHOOK;
    if (endpoint) storeLead(endpoint, kind, ref, fields);

    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.('event', 'generate_lead', { lead_type: kind, reference: ref });
  }
  return { ref, url };
}
