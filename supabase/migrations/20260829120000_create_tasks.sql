-- Tinyboard tasks: per-user rows protected by RLS on user_id.
-- Apply via Supabase CLI (`supabase db push`) or the SQL Editor.

create type public.task_status as enum ('todo', 'in_progress', 'done');

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text not null default '',
  status public.task_status not null default 'todo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_title_not_blank check (char_length(btrim(title)) between 1 and 200)
);

create index tasks_user_id_created_at_idx
  on public.tasks (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tasks_set_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

alter table public.tasks enable row level security;

create policy "tasks_select_own"
  on public.tasks
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "tasks_insert_own"
  on public.tasks
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "tasks_update_own"
  on public.tasks
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "tasks_delete_own"
  on public.tasks
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
