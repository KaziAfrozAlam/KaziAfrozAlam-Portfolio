# Personal Portfolio — Kazi Afroz Alam

A single-page, terminal‑inspired developer portfolio for **Kazi Afroz Alam**, Backend AI Engineer. It showcases experience, projects, skills, education, publications, and a live **AI agent (Afroz.AI)** grounded on the resume data.

> Built with React + TypeScript (Vite), Tailwind CSS v4, Framer Motion, and a Supabase Edge Function (Deno) powering the AI agent.

---

## Assignment — "Open It on Your Phone" (Week 6 · General AI Fluency)

**Goal:** make the portfolio genuinely work on a real phone (and tablet/desktop), fix readability/contrast, verify every link, and keep a fix log.

**Method:** I audited the site with AI ("what's broken on mobile, what's the accessibility problem, why is this slow?") plus manual checks at **375px / 768px / 1280px**, then fixed each finding and verified with a Playwright smoke suite (9/9 passing on both mobile and desktop).

### Fix Log

| # | Problem (before) | Fix (after) | Evidence |
|---|---|---|---|
| 1 | **Mobile navigation was broken** — the hamburger menu scrolled away / its links were unreachable on phones. | Rebuilt `Nav` with a real toggle: `aria-expanded` + `aria-controls`, closes on link click and `Escape`, panel stays inside the fixed header. | `fix-log/before-mobile.png` vs `fix-log/after-mobile.png` |
| 2 | **AI agent input/send unreachable on small screens** — the chat input + send button could be pushed out of view. | Chat is a single column on mobile; full-width labeled input (`aria-label`) + send button (`aria-label="Send message"`) always reachable. | `fix-log/after-mobile.png` |
| 3 | **No skip link / no main landmark** — keyboard & screen-reader users had no quick way past the nav. | Added a "Skip to content" link (visible on focus) and `id="main"` on `<main>`. | smoke: "skip link is keyboard reachable" |
| 4 | **No visible focus indicator** — keyboard focus was invisible. | Global `:focus-visible` accent outline on all interactive elements. | `src/theme.css` |
| 5 | **Reduced-motion ignored** — animations kept running for users who asked to reduce motion. | Full `prefers-reduced-motion` CSS block + `<MotionConfig reducedMotion="user">`. | `src/theme.css`, `src/main.tsx` |
| 6 | **Async feedback not announced** — chat replies / form errors / success weren't read by screen readers. | `aria-live="polite"` on chat, `role="status"` + sr-only "Agent is typing…", `role="alert"` on form errors, `role="status"` on success. | `AIAgent.tsx`, `Contact.tsx` |
| 7 | **Form not accessible** — inputs lacked `aria-invalid`/`aria-describedby`; submit was clickable while empty. | Wired `aria-invalid` + `aria-describedby`; submit disabled until name/email/message are filled; added `autocomplete`. | smoke: "contact form enables submit when filled" |
| 8 | **Small touch targets** — hamburger + social icons were 40px. | Bumped to 44px (WCAG 2.5.5 target size). | `src/components/Nav.tsx` |
| 9 | **Section landmarks missing** — sections weren't labeled regions; heading order unverified. | Each `Section` is `role="region"` with `aria-labelledby`; verified heading order h1→h2→h3 (no skips). | `src/components/ui/Section.tsx` |
| 10 | **Possible overflow / blurry images** — checked. No horizontal overflow (body uses `overflow-x: clip`). Project visuals are vector (SVG/CSS), so they stay crisp at every width; no raster images to compress. | Confirmed no overflow at 375/768/1280; no raster assets. | `fix-log/overflow.mjs` + `fix-log/after-*.png` |

### Verification (maps to the pass/revise rubric)

