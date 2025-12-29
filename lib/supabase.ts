import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://placeholder.supabase.co"

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "placeholder_key_for_build"

// Create Supabase client - will use public anon key for client-side operations
// Note: During build time, placeholder values may be used, actual connection happens at runtime
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "Content-Type": "application/json",
    },
  },
})

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== "https://placeholder.supabase.co" && supabaseKey !== "placeholder_key_for_build"
}

// Database types
export interface User {
  id: string
  email: string
  role: "admin" | "staff" | "technician" | "customer"
  first_name: string
  last_name: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone?: string
  role: "admin" | "staff" | "technician" | "customer"
  is_active: boolean
  created_at: string
  updated_at: string
}
