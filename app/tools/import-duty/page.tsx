"use client"

import { ImportDutyCalculator } from "@/components/gov-tech/import-duty-calculator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ImportDutyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
           <Link href="/dashboard">
             <Button variant="ghost" className="gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500">
               <ArrowLeft className="w-4 h-4" /> Back to Dashboard
             </Button>
           </Link>
           <div className="flex items-center gap-2">
             <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-slate-500">SYSTEM ONLINE</span>
           </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
               GovTech <span className="text-orange-600">Duty</span> Calculator
            </h1>
            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
              Official import tariff estimation tool integrated with Berbera Port Authority tables.
            </p>
          </div>
        </div>

        {/* The Component */}
        <ImportDutyCalculator />

      </div>
    </div>
  )
}
