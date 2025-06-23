import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bnqcimnejaemtcpanqnq.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
