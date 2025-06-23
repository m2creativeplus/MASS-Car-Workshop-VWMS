import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bnqcimnejaemtcpanqnq.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWNpbW5lamFlbXRjcGFucW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTM0NTIsImV4cCI6MjA2NjI2OTQ1Mn0.sbLMOhRs2DC55G9Sajd7Hplrv3GB8l_DuL07up33t00"

// Create a function to get the Supabase client safely
export const getSupabaseClient = () => {
  if (!supabaseKey) {
    console.warn("Supabase key not available, using fallback configuration")
    return createClient(
      supabaseUrl,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWNpbW5lamFlbXRjcGFucW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTM0NTIsImV4cCI6MjA2NjI2OTQ1Mn0.sbLMOhRs2DC55G9Sajd7Hplrv3GB8l_DuL07up33t00",
    )
  }
  return createClient(supabaseUrl, supabaseKey)
}

// Export the client for backward compatibility
export const supabase = getSupabaseClient()

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
