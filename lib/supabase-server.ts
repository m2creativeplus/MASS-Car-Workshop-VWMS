import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://bnqcimnejaemtcpanqnq.supabase.co"

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

if (!supabaseServiceKey) {
  console.warn("[Supabase Server] Missing SUPABASE_SERVICE_ROLE_KEY - server operations will be limited")
}

console.log("[v0] Supabase Server URL:", supabaseUrl)
console.log("[v0] Supabase service key configured:", !!supabaseServiceKey)

// Server-side client with service role key for admin operations
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey || process.env.SUPABASE_ANON_KEY || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
