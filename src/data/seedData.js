// ─── CATEGORIES ──────────────────────────────────────────────
// section: 'home' | 'office' | 'other'

export const SEED_CATEGORIES = [
  // Home Furniture
  { id: 'c1',  name: 'Living Room',          icon: 'home-outline',          section: 'home' },
  { id: 'c2',  name: 'Bedroom',              icon: 'bed-outline',           section: 'home' },
  { id: 'c3',  name: 'Dining Room',          icon: 'restaurant-outline',    section: 'home' },
  { id: 'c4',  name: 'Wardrobe & Almari',    icon: 'cube-outline',          section: 'home' },
  { id: 'c5',  name: 'Kids Room',            icon: 'happy-outline',         section: 'home' },
  { id: 'c6',  name: 'Entryway & Foyer',     icon: 'walk-outline',          section: 'home' },
  { id: 'c7',  name: 'Outdoor',              icon: 'leaf-outline',          section: 'other' },
  // Office Furniture
  { id: 'c10', name: 'Office Chairs',        icon: 'accessibility-outline', section: 'office' },
  { id: 'c11', name: 'Office Desks',         icon: 'desktop-outline',       section: 'office' },
  { id: 'c12', name: 'Conference & Meeting', icon: 'people-outline',        section: 'office' },
  { id: 'c13', name: 'Office Storage',       icon: 'archive-outline',       section: 'office' },
  { id: 'c14', name: 'Reception Furniture',  icon: 'business-outline',      section: 'office' },
];

