-- ============================================================
-- mfFurniture — Supabase Database Schema
-- Run this entire file in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── TABLES ──────────────────────────────────────────────────

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text,
  address text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

create table public.categories (
  id text primary key,
  name text not null,
  icon text default 'cube-outline',
  section text default 'home',
  created_at timestamptz default now()
);

create table public.banners (
  id text primary key,
  title text not null,
  image_url text not null,
  target_category_id text references public.categories(id) on delete set null,
  created_at timestamptz default now()
);

create table public.products (
  id text primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  discounted_price numeric(10,2),
  vendor_price numeric(10,2),
  category_id text references public.categories(id) on delete set null,
  images text[] default '{}',
  stock integer default 0,
  is_featured boolean default false,
  rating numeric(3,1) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);

create table public.orders (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  user_name text,
  user_email text,
  total_amount numeric(10,2),
  status text default 'pending' check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  shipping_address text,
  payment_method text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id text references public.orders(id) on delete cascade,
  product_id text,
  product_name text,
  product_image text,
  quantity integer,
  unit_price numeric(10,2)
);

create table public.reviews (
  id text primary key,
  product_id text references public.products(id) on delete cascade,
  user_id uuid references auth.users on delete cascade,
  user_name text,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now(),
  unique(product_id, user_id)
);

create table public.wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  product_id text references public.products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

create table public.addresses (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  label text not null,
  address text not null,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ─── AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.banners enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;
alter table public.addresses enable row level security;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- profiles: own row + admin can see all
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admin can view all profiles" on public.profiles for select using (public.is_admin());

-- categories: public read, admin write
create policy "Public read categories" on public.categories for select using (true);
create policy "Admin write categories" on public.categories for all using (public.is_admin());

-- banners: public read, admin write
create policy "Public read banners" on public.banners for select using (true);
create policy "Admin write banners" on public.banners for all using (public.is_admin());

-- products: public read, admin write
create policy "Public read products" on public.products for select using (true);
create policy "Admin write products" on public.products for all using (public.is_admin());

-- orders: own + admin all
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users insert own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users update own orders" on public.orders for update using (auth.uid() = user_id);
create policy "Admin all orders" on public.orders for all using (public.is_admin());

-- order_items: via order ownership
create policy "Users view own order items" on public.order_items for select
  using (exists (select 1 from public.orders where id = order_id and user_id = auth.uid()));
create policy "Users insert own order items" on public.order_items for insert
  with check (exists (select 1 from public.orders where id = order_id and user_id = auth.uid()));
create policy "Admin all order items" on public.order_items for all using (public.is_admin());

-- reviews: public read, own write
create policy "Public read reviews" on public.reviews for select using (true);
create policy "Users insert own review" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users delete own review" on public.reviews for delete using (auth.uid() = user_id);

-- wishlist: own only
create policy "Users manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- addresses: own only
create policy "Users manage own addresses" on public.addresses for all using (auth.uid() = user_id);

-- ─── SEED DATA ───────────────────────────────────────────────

insert into public.categories (id, name, icon) values
  ('c1', 'Living Room', 'home-outline'),
  ('c2', 'Bedroom', 'bed-outline'),
  ('c3', 'Dining', 'restaurant-outline'),
  ('c4', 'Office', 'laptop-outline'),
  ('c5', 'Outdoor', 'leaf-outline');

insert into public.banners (id, title, image_url, target_category_id) values
  ('b1', 'Summer Sale - Up to 40% Off', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'c1'),
  ('b2', 'New Bedroom Collection', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', 'c2'),
  ('b3', 'Home Office Essentials', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'c4');

insert into public.products (id, name, description, price, discounted_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p1','Nordic Sofa 3-Seater','A beautiful Nordic-style 3-seater sofa with premium fabric upholstery.',1299,999,'c1',array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'],15,true,4.5,128),
  ('p2','Minimalist Coffee Table','Sleek minimalist coffee table with tempered glass top and solid oak base.',449,null,'c1',array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'],22,true,4.2,64),
  ('p3','King Bed Frame - Walnut','Elegant king-size bed frame in walnut finish. Includes slatted base.',899,749,'c2',array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'],8,true,4.7,95),
  ('p4','Ergonomic Office Chair','Professional ergonomic office chair with lumbar support and breathable mesh back.',599,499,'c4',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'],30,true,4.6,210),
  ('p5','Dining Table Set - 6 Seats','Modern dining table with 6 matching chairs. Solid wood construction.',1599,1299,'c3',array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'],5,true,4.4,72),
  ('p6','Bookshelf - 5 Tier','Spacious 5-tier bookshelf in white finish.',299,null,'c1',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'],40,false,4.0,48),
  ('p7','Bedside Table - Set of 2','Matching pair of bedside tables with drawer storage.',349,279,'c2',array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'],18,false,4.3,56),
  ('p8','Outdoor Lounge Set','Weather-resistant outdoor lounge set with UV-resistant cushions.',1799,1499,'c5',array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'],10,true,4.8,39);

-- ─── ADMIN USER SETUP ────────────────────────────────────────
-- After running this SQL, go to Supabase Dashboard > Authentication > Users
-- Click "Add User" and create:
--   Email: admin@mf.com
--   Password: admin123
-- Then run this to set their role to admin (replace the UUID with the actual user ID):
--
-- update public.profiles set role = 'admin' where id = 'PASTE_ADMIN_USER_UUID_HERE';
