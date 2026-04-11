/**
 * Seed the full furniture catalog into Supabase.
 *
 * Run with:  node scripts/seed-catalog.js
 *
 * Authenticates as admin user to bypass RLS, then upserts
 * all categories, banners, and products.
 */

const { createClient } = require('@supabase/supabase-js');
const { SEED_CATEGORIES, SEED_BANNERS, SEED_PRODUCTS } = require('../src/data/seedData');

const SUPABASE_URL = 'https://ewlpwjkhuustiljvcdtn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHB3amtodXVzdGlsanZjZHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTQ2OTksImV4cCI6MjA5MTA3MDY5OX0.T7FfvFm5ZyQ86fGr0mqYrN2R6wrLb6zUGiugo31RAD4';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log('🌱 Starting full catalog seed...\n');

  // Authenticate as the admin user
  console.log('🔐 Authenticating as admin...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@mf.com',
    password: 'admin123',
  });

  if (authError) {
    console.error('❌ Admin login failed:', authError.message);
    console.log('\n   Make sure admin@mf.com / admin123 exists in Supabase Auth.');
    console.log('   Alternative: Set SUPABASE_SERVICE_ROLE_KEY env var to bypass RLS.\n');
    process.exit(1);
  }
  console.log('   ✅ Logged in as', authData.user.email);

  // ─── STEP 1: Add missing columns via SQL if possible ────────────
  // NOTE: Column creation requires Postgres admin rights (not available via anon/authenticated key).
  //       If 'section' and 'vendor_price' columns don't exist, you must run the migration SQL
  //       in the Supabase Dashboard > SQL Editor first.

  // ─── STEP 2: Upsert categories ─────────────────────────────────
  console.log(`\n📁 Upserting ${SEED_CATEGORIES.length} categories...`);
  
  // Try with section column first
  let catSuccess = false;
  const catPayloadFull = SEED_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    section: c.section || 'home',
  }));

  let { error: catError } = await supabase
    .from('categories')
    .upsert(catPayloadFull, { onConflict: 'id' });

  if (catError && catError.message.includes('section')) {
    console.log('   ⚠️  "section" column not found. Upserting without it...');
    const catPayloadSimple = SEED_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
    }));
    const result = await supabase.from('categories').upsert(catPayloadSimple, { onConflict: 'id' });
    catError = result.error;
  }

  if (catError) {
    console.error('   ❌ Category error:', catError.message);
  } else {
    catSuccess = true;
    console.log('   ✅ All categories upserted');
  }

  // ─── STEP 3: Upsert banners ────────────────────────────────────
  console.log(`\n🖼️  Upserting ${SEED_BANNERS.length} banners...`);
  const banPayload = SEED_BANNERS.map((b) => ({
    id: b.id,
    title: b.title,
    image_url: b.imageUrl,
    target_category_id: b.targetCategoryId || null,
  }));

  const { error: banError } = await supabase
    .from('banners')
    .upsert(banPayload, { onConflict: 'id' });

  if (banError) {
    console.error('   ❌ Banner error:', banError.message);
  } else {
    console.log('   ✅ All banners upserted');
  }

  // ─── STEP 4: Upsert products ───────────────────────────────────
  console.log(`\n📦 Upserting ${SEED_PRODUCTS.length} products...`);
  
  let useVendorPrice = true;
  const BATCH_SIZE = 20;
  let prodSuccessCount = 0;
  let prodErrorCount = 0;

  const mapProduct = (p, includeVP) => {
    const obj = {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      discounted_price: p.discountedPrice || null,
      category_id: p.categoryId,
      images: p.images,
      stock: p.stock,
      is_featured: p.isFeatured,
      rating: p.rating,
      review_count: p.reviewCount,
    };
    if (includeVP) obj.vendor_price = p.vendorPrice || null;
    return obj;
  };

  for (let i = 0; i < SEED_PRODUCTS.length; i += BATCH_SIZE) {
    const batch = SEED_PRODUCTS.slice(i, i + BATCH_SIZE).map((p) => mapProduct(p, useVendorPrice));
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'id' });

    if (error) {
      if (error.message.includes('vendor_price') && useVendorPrice) {
        console.log('   ⚠️  vendor_price column not found, retrying without it...');
        useVendorPrice = false;
        i -= BATCH_SIZE;
        continue;
      }
      console.error(`   ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, error.message);
      prodErrorCount += batch.length;
    } else {
      prodSuccessCount += batch.length;
      process.stdout.write(`   ✅ ${prodSuccessCount}/${SEED_PRODUCTS.length}\r`);
    }
  }

  console.log(`\n   ✅ ${prodSuccessCount} products upserted, ${prodErrorCount} errors`);

  // ─── Summary ───────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════');
  console.log('📊 CATALOG SUMMARY');
  console.log('══════════════════════════════════════════════════');
  
  const sections = {};
  SEED_CATEGORIES.forEach((c) => {
    const sec = c.section || 'home';
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(c);
  });

  for (const [section, cats] of Object.entries(sections)) {
    console.log(`\n🏷️  ${section.toUpperCase()} (${cats.length} categories)`);
    cats.forEach((cat) => {
      const count = SEED_PRODUCTS.filter((p) => p.categoryId === cat.id).length;
      console.log(`   ${cat.name} — ${count} products`);
    });
  }

  console.log(`\n📦 Total Products: ${SEED_PRODUCTS.length}`);
  console.log('🌱 Seed complete!\n');

  await supabase.auth.signOut();
}

seed().catch(console.error);
