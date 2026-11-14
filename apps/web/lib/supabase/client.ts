import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fuitxkkmilvefbikvzje.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key_for_development";

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && typeof window !== "undefined") {
  console.warn("NayaMarg: NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in environment. Running with development mock auth.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