- ✅ **Works on mobile** — hamburger menu, AI chat, and contact form are all reachable at 375px (screenshots + Playwright smoke suite, 9/9 on mobile *and* desktop).
- ✅ **Readable & crisp** — comfortable text sizes and line spacing; project visuals are SVG/CSS (no blurry raster); no horizontal overflow at any width.
- ✅ **Contrast** — primary text/accents on `#080808` meet WCAG AA; the dim gray `#8a8a8a` is used only for secondary monospace labels.
- ✅ **Links** — nav, footer, social (GitHub / LinkedIn / Resume), and every project's repo + demo link resolve; the smoke test asserts the GitHub/LinkedIn/Resume destinations.
- ✅ **Nothing obviously broken** at 375 / 768 / 1280 (see `fix-log/*.png`).

### Screenshots

- **Before** (live, previous build): `fix-log/before-mobile.png`, `fix-log/before-tablet.png`, `fix-log/before-desktop.png`
- **After** (this build): `fix-log/after-mobile.png`, `fix-log/after-tablet.png`, `fix-log/after-desktop.png`

### Deliverables

- **Live URL:** `https://kaziafrozalam.netlify.app` (re-deploy with these fixes — see [Deployment](#deployment)).
- **Fix log:** this section.

---

## Features

- **Sections** — Hero, About, Experience (incl. FlyRank AI), Projects (9 projects), Skills, Metrics, Education, Publications, Future Work, an interactive **AI Agent**, and a Contact form.
- **AI Agent (Afroz.AI)** — answers questions about the resume, projects, skills, and publications. It is a Supabase Edge Function grounded on `src/data/portfolio.ts`, with an optional LLM mode and a local deterministic fallback. It can also answer broader technical questions such as a **DNS walkthrough** and this project's **README/overview**.
- **Contact form** — submitted to a Supabase Edge Function that persists entries to a `contacts` table.
- **Responsive, accessible + animated** — Framer Motion transitions, monospace/terminal aesthetic, fully responsive layout, skip link, visible focus, and reduced-motion support.

## Tech Stack

| Layer          | Technology                                                       |
| -------------- | ---------------------------------------------------------------- |
| Framework      | React 18 + TypeScript, Vite 5                                    |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)                        |
| Animation      | Framer Motion (`motion`)                                         |
| Icons          | `lucide-react`                                                   |
| Routing        | `react-router` (v7)                                              |
| Backend/AI     | Supabase Edge Functions (Deno), `@supabase/supabase-js`          |
| Optional LLM   | OpenAI `gpt-4o-mini` (only if `AGENT_API_KEY` is set)            |

## Project Structure

```text
.
├─ index.html
├─ vite.config.ts
├─ tailwind / postcss (Tailwind v4 via Vite plugin)
├─ src/
│  ├─ data/portfolio.ts        # All site content (single source of truth)
│  ├─ sections/                # Page sections (Hero, Experience, Projects, AIAgent, ...)
│  ├─ components/              # Reusable UI (Nav, Footer, ProjectVisual, ...)
│  ├─ context/                # Scroll-index context
│  ├─ hooks/                  # use-section-index
│  ├─ lib/                    # format helpers
│  └─ integrations/supabase/  # Supabase client
└─ supabase/
   ├─ config.toml
   ├─ functions/
   │  ├─ ai-agent/index.ts    # AI agent edge function (Deno)
   │  ├─ contact/index.ts     # Contact form handler (Deno)
   │  └─ _shared/logger.ts
   └─ migrations/
```

## Prerequisites

- **Node.js** ≥ 18
- **npm**
- A **Supabase** project (free tier is fine) — needed for the AI agent and contact form
- *(Optional)* **Supabase CLI** for local dev / function deployment

## Environment Variables

Copy `.env.example` to `.env` (project root) and fill in your values:

```bash
# Public (browser) — used by the Supabase JS client
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
# VITE_SUPABASE_PUBLISHABLE_KEY is an alias for the anon key in newer setups
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>

# Server-side (edge functions only) — NEVER expose these to the browser
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
SUPABASE_DB_PASSWORD=<your-db-password>

# Optional — enables LLM mode in the ai-agent function (OpenAI)
AGENT_API_KEY=<your-openai-key>
```

> The `service_role` key bypasses RLS and must stay server‑side only.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Type-check (no emit)
npm run typecheck

# 4. Production build -> dist/
npm run build

# 5. Preview the production build
npm run preview
```

## Supabase Setup

### 1. Link the project (optional for local CLI use)

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
```

### 2. Deploy the Edge Functions

```bash
# AI agent
npx supabase functions deploy ai-agent --no-verify-jwt

# Contact form handler
npx supabase functions deploy contact --no-verify-jwt
```

### 3. Set secrets (server-side, used inside the functions)

```bash
npx supabase secrets set SUPABASE_URL=https://<ref>.supabase.co
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
# Optional LLM mode:
npx supabase secrets set AGENT_API_KEY=<openai-key>
```

### 4. Apply the database schema (for the contact form)

The repo ships a migration at `supabase/migrations/0001_init.sql` that creates the
`contacts` table (along with `agent_logs`, `page_views`, `edge_logs`) **with Row
Level Security and an `anon insert contacts` policy**. Apply it with the CLI:

```bash
npx supabase db push        # pushes local migrations to the linked project
# or, for finer control:
npx supabase migration up
```

The `contact` Edge Function writes with the **service-role key** (which bypasses
RLS), so the table only needs to exist with `name`, `email`, `message` (and
optionally `source`, `created_at`). If you run the SQL by hand instead of the
migration, use the exact schema from `supabase/migrations/0001_init.sql`:

```sql
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  source     text not null default 'website',
  created_at timestamptz not null default now()
);
```

## How the AI Agent Works

- **Primary path** — the browser calls the deployed `ai-agent` Supabase Edge Function.
- **Knowledge** — the function (and the local fallback) is grounded on `src/data/portfolio.ts`, so updating that file keeps the agent in sync. It now also answers **DNS** and **project overview/README** questions.
- **LLM mode (optional)** — if `AGENT_API_KEY` is set, the function uses OpenAI `gpt-4o-mini` with the resume context (and may answer general technical questions helpfully).
- **Fallback** — if the function isn't deployed or errors, the app uses a built‑in deterministic responder (`src/sections/AIAgent.tsx`) so the chat always works.

**Suggested queries** (shown in the UI) include skills, FlyRank work, ML models, RAG, current learning, publications, *“How does DNS work?”*, and *“Can you show the project README / overview?”*.

## Deployment

### Frontend (static)

`npm run build` outputs `dist/`. Deploy it to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.). Set the same `VITE_SUPABASE_*` env vars in the host's build settings.

