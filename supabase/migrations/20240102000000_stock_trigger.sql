create or replace function public.deduct_stock_on_order()
returns trigger as $$
begin
  update public.products
  set stock = greatest(0, stock - new.quantity)
  where id = new.product_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_order_item_inserted on public.order_items;
create trigger on_order_item_inserted
  after insert on public.order_items
  for each row execute procedure public.deduct_stock_on_order();

-- Add push_token column to profiles
alter table public.profiles add column if not exists push_token text;
