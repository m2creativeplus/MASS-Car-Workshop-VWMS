"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Users, 
  Car, 
  Wrench, 
  Settings,
  ShoppingCart,
  ArrowRight,
  MoreHorizontal,
  DollarSign, 
  TrendingUp, 
  CreditCard,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { useState } from "react"
import { dashboardStats } from "@/lib/data"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { StatCard } from "@/components/dashboard/stat-card"
import { useConvexAuth } from "@/components/auth/convex-auth-provider"

const repairData = [
  { name: 'Jan', repairs: 1 },
  { name: 'Feb', repairs: 0 },
  { name: 'Mar', repairs: 1 },
  { name: 'Apr', repairs: 3 },
  { name: 'May', repairs: 1 },
  { name: 'Jun', repairs: 1 },
  { name: 'Jul', repairs: 0 },
  { name: 'Aug', repairs: 0 },
  { name: 'Sep', repairs: 1 },
  { name: 'Oct', repairs: 0 },
  { name: 'Nov', repairs: 0 },
  { name: 'Dec', repairs: 0 },
]

const donutData1 = [
  { name: 'Sold', value: 45 },
  { name: 'Stock', value: 55 },
]

const donutData2 = [
  { name: 'Sold', value: 30 },
  { name: 'Stock', value: 70 },
]

const COLORS = ['#F59E0B', '#e5e7eb'] // Amber and Gray
const COLORS_TEAL = ['#14b8a6', '#e5e7eb'] // Teal and Gray

// Animation variants for spring physics
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: i * 0.1
    }
  }),
  hover: {
    scale: 1.02,
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
}

// Job Workflow Status Data
const jobStatuses = [
  { id: 'estimates', label: 'Estimates', count: 8, color: 'bg-blue-500', icon: ClipboardList },
  { id: 'dropped-off', label: 'Dropped Off', count: 3, color: 'bg-indigo-500', icon: Car },
  { id: 'in-progress', label: 'In Progress', count: 5, color: 'bg-amber-500', icon: Wrench },
  { id: 'completed', label: 'Completed', count: 4, color: 'bg-green-500', icon: CheckCircle },
  { id: 'invoiced', label: 'Invoiced', count: 2, color: 'bg-purple-500', icon: DollarSign },
]

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("year")
  const { user } = useConvexAuth()
  const isOwner = user?.email === "owner@masscar.com"

  return (
    <div className="space-y-6 p-2">
      
      {/* 1. Header is handled by the main layout */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-xl font-bold text-orange-600 tracking-tight uppercase flex items-center gap-2">
          {isOwner && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-sm border border-amber-200">Executive View</span>}
          MASS WORKSHOP DASHBOARD
        </h2>
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            System Live
          </span>
        </div>
      </motion.div>

      {/* NEW: Shop Pulse (Tekmetric Style Header KPIs) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
      >
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Car Count</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold">12</h3>
              <span className="text-xs text-green-600 flex items-center bg-green-50 px-1 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 mr-1" /> +2
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase">ARO</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold">$654</h3>
              <span className="text-xs text-red-600 flex items-center bg-red-50 px-1 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 mr-1" /> -5%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Gross Sales</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold">$8,450</h3>
              <span className="text-xs text-green-600 flex items-center bg-green-50 px-1 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 mr-1" /> +12%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Labor Sales</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold">$4,100</h3>
              <span className="text-xs text-muted-foreground">48% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Parts Sales</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-2xl font-bold">$3,200</h3>
              <span className="text-xs text-muted-foreground">38% of total</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* NEW: Job Status Board (Tekmetric Style) */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Active Job Workflow</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {jobStatuses.map((status, i) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden relative">
                <div className={`absolute top-0 left-0 w-1 h-full ${status.color}`} />
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{status.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{status.count}</h3>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${status.color.replace('bg-', 'bg-opacity-10 bg-')} flex items-center justify-center`}>
                    <status.icon className={`h-4 w-4 ${status.color.replace('bg-', 'text-')}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OWNER ONLY: Financial Overview */}
      {isOwner && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <Card className="bg-card text-card-foreground border-border shadow-md">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Revenue (YTD)</p>
                <h3 className="text-3xl font-bold text-success mt-1">$142,500</h3>
                <p className="text-xs text-success flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs last month
                </p>
              </div>
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border-border shadow-md">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Net Profit (Est.)</p>
                <h3 className="text-3xl font-bold text-primary mt-1">$48,250</h3>
                 <p className="text-xs text-primary flex items-center mt-2">
                  33.8% Margin
                </p>
              </div>
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                 <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border-border shadow-md">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Outstanding Invoices</p>
                <h3 className="text-3xl font-bold text-destructive mt-1">$4,120</h3>
                <p className="text-xs text-destructive flex items-center mt-2">
                  <CreditCard className="w-3 h-3 mr-1" /> 5 Overdue Accounts
                </p>
              </div>
               <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 2. Info Cards Row with Framer Motion Spring Physics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <StatCard 
          index={0}
          variants={cardVariants}
          label="Parts In Stock"
          value={dashboardStats.partsInStock}
          icon={Wrench}
          color="bg-[#00c0ef]"
        />

        <StatCard 
          index={1}
          variants={cardVariants}
          label="Customers"
          value={dashboardStats.totalCustomers}
          icon={Users}
          color="bg-[#F39C12]"
        />

        <StatCard 
          index={2}
          variants={cardVariants}
          label="Cars In Stock"
          value={dashboardStats.carsInStock}
          icon={Car}
          color="bg-[#00A65A]"
        />

        <StatCard 
          index={3}
          variants={cardVariants}
          label="Mechanics"
          value={dashboardStats.mechanics}
          icon={Settings}
          color="bg-[#DD4B39]"
        />

      </div>

      {/* 3. Main Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column: Repair Report Area Chart */}
        <Card className="lg:col-span-2 shadow-sm border-t-2 border-t-emerald-500">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-slate-500" />
              <CardTitle className="text-lg font-medium text-slate-700">Monthly Car Repair Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <span className="text-sm font-bold text-slate-600">Car Repair: 1 Jan, 2025 - 31 December, 2025</span>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={repairData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRepairs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A65A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00A65A" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false}
                    domain={[0, 3]}
                    tickCount={4}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="repairs" 
                    stroke="#00A65A" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRepairs)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Donut Charts */}
        <div className="space-y-6">
          
          {/* Chart 1: Parts Sold */}
          <Card className="shadow-sm border-t-2 border-t-emerald-500">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-slate-500" />
                <CardTitle className="text-lg font-medium text-slate-700">Monthly Parts Sold Report</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData1}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {donutData1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-xl font-bold text-amber-500">45%</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium text-slate-600">Total Parts Sold Year 2025</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">1</span>
              </div>
            </CardContent>
          </Card>

          {/* Chart 2: Car Sold */}
          <Card className="shadow-sm border-t-2 border-t-emerald-500">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-slate-500" />
                <CardTitle className="text-lg font-medium text-slate-700">Monthly Car Sold Report</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData2}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {donutData2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_TEAL[index % COLORS_TEAL.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-xl font-bold text-teal-500">30%</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  )
}
