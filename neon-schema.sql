-- Run this in Neon SQL Editor to create the content table
-- (Same schema as Supabase – Neon is serverless Postgres)
create table if not exists portfolio_content (
  id text primary key default 'main',
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);