**Netlify (one command):** `netlify.toml` is included (build = `npm run build`, publish = `dist`, SPA fallback). Run `npm run deploy` (builds and publishes `dist/`; first run opens a browser to authenticate), or drag-and-drop the `dist/` folder in the Netlify deploys UI.

### Functions

Deploy with the `supabase functions deploy` commands above. Ensure the function secrets are set in the Supabase dashboard or via the CLI.

## Customizing Content

All copy, projects, experience, skills, and publications live in **`src/data/portfolio.ts`**.
Edit that single file to update the site and keep the AI agent consistent. Remember to re‑deploy the `ai-agent` function after changing resume data if you rely on the hosted model.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                       |
| `npm run build`    | Production build to `dist/`                     |
| `npm run preview`  | Preview the production build                    |
| `npm run typecheck`| Run `tsc --noEmit`                              |
| `npm run test:e2e` | Run Playwright smoke tests (`BASE_URL` overrides target) |
| `npm run deploy`   | Build + publish `dist/` to Netlify              |

## Notes

- Supabase Edge Functions run on **Deno**; the `supabase/functions/tsconfig.json` + `deno-env.d.ts` provide editor type‑checking for `Deno.*` globals without affecting the app build.
- The site is styled with **Tailwind CSS v4**, configured through the Vite plugin (no `tailwind.config.js` required).

## License

Personal portfolio. All rights reserved © 2026 Kazi Afroz Alam.
