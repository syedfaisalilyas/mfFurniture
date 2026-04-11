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
  section text default 'home' check (section in ('home','office','other')),
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
  vendor_price numeric(10,2),          -- cost price (admin-only, for profit calculation)
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

-- HOME FURNITURE CATEGORIES
insert into public.categories (id, name, icon, section) values
  ('c1',  'Living Room',         'home-outline',         'home'),
  ('c2',  'Bedroom',             'bed-outline',          'home'),
  ('c3',  'Dining Room',         'restaurant-outline',   'home'),
  ('c4',  'Wardrobe & Almari',   'cube-outline',         'home'),
  ('c5',  'Kids Room',           'happy-outline',        'home'),
  ('c6',  'Entryway & Foyer',    'walk-outline',         'home'),
  ('c7',  'Outdoor',             'leaf-outline',         'other');

-- OFFICE FURNITURE CATEGORIES
insert into public.categories (id, name, icon, section) values
  ('c10', 'Office Chairs',       'accessibility-outline','office'),
  ('c11', 'Office Desks',        'desktop-outline',      'office'),
  ('c12', 'Conference & Meeting','people-outline',       'office'),
  ('c13', 'Office Storage',      'archive-outline',      'office'),
  ('c14', 'Reception Furniture', 'business-outline',     'office');

