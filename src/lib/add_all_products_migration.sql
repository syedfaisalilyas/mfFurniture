-- ============================================================
-- mfFurniture — Comprehensive Product Expansion Migration
-- Run in: Supabase Dashboard > SQL Editor
-- Adds: 3 new categories + ~130 new products (all furniture types)
-- New product IDs use 'np' prefix to avoid conflicts with p1-p115
-- ============================================================

-- ─── NEW CATEGORIES ─────────────────────────────────────────

insert into public.categories (id, name, icon, section) values
  ('c8',  'Home Study & Library',    'book-outline',        'home'),
  ('c15', 'Office Partitions',       'grid-outline',        'office'),
  ('c16', 'Breakroom & Canteen',     'cafe-outline',        'office')
on conflict (id) do nothing;

-- ─── LIVING ROOM — extra sofa & seating types (c1) ──────────

insert into public.products
  (id, name, description, price, discounted_price, vendor_price, category_id, images, stock, is_featured, rating, review_count)
values
  ('np001','Chesterfield Sofa 3-Seater','Classic Chesterfield with deep button tufting, rolled arms and solid wood legs. Premium PU leather.',1499,1299,880,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',8,true,4.7,92),
  ('np002','Sleeper Sofa / Sofa Bed','Converts from sofa to queen-size bed in seconds. Pocket-spring mattress. Removable washable cover.',1199,999,700,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',10,false,4.5,78),
  ('np003','Futon Sofa Bed','Space-saving futon that folds flat into a bed. Solid pine frame, thick cotton mattress.',499,429,280,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',15,false,4.2,44),
  ('np004','Modular Corner Sofa — 5 Piece','Fully modular 5-piece corner sofa. Rearrange to any layout. Chenille upholstery.',2199,1899,1300,'c1','{"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"}',5,true,4.6,61),
  ('np005','Chaise Lounge','Single chaise lounge in velvet fabric. Right or left-hand configuration available.',699,599,400,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',12,false,4.4,37),
  ('np006','Recliner Sofa — 2 Seater','Dual recliner loveseat with cup holders, USB ports and power reclining.',1499,1299,880,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',8,false,4.6,55),
  ('np007','Recliner Sofa — 3 Seater','Triple power recliner sofa with centre console, LED lighting and massage function.',1999,1699,1150,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',6,false,4.7,48),
  ('np008','Sectional Sofa with Chaise','U-shaped sectional with chaise end. 8 seats total. Washable slipcovers.',2799,2499,1650,'c1','{"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"}',4,true,4.5,39),
  ('np009','Camelback Sofa','Traditional camelback sofa with hump back silhouette. Linen fabric, turned legs.',999,849,580,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',9,false,4.3,28),
  ('np010','Mid-Century Modern Sofa','Iconic mid-century sofa with tapered legs and structured cushions. Multiple colour options.',1099,949,640,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',11,false,4.5,66),
  ('np011','Floor Sofa / Japanese Sofa','Low-profile floor sofa for a minimalist aesthetic. Modular, removable covers.',799,699,460,'c1','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',14,false,4.1,33),
  ('np012','Lift-Top Coffee Table','Coffee table with hydraulic lift top revealing hidden storage. 120×60 cm.',549,479,310,'c1','{"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"}',18,false,4.4,51),
  ('np013','Nesting Tables — Set of 3','Set of 3 nesting side tables in graduated sizes. Solid walnut top, black steel legs.',399,349,220,'c1','{"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"}',20,false,4.2,29),
  ('np014','Trunk Coffee Table','Vintage-style storage trunk used as a coffee table. Faux leather with metal corners.',479,399,270,'c1','{"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"}',16,false,4.3,41),
  ('np015','Display Cabinet / China Cabinet','Tall china cabinet with glass doors and interior lighting. 90×40×190 cm.',999,849,580,'c1','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',7,false,4.5,35),
  ('np016','Floating Wall Shelves Set of 5','Set of 5 floating wooden wall shelves. Invisible brackets, 60 cm each.',249,199,130,'c1','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',30,false,4.1,47),
  ('np017','Floor Standing Mirror — Full Length','Full-length floor mirror 50×170 cm. Gold-finish frame. Lean or hang.',299,249,160,'c1','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',22,false,4.4,58),

-- ─── BEDROOM — extra bed types & dressers (c2) ──────────────

  ('np021','Platform Bed — King','Low-profile platform king bed, no box spring needed. Oak veneer headboard.',799,699,460,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',10,false,4.5,53),
  ('np022','Canopy Bed — Queen','Four-poster canopy queen bed with drape rail. Solid mango wood.',1299,1099,760,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',5,false,4.6,41),
  ('np023','Murphy / Wall Fold-Down Bed','Space-saving wall bed (queen) with integrated bookcase panels. Mechanism included.',1799,1599,1050,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',4,true,4.7,67),
  ('np024','Ottoman Bed — King','King ottoman bed with gas-lift storage under entire mattress area.',1099,949,640,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',7,false,4.6,49),
  ('np025','Sleigh Bed — King','Classic sleigh bed with curved headboard and footboard. Cherry wood finish.',1199,999,700,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',6,false,4.4,32),
  ('np026','Panel Bed — Queen','Simple panel bed with solid wood headboard and footboard. Multiple finishes.',699,599,400,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',12,false,4.3,39),
  ('np027','Captain Bed with 4 Drawers — Single','Single captain bed with 4 deep underbed drawers. Great for kids or small rooms.',649,549,370,'c2','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',10,false,4.4,44),
  ('np028','Daybed with Trundle','Daybed with pull-out trundle bed underneath. Ideal for guest rooms.',749,649,430,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',8,false,4.3,36),
  ('np029','Bedroom Bench — Upholstered','End-of-bed bench 120 cm, button-tufted velvet, solid wood legs.',299,249,160,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',20,false,4.2,28),
  ('np030','Tall Boy Chest — 7 Drawer','Tall narrow chest of drawers with 7 drawers. 50×40×130 cm. Soft-close.',449,379,250,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',14,false,4.2,31),
  ('np031','Low Boy Dresser — 9 Drawer','Wide low dresser with 9 drawers and large mirror above. 150×45×80 cm.',699,599,400,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',9,false,4.3,26),
  ('np032','Bedside Charging Station','Bedside table with built-in wireless charger, USB ports and AC outlet.',349,299,190,'c2','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',18,false,4.5,62),

-- ─── DINING ROOM — more table sizes & storage (c3) ──────────

  ('np041','Dining Table Set 10-Seater','Solid sheesham wood 10-seater dining set with 10 chairs. 270×100 cm.',2799,2499,1650,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',3,false,4.6,21),
  ('np042','Dining Table Set 12-Seater','Grand 12-seater table 320×110 cm. Solid wood with ornate carved legs.',3499,3099,2050,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',2,false,4.7,14),
  ('np043','Farmhouse Dining Table — 6 Seater','Rustic farmhouse-style table with bench seating on both sides. Reclaimed wood look.',1199,999,700,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',6,true,4.5,52),
  ('np044','Glass Top Dining Table — 6 Seater','Tempered glass dining table (180×90 cm) with stainless steel base.',1099,899,640,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',7,false,4.4,38),
  ('np045','Marble Top Dining Table — 4 Seater','Genuine marble top dining table with gold-finish metal legs. 120×70 cm.',1599,1399,940,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',5,false,4.6,29),
  ('np046','Extendable Dining Table','Foldable leaf extendable table from 140 cm to 200 cm. Seats 4 to 8.',999,849,580,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',9,true,4.5,61),
  ('np047','Breakfast Bar Set — 2 Stools','Compact bar table 60×60×105 cm with 2 counter-height stools. Industrial style.',499,429,280,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',12,false,4.2,34),
  ('np048','High Bar Stool with Back — Set of 2','75 cm height bar stools with footrest and padded seat. Set of 2.',349,299,190,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',18,false,4.3,42),
  ('np049','China Cabinet / Hutch','Display hutch with glass doors on top, closed storage on bottom. 90×40×195 cm.',899,779,520,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',6,false,4.4,23),
  ('np050','Wine Rack & Bar Cabinet','Combined wine rack (holds 20 bottles) and bar cabinet with glass holder.',599,499,340,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',10,false,4.3,31),
  ('np051','Corner Bench Dining Set','Space-saving L-shaped corner bench + table + 2 chairs. Solid pine.',799,699,460,'c3','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',8,false,4.4,38),

-- ─── WARDROBE & ALMARI — more types (c4) ────────────────────

  ('np061','Corner Wardrobe — L-Shape','L-shaped corner wardrobe maximising awkward corner spaces. 2 hanging rails, 6 shelves.',1299,1099,760,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',5,false,4.4,29),
  ('np062','Open Wardrobe System','Freestanding open wardrobe with hanging rail, drawers and shelves. No doors.',699,599,400,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',10,false,4.1,33),
  ('np063','Mirrored Wardrobe — 6 Door','Large 6-door mirrored sliding wardrobe. H 220 × W 270 × D 60 cm.',2199,1899,1300,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',3,false,4.6,18),
  ('np064','Almari with Dressing Table Combo','Wardrobe with attached dressing table and mirror. 3-door, 2-drawer.',1499,1299,880,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',6,false,4.5,41),
  ('np065','Shoe Cabinet — Slim 6-Tier','Narrow shoe cabinet 50×22×130 cm with flip-up doors. Holds 24 pairs.',299,249,160,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',18,false,4.2,37),
  ('np066','Rotating Shoe Rack Tower','360° rotating shoe rack tower, holds 32 pairs. 35 cm diameter, 160 cm tall.',399,349,220,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',12,false,4.3,29),
  ('np067','Ottoman Storage Box — Large','Large fabric ottoman storage box 120×60×45 cm. Doubles as a seat or coffee table.',349,299,190,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',15,false,4.2,24),
  ('np068','Hinged Wardrobe 2-Door — Mirror','2-door wardrobe with full-length mirror, 1 hanging rail, 3 shelves.',699,599,400,'c4','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',12,false,4.3,46),

-- ─── KIDS ROOM — full range (c5) ────────────────────────────

  ('np071','Toddler / Crib Convertible Bed','Convertible crib that becomes a toddler bed. Solid birch wood. Safety slats.',499,429,280,'c5','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',10,false,4.6,58),
  ('np072','Playhouse Bed — Single','Single bed in a playhouse design with a slide and climbing wall. Pine wood.',899,799,520,'c5','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',6,true,4.8,74),
  ('np073','Princess Canopy Bed','Dreamy canopy bed for girls with attached canopy frame. White finish.',749,649,430,'c5','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',8,false,4.7,62),
  ('np074','Racing Car Bed — Double','Double-size racing car bed for older kids. Safe rounded edges. Red/blue/grey.',599,499,340,'c5','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',9,false,4.5,49),
  ('np075','Trundle Bed — Single + Trundle','Single bed with pop-up trundle underneath. Great for sleepovers.',649,549,370,'c5','{"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600"}',8,false,4.4,36),
  ('np076','Kids Bookcase — 4 Shelf','Colourful 4-shelf bookcase with picture-book ledge. 60×30×130 cm.',199,169,105,'c5','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',20,false,4.2,28),
  ('np077','Kids Activity Table & 2 Chairs','Height-adjustable activity table with 2 chairs for arts and crafts.',249,199,130,'c5','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',18,false,4.3,43),
  ('np078','Kids Storage Bench','Padded bench with lift-up seat for toy storage underneath.',199,169,105,'c5','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',22,false,4.1,31),
  ('np079','Children Wardrobe — 3 Door','3-door wardrobe sized for kids. Includes mirror on one door, shelves and hanging.',599,499,340,'c5','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}',10,false,4.2,27),
  ('np080','Baby Changing Table','Changing table with safety rail, 2 shelves and lined changing area. 90×50×95 cm.',399,349,220,'c5','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',12,false,4.5,52),

-- ─── ENTRYWAY & FOYER — extended (c6) ───────────────────────

  ('np091','Hall Tree with Mirror & Bench','All-in-one entryway hall tree: mirror, 8 hooks, storage bench and shoe cubby.',599,499,340,'c6','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',10,true,4.6,47),
  ('np092','Floating Shoe Cabinet — 4 Door','Wall-mounted shoe cabinet with flip-down doors. Holds 16 pairs. White gloss.',349,299,190,'c6','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',14,false,4.3,34),
  ('np093','Bench with Coat Rack Combo','Combined bench seat and overhead coat rack with 6 hooks. Solid pine.',299,249,160,'c6','{"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"}',16,false,4.2,29),
  ('np094','Umbrella & Walking Stick Stand','Decorative iron umbrella stand with drip tray. 20×20×60 cm.',89,null,45,'c6','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',30,false,4.0,22),
  ('np095','Narrow Chest of Drawers — Entryway','Slim 5-drawer chest 40×30×100 cm for entryways. White gloss finish.',299,249,160,'c6','{"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600"}',15,false,4.1,18),
  ('np096','Mail & Key Organiser Cabinet','Small wall-mounted cabinet with key hooks, mail slot and small shelf.',129,99,65,'c6','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',25,false,4.0,19),

-- ─── OUTDOOR — full range (c7) ──────────────────────────────

  ('np101','Hammock with Stand','Freestanding hammock with powder-coated steel stand. UV-resistant cotton. 200 kg capacity.',499,429,280,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',10,false,4.5,39),
  ('np102','Garden Bench — 2 Seater','Classic 2-seater garden bench in FSC-certified teak. 120×56×88 cm.',449,399,250,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',12,false,4.4,33),
  ('np103','Patio Dining Set — 4 Seater','4-piece outdoor dining set: table + 4 chairs. Aluminium frame, textilene fabric.',1299,1099,760,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',7,true,4.6,44),
  ('np104','Bistro Table & 2 Chairs','Compact bistro set for balconies. Folding chairs, round 60 cm table. Black steel.',349,299,190,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',15,false,4.3,38),
  ('np105','Outdoor Bar Set — Table & 4 Stools','Bar-height outdoor table 110 cm with 4 matching bar stools. Teak + steel.',1199,999,700,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',5,false,4.5,27),
  ('np106','Adirondack Chair — Set of 2','Classic Adirondack Muskoka chairs in weather-resistant HDPE. Set of 2.',699,599,400,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',10,false,4.6,41),
  ('np107','Swing Egg Chair — Hanging','Hanging rattan swing chair with cushion. Requires ceiling/beam mounting.',799,699,460,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',8,true,4.7,56),
  ('np108','Garden Storage Deck Box','Large waterproof deck box 550 L. Lockable. Stores cushions, tools, toys.',399,349,220,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',12,false,4.2,24),
  ('np109','Folding Picnic Table with 2 Benches','Portable picnic table with attached benches. Folds flat. Seats 6.',499,429,280,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',10,false,4.3,32),
  ('np110','Raised Garden Planter Bench','Garden bench with two built-in planter boxes at each end. Cedar wood.',299,249,160,'c7','{"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"}',14,false,4.2,17),

-- ─── HOME STUDY & LIBRARY (c8) — all new ────────────────────

  ('np121','Study Desk with Bookcase Hutch','Desk 140×60 cm with integrated bookcase hutch above. 4 shelves, 2 drawers.',799,699,460,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',10,true,4.6,54),
  ('np122','L-Shaped Home Office Desk','L-shaped desk 160×120 cm with CPU stand, drawer and cable management.',699,599,400,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',12,false,4.5,47),
  ('np123','Computer Desk with Drawers','Compact computer desk 120×60 cm with 3 drawers and keyboard tray.',449,399,250,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',18,false,4.3,39),
  ('np124','Writing / Secretary Desk','Classic secretary desk with fold-down writing surface and hidden compartments.',649,549,370,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',8,false,4.4,31),
  ('np125','Drafting Table / Drawing Desk','Adjustable-angle drafting table 120×80 cm with pencil ledge and side drawer.',599,499,340,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',7,false,4.3,24),
  ('np126','Library Bookcase — 6 Shelf','Tall bookcase 90×30×220 cm with 6 adjustable shelves. Solid oak.',599,499,340,'c8','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',14,false,4.5,49),
  ('np127','Rolling Library Ladder + 3m Rail','Wall-mounted rolling ladder system with 3m aluminium rail. Holds 120 kg.',899,799,520,'c8','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',5,false,4.7,22),
  ('np128','Ergonomic Home Study Chair','Mesh ergonomic chair with lumbar support, headrest and armrests. For home study.',499,429,280,'c8','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',20,true,4.6,87),
  ('np129','Wall-Mounted Fold-Down Desk','Space-saving fold-down wall desk 80×40 cm. Folds flush to wall when not in use.',299,249,160,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',15,false,4.2,38),
  ('np130','Monitor Stand with Drawer','Solid bamboo monitor stand raises screen 15 cm. Built-in drawer for stationery.',149,129,75,'c8','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',30,false,4.3,44),

-- ─── OFFICE CHAIRS — extended types (c10) ───────────────────

  ('np141','Drafting / Tall-Back Stool Chair','High-seat drafting chair with footring. Adjusts 60-82 cm. Mesh back.',449,399,250,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',15,false,4.3,36),
  ('np142','Kneeling Ergonomic Chair','Kneeling posture chair for active seating. Reduces lower-back strain.',299,249,160,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',18,false,4.1,29),
  ('np143','Saddle Chair — Adjustable','Saddle-seat chair with gas-lift adjustment 50-70 cm. No backrest. Promotes active posture.',349,299,190,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',14,false,4.0,22),
  ('np144','Gaming Chair — Racing Style','Racing-style gaming chair with recline to 180°, lumbar pillow and neck cushion.',699,599,400,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',20,true,4.5,118),
  ('np145','Heavy-Duty Bariatric Chair','Wide-seat office chair rated to 200 kg. Reinforced base, extra-wide seat 55 cm.',799,699,460,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',8,false,4.4,19),
  ('np146','Stackable Office Chair — Set of 4','Lightweight polypropylene stackable chairs. Set of 4. Holds up to 12 high.',599,499,340,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',10,false,4.0,27),
  ('np147','24-Hour Heavy-Duty Operator Chair','24/7 rated chair for shift work. Seat slides forward/back. Extra durable.',899,799,520,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',10,false,4.6,33),
  ('np148','Mesh Manager Chair — High Back','Elegant full-mesh high-back manager chair with synchro tilt and 3D armrests.',799,699,460,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',12,false,4.6,55),
  ('np149','Folding Chair — Set of 4','Padded folding chairs for training rooms and events. Set of 4, stackable to 8.',399,349,220,'c10','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',15,false,4.0,31),

-- ─── OFFICE DESKS — extended types (c11) ────────────────────

  ('np151','Corner Standing Desk — L-Shape Electric','L-shaped electric sit-stand desk 160×120 cm. Dual motor, 4 memory presets.',1999,1799,1150,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',6,true,4.8,47),
  ('np152','4-Person Cluster Workstation','Open-plan cluster workstation for 4 employees with privacy screens and cable ports.',2499,2199,1450,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',4,false,4.6,29),
  ('np153','Crank Sit-Stand Desk — Manual','Manual height-adjustable desk with crank mechanism. 140×70 cm.',799,699,460,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',10,false,4.3,38),
  ('np154','Manager Desk with Return','Manager desk 180×90 cm with right-hand return pedestal and 3 drawers.',1299,1099,760,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',7,false,4.5,41),
  ('np155','Computer Desk with Hutch Shelving','Desk 140×60 cm with overhead hutch: 3 shelves, 2 cupboards, wire ports.',699,599,400,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',12,false,4.3,36),
  ('np156','Benching Workstation — 6 Person','Linear benching system for 6 people. Comes with desktop dividers and cable tray.',2999,2699,1750,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',3,false,4.5,22),
  ('np157','Floating Wall-Mounted Office Desk','Wall-mounted desk 120×50 cm with 2 drawers. Saves floor space.',499,429,280,'c11','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',14,false,4.2,27),

-- ─── CONFERENCE & MEETING — extended (c12) ──────────────────

  ('np161','Flip-Top Nesting Training Table','Flip-top table 180×60 cm that nests for storage. Lockable castors.',699,599,400,'c12','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',10,false,4.3,26),
  ('np162','Modular Training Table Set of 4','Set of 4 trapezoid tables that combine into various configurations.',999,849,580,'c12','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',6,false,4.4,19),
  ('np163','Seminar Classroom Desk — Single','Single-person folding seminar desk with bookshelf underneath.',199,169,105,'c12','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',30,false,4.0,24),
  ('np164','Podium / Lectern — Wood','Solid wood speaking lectern with reading light, mic hole and shelf. 55×50×120 cm.',599,499,340,'c12','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',5,false,4.5,18),
  ('np165','Boardroom Credenza — 200cm','200 cm credenza behind the main conference table. 4 doors, top AV access.',1199,1049,700,'c12','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',4,false,4.6,16),

-- ─── OFFICE STORAGE — extended (c13) ────────────────────────

  ('np171','Locker Unit — 6 Door','Steel locker unit with 6 individual lockable compartments. H 180 × W 90 × D 45 cm.',799,699,460,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',8,false,4.3,22),
  ('np172','Locker Unit — 12 Door','12-door steel locker bank. Standard padlock compatible. H 180 × W 90 × D 45 cm.',1199,1049,700,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',5,false,4.4,15),
  ('np173','Tambour Sliding Door Cabinet','Compact office cabinet with tambour (roll-up) doors. 80×40×100 cm. Lockable.',699,599,400,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',8,false,4.2,18),
  ('np174','Wall-Mounted Shelving Unit','Industrial wall-mounted shelving 120×25 cm per shelf. Set of 5 shelves with brackets.',349,299,190,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',15,false,4.1,26),
  ('np175','Archive / Shelving Bay Unit','Heavy-duty shelving bay 90×45×200 cm with 5 adjustable shelves. 250 kg per shelf.',449,399,250,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',10,false,4.2,21),
  ('np176','Plan Chest — 5 Flat Drawers','Wide-format flat file chest for plans/drawings. 5 drawers, A1 size. Steel.',899,799,520,'c13','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',5,false,4.5,12),

-- ─── RECEPTION FURNITURE — extended (c14) ───────────────────

  ('np181','L-Shaped Reception Desk','L-shaped reception desk 200×160 cm with raised transaction counter. White gloss.',1899,1699,1100,'c14','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',4,true,4.7,31),
  ('np182','Reception Desk with LED Panel','Illuminated LED front reception desk 180×80 cm. Multiple backlight colours.',2199,1999,1300,'c14','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',3,false,4.8,24),
  ('np183','Reception Waiting Bench — 4 Seater','Metal-frame waiting bench with padded seat. 4 seats, 200 cm wide.',599,499,340,'c14','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',8,false,4.3,27),
  ('np184','Magazine / Literature Rack','Freestanding magazine rack with 8 pockets. Floor-standing. 30×25×120 cm.',199,169,105,'c14','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',20,false,4.1,19),
  ('np185','Coat & Umbrella Stand — Office','Heavy-base office coat stand with 8 coat hooks and 4 umbrella holders.',179,149,90,'c14','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',15,false,4.0,16),
  ('np186','Display / Brochure Stand','Rotating 8-pocket brochure display stand. Chrome finish. A4 size pockets.',249,219,130,'c14','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',12,false,4.1,11),

-- ─── OFFICE PARTITIONS (c15) — all new ──────────────────────

  ('np191','Single Acoustic Partition Panel','Height 180 cm × width 120 cm freestanding acoustic partition. Fabric-wrapped.',399,349,220,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',15,false,4.3,18),
  ('np192','Glass Partition Panel — Framed','Framed glass partition panel 120×200 cm. Aluminium profile, clear glazing.',699,599,400,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',10,false,4.5,22),
  ('np193','Glass Partition Panel — Frosted','Frosted glass partition for privacy. 120×200 cm. Aluminium profile.',799,699,460,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',10,false,4.4,19),
  ('np194','Double-Sided Whiteboard Partition','Partition with whiteboard on both sides. 120×180 cm. Magnetic surface.',599,499,340,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',8,false,4.3,14),
  ('np195','Full-Height Office Partition System','Floor-to-ceiling partition system, per panel 120 cm wide. Solid core infill.',899,799,520,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',6,false,4.5,11),
  ('np196','Modular Cubicle Workstation','Complete 4-person cubicle pod with 120 cm high dividers and cable management.',3499,3099,2050,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',3,true,4.6,28),
  ('np197','Privacy Screen — Desk Clamp','Desktop privacy screen 60×40 cm, clamp-mounted. Acoustic foam core.',149,129,75,'c15','{"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"}',30,false,4.2,35),
  ('np198','Freestanding Room Divider — Wooden','3-panel wooden bi-fold room divider. Each panel 60×180 cm. Natural oak.',499,429,280,'c15','{"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600"}',10,false,4.3,29),

-- ─── BREAKROOM & CANTEEN (c16) — all new ────────────────────

  ('np201','Breakroom Table & 4 Chairs Set','Round breakroom table 90 cm with 4 matching chairs. Wipe-clean surface.',699,599,400,'c16','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',10,false,4.4,27),
  ('np202','High Canteen Counter Table','Bar-height canteen table 120×60×105 cm with 4 bar stools. Easy-clean laminate.',899,799,520,'c16','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',7,false,4.3,19),
  ('np203','Cafeteria Bench Table Set','Long bench-table set 180 cm with 2 benches. Seats 8. Heavy-duty steel frame.',1199,1049,700,'c16','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',5,false,4.4,15),
  ('np204','Breakroom Lounge Chair','Single upholstered lounge chair for staff break areas. Wipe-clean vinyl.',399,349,220,'c16','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',12,false,4.2,22),
  ('np205','Breakroom Sofa — 2 Seater','2-seater sofa in durable wipe-clean fabric for staff rooms.',599,499,340,'c16','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',8,false,4.3,18),
  ('np206','Canteen Stool — Set of 4','Backless canteen stools, height 45 cm, polypropylene seat, steel legs. Set of 4.',349,299,190,'c16','{"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"}',15,false,4.0,24),
  ('np207','Vending Area Bench — 3 Seater','3-seater bench for vending / coffee station areas. Steel frame, vinyl cushion.',449,399,250,'c16','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"}',10,false,4.1,14),
  ('np208','Portable Folding Table — Lightweight','Lightweight folding table 180×75 cm. Polyethylene top. For canteen/events.',299,249,160,'c16','{"https://images.unsplash.com/photo-1549497538-303791108f95?w=600"}',18,false,4.1,21)

on conflict (id) do nothing;
