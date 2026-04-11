-- ============================================================
-- Full Furniture Catalog — Categories + Products
-- Adds section column to categories, vendor_price to products,
-- and seeds the complete furniture catalog.
-- ============================================================

-- ─── SCHEMA CHANGES ─────────────────────────────────────────

-- Add 'section' column to categories (home / office / other)
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS section text DEFAULT 'home';

-- Add 'vendor_price' column to products (cost price, admin-only)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS vendor_price numeric(10,2);

-- ─── CLEAR OLD SEED DATA ────────────────────────────────────

-- Delete products first (FK to categories)
DELETE FROM public.products WHERE id IN ('p1','p2','p3','p4','p5','p6','p7','p8');

-- Delete old categories
DELETE FROM public.categories WHERE id IN ('c1','c2','c3','c4','c5');

-- Delete old banners
DELETE FROM public.banners WHERE id IN ('b1','b2','b3');

-- ─── SEED CATEGORIES ────────────────────────────────────────

INSERT INTO public.categories (id, name, icon, section) VALUES
  -- Home Furniture
  ('c1',  'Living Room',          'home-outline',          'home'),
  ('c2',  'Bedroom',              'bed-outline',           'home'),
  ('c3',  'Dining Room',          'restaurant-outline',    'home'),
  ('c4',  'Wardrobe & Almari',    'cube-outline',          'home'),
  ('c5',  'Kids Room',            'happy-outline',         'home'),
  ('c6',  'Entryway & Foyer',     'walk-outline',          'home'),
  -- Other
  ('c7',  'Outdoor',              'leaf-outline',          'other'),
  -- Office Furniture
  ('c10', 'Office Chairs',        'accessibility-outline', 'office'),
  ('c11', 'Office Desks',         'desktop-outline',       'office'),
  ('c12', 'Conference & Meeting', 'people-outline',        'office'),
  ('c13', 'Office Storage',       'archive-outline',       'office'),
  ('c14', 'Reception Furniture',  'business-outline',      'office')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  section = EXCLUDED.section;

-- ─── SEED BANNERS ───────────────────────────────────────────

