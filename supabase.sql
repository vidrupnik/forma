-- FORMA: zaženi enkrat v Supabase (projekt "doma") > SQL Editor > New query > Run
create table if not exists forma (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create or replace function forma_touch() returns trigger language plpgsql as $$
begin new.updated_at = clock_timestamp(); return new; end $$;
drop trigger if exists forma_touch on forma;
create trigger forma_touch before insert or update on forma for each row execute function forma_touch();

grant select, insert, update, delete on public.forma to anon;
alter table forma enable row level security;
drop policy if exists forma_all on forma;
create policy forma_all on forma for all to anon using (true) with check (true);

-- tvoj dosedanji napredek iz stare aplikacije (24. 11.: 90 g beljakovin, spanje)
insert into forma (id, data) values
 ('profile', '{"_t":1795500000000,"dailies":{"2026-11-24":{"protein":90,"sleep":true,"water":false}},"weights":[],"activities":[],"pain":[],"claimed":{},"rewardText":{},"rehabPhase":1,"rehabDone":false,"rehabChecks":{},"photos":[]}')
on conflict (id) do nothing;
