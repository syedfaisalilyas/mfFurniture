/**
 * Add missing columns (section, vendor_price) to the Supabase database.
 * 
 * Run with: node scripts/add-columns.js
 * 
 * Uses Supabase rpc/sql execution.
 */

const SUPABASE_URL = 'https://ewlpwjkhuustiljvcdtn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHB3amtodXVzdGlsanZjZHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTQ2OTksImV4cCI6MjA5MTA3MDY5OX0.T7FfvFm5ZyQ86fGr0mqYrN2R6wrLb6zUGiugo31RAD4';

async function addColumns() {
  console.log('⚙️  This script cannot alter the database schema with the anon key.');
  console.log('');
  console.log('📋 Please run the following SQL in your Supabase Dashboard > SQL Editor:');
  console.log('');
  console.log('────────────────────────────────────────────');
  console.log(`
-- Add 'section' column to categories
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS section text DEFAULT 'home';

-- Add 'vendor_price' column to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS vendor_price numeric(10,2);

-- Update existing categories with their sections
UPDATE public.categories SET section = 'home'   WHERE id IN ('c1','c2','c3','c4','c5','c6');
UPDATE public.categories SET section = 'other'  WHERE id IN ('c7');
UPDATE public.categories SET section = 'office' WHERE id IN ('c10','c11','c12','c13','c14');

-- Update products with vendor prices
UPDATE public.products SET vendor_price = 720   WHERE id = 'p1';
UPDATE public.products SET vendor_price = 1100  WHERE id = 'p2';
UPDATE public.products SET vendor_price = 420   WHERE id = 'p3';
UPDATE public.products SET vendor_price = 640   WHERE id = 'p4';
UPDATE public.products SET vendor_price = 260   WHERE id = 'p5';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p6';
UPDATE public.products SET vendor_price = 170   WHERE id = 'p7';
UPDATE public.products SET vendor_price = 220   WHERE id = 'p8';
UPDATE public.products SET vendor_price = 130   WHERE id = 'p9';
UPDATE public.products SET vendor_price = 110   WHERE id = 'p10';
UPDATE public.products SET vendor_price = 520   WHERE id = 'p11';
UPDATE public.products SET vendor_price = 440   WHERE id = 'p12';
UPDATE public.products SET vendor_price = 250   WHERE id = 'p13';
UPDATE public.products SET vendor_price = 710   WHERE id = 'p14';
UPDATE public.products SET vendor_price = 310   WHERE id = 'p15';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p16';
UPDATE public.products SET vendor_price = 290   WHERE id = 'p17';
UPDATE public.products SET vendor_price = 200   WHERE id = 'p21';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p22';
UPDATE public.products SET vendor_price = 930   WHERE id = 'p23';
UPDATE public.products SET vendor_price = 1300  WHERE id = 'p24';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p25';
UPDATE public.products SET vendor_price = 160   WHERE id = 'p26';
UPDATE public.products SET vendor_price = 400   WHERE id = 'p27';
UPDATE public.products SET vendor_price = 520   WHERE id = 'p31';
UPDATE public.products SET vendor_price = 640   WHERE id = 'p32';
UPDATE public.products SET vendor_price = 880   WHERE id = 'p33';
UPDATE public.products SET vendor_price = 1500  WHERE id = 'p34';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p35';
UPDATE public.products SET vendor_price = 400   WHERE id = 'p41';
UPDATE public.products SET vendor_price = 520   WHERE id = 'p42';
UPDATE public.products SET vendor_price = 220   WHERE id = 'p43';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p44';
UPDATE public.products SET vendor_price = 130   WHERE id = 'p45';
UPDATE public.products SET vendor_price = 80    WHERE id = 'p51';
UPDATE public.products SET vendor_price = 150   WHERE id = 'p52';
UPDATE public.products SET vendor_price = 65    WHERE id = 'p53';
UPDATE public.products SET vendor_price = 200   WHERE id = 'p54';
UPDATE public.products SET vendor_price = 40    WHERE id = 'p55';
UPDATE public.products SET vendor_price = 50    WHERE id = 'p56';
UPDATE public.products SET vendor_price = 1050  WHERE id = 'p61';
UPDATE public.products SET vendor_price = 1350  WHERE id = 'p62';
UPDATE public.products SET vendor_price = 400   WHERE id = 'p63';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p64';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p65';
UPDATE public.products SET vendor_price = 100   WHERE id = 'p66';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p71';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p72';
UPDATE public.products SET vendor_price = 160   WHERE id = 'p73';
UPDATE public.products SET vendor_price = 130   WHERE id = 'p74';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p75';
UPDATE public.products SET vendor_price = 100   WHERE id = 'p76';
UPDATE public.products SET vendor_price = 280   WHERE id = 'p77';
UPDATE public.products SET vendor_price = 220   WHERE id = 'p78';
UPDATE public.products SET vendor_price = 310   WHERE id = 'p79';
UPDATE public.products SET vendor_price = 760   WHERE id = 'p81';
UPDATE public.products SET vendor_price = 880   WHERE id = 'p82';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p83';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p84';
UPDATE public.products SET vendor_price = 160   WHERE id = 'p85';
UPDATE public.products SET vendor_price = 580   WHERE id = 'p86';
UPDATE public.products SET vendor_price = 100   WHERE id = 'p87';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p91';
UPDATE public.products SET vendor_price = 700   WHERE id = 'p92';
UPDATE public.products SET vendor_price = 1000  WHERE id = 'p93';
UPDATE public.products SET vendor_price = 1500  WHERE id = 'p94';
UPDATE public.products SET vendor_price = 1950  WHERE id = 'p95';
UPDATE public.products SET vendor_price = 580   WHERE id = 'p96';
UPDATE public.products SET vendor_price = 190   WHERE id = 'p97';
UPDATE public.products SET vendor_price = 160   WHERE id = 'p101';
UPDATE public.products SET vendor_price = 250   WHERE id = 'p102';
UPDATE public.products SET vendor_price = 150   WHERE id = 'p103';
UPDATE public.products SET vendor_price = 280   WHERE id = 'p104';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p105';
UPDATE public.products SET vendor_price = 130   WHERE id = 'p106';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p107';
UPDATE public.products SET vendor_price = 880   WHERE id = 'p111';
UPDATE public.products SET vendor_price = 640   WHERE id = 'p112';
UPDATE public.products SET vendor_price = 340   WHERE id = 'p113';
UPDATE public.products SET vendor_price = 460   WHERE id = 'p114';
UPDATE public.products SET vendor_price = 160   WHERE id = 'p115';
UPDATE public.products SET vendor_price = 75    WHERE id = 'p116';
UPDATE public.products SET vendor_price = 220   WHERE id = 'p117';
`.trim());
  console.log('────────────────────────────────────────────');
  console.log('');
  console.log('After running the SQL above, run: node scripts/seed-catalog.js');
  console.log('to re-upsert with section and vendor_price data.');
}

addColumns();
