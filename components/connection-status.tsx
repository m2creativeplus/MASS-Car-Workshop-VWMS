"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function ConnectionStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple connection test
        const { data, error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })

        if (error) {
          throw error
        }

        setStatus("connected")
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Connection failed")
      }
    }

    checkConnection()
  }, [])

  if (status === "checking") {
    return (
      <Alert className="mb-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>Connecting to Supabase...</AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert variant="destructive" className="mb-4">
        <XCircle className="h-4 w-4" />
        <AlertDescription>Database connection failed: {error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">✅ Successfully connected to Supabase database</AlertDescription>
    </Alert>
  )
}
