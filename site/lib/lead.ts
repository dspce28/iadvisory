import { site } from './site';

export type LeadField = { label: string; value: string };

/** Fields never sent over WhatsApp or a third-party webhook. The advisor
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

/**
 * Deliver a lead. WhatsApp is the fast path the advisor actually watches;
 * the webhook is the durable record, so a lead survives a lost phone.
 * Webhook failure never blocks the WhatsApp handoff.
 */
export async function deliverLead(
  kind: 'Enquiry' | 'Loan application',
  fields: LeadField[],
): Promise<{ ref: string; url: string; stored: boolean }> {
  const ref = reference();
  const message = composeMessage(kind, ref, fields);
  const url = waLink(message);

  let stored = false;
  const endpoint = process.env.NEXT_PUBLIC_LEAD_WEBHOOK;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          reference: ref,
          receivedAt: new Date().toISOString(),
          page: typeof location !== 'undefined' ? location.pathname : '',
          fields: fields.filter((f) => f.value && !SENSITIVE.test(f.label)),
        }),
      });
      stored = res.ok;
    } catch {
      stored = false;
    }
  }

  if (typeof window !== 'undefined') {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.('event', 'generate_lead', {
      lead_type: kind,
      reference: ref,
      stored,
    });
    window.open(url, '_blank', 'noopener');
  }
  return { ref, url, stored };
}
