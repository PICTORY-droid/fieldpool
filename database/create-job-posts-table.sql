create table if not exists public.job_posts (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  site_name text not null default '',
  region text not null default '',
  address text not null default '',

  job_types text[] not null default '{}',
  needed_count integer,
  pay integer,

  start_date date,
  end_date date,
  career_years integer,

  requires_vehicle boolean not null default false,
  provides_lodging boolean not null default false,

  status text not null default 'open',
  source_type text not null default 'manual',
  external_source text,
  external_id text,

  memo text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint job_posts_status_check
    check (status in ('open', 'closed', 'paused')),

  constraint job_posts_source_type_check
    check (source_type in ('manual', 'external')),

  constraint job_posts_needed_count_check
    check (needed_count is null or needed_count >= 1),

  constraint job_posts_pay_check
    check (pay is null or pay >= 0),

  constraint job_posts_career_years_check
    check (career_years is null or career_years >= 0)
);

create index if not exists job_posts_status_idx
  on public.job_posts (status);

create index if not exists job_posts_region_idx
  on public.job_posts (region);

create index if not exists job_posts_created_at_idx
  on public.job_posts (created_at desc);

create unique index if not exists job_posts_external_source_id_idx
  on public.job_posts (external_source, external_id)
  where external_source is not null and external_id is not null;