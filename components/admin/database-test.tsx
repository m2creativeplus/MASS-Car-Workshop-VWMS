"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Database, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface TestResult {
  name: string
  status: "success" | "warning" | "error"
  message: string
  details?: string
}

export function DatabaseTest() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  const runTests = async () => {
    setTesting(true)
    const testResults: TestResult[] = []

    // Test 1: Basic Connection
    try {
      const { data, error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })
      if (error) throw error
      testResults.push({
        name: "Database Connection",
        status: "success",
        message: "Connected successfully to Supabase",
        details: `Connection established to ${supabase.supabaseUrl}`,
      })
    } catch (error) {
      testResults.push({
        name: "Database Connection",
        status: "error",
        message: "Failed to connect to database",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 2: Authentication Status
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        testResults.push({
          name: "Authentication",
          status: "success",
          message: `User authenticated: ${user.email}`,
          details: `User ID: ${user.id}`,
        })
      } else {
        testResults.push({
          name: "Authentication",
          status: "warning",
          message: "No user currently authenticated",
          details: "This is normal if not logged in",
        })
      }
    } catch (error) {
      testResults.push({
        name: "Authentication",
        status: "error",
        message: "Authentication check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 3: User Profiles Table
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").limit(1)

      if (error) throw error
      testResults.push({
        name: "User Profiles Table",
        status: "success",
        message: `User profiles accessible`,
        details: `Found ${data?.length || 0} profiles`,
      })
    } catch (error) {
      testResults.push({
        name: "User Profiles Table",
        status: "error",
        message: "Cannot access user profiles table",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 4: Customers Table
    try {
      const { data, error } = await supabase.from("customers").select("*", { count: "exact", head: true })

      if (error) throw error
      testResults.push({
        name: "Customers Table",
        status: "success",
        message: `Customers table accessible`,
        details: `Table exists and is queryable`,
      })
    } catch (error) {
      testResults.push({
        name: "Customers Table",
        status: "warning",
        message: "Customers table not accessible",
        details: "Table may not exist yet - run database setup scripts",
      })
    }

    // Test 5: Suppliers Table
    try {
      const { data, error } = await supabase.from("suppliers").select("*", { count: "exact", head: true })

      if (error) throw error
      testResults.push({
        name: "Suppliers Table",
        status: "success",
        message: `Suppliers table accessible`,
        details: `Table exists and is queryable`,
      })
    } catch (error) {
      testResults.push({
        name: "Suppliers Table",
        status: "warning",
        message: "Suppliers table not accessible",
        details: "Table may not exist yet - run database setup scripts",
      })
    }

    // Test 6: Parts Catalog
    try {
      const { data, error } = await supabase.from("parts_catalog").select("*", { count: "exact", head: true })

      if (error) throw error
      testResults.push({
        name: "Parts Catalog",
        status: "success",
        message: `Parts catalog accessible`,
        details: `Table exists and is queryable`,
      })
    } catch (error) {
      testResults.push({
        name: "Parts Catalog",
        status: "warning",
        message: "Parts catalog not accessible",
        details: "Table may not exist yet - run database setup scripts",
      })
    }

    setResults(testResults)
    setTesting(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      success: "default" as const,
      warning: "secondary" as const,
      error: "destructive" as const,
    }
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>
  }

  const successCount = results.filter((r) => r.status === "success").length
  const warningCount = results.filter((r) => r.status === "warning").length
  const errorCount = results.filter((r) => r.status === "error").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database Connection Test</h2>
          <p className="text-muted-foreground">Verify Supabase connection and database setup</p>
        </div>
        <Button onClick={runTests} disabled={testing}>
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Run Connection Tests
            </>
          )}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{warningCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{errorCount}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Detailed results of database connection tests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{result.name}</h4>
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.details && (
                    <p className="text-xs text-muted-foreground bg-muted p-2 rounded">{result.details}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {results.length === 0 && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Click "Run Connection Tests" to verify your Supabase database connection and setup.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default DatabaseTest
