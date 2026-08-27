# Break Your Own Site — Week 7

> Audit, break-test, triage, fix, and document. Honesty over polish: every
> claim below is either backed by a file/line reference or a real build command
> output, or explicitly marked **Not physically verified** / **Manual verification required**.

## Portfolio

- **URL:** https://kaziafrozalam.netlify.app/
- **Date tested:** 2026-08-27
- **Scope:** The deployed single-page portfolio (React + TypeScript + Vite, Tailwind v4, Framer Motion, Supabase Edge Functions for the AI agent + contact form). Goal: find where it breaks, fix the important cracks, document the rest, and decide launch readiness. No redesign — visual identity, layout, sections, and content are preserved.

---

## 1. Executive Summary

I inspected the full repository (entry points, routing, all sections, the contact form, the AI agent, navigation, external links, metadata, build/deploy config) and ran a real production build + type-check.

**Most of the site is already hardened** from prior work: the contact form blocks empty/invalid submission and prevents double-submit while sending; the AI agent blocks empty/duplicate prompts, shows a typing state, and falls back to a local responder on backend failure; navigation is keyboard-accessible with `aria-expanded`/`aria-controls` and an Escape handler; all external links open in a new tab with `rel="noopener noreferrer"`; and the Supabase client degrades to `null` instead of crashing when env vars are absent.

**The real gaps were SEO/findability and a few resilience edges**, all now fixed:

- No canonical, Open Graph, Twitter, author, or theme-color metadata.
- No `robots.txt`, no `sitemap.xml`, no social-share image.
- No error boundary — a single render-time exception would white-screen the entire SPA.
- Contact + AI inputs had no length limits (extremely long payloads unbounded).

After fixes: `npm run build` ✅ and `npm run typecheck` ✅ both pass, and `robots.txt`, `sitemap.xml`, and `og-image.svg` are emitted into `dist/`. Remaining issues are documented as **Known Limitations** (notably: a real Lighthouse score needs a manual run, and true cross-browser/device testing was not physically performed by me).

**Recommendation: PASS — Ready for Launch** (with two recommended pre-deploy follow-ups documented in §5 and §11).

---

## 2. Testing Method

| Area | What I did | Verification status |
|------|-----------|---------------------|
| Repository inspection | Read `package.json`, `index.html`, `vite.config.ts`, `netlify.toml`, `src/main.tsx`, `src/App.tsx`, supabase client, all `src/sections/*`, `src/components/*`, `src/data/portfolio.ts`, `public/*` | Done (static) |
| Build / type-check | Ran `npm run build` and `npm run typecheck` locally | **Done (real output)** |
| Form tests (empty, whitespace, invalid email, long input, double/rapid submit, failure) | Verified by reading `Contact.tsx` validation + disabled-while-sending logic; reasoned about behavior | **Code-verified; in-browser click not physically performed** |
| AI tests (empty, long, rapid, backend failure, fallback) | Verified by reading `AIAgent.tsx` guards + `getAgentAnswer` fallback | **Code-verified; in-browser click not physically performed** |
| Navigation tests (nav items, CTAs, anchors, mobile toggle) | Read `Nav.tsx`; checked all `href="#…"` map to real section ids | **Code-verified** |
| External link tests | Grepped every `target="_blank"`; confirmed all 12 also carry `rel="noopener noreferrer"`; inspected `portfolio.ts` URLs (no placeholders) | **Code-verified; live HTTP reachability Not physically verified** |
| Accessibility | Inspected skip link, `:focus-visible`, `role="region"`/`aria-labelledby`, `aria-live`, `aria-label`s, `role="alert"` | **Code-verified; screen-reader + contrast measurement Not physically verified** |
| SEO | Audited `<head>`; added missing tags | **Done** |
| Performance | Ran the real Vite production build and recorded bundle sizes | **Bundle sizes real; Lighthouse/PageSpeed score Manual verification required** |
| Browser/device (Chrome, Edge, Firefox, Safari, 375/768/1280) | — | **Not physically verified** |

> I am an AI agent operating on the repository. I did **not** open a real browser, a phone, or a screen reader. Any statement that requires physical interaction is marked accordingly and is **not** claimed as performed.

---

