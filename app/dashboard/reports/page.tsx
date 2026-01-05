"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EndOfDayReport } from "@/components/reports/end-of-day-report"
import { ProfitDetailsReport } from "@/components/reports/profit-details-report"
import { CashDrawerReport } from "@/components/reports/cash-drawer-report"
import { ServiceWriterReport } from "@/components/reports/service-writer-report"
import { TechnicianReport } from "@/components/reports/technician-report"
import { 
  BarChart3, 
  CircleDollarSign, 
  Wallet, 
  Users, 
  Wrench,
  FileText
} from "lucide-react"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("end-of-day")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Financial & Performance Reporting</h2>
      </div>
      
      <Tabs defaultValue="end-of-day" className="space-y-4" onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="h-auto p-1 bg-muted/50 border">
            <TabsTrigger value="end-of-day" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">
              <BarChart3 className="h-4 w-4 mr-2" />
              End of Day
            </TabsTrigger>
            <TabsTrigger value="profit-details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Profit Details
            </TabsTrigger>
            <TabsTrigger value="cash-drawer" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">
              <Wallet className="h-4 w-4 mr-2" />
              Cash Drawer
            </TabsTrigger>
            <TabsTrigger value="service-writer" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">
              <Users className="h-4 w-4 mr-2" />
              Service Writer
            </TabsTrigger>
            <TabsTrigger value="technician" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 px-4">
              <Wrench className="h-4 w-4 mr-2" />
              Technician
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="end-of-day" className="space-y-4">
          <EndOfDayReport />
        </TabsContent>
        
        <TabsContent value="profit-details" className="space-y-4">
          <ProfitDetailsReport />
        </TabsContent>
        
        <TabsContent value="cash-drawer" className="space-y-4">
          <CashDrawerReport />
        </TabsContent>
        
        <TabsContent value="service-writer" className="space-y-4">
          <ServiceWriterReport />
        </TabsContent>

        <TabsContent value="technician" className="space-y-4">
          <TechnicianReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
