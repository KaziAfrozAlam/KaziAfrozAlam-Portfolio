# Personal Portfolio — Kazi Afroz Alam

A single-page, terminal‑inspired developer portfolio for **Kazi Afroz Alam**, Backend AI Engineer. It showcases experience, projects, skills, education, publications, and a live **AI agent (Afroz.AI)** grounded on the resume data.

> Built with React + TypeScript (Vite), Tailwind CSS v4, Framer Motion, and a Supabase Edge Function (Deno) powering the AI agent.

---

## Features

- **Sections** — Hero, About, Experience (incl. FlyRank AI), Projects (9 projects), Skills, Metrics, Education, Publications, Future Work, an interactive **AI Agent**, and a Contact form.
- **AI Agent (Afroz.AI)** — answers questions about the resume, projects, skills, and publications. It is a Supabase Edge Function grounded on `src/data/portfolio.ts`, with an optional LLM mode and a local deterministic fallback. It can also answer broader technical questions such as a **DNS walkthrough** and this project's **README/overview**.
- **Contact form** — submitted to a Supabase Edge Function that persists entries to a `contacts` table.
- **Responsive + animated** — Framer Motion transitions, monospace/terminal aesthetic, fully responsive layout.

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

### 4. Contacts table (for the contact form)

The `contact` function `POST`s a row to `rest/v1/contacts`. Create a table such as:

```sql
create table public.contacts (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  message     text not null,
  source      text default 'website',
  created_at  timestamptz default now()
);
-- Recommended: enable RLS and a policy, since the function uses the service role anyway.
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

## Notes

- Supabase Edge Functions run on **Deno**; the `supabase/functions/tsconfig.json` + `deno-env.d.ts` provide editor type‑checking for `Deno.*` globals without affecting the app build.
- The site is styled with **Tailwind CSS v4**, configured through the Vite plugin (no `tailwind.config.js` required).

## License

Personal portfolio. All rights reserved © 2026 Kazi Afroz Alam.
