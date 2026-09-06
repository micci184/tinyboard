-- Tinyboard feedback: per-user rows protected by RLS on user_id.
-- Apply via Supabase CLI (`supabase db push`) or the SQL Editor.

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now(),
  constraint feedback_message_not_blank check (char_length(btrim(message)) between 1 and 1000)
);

create index feedback_user_id_created_at_idx
  on public.feedback (user_id, created_at desc);

alter table public.feedback enable row level security;

create policy "feedback_select_own"
  on public.feedback
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "feedback_insert_own"
  on public.feedback
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
