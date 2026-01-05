"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Briefcase,
  TrendingUp,
  FileCheck,
  FileX,
  Clock,
  BarChart as BarChartIcon,
  Download
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

// Sample data - In production from Convex
const serviceWriters = [
  { 
    id: 'sw1', 
    name: 'Sarah Jenkins', 
    stats: {
      totalSold: 45200,
      totalWritten: 68500,
      closeRatio: 66,
      carCount: 45,
      aro: 1004.44,
      awro: 1522.22,
      jobs: { pending: 5, approved: 28, declined: 8, completed: 4 }
    }
  },
  { 
    id: 'sw2', 
    name: 'Mike Ross', 
    stats: {
      totalSold: 38400,
      totalWritten: 82100,
      closeRatio: 46.8,
      carCount: 38,
      aro: 1010.52,
      awro: 2160.52,
      jobs: { pending: 12, approved: 20, declined: 15, completed: 1 }
    }
  },
  { 
    id: 'sw3', 
    name: 'David Lee', 
    stats: {
      totalSold: 52100,
      totalWritten: 75000,
      closeRatio: 69.5,
      carCount: 52,
      aro: 1001.92,
      awro: 1442.30,
      jobs: { pending: 3, approved: 35, declined: 5, completed: 9 }
    }
  }
]

// Chart data
const chartData = serviceWriters.map(sw => ({
  name: sw.name,
  Approved: sw.stats.totalSold,
  Written: sw.stats.totalWritten - sw.stats.totalSold, // Logic for stacked bar usually
  Declined: 0, // Simplified for this view, or we can use separate bars
  TotalWritten: sw.stats.totalWritten
}))

const jobsData = serviceWriters.map(sw => ({
  name: sw.name,
  Pending: sw.stats.jobs.pending,
  Approved: sw.stats.jobs.approved,
  Declined: sw.stats.jobs.declined,
}))

export function ServiceWriterReport() {
  const [viewMode, setViewMode] = useState<'sales' | 'jobs'>('sales')

  const getCloseRatioColor = (ratio: number) => {
    if (ratio >= 60) return 'text-green-600 bg-green-100'
    if (ratio >= 50) return 'text-blue-600 bg-blue-100'
    if (ratio >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Service Writer Reporting
          </h2>
          <p className="text-muted-foreground">Advisor performance and sales metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button 
              variant={viewMode === 'sales' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('sales')}
            >
              Sales View
            </Button>
            <Button 
              variant={viewMode === 'jobs' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('jobs')}
            >
              Jobs View
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {viewMode === 'sales' ? 'Sales Performance vs Opportunity' : 'Job Status Breakdown'}
          </CardTitle>
          <CardDescription>
            {viewMode === 'sales' ? 'Comparing total written estimates vs approved sales' : 'Distribution of job statuses per advisor'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'sales' ? (
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="Approved" fill="#10B981" name="Approved Sales" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="TotalWritten" fill="#94A3B8" name="Total Written" radius={[4, 4, 0, 0]} opacity={0.3} />
                </BarChart>
              ) : (
                <BarChart data={jobsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Pending" fill="#3B82F6" stackId="a" />
                  <Bar dataKey="Approved" fill="#10B981" stackId="a" />
                  <Bar dataKey="Declined" fill="#EF4444" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Advisor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceWriters.map((sw) => (
          <Card key={sw.id} className="overflow-hidden">
            <div className="bg-muted/40 p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  {sw.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold">{sw.name}</h3>
                  <p className="text-xs text-muted-foreground">Service Advisor</p>
                </div>
              </div>
              <Badge className={getCloseRatioColor(sw.stats.closeRatio)}>
                {sw.stats.closeRatio}% Close
              </Badge>
            </div>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <p className="text-xs text-muted-foreground uppercase">Total Sold</p>
                  <p className="text-xl font-bold text-green-600">${sw.stats.totalSold.toLocaleString()}</p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase">Total Written</p>
                  <p className="text-xl font-bold">${sw.stats.totalWritten.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 border-b bg-muted/10">
                <div className="p-4 border-r">
                  <p className="text-xs text-muted-foreground uppercase">ARO</p>
                  <p className="font-semibold">${sw.stats.aro.toFixed(0)}</p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase">AWRO</p>
                  <p className="font-semibold">${sw.stats.awro.toFixed(0)}</p>
                  <p className="text-[10px] text-muted-foreground">Avg Written</p>
                </div>
              </div>

              <div className="p-4 grid grid-cols-4 gap-2 text-center text-xs">
                 <div className="bg-blue-50 p-2 rounded">
                    <span className="block font-bold text-blue-700">{sw.stats.jobs.pending}</span>
                    <span className="text-blue-600">Pend</span>
                 </div>
                 <div className="bg-green-50 p-2 rounded">
                    <span className="block font-bold text-green-700">{sw.stats.jobs.approved}</span>
                    <span className="text-green-600">Appr</span>
                 </div>
                 <div className="bg-red-50 p-2 rounded">
                    <span className="block font-bold text-red-700">{sw.stats.jobs.declined}</span>
                    <span className="text-red-600">Decl</span>
                 </div>
                 <div className="bg-gray-100 p-2 rounded">
                    <span className="block font-bold text-gray-700">{sw.stats.carCount}</span>
                    <span className="text-gray-600">Cars</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Reference */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">📈 Sales KPI Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="font-medium">Close Ratio</span>
              <p className="text-muted-foreground">Target: 50%+ (Approved / Written)</p>
            </div>
            <div>
              <span className="font-medium">ARO (Avg Repair Order)</span>
              <p className="text-muted-foreground">Total Sales / Car Count</p>
            </div>
            <div>
              <span className="font-medium">AWRO (Avg Written)</span>
              <p className="text-muted-foreground">Total Opportunity / Car Count</p>
            </div>
            <div>
              <span className="font-medium">Car Count</span>
              <p className="text-muted-foreground">Total unique ROs processed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
