"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DataTableExportProps<TData> {
  data: TData[]
  filename?: string
}

export function DataTableExport<TData>({
  data,
  filename = "export",
}: DataTableExportProps<TData>) {
  
  const downloadCSV = () => {
    if (!data || data.length === 0) return

    // 1. Get Headers
    const headers = Object.keys(data[0] as object)
    
    // 2. Format CSV Content
    const csvContent = [
      headers.join(","), // Header row
      ...data.map((row) => 
        headers.map(header => {
          const cell = (row as any)[header]
          // Escape quotes and wrap in quotes if contains comma
          const formatted = String(cell ?? "").replace(/"/g, '""')
          return `"${formatted}"`
        }).join(",")
      )
    ].join("\n")

    // 3. Trigger Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={downloadCSV} className="ml-auto hidden h-8 lg:flex">
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  )
}