insert into public.banners (id, title, image_url, target_category_id) values
  ('b1', 'Summer Sale - Up to 40% Off',   'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'c1'),
  ('b2', 'New Bedroom Collection',         'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', 'c2'),
  ('b3', 'Complete Office Setup Solutions','https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'c10');

-- LIVING ROOM PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p1', 'Nordic Sofa 3-Seater',    'Premium Nordic-style 3-seater sofa with solid wood legs and high-density foam cushions.', 1299, 999,  720, 'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 15, true,  4.5, 128),
  ('p2', 'L-Shaped Sectional Sofa', 'Large L-shaped sectional sofa, perfect for spacious living rooms. Removable covers.',      1899, 1599, 1100,'c1', array['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600'], 8,  true,  4.3, 74),
  ('p3', 'Loveseat Sofa',           'Compact loveseat ideal for small spaces. Velvet upholstery with button tufting.',          699,  null, 420, 'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 20, false, 4.1, 45),
  ('p4', 'Recliner Sofa - Single',  'Electric recliner sofa with USB charging port and cup holder. Premium leather.',           1099, 899,  640, 'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 10, false, 4.6, 89),
  ('p5', 'Minimalist Coffee Table', 'Sleek coffee table with tempered glass top and solid oak base. 120×60×45 cm.',             449,  null, 260, 'c1', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 22, true,  4.2, 64),
  ('p6', 'TV Unit - 180cm',         'Modern floating TV unit with cable management, 2 drawers and open shelving.',              599,  499,  340, 'c1', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 18, false, 4.0, 37),
  ('p7', 'Bookshelf 5-Tier',        'Spacious 5-tier bookshelf in white finish. 80×30×180 cm. Easy assembly.',                  299,  null, 170, 'c1', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 40, false, 4.0, 48),
  ('p8', 'Accent Chair - Velvet',   'Stylish accent chair in jewel-toned velvet with gold-finish legs.',                        389,  329,  220, 'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 14, false, 4.4, 52),
  ('p9', 'Ottoman / Pouffe',        'Round upholstered ottoman, doubles as a footrest or extra seating. Removable tray top.',   249,  199,  130, 'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 25, false, 4.1, 33),
  ('p10','Side Table - Marble Top', 'Elegant side table with genuine marble top and brushed brass frame.',                      199,  null, 110, 'c1', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 30, false, 4.2, 28);

-- BEDROOM PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p11','King Bed Frame - Walnut',    'Elegant king-size (180×200 cm) bed frame in walnut finish. Slatted base included.',    899,  749,  520, 'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 8,  true,  4.7, 95),
  ('p12','Queen Bed Frame - Grey Oak', 'Modern queen-size (160×200 cm) upholstered bed frame with storage headboard.',         749,  649,  440, 'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 12, true,  4.5, 67),
  ('p13','Single Bed Frame - White',   'Clean-lined single bed (90×200 cm) in white lacquer. Suitable for kids and guests.',   449,  null, 250, 'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 20, false, 4.2, 41),
  ('p14','Storage Bed - King Size',    'King-size bed with 4 large hydraulic lift storage drawers underneath.',                1199, 999,  710, 'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 6,  false, 4.6, 58),
  ('p15','Dressing Table with Mirror', 'White dressing table with large tri-fold mirror, 3 drawers and cushioned stool.',      549,  449,  310, 'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 10, false, 4.3, 44),
  ('p16','Bedside Table - Set of 2',   'Matching pair of bedside tables with 1 drawer each. Compact design.',                  349,  279,  190, 'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 18, false, 4.3, 56),
  ('p17','Chest of Drawers - 6 Drawer','Solid wood chest with 6 deep drawers, soft-close mechanism.',                         499,  null, 290, 'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 15, false, 4.1, 29);

-- DINING ROOM PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p21','Dining Table 2-Seater - Round', 'Compact round dining table for 2. Solid oak. 80 cm diameter.',                      349,  null, 200, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 15, false, 4.0, 22),
  ('p22','Dining Table Set 4-Seater',     '4-seater dining table with 4 matching chairs. Mango wood construction.',            799,  699,  460, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 10, true,  4.4, 58),
  ('p23','Dining Table Set 6-Seater',     '6-seater solid wood dining table with chairs. 180×90 cm. Seats 6 comfortably.',    1599, 1299, 930, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 5,  true,  4.4, 72),
  ('p24','Dining Table Set 8-Seater',     'Extendable 8-seater dining table (extends from 180 to 240 cm) with 8 chairs.',     2199, 1899, 1300,'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 4,  false, 4.5, 34),
  ('p25','Dining Chair - Set of 6',       'Set of 6 upholstered dining chairs with solid beech legs. Multiple colour options.',599,  499,  340, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 12, false, 4.3, 47),
  ('p26','Bar Stool - Set of 2',          'Counter-height bar stools (65 cm) with swivel seat and footrest.',                  299,  249,  160, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 20, false, 4.1, 31),
  ('p27','Sideboard / Buffet Cabinet',    'Modern sideboard with 2 doors and 3 drawers. Ideal for dining room storage.',       699,  599,  400, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 8,  false, 4.2, 26);

-- WARDROBE & ALMARI PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p31','Sliding Door Wardrobe 2-Door', 'Sleek 2-door sliding wardrobe with mirror panels. H 220 × W 150 × D 60 cm.',         899,  749,  520, 'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 8,  true,  4.5, 63),
  ('p32','Hinged Wardrobe 3-Door',       '3-door wardrobe with internal hanging rail, shelves and 2 drawers.',                  1099, 899,  640, 'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 6,  false, 4.3, 41),
  ('p33','Hinged Wardrobe 4-Door',       'Large 4-door wardrobe, full-length mirror on 2 doors. H 220 × W 200 × D 60 cm.',    1499, 1299, 880, 'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 5,  false, 4.4, 38),
  ('p34','Walk-In Closet System',        'Modular walk-in closet system: 3 hanging rails, 10 shelves, 4 drawers.',             2499, 2099, 1500,'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 3,  false, 4.7, 25),
  ('p35','Kids Wardrobe - 2 Door',       'Colourful 2-door wardrobe for kids with interior mirror and removable shelf.',        599,  499,  340, 'c4', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 10, false, 4.2, 29);

-- KIDS ROOM PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p41','Bunk Bed with Ladder',         'Solid pine bunk bed (90×200 cm each bunk) with safety rails and wooden ladder.',     699,  599,  400, 'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 10, true,  4.6, 82),
  ('p42','Loft Bed with Study Area',     'Loft bed with built-in desk and shelving underneath. Ideal for small rooms.',         899,  799,  520, 'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 7,  false, 4.5, 54),
  ('p43','Kids Single Bed - Cars Theme', 'Fun car-shaped single bed for toddlers and young children. Safe rounded edges.',      399,  349,  220, 'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 12, false, 4.4, 66),
  ('p44','Kids Study Table & Chair',     'Adjustable height study table with chair. Ergonomic design for growing children.',    349,  299,  190, 'c5', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 15, false, 4.3, 48),
  ('p45','Toy Storage Unit',             'Colourful toy storage unit with 9 removable fabric bins. Easy assembly.',             249,  199,  130, 'c5', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 20, false, 4.2, 37);

-- ENTRYWAY & FOYER PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p51','Shoe Rack - 4 Tier',           '4-tier shoe rack holding up to 16 pairs. Compact metal frame with wooden shelves.',   149,  119,  80,  'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 30, false, 4.0, 44),
  ('p52','Console Table - Slim',         'Slim console table 120×30×80 cm. Perfect for narrow entryways. 1 drawer.',            279,  null, 150, 'c6', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 18, false, 4.2, 31),
  ('p53','Coat & Hat Stand',             'Free-standing coat stand with 8 hooks and umbrella holder. Solid wood.',              129,  109,  65,  'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 25, false, 4.1, 22),
  ('p54','Hallway Storage Bench',        'Entryway bench with shoe storage underneath and coat hooks above.',                   349,  299,  200, 'c6', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 12, false, 4.4, 38);

-- OUTDOOR PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p61','Outdoor Lounge Set',           'Weather-resistant 4-piece outdoor lounge set with UV-resistant cushions.',           1799, 1499, 1050,'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 10, true,  4.8, 39),
  ('p62','Garden Dining Table 6-Seater', 'Teak garden dining table with 6 chairs. Fully weather-resistant.',                  2299, 1999, 1350,'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 5,  false, 4.6, 27),
  ('p63','Sun Lounger - Set of 2',       'Adjustable reclining sun loungers with cushions. Aluminium frame.',                   699,  599,  400, 'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 8,  false, 4.5, 33);

-- OFFICE CHAIRS PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p71','Executive Leather Chair',       'High-back executive chair in genuine leather with armrests, lumbar support and tilt.',799,  699,  460, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 20, true,  4.7, 115),
  ('p72','Ergonomic Mesh Chair',          'Full-mesh ergonomic chair with adjustable lumbar, headrest and 4D armrests.',        599,  499,  340, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 30, true,  4.6, 210),
  ('p73','Task Chair - Mid Back',         'Comfortable mid-back task chair with breathable fabric and height adjustment.',      299,  249,  160, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 40, false, 4.3, 88),
  ('p74','Visitor Chair - Set of 2',      'Stackable visitor chairs with padded seat and chrome legs. Set of 2.',               249,  null, 130, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 25, false, 4.1, 44),
  ('p75','Conference Chair - Mesh',       'Breathable mesh conference chair with armrests. Sold per chair.',                    349,  299,  190, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 50, false, 4.4, 67),
  ('p76','Reception Waiting Chair',       'Fabric reception chair with chrome legs. Suitable for lobbies and waiting areas.',   199,  169,  100, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 30, false, 4.0, 29),
  ('p77','Office Lounge Chair',           'Stylish office lounge chair for break rooms. Egg-pod design in fabric.',             499,  429,  280, 'c10',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 10, false, 4.5, 38);

-- OFFICE DESKS PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p81','Executive Desk - 180cm',        'Large executive desk with leather inlay top, 3 drawers and cable grommets.',        1299, 1099, 760, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 8,  true,  4.7, 72),
  ('p82','Standing Desk - Electric',      'Electric sit-stand desk 160×80 cm. Height range 70–120 cm. Memory presets.',       1499, 1299, 880, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 10, true,  4.8, 134),
  ('p83','L-Shaped Desk - Corner',        'L-shaped corner desk 160×120 cm with integrated cable management tray.',            799,  699,  460, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 12, false, 4.5, 91),
  ('p84','Computer Desk - 120cm',         'Simple computer desk 120×60 cm with monitor shelf and keyboard tray.',              349,  299,  190, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 25, false, 4.2, 55),
  ('p85','Writing Desk - Minimalist',     'Minimalist writing desk 100×50 cm, solid oak legs, no drawers.',                    299,  null, 160, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 20, false, 4.1, 33),
  ('p86','Double Workstation Desk',       'Back-to-back workstation for 2 employees with privacy screen and cable ports.',    999,  849,  580, 'c11',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  false, 4.4, 47);

-- CONFERENCE & MEETING PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p91','Meeting Table - 4 Seater',      'Oval meeting table 140×80 cm with central cable management port.',                  799,  699,  460, 'c12',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 8,  false, 4.4, 31),
  ('p92','Meeting Table - 6 Seater',      'Rectangular conference table 180×90 cm with built-in power outlets.',              1199, 999,  700, 'c12',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  true,  4.6, 48),
  ('p93','Meeting Table - 8 Seater',      'Conference table 240×100 cm with cable tray. Veneer top, solid steel legs.',       1699, 1499, 1000,'c12',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 4,  false, 4.5, 36),
  ('p94','Meeting Table - 10 Seater',     'Large boardroom table 300×110 cm. Power module with USB, HDMI and power ports.',   2499, 2199, 1500,'c12',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 3,  false, 4.7, 22),
  ('p95','Meeting Table - 12 Seater',     'Executive boardroom table 360×120 cm with inbuilt cable management system.',       3299, 2899, 1950,'c12',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 2,  false, 4.8, 15),
  ('p96','Conference Chair Set of 6',     'Set of 6 mesh conference chairs with castors and height adjustment.',               999,  849,  580, 'c12',array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 8,  false, 4.4, 41);

-- OFFICE STORAGE PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p101','Filing Cabinet - 2 Drawer',    'Steel 2-drawer lateral filing cabinet with lock. A4/Letter size.',                  299,  249,  160, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 20, false, 4.1, 38),
  ('p102','Filing Cabinet - 4 Drawer',    'Vertical 4-drawer filing cabinet with central lock and anti-tilt system.',          449,  399,  250, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 15, false, 4.3, 52),
  ('p103','Office Bookshelf - 5 Tier',    'Open-plan office bookshelf 90×30×200 cm. Black powder-coated steel.',               279,  null, 150, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 25, false, 4.0, 29),
  ('p104','Storage Cabinet with Doors',   'Tall office cabinet 80×40×200 cm with lockable doors and 4 adjustable shelves.',   499,  429,  280, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 10, false, 4.2, 34),
  ('p105','Credenza / Side Cabinet',      'Executive credenza 150×45×75 cm with 3 doors and 3 drawers. Walnut veneer.',       799,  699,  460, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 7,  false, 4.5, 27),
  ('p106','Mobile Pedestal - 3 Drawer',   'Lockable under-desk pedestal with 2 box drawers and 1 file drawer. Castors.',      249,  199,  130, 'c13',array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 30, false, 4.2, 43);

-- RECEPTION FURNITURE PRODUCTS
insert into public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) values
  ('p111','Reception Desk - Curved',      'Curved front reception desk 200×80 cm with transaction counter and cable port.',   1499, 1299, 880, 'c14',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 5,  true,  4.7, 44),
  ('p112','Reception Desk - Straight',    'Straight reception desk 160×70 cm with high panel front and storage pedestal.',    1099, 949,  640, 'c14',array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  false, 4.5, 31),
  ('p113','Waiting Area Sofa - 2 Seater', '2-seater waiting area sofa in faux leather. Ideal for office lobbies.',            599,  499,  340, 'c14',array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 10, false, 4.3, 38),
  ('p114','Waiting Area Sofa - 3 Seater', '3-seater reception sofa with chrome legs and premium fabric upholstery.',          799,  699,  460, 'c14',array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 8,  false, 4.4, 42),
  ('p115','Reception Coffee Table',       'Low coffee table 100×50×40 cm for reception/waiting areas. Tempered glass top.',   299,  249,  160, 'c14',array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 15, false, 4.2, 24);

-- ─── ADMIN USER SETUP ────────────────────────────────────────
-- After running this SQL, go to Supabase Dashboard > Authentication > Users
-- Click "Add User" and create:
--   Email: admin@mf.com
--   Password: admin123
-- Then run this to set their role to admin (replace the UUID with the actual user ID):
--
-- update public.profiles set role = 'admin' where id = 'PASTE_ADMIN_USER_UUID_HERE';

-- ─── MIGRATION (run this if database already exists) ─────────
-- alter table public.products add column if not exists vendor_price numeric(10,2);
-- alter table public.categories add column if not exists section text default 'home' check (section in ('home','office','other'));