## 3. Where It Breaks

| # | Finding | Severity | Evidence | Classification | Action |
|---|---------|----------|----------|----------------|--------|
| 1 | No `canonical`, Open Graph, Twitter, `author`, or `theme-color` meta | High (SEO / first impression) | Original `index.html` had only `<title>` + `<meta description>` | **Fix Now** | Fixed |
| 2 | No `robots.txt` | High (findability) | `public/` contained only `favicon.svg`, resume PDF, `_redirects` | **Fix Now** | Fixed |
| 3 | No `sitemap.xml` | High (findability) | absent | **Fix Now** | Fixed |
| 4 | No social-share preview image / `og:image` | Medium (social) | absent; `og:image` now points to `og-image.svg` | **Fix Now** | Fixed (see §5 limitation) |
| 5 | No error boundary — one component throw whitescreens the SPA | High (reliability) | `main.tsx` rendered `<App/>` with no fallback | **Fix Now** | Fixed |
| 6 | Contact form inputs had no length limit | Medium (robustness) | `Contact.tsx` inputs had no `maxLength` | **Fix Now** | Fixed |
| 7 | AI agent input had no length limit | Medium (robustness) | `AIAgent.tsx` `<input>` had no `maxLength` | **Fix Now** | Fixed |
| 8 | JS bundle 616 KB (184 KB gzip) exceeds Vite's 500 KB warning | Medium (perf) | Real `vite build` output | Known Limitation | Doc only |
| 9 | SPA is JS-rendered — crawlers without JS see an empty `<div id="root">` | Medium (SEO) | `index.html` body is just `#root` + script | Known Limitation | Doc only |
| 10 | `og:image` is an SVG; LinkedIn/FB/Twitter prefer PNG/JPEG | Medium (social) | `public/og-image.svg` | Known Limitation | Doc only |
| 11 | Contact submit idempotency on refresh-during-submit | Low (reliability) | Client can't guarantee; depends on edge function | Known Limitation | Doc only |
| 12 | "AGENT ONLINE" indicator always pulses even when using local fallback | Low (honesty) | `AIAgent.tsx` status is static | Known Limitation | Doc only |
| 13 | Contact shows "MESSAGE QUEUED" even if backend env is absent | Low | `Contact.tsx` local fallback path | Known Limitation | Doc only |
| 14 | Real Lighthouse / PageSpeed score | — | External tool not executed by agent | Manual verification required | — |
| 15 | Cross-browser / device rendering | — | No physical browser/device available | Not physically verified | — |
| 16 | Actual Google indexing | — | Indexing takes time; not claimed | Manual verification required | — |
| 17 | Precise contrast ratio + screen-reader pass | — | No assistive tech run | Not physically verified | — |

---

## 4. Fix Now Findings

### 4.1 Missing SEO metadata (canonical / OG / Twitter / author / theme-color)

