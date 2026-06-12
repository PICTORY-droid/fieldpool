create table if not exists public.workers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  birth_year integer,
  gender text not null default 'unknown',
  main_region text not null,
  available_regions text[] not null default '{}',
  job_types text[] not null default '{}',
  career_years integer,
  desired_pay integer,
  has_vehicle boolean not null default false,
  can_lodging boolean not null default false,
  languages text[] not null default '{}',
  memo text,
  status text not null default 'new',
  consent_privacy boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workers_created_at_idx
  on public.workers (created_at desc);

create index if not exists workers_status_idx
  on public.workers (status);

create index if not exists workers_main_region_idx
  on public.workers (main_region);

create index if not exists workers_phone_idx
  on public.workers (phone);