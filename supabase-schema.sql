-- Run this in Supabase SQL Editor to create the content table
-- (For Neon, use neon-schema.sql instead – same schema)
create table if not exists portfolio_content (
  id text primary key default 'main',
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Enable RLS if desired (optional)
-- alter table portfolio_content enable row level security;
