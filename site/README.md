# iAdvisory — site source

Next.js 16 (App Router) built as a **static export**, because Hostinger shared
hosting serves files and PHP but cannot run a Node process.

## Commands

```bash
cd site
npm install
npm run dev     # http://localhost:3000
npm run build   # writes ./out — plain HTML, CSS, JS and images
```

## Deployment

`main` holds the source. GitHub Actions builds it and force-pushes the contents
of `site/out` to the **`deploy`** branch. Hostinger's Git deployment must point
at `deploy` and `public_html` — pointing it at `main` would publish the source
tree instead of the built site.

The old single-page site is still at the repository root (`index.html` and
`assets/`). It stays there, and stays live, until Hostinger is switched over.

## Configuration

Set these in GitHub before the first deploy. Both are optional; the site builds
and works without either, it simply cannot measure or store anything.

| Where | Name | Purpose |
|---|---|---|
| Repository **variable** | `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`). Without it no analytics script is emitted at all. |
| Repository **secret** | `LEAD_WEBHOOK` | Endpoint that receives a JSON POST per lead — a Google Apps Script URL, Formspree, or a CRM. Without it leads go to WhatsApp only and nothing is stored. |

`lib/site.ts` holds every business fact: phone, email, address, founding year
and the three confirmed statistics. Change them there, not in the pages.

## Where content lives

- `lib/site.ts` — business details, navigation, and the six loan products
  (copy, eligibility, documents, FAQs, per-page SEO titles and descriptions)
- `lib/posts.ts` — blog articles
- `app/globals.css` — the full stylesheet, carried over from the previous site
  with the contrast fixes applied

## Things that are deliberate

- **No PAN, Aadhaar or date of birth is collected by any form.** `lib/lead.ts`
  filters those fields out of both the WhatsApp message and the webhook payload.
  The advisor collects them on the call.
- **three.js loads only on wide viewports**, after the browser goes idle, and
  never under `prefers-reduced-motion` or Save-Data. It is ~590 KB and purely
  decorative, so phones never download it.
- **No claim of RBI registration, ISO certification, or any guarantee** appears
  anywhere. iAdvisory is an intermediary and the site says so, in the footer and
  in the structured data.