INSERT INTO public.banners (id, title, image_url, target_category_id) VALUES
  ('b1', 'Summer Sale - Up to 40% Off',      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',  'c1'),
  ('b2', 'New Bedroom Collection',            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', 'c2'),
  ('b3', 'Complete Office Setup Solutions',    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'c10'),
  ('b4', 'Kids Room Makeover - 30% Off',      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', 'c5'),
  ('b5', 'Outdoor Living at Its Finest',      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800', 'c7')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  image_url = EXCLUDED.image_url,
  target_category_id = EXCLUDED.target_category_id;

-- ─── SEED PRODUCTS ──────────────────────────────────────────
-- vendorPrice = cost price, price = retail, discountedPrice = sale price

INSERT INTO public.products (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count) VALUES

  -- ══════════════════════════════════════════════════════════
  -- LIVING ROOM (c1)
  -- ══════════════════════════════════════════════════════════
  ('p1',  'Nordic Sofa 3-Seater',    'Premium Nordic-style 3-seater sofa with solid wood legs and high-density foam cushions.', 1299, 999,  720,  'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 15, true,  4.5, 128),
  ('p2',  'L-Shaped Sectional Sofa', 'Large L-shaped sectional sofa, perfect for spacious living rooms. Removable covers.',     1899, 1599, 1100, 'c1', array['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600'], 8,  true,  4.3, 74),
  ('p3',  'Loveseat Sofa',           'Compact loveseat ideal for small spaces. Velvet upholstery with button tufting.',          699,  null, 420,  'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 20, false, 4.1, 45),
  ('p4',  'Recliner Sofa - Single',  'Electric recliner sofa with USB charging port and cup holder. Premium leather.',           1099, 899,  640,  'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 10, false, 4.6, 89),
  ('p5',  'Minimalist Coffee Table', 'Sleek coffee table with tempered glass top and solid oak base. 120×60×45 cm.',             449,  null, 260,  'c1', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 22, true,  4.2, 64),
  ('p6',  'TV Unit - 180cm',         'Modern floating TV unit with cable management, 2 drawers and open shelving.',              599,  499,  340,  'c1', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 18, false, 4.0, 37),
  ('p7',  'Bookshelf 5-Tier',        'Spacious 5-tier bookshelf in white finish. 80×30×180 cm. Easy assembly.',                  299,  null, 170,  'c1', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 40, false, 4.0, 48),
  ('p8',  'Accent Chair - Velvet',   'Stylish accent chair in jewel-toned velvet with gold-finish legs.',                        389,  329,  220,  'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 14, false, 4.4, 52),
  ('p9',  'Ottoman / Pouffe',        'Round upholstered ottoman, doubles as a footrest or extra seating. Removable tray top.',   249,  199,  130,  'c1', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 25, false, 4.1, 33),
  ('p10', 'Side Table - Marble Top', 'Elegant side table with genuine marble top and brushed brass frame.',                      199,  null, 110,  'c1', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 30, false, 4.2, 28),

  -- ══════════════════════════════════════════════════════════
  -- BEDROOM (c2)
  -- ══════════════════════════════════════════════════════════
  ('p11', 'King Bed Frame - Walnut',    'Elegant king-size (180×200 cm) bed frame in walnut finish. Slatted base included.',    899,  749,  520,  'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 8,  true,  4.7, 95),
  ('p12', 'Queen Bed Frame - Grey Oak', 'Modern queen-size (160×200 cm) upholstered bed frame with storage headboard.',        749,  649,  440,  'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 12, true,  4.5, 67),
  ('p13', 'Single Bed Frame - White',   'Clean-lined single bed (90×200 cm) in white lacquer. Suitable for kids and guests.',  449,  null, 250,  'c2', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 20, false, 4.2, 41),
  ('p14', 'Storage Bed - King Size',    'King-size bed with 4 large hydraulic lift storage drawers underneath.',               1199, 999,  710,  'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 6,  false, 4.6, 58),
  ('p15', 'Dressing Table with Mirror', 'White dressing table with large tri-fold mirror, 3 drawers and cushioned stool.',    549,  449,  310,  'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 10, false, 4.3, 44),
  ('p16', 'Bedside Table - Set of 2',   'Matching pair of bedside tables with 1 drawer each. Compact design.',                349,  279,  190,  'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 18, false, 4.3, 56),
  ('p17', 'Chest of Drawers - 6 Drawer','Solid wood chest with 6 deep drawers, soft-close mechanism.',                        499,  null, 290,  'c2', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 15, false, 4.1, 29),

  -- ══════════════════════════════════════════════════════════
  -- DINING ROOM (c3)
  -- ══════════════════════════════════════════════════════════
  ('p21', 'Dining Table 2-Seater - Round', 'Compact round dining table for 2. Solid oak. 80 cm diameter.',                    349,  null, 200,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 15, false, 4.0, 22),
  ('p22', 'Dining Table Set 4-Seater',     '4-seater dining table with 4 matching chairs. Mango wood construction.',           799,  699,  460,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 10, true,  4.4, 58),
  ('p23', 'Dining Table Set 6-Seater',     '6-seater solid wood dining table with chairs. 180×90 cm.',                        1599, 1299, 930,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 5,  true,  4.4, 72),
  ('p24', 'Dining Table Set 8-Seater',     'Extendable 8-seater dining table (extends from 180 to 240 cm) with 8 chairs.',    2199, 1899, 1300, 'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 4,  false, 4.5, 34),
  ('p25', 'Dining Chair - Set of 6',       'Set of 6 upholstered dining chairs with solid beech legs.',                        599,  499,  340,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 12, false, 4.3, 47),
  ('p26', 'Bar Stool - Set of 2',          'Counter-height bar stools (65 cm) with swivel seat and footrest.',                 299,  249,  160,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 20, false, 4.1, 31),
  ('p27', 'Sideboard / Buffet Cabinet',    'Modern sideboard with 2 doors and 3 drawers. Ideal for dining room storage.',      699,  599,  400,  'c3', array['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], 8,  false, 4.2, 26),

  -- ══════════════════════════════════════════════════════════
  -- WARDROBE & ALMARI (c4)
  -- ══════════════════════════════════════════════════════════
  ('p31', 'Sliding Door Wardrobe 2-Door', 'Sleek 2-door sliding wardrobe with mirror panels. H 220 × W 150 × D 60 cm.',       899,  749,  520,  'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 8,  true,  4.5, 63),
  ('p32', 'Hinged Wardrobe 3-Door',       '3-door wardrobe with internal hanging rail, shelves and 2 drawers.',                1099, 899,  640,  'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 6,  false, 4.3, 41),
  ('p33', 'Hinged Wardrobe 4-Door',       'Large 4-door wardrobe, full-length mirror on 2 doors. H 220 × W 200 × D 60 cm.',   1499, 1299, 880,  'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 5,  false, 4.4, 38),
  ('p34', 'Walk-In Closet System',        'Modular walk-in closet: 3 hanging rails, 10 shelves, 4 drawers.',                   2499, 2099, 1500, 'c4', array['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], 3,  false, 4.7, 25),
  ('p35', 'Kids Wardrobe - 2 Door',       'Colourful 2-door wardrobe for kids with interior mirror and removable shelf.',       599,  499,  340,  'c4', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 10, false, 4.2, 29),

  -- ══════════════════════════════════════════════════════════
  -- KIDS ROOM (c5)
  -- ══════════════════════════════════════════════════════════
  ('p41', 'Bunk Bed with Ladder',         'Solid pine bunk bed (90×200 cm each bunk) with safety rails and wooden ladder.',    699,  599,  400,  'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 10, true,  4.6, 82),
  ('p42', 'Loft Bed with Study Area',     'Loft bed with built-in desk and shelving underneath. Ideal for small rooms.',       899,  799,  520,  'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 7,  false, 4.5, 54),
  ('p43', 'Kids Single Bed - Cars Theme', 'Fun car-shaped single bed for toddlers and young children. Safe rounded edges.',    399,  349,  220,  'c5', array['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], 12, false, 4.4, 66),
  ('p44', 'Kids Study Table & Chair',     'Adjustable height study table with chair. Ergonomic design for growing children.',  349,  299,  190,  'c5', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 15, false, 4.3, 48),
  ('p45', 'Toy Storage Unit',             'Colourful toy storage unit with 9 removable fabric bins. Easy assembly.',           249,  199,  130,  'c5', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 20, false, 4.2, 37),

  -- ══════════════════════════════════════════════════════════
  -- ENTRYWAY & FOYER (c6)
  -- ══════════════════════════════════════════════════════════
  ('p51', 'Shoe Rack - 4 Tier',           '4-tier shoe rack holding up to 16 pairs. Compact metal frame with wooden shelves.', 149,  119,  80,   'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 30, false, 4.0, 44),
  ('p52', 'Console Table - Slim',         'Slim console table 120×30×80 cm. Perfect for narrow entryways. 1 drawer.',          279,  null, 150,  'c6', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 18, false, 4.2, 31),
  ('p53', 'Coat & Hat Stand',             'Free-standing coat stand with 8 hooks and umbrella holder. Solid wood.',            129,  109,  65,   'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 25, false, 4.1, 22),
  ('p54', 'Hallway Storage Bench',        'Entryway bench with shoe storage underneath and coat hooks above.',                 349,  299,  200,  'c6', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 12, false, 4.4, 38),
  ('p55', 'Wall-Mounted Key Organizer',   'Decorative wall-mounted key holder with 6 hooks and mail shelf. Bamboo.',           79,   null, 40,   'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 50, false, 3.9, 18),
  ('p56', 'Umbrella Stand - Metal',       'Modern cylindrical umbrella stand in matte black. Drip tray included.',             99,   79,   50,   'c6', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 35, false, 4.0, 15),

  -- ══════════════════════════════════════════════════════════
  -- OUTDOOR (c7)
  -- ══════════════════════════════════════════════════════════
  ('p61', 'Outdoor Lounge Set',           'Weather-resistant 4-piece outdoor lounge set with UV-resistant cushions.',           1799, 1499, 1050, 'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 10, true,  4.8, 39),
  ('p62', 'Garden Dining Table 6-Seater', 'Teak garden dining table with 6 chairs. Fully weather-resistant.',                  2299, 1999, 1350, 'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 5,  false, 4.6, 27),
  ('p63', 'Sun Lounger - Set of 2',       'Adjustable reclining sun loungers with cushions. Aluminium frame.',                 699,  599,  400,  'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 8,  false, 4.5, 33),
  ('p64', 'Garden Swing Bench',           '3-seater garden swing with canopy top. Powder-coated steel frame.',                 599,  499,  340,  'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 6,  false, 4.3, 21),
  ('p65', 'Outdoor Bar Cart',             'Rolling outdoor bar cart with 2 tiers. Rust-resistant with wooden accents.',         349,  299,  190,  'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 12, false, 4.2, 16),
  ('p66', 'Patio Umbrella - 3m',          'Large 3-meter tilting patio umbrella with crank. UV50+ protection.',                199,  169,  100,  'c7', array['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], 20, false, 4.4, 28),

  -- ══════════════════════════════════════════════════════════
  -- OFFICE CHAIRS (c10)
  -- ══════════════════════════════════════════════════════════
  ('p71', 'Executive Leather Chair',     'High-back executive chair in genuine leather with armrests, lumbar support and tilt.', 799,  699,  460,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 20, true,  4.7, 115),
  ('p72', 'Ergonomic Mesh Chair',        'Full-mesh ergonomic chair with adjustable lumbar, headrest and 4D armrests.',          599,  499,  340,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 30, true,  4.6, 210),
  ('p73', 'Task Chair - Mid Back',       'Comfortable mid-back task chair with breathable fabric and height adjustment.',       299,  249,  160,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 40, false, 4.3, 88),
  ('p74', 'Visitor Chair - Set of 2',   'Stackable visitor chairs with padded seat and chrome legs. Set of 2.',                249,  null, 130,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 25, false, 4.1, 44),
  ('p75', 'Conference Chair - Mesh',     'Breathable mesh conference chair with armrests. Sold per chair.',                     349,  299,  190,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 50, false, 4.4, 67),
  ('p76', 'Reception Waiting Chair',     'Fabric reception chair with chrome legs. Suitable for lobbies and waiting areas.',    199,  169,  100,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 30, false, 4.0, 29),
  ('p77', 'Office Lounge Chair',         'Stylish office lounge chair for break rooms. Egg-pod design in fabric.',             499,  429,  280,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 10, false, 4.5, 38),
  ('p78', 'Drafting Chair - Tall',       'Tall drafting chair with foot ring and adjustable height (55-75 cm). Mesh back.',    399,  349,  220,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 15, false, 4.2, 24),
  ('p79', 'Gaming Chair - Pro',          'High-back gaming chair with headrest pillow, lumbar cushion and 180° recline.',      549,  479,  310,  'c10', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 18, false, 4.6, 95),

  -- ══════════════════════════════════════════════════════════
  -- OFFICE DESKS (c11)
  -- ══════════════════════════════════════════════════════════
  ('p81', 'Executive Desk - 180cm',      'Large executive desk with leather inlay top, 3 drawers and cable grommets.',         1299, 1099, 760,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 8,  true,  4.7, 72),
  ('p82', 'Standing Desk - Electric',    'Electric sit-stand desk 160×80 cm. Height range 70–120 cm. Memory presets.',         1499, 1299, 880,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 10, true,  4.8, 134),
  ('p83', 'L-Shaped Desk - Corner',      'L-shaped corner desk 160×120 cm with integrated cable management tray.',             799,  699,  460,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 12, false, 4.5, 91),
  ('p84', 'Computer Desk - 120cm',       'Simple computer desk 120×60 cm with monitor shelf and keyboard tray.',               349,  299,  190,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 25, false, 4.2, 55),
  ('p85', 'Writing Desk - Minimalist',   'Minimalist writing desk 100×50 cm, solid oak legs, no drawers.',                     299,  null, 160,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 20, false, 4.1, 33),
  ('p86', 'Double Workstation Desk',     'Back-to-back workstation for 2 employees with privacy screen and cable ports.',      999,  849,  580,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  false, 4.4, 47),
  ('p87', 'Compact Laptop Desk',         'Foldable laptop desk 80×40 cm. Perfect for home offices. Adjustable height.',        199,  169,  100,  'c11', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 35, false, 4.0, 42),

  -- ══════════════════════════════════════════════════════════
  -- CONFERENCE & MEETING (c12)
  -- ══════════════════════════════════════════════════════════
  ('p91', 'Meeting Table - 4 Seater',   'Oval meeting table 140×80 cm with central cable management port.',                    799,  699,  460,  'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 8,  false, 4.4, 31),
  ('p92', 'Meeting Table - 6 Seater',   'Rectangular conference table 180×90 cm with built-in power outlets.',                 1199, 999,  700,  'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  true,  4.6, 48),
  ('p93', 'Meeting Table - 8 Seater',   'Conference table 240×100 cm with cable tray. Veneer top, solid steel legs.',          1699, 1499, 1000, 'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 4,  false, 4.5, 36),
  ('p94', 'Meeting Table - 10 Seater',  'Large boardroom table 300×110 cm. Power module with USB, HDMI and power ports.',      2499, 2199, 1500, 'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 3,  false, 4.7, 22),
  ('p95', 'Meeting Table - 12 Seater',  'Executive boardroom table 360×120 cm with inbuilt cable management system.',          3299, 2899, 1950, 'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 2,  false, 4.8, 15),
  ('p96', 'Conference Chair Set of 6',  'Set of 6 mesh conference chairs with castors and height adjustment.',                 999,  849,  580,  'c12', array['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], 8,  false, 4.4, 41),
  ('p97', 'Whiteboard Stand - Mobile',  'Double-sided mobile whiteboard 120×90 cm with marker tray. Lockable wheels.',         349,  299,  190,  'c12', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 15, false, 4.1, 19),

  -- ══════════════════════════════════════════════════════════
  -- OFFICE STORAGE (c13)
  -- ══════════════════════════════════════════════════════════
  ('p101', 'Filing Cabinet - 2 Drawer',  'Steel 2-drawer lateral filing cabinet with lock. A4/Letter size.',                  299,  249,  160,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 20, false, 4.1, 38),
  ('p102', 'Filing Cabinet - 4 Drawer',  'Vertical 4-drawer filing cabinet with central lock and anti-tilt system.',          449,  399,  250,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 15, false, 4.3, 52),
  ('p103', 'Office Bookshelf - 5 Tier',  'Open-plan office bookshelf 90×30×200 cm. Black powder-coated steel.',               279,  null, 150,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 25, false, 4.0, 29),
  ('p104', 'Storage Cabinet with Doors', 'Tall office cabinet 80×40×200 cm with lockable doors and 4 adjustable shelves.',    499,  429,  280,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 10, false, 4.2, 34),
  ('p105', 'Credenza / Side Cabinet',    'Executive credenza 150×45×75 cm with 3 doors and 3 drawers. Walnut veneer.',        799,  699,  460,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 7,  false, 4.5, 27),
  ('p106', 'Mobile Pedestal - 3 Drawer', 'Lockable under-desk pedestal with 2 box drawers and 1 file drawer. Castors.',       249,  199,  130,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 30, false, 4.2, 43),
  ('p107', 'Locker Unit - 6 Door',       '6-door steel locker for employee belongings. Ventilation slots on each door.',       599,  549,  340,  'c13', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 8,  false, 4.0, 17),

  -- ══════════════════════════════════════════════════════════
  -- RECEPTION FURNITURE (c14)
  -- ══════════════════════════════════════════════════════════
  ('p111', 'Reception Desk - Curved',      'Curved front reception desk 200×80 cm with transaction counter and cable port.',  1499, 1299, 880,  'c14', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 5,  true,  4.7, 44),
  ('p112', 'Reception Desk - Straight',    'Straight reception desk 160×70 cm with high panel front and storage pedestal.',   1099, 949,  640,  'c14', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 6,  false, 4.5, 31),
  ('p113', 'Waiting Area Sofa - 2 Seater', '2-seater waiting area sofa in faux leather. Ideal for office lobbies.',           599,  499,  340,  'c14', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 10, false, 4.3, 38),
  ('p114', 'Waiting Area Sofa - 3 Seater', '3-seater reception sofa with chrome legs and premium fabric upholstery.',         799,  699,  460,  'c14', array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], 8,  false, 4.4, 42),
  ('p115', 'Reception Coffee Table',       'Low coffee table 100×50×40 cm for reception/waiting areas. Tempered glass top.',  299,  249,  160,  'c14', array['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], 15, false, 4.2, 24),
  ('p116', 'Magazine Rack Stand',          'Floor-standing magazine/brochure rack with 10 pockets. Ideal for waiting rooms.',  149,  129,  75,   'c14', array['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], 20, false, 3.9, 13),
  ('p117', 'Visitor Sign-In Podium',       'Wooden reception sign-in podium with lockable storage and sloped top.',            399,  349,  220,  'c14', array['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], 5,  false, 4.1, 9)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  discounted_price = EXCLUDED.discounted_price,
  vendor_price = EXCLUDED.vendor_price,
  category_id = EXCLUDED.category_id,
  images = EXCLUDED.images,
  stock = EXCLUDED.stock,
  is_featured = EXCLUDED.is_featured,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;
