// Web version — Supabase OAuth on web redirects the browser directly (no custom URI scheme).
import { supabase } from './supabase';

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) throw new Error(error.message);
  // Supabase handles the redirect automatically — no further action needed here.
}
