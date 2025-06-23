import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bnqcimnejaemtcpanqnq.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWNpbW5lamFlbXRjcGFucW5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDY5MzQ1MiwiZXhwIjoyMDY2MjY5NDUyfQ.YOUR_SERVICE_ROLE_KEY_HERE"

// Server-side client with service role key for admin operations
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
