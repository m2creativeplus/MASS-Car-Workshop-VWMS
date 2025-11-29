import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://bnqcimnejaemtcpanqnq.supabase.co"

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY

// Validate that required configuration is available
if (!supabaseKey) {
  throw new Error("[Supabase] Missing Supabase anon key. Please add SUPABASE_ANON_KEY to your environment variables.")
}

console.log("[v0] Supabase URL:", supabaseUrl)
console.log("[v0] Supabase key configured:", !!supabaseKey)

// Create Supabase client - will use public anon key for client-side operations
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
