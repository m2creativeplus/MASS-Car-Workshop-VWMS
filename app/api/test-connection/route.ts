import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("user_profiles")
      .select("count", { count: "exact" })
      .limit(1)

    if (connectionError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: connectionError.message,
        },
        { status: 500 },
      )
    }

    // Test table access
    const tables = [
      "customers",
      "vehicles",
      "suppliers",
      "parts_catalog",
      "labor_guide",
      "inspection_templates",
      "estimates",
    ]

    const tableTests = await Promise.allSettled(
      tables.map(async (table) => {
        const { data, error } = await supabase.from(table).select("count", { count: "exact" }).limit(1)

        return {
          table,
          success: !error,
          count: data?.length || 0,
          error: error?.message,
        }
      }),
    )

    const results = tableTests.map((result, index) => ({
      table: tables[index],
      ...(result.status === "fulfilled" ? result.value : { success: false, error: "Test failed" }),
    }))

    return NextResponse.json({
      success: true,
      message: "Connection test completed",
      results,
      summary: {
        totalTables: tables.length,
        successfulTables: results.filter((r) => r.success).length,
        failedTables: results.filter((r) => !r.success).length,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Connection test failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
