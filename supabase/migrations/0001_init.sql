-- Portfolio backend schema
-- Applied automatically on `supabase db reset` / `supabase migration up`.
-- Safe to re-run (idempotent).

create extension if not exists "pgcrypto";

-- ── Contact form submissions ──────────────────────────────────
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  source     text not null default 'website',
  created_at timestamptz not null default now()
);

-- ── AI agent conversation logs ────────────────────────────────
create table if not exists public.agent_logs (
  id         uuid primary key default gen_random_uuid(),
  session_id text,
  query      text not null,
  response   text,
  model      text,
  created_at timestamptz not null default now()
);

-- ── Anonymous page-view analytics ─────────────────────────────
create table if not exists public.page_views (
  id         uuid primary key default gen_random_uuid(),
  path       text not null,
  referrer   text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- ── Edge function execution logs ──────────────────────────────
create table if not exists public.edge_logs (
  id            uuid primary key default gen_random_uuid(),
  function_name text not null,
  level         text not null default 'info',
  message       text not null,
  metadata      jsonb,
  created_at    timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────
alter table public.contacts   enable row level security;
alter table public.agent_logs enable row level security;
alter table public.page_views enable row level security;
alter table public.edge_logs  enable row level security;

-- The public contact form inserts as the anon role.
drop policy if exists "anon insert contacts" on public.contacts;
create policy "anon insert contacts"
  on public.contacts
  for insert
  to anon
  with check (true);

-- All other tables are service-role only (no public policies).
