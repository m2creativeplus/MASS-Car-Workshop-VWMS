"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PremiumKPICard } from "@/components/ui/premium-kpi-card"
import {
  Users,
  Car,
  Package,
  Wrench,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Plus,
  FileText
} from "lucide-react"
import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5500 },
  { name: 'Thu', revenue: 4500 },
  { name: 'Fri', revenue: 6800 },
  { name: 'Sat', revenue: 7200 },
  { name: 'Sun', revenue: 3800 },
]

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here's what's happening at the workshop today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass-card">
            <Clock className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
            <Plus className="mr-2 h-4 w-4" />
            New Job Card
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PremiumKPICard 
          title="Total Revenue" 
          value="$12,450" 
          icon={TrendingUp} 
          trend={{ value: 12, label: "vs last week", positive: true }}
          color="success"
          index={0}
        />
        <PremiumKPICard 
          title="Active Jobs" 
          value="18" 
          icon={Wrench} 
          trend={{ value: 4, label: "new today", positive: true }}
          color="primary"
          index={1}
        />
        <PremiumKPICard 
          title="Vehicles In" 
          value="24" 
          icon={Car} 
          color="info"
          index={2}
        />
        <PremiumKPICard 
          title="Pending Parts" 
          value="5" 
          icon={Package} 
          trend={{ value: 2, label: "delayed", positive: false }}
          color="warning"
          index={3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 glass-card border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Income breakdown over time</CardDescription>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                {["daily", "week", "month"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      timeRange === range 
                        ? "bg-white dark:bg-slate-700 text-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      borderRadius: '8px', 
                      border: '1px solid hsl(var(--border))',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card className="glass-card border-none shadow-sm h-full">
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
            <CardDescription>Real-time workshop updates</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] overflow-auto pr-2 custom-scrollbar">
            <div className="space-y-6">
              {[
                { time: "10 mins ago", text: "Job #4052 completed by Mike", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { time: "25 mins ago", text: "New booking: Toyota Land Cruiser", icon: Car, color: "text-blue-500", bg: "bg-blue-500/10" },
                { time: "1 hour ago", text: "Parts order #992 delayed", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" },
                { time: "2 hours ago", text: "Inspection report sent to Sarah", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
                { time: "3 hours ago", text: "Tech John started Job #4055", icon: Wrench, color: "text-orange-500", bg: "bg-orange-500/10" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg} ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technician Status Board */}
      <h2 className="text-xl font-bold text-foreground tracking-tight mt-8">Technician Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "John Doe", status: "Working", job: "Brake Service - BMW X5", avatar: "JD", color: "emerald" },
          { name: "Mike Ross", status: "Available", job: "Waiting for assignment", avatar: "MR", color: "blue" },
          { name: "Sarah Smith", status: "Break", job: "Returning at 2:00 PM", avatar: "SS", color: "amber" },
        ].map((tech, i) => (
          <Card key={i} className="glass-card hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                {tech.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm">{tech.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                    tech.color === 'emerald' ? 'bg-emerald-100/50 text-emerald-700 border-emerald-200' :
                    tech.color === 'blue' ? 'bg-blue-100/50 text-blue-700 border-blue-200' :
                    'bg-amber-100/50 text-amber-700 border-amber-200'
                  }`}>
                    {tech.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{tech.job}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
