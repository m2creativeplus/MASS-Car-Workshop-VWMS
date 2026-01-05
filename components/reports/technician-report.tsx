"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Wrench,
  Clock,
  Timer,
  CheckCircle,
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
const technicians = [
  { 
    id: 't1', 
    name: 'John Smith',
    avatar: 'JS', 
    stats: {
      hoursBilled: 42.5,
      hoursFlagged: 38.0,
      efficiency: 111.8,
      jobsCompleted: 15,
      avgTimePerJob: 2.5,
      laborSales: 4037.50,
      partsAttached: 2500.00
    }
  },
  { 
    id: 't2', 
    name: 'Mike Johnson', 
    avatar: 'MJ',
    stats: {
      hoursBilled: 35.0,
      hoursFlagged: 40.0,
      efficiency: 87.5,
      jobsCompleted: 12,
      avgTimePerJob: 3.3,
      laborSales: 3325.00,
      partsAttached: 1800.00
    }
  },
  { 
    id: 't3', 
    name: 'Robert Davis', 
    avatar: 'RD',
    stats: {
      hoursBilled: 28.0,
      hoursFlagged: 25.0,
      efficiency: 112.0,
      jobsCompleted: 8,
      avgTimePerJob: 3.1,
      laborSales: 2660.00,
      partsAttached: 1200.00
    }
  }
]

// Chart data
const chartData = technicians.map(t => ({
  name: t.name,
  Billed: t.stats.hoursBilled,
  Flagged: t.stats.hoursFlagged,
  Efficiency: t.stats.efficiency
}))

export function TechnicianReport() {
  const getEfficiencyColor = (eff: number) => {
    if (eff >= 120) return 'text-purple-600 bg-purple-100' // Super star
    if (eff >= 100) return 'text-green-600 bg-green-100'  // Target met
    if (eff >= 85) return 'text-yellow-600 bg-yellow-100' // Warning
    return 'text-red-600 bg-red-100'                      // Critical
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-amber-600" />
            Technician Performance
          </h2>
          <p className="text-muted-foreground">Productivity, efficiency, and revenue tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hours Billed vs Flagged</CardTitle>
          <CardDescription>Comparing sold hours against actual time worked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Billed" fill="#10B981" name="Billed Hours" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Flagged" fill="#6366F1" name="Flagged (Actual)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Technician Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians.map((tech) => (
          <Card key={tech.id} className="overflow-hidden">
            <div className="bg-muted/40 p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                  {tech.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground">Technician</p>
                </div>
              </div>
              <Badge className={getEfficiencyColor(tech.stats.efficiency)}>
                {tech.stats.efficiency.toFixed(0)}% Eff.
              </Badge>
            </div>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Billed
                  </p>
                  <p className="text-xl font-bold text-green-600">{tech.stats.hoursBilled}h</p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <Timer className="h-3 w-3" /> Actual
                  </p>
                  <p className="text-xl font-bold text-indigo-600">{tech.stats.hoursFlagged}h</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jobs Completed</span>
                  <span className="font-medium">{tech.stats.jobsCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Time/Job</span>
                  <span className="font-medium">{tech.stats.avgTimePerJob} hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Labor Sales</span>
                  <span className="font-medium text-green-700">${tech.stats.laborSales.toLocaleString()}</span>
                </div>
                
                {/* Visual Efficiency Bar */}
                <div className="pt-2">
                   <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Efficiency</span>
                      <span>Target: 100%</span>
                   </div>
                   <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                         className={`h-full rounded-full transition-all ${
                            tech.stats.efficiency >= 100 ? 'bg-green-500' : 
                            tech.stats.efficiency >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                         }`}
                         style={{ width: `${Math.min(tech.stats.efficiency, 100)}%` }}
                      ></div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Reference */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">⚙️ Productivity Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-medium">Efficiency</span>
              <p className="text-muted-foreground">(Billed Hours / Flagged Hours) × 100</p>
              <p className="text-muted-foreground mt-1">Target: ≥ 100% (Should bill more than actual time)</p>
            </div>
            <div>
              <span className="font-medium">Hours Billed vs Flagged</span>
              <p className="text-muted-foreground">Billed = Sold Hours | Flagged = Time on Clock</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