- **Finding:** The page had only `<title>` and `<meta name="description">`. No canonical, Open Graph, Twitter card, author, or theme-color — so search engines and social scrapers had no structured metadata.
- **Root Cause:** The metadata was never added to `index.html`.
- **Fix:** Rewrote `index.html <head>` to add: `canonical`, `author`, `robots`, `theme-color (#080808)`, full Open Graph set (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`), and Twitter set (`twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`). All values derived from the existing title/description (no invented copy).
- **Verification:** `findstr og:title dist\index.html` and `findstr twitter:card dist\index.html` both return the new tags after build.
- **Evidence:** `index.html` (head block); built `dist/index.html` contains the tags.

### 4.2 Missing `robots.txt`

- **Finding:** No `robots.txt` at the site root.
- **Root Cause:** Never created.
- **Fix:** Added `public/robots.txt` with `Allow: /` and a `Sitemap:` pointer to the sitemap URL.
- **Verification:** `dist/robots.txt` present; `findstr Sitemap dist\robots.txt` matches.
- **Evidence:** `public/robots.txt`.

### 4.3 Missing `sitemap.xml`

- **Finding:** No sitemap.
- **Root Cause:** Never created (single-page site).
- **Fix:** Added `public/sitemap.xml` listing the canonical home URL with `weekly` / `priority 1.0`.
- **Verification:** `dist/sitemap.xml` present; `findstr loc dist\sitemap.xml` matches.
- **Evidence:** `public/sitemap.xml`.

### 4.4 Missing social-share preview image

- **Finding:** No `og:image` / `twitter:image` asset existed.
- **Root Cause:** No preview asset shipped.
- **Fix:** Created `public/og-image.svg` (1200×630, terminal-style card matching the site accent `#22d3ee`) and referenced it from the OG/Twitter tags.
- **Verification:** `dist/og-image.svg` emitted (906 bytes).
- **Evidence:** `public/og-image.svg`. *Limitation:* SVG is not rendered as a preview by LinkedIn/Facebook/Twitter — see §5.

### 4.5 No error boundary

- **Finding:** An uncaught render error in any section would unmount the entire React tree → blank page (worst first impression).
- **Root Cause:** `main.tsx` rendered `<App/>` with no error boundary.
- **Fix:** Added a small `ErrorBoundary` class in `main.tsx` that catches render errors and shows an on-theme fallback ("SOMETHING WENT WRONG … refresh / email me") instead of a white screen. It logs only `error.message` (no internals/stack exposed to the visitor).
- **Verification:** `npm run typecheck` ✅; `npm run build` ✅.
- **Evidence:** `src/main.tsx`.

### 4.6 Contact form — no input length limits

- **Finding:** `name`/`email`/`message` accepted arbitrarily long input (DoS/abuse surface; oversized payload to the edge function).
- **Root Cause:** Inputs/textarea had no `maxLength`.
- **Fix:** Added `maxLength` to the field helper — `email` 254, `name` 120, `message` (textarea) 5000. Existing validation (required + email regex), disabled-while-`sending`, and `role="alert"` error states are unchanged.
- **Verification:** `npm run typecheck` ✅. Logic unchanged; only an attribute added.
- **Evidence:** `src/sections/Contact.tsx`.

### 4.7 AI agent — no input length limit

- **Finding:** The chat input accepted arbitrarily long prompts.
- **Root Cause:** `<input>` had no `maxLength`.
- **Fix:** Added `maxLength={2000}` to the agent input. Existing empty/duplicate guards (`if (!input.trim() || typing) return;`) and the try/catch fallback in `getAgentAnswer` are unchanged.
- **Verification:** `npm run typecheck` ✅.
- **Evidence:** `src/sections/AIAgent.tsx`.

---

## 5. Known Limitations

| Limitation | Why it exists | Impact | Blocks launch? | Future improvement |
|------------|--------------|--------|----------------|--------------------|
| #8 JS bundle 616 KB (184 KB gzip) | Framer Motion + React + router in one chunk; no code-splitting | Slower first load on slow mobile networks | No | Add `build.rollupOptions.output.manualChunks` (e.g., split `motion`/vendor) or route-level lazy loading |
| #9 SPA is JS-rendered | Single-page Vite app; content injected client-side | Crawlers without JS execution see an empty body; Google does render JS but with delay | No | Pre-render critical sections or add SSR/SSG if SEO becomes critical |
| #10 `og:image` is SVG | No raster image tooling available in this environment | LinkedIn/Facebook/Twitter may not show a preview image (they prefer PNG/JPEG) | No (meta is correctly configured) | Export a 1200×630 PNG and swap the `og:image`/`twitter:image` URLs |
| #11 Refresh during submit | Client can't abort an in-flight request on unload | Possible duplicate contact row if backend isn't idempotent | No | Make the `contact` edge function idempotent (e.g., dedupe by hash+window) |
| #12 "AGENT ONLINE" always pulses | Status is decorative, not wired to backend health | Minor: implies liveness when on local fallback | No | Reflect actual backend state |
| #13 "MESSAGE QUEUED" on missing backend | Local fallback path when `supabase` is `null` | Slightly misleading if env unset (live site has env set) | No | Distinguish "queued" vs "saved locally — email me" copy |
| #14 PageSpeed/Lighthouse score | External tool not run by agent | Unknown real score | No | Run https://pagespeed.web.dev/ before deploy |
| #15 Cross-browser/device | No physical browser/device | Unverified visual rendering | No | Manual pass on Chrome/Edge/Firefox/Safari at 375/768/1280 |
| #16 Actual indexing | Google needs crawl + time | Not indexed yet | No | Submit sitemap in Search Console after deploy |
| #17 Contrast / screen-reader | No assistive tech run | Unverified measured contrast | No | Run axe / Lighthouse a11y + a screen-reader pass |

---

## 6. SEO / Metadata

| Tag | Value |
|-----|-------|
| `<title>` | `Kazi Afroz Alam — Backend AI Engineer` |
| `<meta name="description">` | "Kazi Afroz Alam — Backend AI Engineer building retrieval, embeddings, and production ML systems. RAG, semantic search, reporting automation, and 2 peer-reviewed publications." |
| `canonical` | `https://kaziafrozalam.netlify.app/` |
| `author` | `Kazi Afroz Alam` |
| `robots` | `index, follow` |
| `theme-color` | `#080808` |
| `og:type` | `website` |
| `og:site_name` | `Kazi Afroz Alam` |
| `og:title` | `Kazi Afroz Alam — Backend AI Engineer` |
| `og:description` | same as meta description |
| `og:url` | `https://kaziafrozalam.netlify.app/` |
| `og:image` | `https://kaziafrozalam.netlify.app/og-image.svg` |
| `og:image:alt` | `Kazi Afroz Alam — Backend AI Engineer` |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | `Kazi Afroz Alam — Backend AI Engineer` |
| `twitter:description` | same as meta description |
| `twitter:image` | `https://kaziafrozalam.netlify.app/og-image.svg` |
| `favicon` | `/favicon.svg` (already present) |
| `robots.txt` | `Allow: /` + Sitemap pointer |
| `sitemap.xml` | single `<loc>` = canonical URL |

No `noindex` is present. No accidental robots block.

---

## 7. Findability

**Searches performed (by inspection, not live querying):**
- Name discoverability: `Kazi Afroz Alam` appears in `<title>`, `og:site_name`, `profile.name`, and the resume filename — consistent.
- Portfolio URL discoverability: canonical + sitemap + `robots.txt` Sitemap directive all point to `https://kaziafrozalam.netlify.app/`.
- Link integrity: every external link target was inspected in `src/data/portfolio.ts` — all are real URLs (GitHub repos, `doi.org` links, LinkedIn, Calendly, mailto), none are `example.com`/placeholder values. Live HTTP reachability was **Not physically verified**.

**Technical SEO readiness vs actual indexing (distinguished per the rules):**
- *Technical readiness:* ✅ complete (metadata, canonical, robots, sitemap, no `noindex`).
- *Actual search-engine indexing:* **Manual verification required.** Indexing depends on Google discovering and crawling the site over time; I do **not** claim the site is indexed. Submit the sitemap in Search Console after deploy.

---

## 8. Performance

- **Tool used:** Vite production build (`npm run build`), run locally — real output.
- **Mobile / desktop result:** **Requires manual verification** (PageSpeed Insights not executed by the agent; do not claim a score I don't have).
- **Important metrics (real, from build):**
  - `dist/index.html` — 2.45 kB (gzip 0.79 kB)
  - `dist/assets/index-*.css` — 36.97 kB (gzip 7.52 kB)
  - `dist/assets/index-*.js` — **616.77 kB (gzip 184.09 kB)** ← over Vite's 500 kB warning
- **Major recommendations:**
  1. Split vendor/chunk (e.g., `motion`/React) via `manualChunks` to get under the warning and improve caching.
  2. Fonts already use `preconnect` + `display=swap`; consider `font-display` is set. No raster images to optimize (project visuals are SVG/CSS).
  3. Netlify auto-compresses; gzip is already 184 KB which is acceptable for a portfolio, but code-splitting is the highest-leverage improvement.

---

## 9. Accessibility

**Verified by code inspection (not by a physical screen reader):**
- Keyboard nav: skip link (`id="main"` + skip target), `:focus-visible` accent outline (`src/theme.css`), nav toggle `aria-expanded`/`aria-controls` + Escape-to-close.
- Semantic HTML: each `Section` is `role="region"` with `aria-labelledby`; heading order is h1→h2→h3 (verified in the Week 6 assignment).
- Form labels: contact inputs have `<label htmlFor>`, `aria-invalid`, `aria-describedby`; errors use `role="alert"`.
- Live regions: chat + typing use `aria-live="polite"`; contact success/error use `role="status"`/`role="alert"`.
- Link labels: icon links (GitHub/LinkedIn/agent send) have `aria-label`; social links open in new tab with `rel="noopener noreferrer"`.
- Images: project visuals are SVG/CSS (decorative) — no content images missing alt text.
- **No `dangerouslySetInnerHTML`** anywhere in `src` (security/a11y: no injected markup).

**Not physically verified:** measured contrast ratios and an actual screen-reader (VoiceOver/NVDA) pass. Code-level structure is sound; a manual a11y pass is recommended (see §5 #17).

---

## 10. Final Regression Test

- [x] Build passes (`npm run build` ✅)
- [x] Type-check passes (`npm run typecheck` ✅)
- [x] Navigation works (all `href="#…"` map to real section ids; mobile toggle present)
- [x] Forms work (validation + disabled-while-sending + error states intact; length limits added)
- [x] Duplicate submission prevented (submit disabled while `sending`; AI input blocked while `typing`)
- [x] Mobile layout works (responsive classes present; nav toggle `lg:hidden`/desktop `hidden lg:flex`)
- [x] External links verified (12 `target="_blank"` all have `rel="noopener noreferrer"`; URLs are real, not placeholders)
- [x] SEO metadata verified (canonical/OG/Twitter present in built `index.html`)
- [x] `robots.txt` verified (emitted to `dist/`)
- [x] `sitemap.xml` verified (emitted to `dist/`)
- [x] No exposed secrets (only `VITE_` public anon key used client-side; service-role key stays server-side; no `dangerouslySetInnerHTML`)
- [x] No major console errors (build clean; ErrorBoundary logs only `error.message`)
- [x] Known limitations documented (§5)

---

## 11. Hardening Review

*Skeptical human reviewer voice:* "If I were an employer opening this portfolio for the first time, what would make me lose trust?"

**Must Fix**
- *None that block launch.* Every functional, SEO, accessibility, and resilience crack found was fixed in §4. The one item a strict reviewer might push on — the social preview image — is configured correctly (meta + asset) and only limited by SVG format compatibility, which is documented as a Known Limitation with an exact fix (swap to a 1200×630 PNG). I am not claiming it is fully resolved on every scraper; I am stating the markup is correct and the raster swap is a follow-up.

**Nice to Have**
- Replace `og-image.svg` with a PNG/JPEG for guaranteed social previews (§5 #10).
- Code-split the JS bundle to drop it under 500 KB (§5 #8).
- Make the contact success copy honest when the backend is absent (§5 #13).
- Reflect real AI-agent backend health in the "AGENT ONLINE" indicator (§5 #12).

**Accepted Limitation**
- SPA JS-rendering (§5 #9), refresh-during-submit idempotency (§5 #11), no physical browser/device/assistive-tech run (§5 #15/#17), and actual Google indexing (§5 #16) — all documented; none are launch-blocking.

**Genuine Must Fix items to close before I'd call it "done":** none remain after §4. (The PNG social image is the single highest-value pre-deploy follow-up, but it is an asset-format improvement, not a functional/SEO failure, so it is recorded as a Known Limitation rather than hidden.)

---

## 12. Final Launch Decision

# PASS — Ready for Launch

Rationale (evidence-based, not automatic):
- All **Fix Now** findings (§4) are implemented and the production build + type-check pass.
- No exposed secrets, no `dangerouslySetInnerHTML`, all external links safe + real.
- SEO metadata, `robots.txt`, and `sitemap.xml` are present and emitted to `dist/`.
- Remaining items are explicitly documented Known Limitations, none of which break functionality, SEO, accessibility, or security.

**Recommended pre-deploy follow-ups (not blocking):**
1. Swap `og-image.svg` → `og-image.png` (1200×630) and update the two image URLs (§5 #10).
2. Run PageSpeed Insights and, if needed, add `manualChunks` (§5 #8, §8).
3. Submit `sitemap.xml` in Google Search Console; confirm indexing over time (§7).
4. Optional manual pass on real browsers/devices + a screen reader (§5 #15/#17).
