import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const SUPABASE_URL = 'https://ewlpwjkhuustiljvcdtn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHB3amtodXVzdGlsanZjZHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTQ2OTksImV4cCI6MjA5MTA3MDY5OX0.T7FfvFm5ZyQ86fGr0mqYrN2R6wrLb6zUGiugo31RAD4';

const isWeb = Platform.OS === 'web';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // On web, use localStorage (AsyncStorage falls back to it automatically)
    storage: isWeb ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Must be true on web so Supabase picks up the OAuth token from the URL hash
    detectSessionInUrl: isWeb,
  },
});
