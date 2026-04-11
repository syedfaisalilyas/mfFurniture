-- Enable pg_net extension for HTTP calls from triggers
create extension if not exists pg_net with schema extensions;

-- Drop existing trigger/function if they exist
drop trigger if exists on_order_status_changed on public.orders;
drop function if exists public.notify_order_status_change();

-- Function that calls our Edge Function via HTTP when order status changes
create or replace function public.notify_order_status_change()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Only fire when status column actually changed
  if new.status is distinct from old.status then
    perform net.http_post(
      url    := 'https://ewlpwjkhuustiljvcdtn.supabase.co/functions/v1/send-push-notification',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHB3amtodXVzdGlsanZjZHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTQ2OTksImV4cCI6MjA5MTA3MDY5OX0.T7FfvFm5ZyQ86fGr0mqYrN2R6wrLb6zUGiugo31RAD4'
      ),
      body := jsonb_build_object(
        'type',       'UPDATE',
        'table',      'orders',
        'record',     row_to_json(new),
        'old_record', row_to_json(old)
      )
    );
  end if;
  return new;
end;
$$;

-- Trigger fires after every update on orders
create trigger on_order_status_changed
  after update on public.orders
  for each row
  execute procedure public.notify_order_status_change();