export const SEED_BANNERS = [
  {
    id: 'b1',
    title: 'Summer Sale - Up to 40% Off',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    targetCategoryId: 'c1',
  },
  {
    id: 'b2',
    title: 'New Bedroom Collection',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    targetCategoryId: 'c2',
  },
  {
    id: 'b3',
    title: 'Complete Office Setup Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    targetCategoryId: 'c10',
  },
  {
    id: 'b4',
    title: 'Kids Room Makeover - 30% Off',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    targetCategoryId: 'c5',
  },
  {
    id: 'b5',
    title: 'Outdoor Living at Its Finest',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
    targetCategoryId: 'c7',
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────
// vendorPrice: cost price (admin-only, for profit calculation)
// price: retail price shown to users

export const SEED_PRODUCTS = [
  // ── LIVING ROOM (c1) ──
  { id: 'p1',  name: 'Nordic Sofa 3-Seater',    description: 'Premium Nordic-style 3-seater sofa with solid wood legs and high-density foam cushions.', price: 363500, discountedPrice: 279500,  vendorPrice: 201500,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 15, isFeatured: true,  rating: 4.5, reviewCount: 128 },
  { id: 'p2',  name: 'L-Shaped Sectional Sofa', description: 'Large L-shaped sectional sofa, perfect for spacious living rooms. Removable covers.',      price: 531500, discountedPrice: 447500, vendorPrice: 308000, categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600'], stock: 8,  isFeatured: true,  rating: 4.3, reviewCount: 74 },
  { id: 'p3',  name: 'Loveseat Sofa',           description: 'Compact loveseat ideal for small spaces. Velvet upholstery with button tufting.',           price: 195500,  discountedPrice: null, vendorPrice: 117500,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 20, isFeatured: false, rating: 4.1, reviewCount: 45 },
  { id: 'p4',  name: 'Recliner Sofa - Single',  description: 'Electric recliner sofa with USB charging port and cup holder. Premium leather.',            price: 307500, discountedPrice: 251500,  vendorPrice: 179000,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 10, isFeatured: false, rating: 4.6, reviewCount: 89 },
  { id: 'p5',  name: 'Minimalist Coffee Table', description: 'Sleek coffee table with tempered glass top and solid oak base. 120×60×45 cm.',              price: 125500,  discountedPrice: null, vendorPrice: 73000,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], stock: 22, isFeatured: true,  rating: 4.2, reviewCount: 64 },
  { id: 'p6',  name: 'TV Unit - 180cm',         description: 'Modern floating TV unit with cable management, 2 drawers and open shelving.',               price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 18, isFeatured: false, rating: 4.0, reviewCount: 37 },
  { id: 'p7',  name: 'Bookshelf 5-Tier',        description: 'Spacious 5-tier bookshelf in white finish. 80×30×180 cm. Easy assembly.',                   price: 83500,  discountedPrice: null, vendorPrice: 47500,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 40, isFeatured: false, rating: 4.0, reviewCount: 48 },
  { id: 'p8',  name: 'Accent Chair - Velvet',   description: 'Stylish accent chair in jewel-toned velvet with gold-finish legs.',                         price: 109000,  discountedPrice: 92000,  vendorPrice: 61500,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 14, isFeatured: false, rating: 4.4, reviewCount: 52 },
  { id: 'p9',  name: 'Ottoman / Pouffe',        description: 'Round upholstered ottoman, doubles as a footrest or extra seating. Removable tray top.',    price: 69500,  discountedPrice: 55500,  vendorPrice: 36500,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 25, isFeatured: false, rating: 4.1, reviewCount: 33 },
  { id: 'p10', name: 'Side Table - Marble Top', description: 'Elegant side table with genuine marble top and brushed brass frame.',                       price: 55500,  discountedPrice: null, vendorPrice: 31000,  categoryId: 'c1',  images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], stock: 30, isFeatured: false, rating: 4.2, reviewCount: 28 },

  // ── BEDROOM (c2) ──
  { id: 'p11', name: 'King Bed Frame - Walnut',    description: 'Elegant king-size (180×200 cm) bed frame in walnut finish. Slatted base included.',    price: 251500,  discountedPrice: 209500,  vendorPrice: 145500,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 8,  isFeatured: true,  rating: 4.7, reviewCount: 95 },
  { id: 'p12', name: 'Queen Bed Frame - Grey Oak', description: 'Modern queen-size (160×200 cm) upholstered bed frame with storage headboard.',         price: 209500,  discountedPrice: 181500,  vendorPrice: 123000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 12, isFeatured: true,  rating: 4.5, reviewCount: 67 },
  { id: 'p13', name: 'Single Bed Frame - White',   description: 'Clean-lined single bed (90×200 cm) in white lacquer. Suitable for kids and guests.',   price: 125500,  discountedPrice: null, vendorPrice: 70000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 20, isFeatured: false, rating: 4.2, reviewCount: 41 },
  { id: 'p14', name: 'Storage Bed - King Size',    description: 'King-size bed with 4 large hydraulic lift storage drawers underneath.',                price: 335500, discountedPrice: 279500,  vendorPrice: 199000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 6,  isFeatured: false, rating: 4.6, reviewCount: 58 },
  { id: 'p15', name: 'Dressing Table with Mirror', description: 'White dressing table with large tri-fold mirror, 3 drawers and cushioned stool.',      price: 153500,  discountedPrice: 125500,  vendorPrice: 87000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 10, isFeatured: false, rating: 4.3, reviewCount: 44 },
  { id: 'p16', name: 'Bedside Table - Set of 2',   description: 'Matching pair of bedside tables with 1 drawer each. Compact design.',                  price: 97500,  discountedPrice: 78000,  vendorPrice: 53000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 18, isFeatured: false, rating: 4.3, reviewCount: 56 },
  { id: 'p17', name: 'Chest of Drawers - 6 Drawer','description': 'Solid wood chest with 6 deep drawers, soft-close mechanism.',                        price: 139500,  discountedPrice: null, vendorPrice: 81000,  categoryId: 'c2',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 15, isFeatured: false, rating: 4.1, reviewCount: 29 },

  // ── DINING ROOM (c3) ──
  { id: 'p21', name: 'Dining Table 2-Seater - Round', description: 'Compact round dining table for 2. Solid oak. 80 cm diameter.',                     price: 97500,  discountedPrice: null, vendorPrice: 56000,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 15, isFeatured: false, rating: 4.0, reviewCount: 22 },
  { id: 'p22', name: 'Dining Table Set 4-Seater',     description: '4-seater dining table with 4 matching chairs. Mango wood construction.',            price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 10, isFeatured: true,  rating: 4.4, reviewCount: 58 },
  { id: 'p23', name: 'Dining Table Set 6-Seater',     description: '6-seater solid wood dining table with chairs. 180×90 cm.',                          price: 447500, discountedPrice: 363500, vendorPrice: 260500,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 5,  isFeatured: true,  rating: 4.4, reviewCount: 72 },
  { id: 'p24', name: 'Dining Table Set 8-Seater',     description: 'Extendable 8-seater dining table (extends from 180 to 240 cm) with 8 chairs.',     price: 615500, discountedPrice: 531500, vendorPrice: 364000, categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 4,  isFeatured: false, rating: 4.5, reviewCount: 34 },
  { id: 'p25', name: 'Dining Chair - Set of 6',       description: 'Set of 6 upholstered dining chairs with solid beech legs.',                         price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 12, isFeatured: false, rating: 4.3, reviewCount: 47 },
  { id: 'p26', name: 'Bar Stool - Set of 2',          description: 'Counter-height bar stools (65 cm) with swivel seat and footrest.',                  price: 83500,  discountedPrice: 69500,  vendorPrice: 45000,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 20, isFeatured: false, rating: 4.1, reviewCount: 31 },
  { id: 'p27', name: 'Sideboard / Buffet Cabinet',    description: 'Modern sideboard with 2 doors and 3 drawers. Ideal for dining room storage.',       price: 195500,  discountedPrice: 167500,  vendorPrice: 112000,  categoryId: 'c3',  images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=600'], stock: 8,  isFeatured: false, rating: 4.2, reviewCount: 26 },

  // ── WARDROBE & ALMARI (c4) ──
  { id: 'p31', name: 'Sliding Door Wardrobe 2-Door', description: 'Sleek 2-door sliding wardrobe with mirror panels. H 220 × W 150 × D 60 cm.',         price: 251500,  discountedPrice: 209500,  vendorPrice: 145500,  categoryId: 'c4',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 8,  isFeatured: true,  rating: 4.5, reviewCount: 63 },
  { id: 'p32', name: 'Hinged Wardrobe 3-Door',       description: '3-door wardrobe with internal hanging rail, shelves and 2 drawers.',                  price: 307500, discountedPrice: 251500,  vendorPrice: 179000,  categoryId: 'c4',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 6,  isFeatured: false, rating: 4.3, reviewCount: 41 },
  { id: 'p33', name: 'Hinged Wardrobe 4-Door',       description: 'Large 4-door wardrobe, full-length mirror on 2 doors. H 220 × W 200 × D 60 cm.',    price: 419500, discountedPrice: 363500, vendorPrice: 246500,  categoryId: 'c4',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 5,  isFeatured: false, rating: 4.4, reviewCount: 38 },
  { id: 'p34', name: 'Walk-In Closet System',        description: 'Modular walk-in closet: 3 hanging rails, 10 shelves, 4 drawers.',                     price: 699500, discountedPrice: 587500, vendorPrice: 420000, categoryId: 'c4',  images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'], stock: 3,  isFeatured: false, rating: 4.7, reviewCount: 25 },
  { id: 'p35', name: 'Kids Wardrobe - 2 Door',       description: 'Colourful 2-door wardrobe for kids with interior mirror and removable shelf.',        price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c4',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 10, isFeatured: false, rating: 4.2, reviewCount: 29 },

  // ── KIDS ROOM (c5) ──
  { id: 'p41', name: 'Bunk Bed with Ladder',         description: 'Solid pine bunk bed (90×200 cm each bunk) with safety rails and wooden ladder.',     price: 195500,  discountedPrice: 167500,  vendorPrice: 112000,  categoryId: 'c5',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 10, isFeatured: true,  rating: 4.6, reviewCount: 82 },
  { id: 'p42', name: 'Loft Bed with Study Area',     description: 'Loft bed with built-in desk and shelving underneath. Ideal for small rooms.',         price: 251500,  discountedPrice: 223500,  vendorPrice: 145500,  categoryId: 'c5',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 7,  isFeatured: false, rating: 4.5, reviewCount: 54 },
  { id: 'p43', name: 'Kids Single Bed - Cars Theme', description: 'Fun car-shaped single bed for toddlers and young children. Safe rounded edges.',      price: 111500,  discountedPrice: 97500,  vendorPrice: 61500,  categoryId: 'c5',  images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600'], stock: 12, isFeatured: false, rating: 4.4, reviewCount: 66 },
  { id: 'p44', name: 'Kids Study Table & Chair',     description: 'Adjustable height study table with chair. Ergonomic design for growing children.',    price: 97500,  discountedPrice: 83500,  vendorPrice: 53000,  categoryId: 'c5',  images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 15, isFeatured: false, rating: 4.3, reviewCount: 48 },
  { id: 'p45', name: 'Toy Storage Unit',             description: 'Colourful toy storage unit with 9 removable fabric bins. Easy assembly.',             price: 69500,  discountedPrice: 55500,  vendorPrice: 36500,  categoryId: 'c5',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 20, isFeatured: false, rating: 4.2, reviewCount: 37 },

  // ── ENTRYWAY & FOYER (c6) ──
  { id: 'p51', name: 'Shoe Rack - 4 Tier',           description: '4-tier shoe rack holding up to 16 pairs. Compact metal frame with wooden shelves.',   price: 41500,  discountedPrice: 33500,  vendorPrice: 22500,   categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 30, isFeatured: false, rating: 4.0, reviewCount: 44 },
  { id: 'p52', name: 'Console Table - Slim',         description: 'Slim console table 120×30×80 cm. Perfect for narrow entryways. 1 drawer.',            price: 78000,  discountedPrice: null, vendorPrice: 42000,  categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], stock: 18, isFeatured: false, rating: 4.2, reviewCount: 31 },
  { id: 'p53', name: 'Coat & Hat Stand',             description: 'Free-standing coat stand with 8 hooks and umbrella holder. Solid wood.',              price: 36000,  discountedPrice: 30500,  vendorPrice: 18000,   categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 25, isFeatured: false, rating: 4.1, reviewCount: 22 },
  { id: 'p54', name: 'Hallway Storage Bench',        description: 'Entryway bench with shoe storage underneath and coat hooks above.',                   price: 97500,  discountedPrice: 83500,  vendorPrice: 56000,  categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], stock: 12, isFeatured: false, rating: 4.4, reviewCount: 38 },
  { id: 'p55', name: 'Wall-Mounted Key Organizer',   description: 'Decorative wall-mounted key holder with 6 hooks and mail shelf. Bamboo.',             price: 22000,   discountedPrice: null, vendorPrice: 11000,   categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 50, isFeatured: false, rating: 3.9, reviewCount: 18 },
  { id: 'p56', name: 'Umbrella Stand - Metal',       description: 'Modern cylindrical umbrella stand in matte black. Drip tray included.',               price: 27500,   discountedPrice: 22000,   vendorPrice: 14000,   categoryId: 'c6',  images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 35, isFeatured: false, rating: 4.0, reviewCount: 15 },

  // ── OUTDOOR (c7) ──
  { id: 'p61', name: 'Outdoor Lounge Set',           description: 'Weather-resistant 4-piece outdoor lounge set with UV-resistant cushions.',            price: 503500, discountedPrice: 419500, vendorPrice: 294000, categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 10, isFeatured: true,  rating: 4.8, reviewCount: 39 },
  { id: 'p62', name: 'Garden Dining Table 6-Seater', description: 'Teak garden dining table with 6 chairs. Fully weather-resistant.',                   price: 643500, discountedPrice: 559500, vendorPrice: 378000, categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 5,  isFeatured: false, rating: 4.6, reviewCount: 27 },
  { id: 'p63', name: 'Sun Lounger - Set of 2',       description: 'Adjustable reclining sun loungers with cushions. Aluminium frame.',                   price: 195500,  discountedPrice: 167500,  vendorPrice: 112000,  categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 8,  isFeatured: false, rating: 4.5, reviewCount: 33 },
  { id: 'p64', name: 'Garden Swing Bench',           description: '3-seater garden swing with canopy top. Powder-coated steel frame.',                   price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 6,  isFeatured: false, rating: 4.3, reviewCount: 21 },
  { id: 'p65', name: 'Outdoor Bar Cart',             description: 'Rolling outdoor bar cart with 2 tiers. Rust-resistant with wooden accents.',           price: 97500,  discountedPrice: 83500,  vendorPrice: 53000,  categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 12, isFeatured: false, rating: 4.2, reviewCount: 16 },
  { id: 'p66', name: 'Patio Umbrella - 3m',          description: 'Large 3-meter tilting patio umbrella with crank. UV50+ protection.',                  price: 55500,  discountedPrice: 47500,  vendorPrice: 28000,  categoryId: 'c7',  images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600'], stock: 20, isFeatured: false, rating: 4.4, reviewCount: 28 },

  // ── OFFICE CHAIRS (c10) ──
  { id: 'p71', name: 'Executive Leather Chair',     description: 'High-back executive chair in genuine leather with armrests, lumbar support and tilt.',  price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 20, isFeatured: true,  rating: 4.7, reviewCount: 115 },
  { id: 'p72', name: 'Ergonomic Mesh Chair',        description: 'Full-mesh ergonomic chair with adjustable lumbar, headrest and 4D armrests.',           price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 30, isFeatured: true,  rating: 4.6, reviewCount: 210 },
  { id: 'p73', name: 'Task Chair - Mid Back',       description: 'Comfortable mid-back task chair with breathable fabric and height adjustment.',          price: 83500,  discountedPrice: 69500,  vendorPrice: 45000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 40, isFeatured: false, rating: 4.3, reviewCount: 88 },
  { id: 'p74', name: 'Visitor Chair - Set of 2',   description: 'Stackable visitor chairs with padded seat and chrome legs. Set of 2.',                   price: 69500,  discountedPrice: null, vendorPrice: 36500,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 25, isFeatured: false, rating: 4.1, reviewCount: 44 },
  { id: 'p75', name: 'Conference Chair - Mesh',     description: 'Breathable mesh conference chair with armrests. Sold per chair.',                        price: 97500,  discountedPrice: 83500,  vendorPrice: 53000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 50, isFeatured: false, rating: 4.4, reviewCount: 67 },
  { id: 'p76', name: 'Reception Waiting Chair',     description: 'Fabric reception chair with chrome legs. Suitable for lobbies and waiting areas.',       price: 55500,  discountedPrice: 47500,  vendorPrice: 28000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 30, isFeatured: false, rating: 4.0, reviewCount: 29 },
  { id: 'p77', name: 'Office Lounge Chair',         description: 'Stylish office lounge chair for break rooms. Egg-pod design in fabric.',                price: 139500,  discountedPrice: 120000,  vendorPrice: 78500,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 10, isFeatured: false, rating: 4.5, reviewCount: 38 },
  { id: 'p78', name: 'Drafting Chair - Tall',       description: 'Tall drafting chair with foot ring and adjustable height (55-75 cm). Mesh back.',       price: 111500,  discountedPrice: 97500,  vendorPrice: 61500,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 15, isFeatured: false, rating: 4.2, reviewCount: 24 },
  { id: 'p79', name: 'Gaming Chair - Pro',          description: 'High-back gaming chair with headrest pillow, lumbar cushion and 180° recline.',         price: 153500,  discountedPrice: 134000,  vendorPrice: 87000,  categoryId: 'c10', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 18, isFeatured: false, rating: 4.6, reviewCount: 95 },

  // ── OFFICE DESKS (c11) ──
  { id: 'p81', name: 'Executive Desk - 180cm',      description: 'Large executive desk with leather inlay top, 3 drawers and cable grommets.',            price: 363500, discountedPrice: 307500, vendorPrice: 213000,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 8,  isFeatured: true,  rating: 4.7, reviewCount: 72 },
  { id: 'p82', name: 'Standing Desk - Electric',    description: 'Electric sit-stand desk 160×80 cm. Height range 70–120 cm. Memory presets.',            price: 419500, discountedPrice: 363500, vendorPrice: 246500,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 10, isFeatured: true,  rating: 4.8, reviewCount: 134 },
  { id: 'p83', name: 'L-Shaped Desk - Corner',      description: 'L-shaped corner desk 160×120 cm with integrated cable management tray.',                price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 12, isFeatured: false, rating: 4.5, reviewCount: 91 },
  { id: 'p84', name: 'Computer Desk - 120cm',       description: 'Simple computer desk 120×60 cm with monitor shelf and keyboard tray.',                  price: 97500,  discountedPrice: 83500,  vendorPrice: 53000,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 25, isFeatured: false, rating: 4.2, reviewCount: 55 },
  { id: 'p85', name: 'Writing Desk - Minimalist',   description: 'Minimalist writing desk 100×50 cm, solid oak legs, no drawers.',                       price: 83500,  discountedPrice: null, vendorPrice: 45000,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 20, isFeatured: false, rating: 4.1, reviewCount: 33 },
  { id: 'p86', name: 'Double Workstation Desk',     description: 'Back-to-back workstation for 2 employees with privacy screen and cable ports.',          price: 279500,  discountedPrice: 237500,  vendorPrice: 162500,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 6,  isFeatured: false, rating: 4.4, reviewCount: 47 },
  { id: 'p87', name: 'Compact Laptop Desk',         description: 'Foldable laptop desk 80×40 cm. Perfect for home offices. Adjustable height.',           price: 55500,  discountedPrice: 47500,  vendorPrice: 28000,  categoryId: 'c11', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 35, isFeatured: false, rating: 4.0, reviewCount: 42 },

  // ── CONFERENCE & MEETING (c12) ──
  { id: 'p91', name: 'Meeting Table - 4 Seater',   description: 'Oval meeting table 140×80 cm with central cable management port.',                       price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 8,  isFeatured: false, rating: 4.4, reviewCount: 31 },
  { id: 'p92', name: 'Meeting Table - 6 Seater',   description: 'Rectangular conference table 180×90 cm with built-in power outlets.',                    price: 335500, discountedPrice: 279500,  vendorPrice: 196000,  categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 6,  isFeatured: true,  rating: 4.6, reviewCount: 48 },
  { id: 'p93', name: 'Meeting Table - 8 Seater',   description: 'Conference table 240×100 cm with cable tray. Veneer top, solid steel legs.',             price: 475500, discountedPrice: 419500, vendorPrice: 280000, categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 4,  isFeatured: false, rating: 4.5, reviewCount: 36 },
  { id: 'p94', name: 'Meeting Table - 10 Seater',  description: 'Large boardroom table 300×110 cm. Power module with USB, HDMI and power ports.',         price: 699500, discountedPrice: 615500, vendorPrice: 420000, categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 3,  isFeatured: false, rating: 4.7, reviewCount: 22 },
  { id: 'p95', name: 'Meeting Table - 12 Seater',  description: 'Executive boardroom table 360×120 cm with inbuilt cable management system.',              price: 923500, discountedPrice: 811500, vendorPrice: 546000, categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 2,  isFeatured: false, rating: 4.8, reviewCount: 15 },
  { id: 'p96', name: 'Conference Chair Set of 6',  description: 'Set of 6 mesh conference chairs with castors and height adjustment.',                     price: 279500,  discountedPrice: 237500,  vendorPrice: 162500,  categoryId: 'c12', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'], stock: 8,  isFeatured: false, rating: 4.4, reviewCount: 41 },
  { id: 'p97', name: 'Whiteboard Stand - Mobile',  description: 'Double-sided mobile whiteboard 120×90 cm with marker tray. Lockable wheels.',            price: 97500,  discountedPrice: 83500,  vendorPrice: 53000,  categoryId: 'c12', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 15, isFeatured: false, rating: 4.1, reviewCount: 19 },

  // ── OFFICE STORAGE (c13) ──
  { id: 'p101', name: 'Filing Cabinet - 2 Drawer',  description: 'Steel 2-drawer lateral filing cabinet with lock. A4/Letter size.',                     price: 83500,  discountedPrice: 69500,  vendorPrice: 45000,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 20, isFeatured: false, rating: 4.1, reviewCount: 38 },
  { id: 'p102', name: 'Filing Cabinet - 4 Drawer',  description: 'Vertical 4-drawer filing cabinet with central lock and anti-tilt system.',              price: 125500,  discountedPrice: 111500,  vendorPrice: 70000,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 15, isFeatured: false, rating: 4.3, reviewCount: 52 },
  { id: 'p103', name: 'Office Bookshelf - 5 Tier',  description: 'Open-plan office bookshelf 90×30×200 cm. Black powder-coated steel.',                  price: 78000,  discountedPrice: null, vendorPrice: 42000,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 25, isFeatured: false, rating: 4.0, reviewCount: 29 },
  { id: 'p104', name: 'Storage Cabinet with Doors', description: 'Tall office cabinet 80×40×200 cm with lockable doors and 4 adjustable shelves.',        price: 139500,  discountedPrice: 120000,  vendorPrice: 78500,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 10, isFeatured: false, rating: 4.2, reviewCount: 34 },
  { id: 'p105', name: 'Credenza / Side Cabinet',    description: 'Executive credenza 150×45×75 cm with 3 doors and 3 drawers. Walnut veneer.',            price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 7,  isFeatured: false, rating: 4.5, reviewCount: 27 },
  { id: 'p106', name: 'Mobile Pedestal - 3 Drawer', description: 'Lockable under-desk pedestal with 2 box drawers and 1 file drawer. Castors.',          price: 69500,  discountedPrice: 55500,  vendorPrice: 36500,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 30, isFeatured: false, rating: 4.2, reviewCount: 43 },
  { id: 'p107', name: 'Locker Unit - 6 Door',       description: '6-door steel locker for employee belongings. Ventilation slots on each door.',          price: 167500,  discountedPrice: 153500,  vendorPrice: 95000,  categoryId: 'c13', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 8,  isFeatured: false, rating: 4.0, reviewCount: 17 },

  // ── RECEPTION FURNITURE (c14) ──
  { id: 'p111', name: 'Reception Desk - Curved',      description: 'Curved front reception desk 200×80 cm with transaction counter and cable port.',     price: 419500, discountedPrice: 363500, vendorPrice: 246500,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 5,  isFeatured: true,  rating: 4.7, reviewCount: 44 },
  { id: 'p112', name: 'Reception Desk - Straight',    description: 'Straight reception desk 160×70 cm with high panel front and storage pedestal.',      price: 307500, discountedPrice: 265500,  vendorPrice: 179000,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 6,  isFeatured: false, rating: 4.5, reviewCount: 31 },
  { id: 'p113', name: 'Waiting Area Sofa - 2 Seater', description: '2-seater waiting area sofa in faux leather. Ideal for office lobbies.',              price: 167500,  discountedPrice: 139500,  vendorPrice: 95000,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 10, isFeatured: false, rating: 4.3, reviewCount: 38 },
  { id: 'p114', name: 'Waiting Area Sofa - 3 Seater', description: '3-seater reception sofa with chrome legs and premium fabric upholstery.',            price: 223500,  discountedPrice: 195500,  vendorPrice: 129000,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'], stock: 8,  isFeatured: false, rating: 4.4, reviewCount: 42 },
  { id: 'p115', name: 'Reception Coffee Table',       description: 'Low coffee table 100×50×40 cm for reception/waiting areas. Tempered glass top.',     price: 83500,  discountedPrice: 69500,  vendorPrice: 45000,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600'], stock: 15, isFeatured: false, rating: 4.2, reviewCount: 24 },
  { id: 'p116', name: 'Magazine Rack Stand',           description: 'Floor-standing magazine/brochure rack with 10 pockets. Ideal for waiting rooms.',    price: 41500,  discountedPrice: 36000,  vendorPrice: 21000,   categoryId: 'c14', images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600'], stock: 20, isFeatured: false, rating: 3.9, reviewCount: 13 },
  { id: 'p117', name: 'Visitor Sign-In Podium',        description: 'Wooden reception sign-in podium with lockable storage and sloped top.',              price: 111500,  discountedPrice: 97500,  vendorPrice: 61500,  categoryId: 'c14', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'], stock: 5,  isFeatured: false, rating: 4.1, reviewCount: 9 },
  { id: 'p_rem_1', name: 'Premium Edition Office Chair 1', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 80493, discountedPrice: 75493, vendorPrice: 60493, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_2', name: 'Premium Edition Office Chair 2', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 72010, discountedPrice: 67010, vendorPrice: 52010, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_3', name: 'Premium Edition Office Chair 3', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 95029, discountedPrice: 90029, vendorPrice: 75029, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_4', name: 'Premium Edition Office Chair 4', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 72274, discountedPrice: 67274, vendorPrice: 52274, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_5', name: 'Premium Edition Office Chair 5', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 85486, discountedPrice: 80486, vendorPrice: 65486, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_6', name: 'Premium Edition Office Chair 6', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 78771, discountedPrice: 73771, vendorPrice: 58771, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_7', name: 'Premium Edition Office Chair 7', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 54099, discountedPrice: 49099, vendorPrice: 34099, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_8', name: 'Premium Edition Office Chair 8', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 59249, discountedPrice: 54249, vendorPrice: 39249, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_9', name: 'Premium Edition Office Chair 9', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 91970, discountedPrice: 86970, vendorPrice: 71970, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_10', name: 'Premium Edition Office Chair 10', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 87109, discountedPrice: 82109, vendorPrice: 67109, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_11', name: 'Premium Edition Office Chair 11', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 67648, discountedPrice: 62648, vendorPrice: 47648, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_12', name: 'Premium Edition Office Chair 12', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 88944, discountedPrice: 83944, vendorPrice: 68944, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_13', name: 'Premium Edition Office Chair 13', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 68060, discountedPrice: 63060, vendorPrice: 48060, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_14', name: 'Premium Edition Office Chair 14', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 74315, discountedPrice: 69315, vendorPrice: 54315, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_15', name: 'Premium Edition Office Chair 15', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 74709, discountedPrice: 69709, vendorPrice: 54709, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_16', name: 'Premium Edition Office Chair 16', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 89912, discountedPrice: 84912, vendorPrice: 69912, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_17', name: 'Premium Edition Office Chair 17', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 57538, discountedPrice: 52538, vendorPrice: 37538, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
  { id: 'p_rem_18', name: 'Premium Edition Office Chair 18', description: 'High-quality ergonomic office chair ensuring comfort for long hours.', price: 56936, discountedPrice: 51936, vendorPrice: 36936, categoryId: 'c10', images: [], stock: 20, isFeatured: false, rating: 4.5, reviewCount: 15 },
];

export const SEED_USERS = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'user@mf.com',
    password: 'user123',
    phone: '+1 555-0100',
    address: '123 Main St, New York, NY 10001',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@mf.com',
    password: 'admin123',
    phone: '+1 555-0200',
    address: '456 Admin Ave, New York, NY 10002',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
];
