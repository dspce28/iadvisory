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

## Two deploy targets, one codebase

Nothing in `app/` or `components/` changes between them.

```bash
npm run build                   # full Next.js — SSR, Route Handlers,
                                # Server Actions, ISR, image optimization.
                                # Needs a Node host (Vercel).

STATIC_EXPORT=true npm run build  # pre-built bundle in ./out for Hostinger
                                  # shared hosting. No server features.
```

Hostinger cannot run Node, which is the only reason the static target exists.
On Vercel, drop `STATIC_EXPORT` and the full framework is available — at which
point the forms can post through a Server Action instead of handing off to
WhatsApp, and `next/image` starts optimising.

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

## Setting up lead storage (free, ~10 minutes)

Leads reach WhatsApp either way. This gives them a second, durable home so
nothing is lost when a phone is.

1. Create a new Google Sheet and name it, e.g. "iAdvisory leads".
2. **Extensions → Apps Script**. Delete the placeholder `myFunction`, paste
   the contents of `site/docs/lead-sheet.gs`, and save.
3. Optionally set `NOTIFY_EMAIL` at the top to get an email per lead.
4. **Deploy → New deployment → Web app**, with:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
5. Authorise when prompted (the warning screen is normal for your own script:
   Advanced → Go to project).
6. Copy the deployment URL — it ends in `/exec`.
7. In GitHub: **Settings → Secrets and variables → Actions → Secrets → New
   repository secret**, named `LEAD_WEBHOOK`, with that URL as the value.
8. Re-run the deploy workflow (Actions → Build and publish static site → Run
   workflow) so the URL is compiled into the site.

To test, submit the contact form on the live site: a row should appear within
a second or two.

## Setting up analytics

1. Create a Google Analytics 4 property at analytics.google.com and copy the
   measurement ID (`G-XXXXXXXXXX`).
2. In GitHub: **Settings → Secrets and variables → Actions → Variables → New
   repository variable**, named `NEXT_PUBLIC_GA_ID`, with that ID as the value.
3. Re-run the deploy workflow.

Both forms already fire a `generate_lead` event, so enquiries show up as
conversions once you mark that event as one in GA.

## Search Console

Verification is opt-in and loads no script.

1. Add the property at [search.google.com/search-console](https://search.google.com/search-console).
   Prefer the **Domain** property and verify by DNS TXT record at your registrar —
   that needs no code change at all and covers every subdomain.
2. If you use the **URL prefix** method instead, choose the HTML tag option,
   copy the `content` value, and add it as a GitHub repository **variable**
   named `GSC_VERIFICATION`. Re-run the deploy workflow.
3. Submit `https://iadvisory.in/sitemap.xml` under **Sitemaps**.

## Content map

| Section | Route | Source |
|---|---|---|
| Loan products (6) | `/loans/<slug>/` | `lib/site.ts` |
| Comparisons (4) | `/compare/<slug>/` | `lib/comparisons.ts` |
| Calculators (4) | `/emi-calculator/`, `/calculators/<tool>/` | `components/*Calculator.tsx` |
| Guides (6) | `/blog/<slug>/` | `lib/posts.ts` |

Adding a loan product, comparison or article means adding one object to the
matching file. Routes, sitemap entries, share images, breadcrumbs and FAQ
schema are all generated from it — there is no page to write by hand.
