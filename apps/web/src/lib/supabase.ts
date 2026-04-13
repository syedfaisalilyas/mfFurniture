import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ewlpwjkhuustiljvcdtn.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_ANON_KEY) {
  console.warn("Supabase anon key not found in environment variables");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
