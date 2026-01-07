"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Users, 
  Car, 
  Wrench, 
  Settings,
  ArrowRight,
  DollarSign, 
  TrendingUp, 
  CreditCard,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Package,
  FileText
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
import { useConvexAuth } from "@/components/auth/convex-auth-provider"

// Chart data
const repairData = [
  { name: 'Jan', repairs: 12 },
  { name: 'Feb', repairs: 19 },
  { name: 'Mar', repairs: 15 },
  { name: 'Apr', repairs: 25 },
  { name: 'May', repairs: 22 },
  { name: 'Jun', repairs: 30 },
  { name: 'Jul', repairs: 28 },
  { name: 'Aug', repairs: 35 },
  { name: 'Sep', repairs: 32 },
  { name: 'Oct', repairs: 40 },
  { name: 'Nov', repairs: 38 },
  { name: 'Dec', repairs: 45 },
]

const donutData1 = [
  { name: 'Sold', value: 45 },
  { name: 'Stock', value: 55 },
]

const donutData2 = [
  { name: 'Completed', value: 68 },
  { name: 'In Progress', value: 22 },
  { name: 'Pending', value: 10 },
]

const COLORS = ['#F59E0B', '#e5e7eb']
const COLORS_STATUS = ['#10B981', '#3B82F6', '#F59E0B']

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: i * 0.08
    }
  }),
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
}

// Premium Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  index: number;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ label, value, icon: Icon, color, index, trend, trendUp }: StatCardProps) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className="h-full"
  >
    <Card className={`${color} text-white border-none shadow-lg overflow-hidden relative h-full`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <CardContent className="p-5 relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wide">{label}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <p className={`text-xs flex items-center gap-1 ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
                <TrendingUp className={`h-3 w-3 ${!trendUp && 'rotate-180'}`} />
                {trend}
              </p>
            )}
          </div>
          <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
      
      {/* Footer link */}
      <div className="bg-black/20 px-5 py-2.5 flex items-center justify-center gap-2 text-sm font-medium hover:bg-black/30 transition-colors cursor-pointer group">
        <span>View Details</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  </motion.div>
)

// Quick Action Card
const QuickActionCard = ({ icon: Icon, title, subtitle, color }: { icon: React.ElementType; title: string; subtitle: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="cursor-pointer"
  >
    <Card className="border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-md">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

// Recent Activity Item
const ActivityItem = ({ icon: Icon, title, time, status }: { icon: React.ElementType; title: string; time: string; status: 'success' | 'warning' | 'info' }) => {
  const statusColors = {
    success: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
    warning: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
    info: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
  }
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className={`h-9 w-9 rounded-full ${statusColors[status]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
      </div>
    </div>
  )
}

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("year")
  const { user } = useConvexAuth()
  const isOwner = user?.email === "owner@masscar.com"

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1600px] mx-auto">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            MASS OSS DASHBOARD
            {isOwner && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Executive View
              </span>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here's your workshop overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </span>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
        </div>
      </motion.div>

      {/* Owner Financial Cards */}
      {isOwner && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Revenue (YTD)</p>
                <h3 className="text-3xl font-bold text-emerald-400 mt-1">$142,500</h3>
                <p className="text-xs text-emerald-400 flex items-center mt-2 gap-1">
                  <TrendingUp className="w-3 h-3" /> +12.5% vs last month
                </p>
              </div>
              <div className="h-14 w-14 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Net Profit (Est.)</p>
                <h3 className="text-3xl font-bold text-blue-400 mt-1">$48,250</h3>
                <p className="text-xs text-blue-400 flex items-center mt-2">
                  33.8% Profit Margin
                </p>
              </div>
              <div className="h-14 w-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none shadow-xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Outstanding Invoices</p>
                <h3 className="text-3xl font-bold text-amber-400 mt-1">$4,120</h3>
                <p className="text-xs text-amber-400 flex items-center mt-2">
                  5 Overdue Accounts
                </p>
              </div>
              <div className="h-14 w-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          index={0}
          label="Parts In Stock"
          value={dashboardStats.partsInStock}
          icon={Package}
          color="bg-gradient-to-br from-cyan-500 to-cyan-600"
          trend="+8.2% this week"
          trendUp={true}
        />
        <StatCard 
          index={1}
          label="Customers"
          value={dashboardStats.totalCustomers}
          icon={Users}
          color="bg-gradient-to-br from-amber-500 to-orange-500"
          trend="+3 new today"
          trendUp={true}
        />
        <StatCard 
          index={2}
          label="Cars In Stock"
          value={dashboardStats.carsInStock}
          icon={Car}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          trend="2 sold this week"
          trendUp={true}
        />
        <StatCard 
          index={3}
          label="Mechanics"
          value={dashboardStats.mechanics}
          icon={Wrench}
          color="bg-gradient-to-br from-rose-500 to-red-600"
          trend="All available"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart */}
        <Card className="lg:col-span-2 shadow-sm border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Monthly Repairs</CardTitle>
                  <p className="text-sm text-slate-500">Jan - Dec 2025</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((range) => (
                  <Button 
                    key={range}
                    variant={timeRange === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className="text-xs capitalize"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={repairData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRepairs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="repairs" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRepairs)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar with Donut + Activity */}
        <div className="space-y-6">
          
          {/* Work Order Status */}
          <Card className="shadow-sm border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg font-semibold">Work Orders</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData2}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {donutData2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">68%</span>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {donutData2.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS_STATUS[i] }} />
                    <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <ActivityItem 
                icon={CheckCircle2}
                title="Work order #1234 completed"
                time="2 mins ago"
                status="success"
              />
              <ActivityItem 
                icon={Clock}
                title="New appointment scheduled"
                time="15 mins ago"
                status="info"
              />
              <ActivityItem 
                icon={AlertCircle}
                title="Part low stock alert"
                time="1 hour ago"
                status="warning"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard 
            icon={FileText}
            title="New Work Order"
            subtitle="Create repair job"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <QuickActionCard 
            icon={Users}
            title="Add Customer"
            subtitle="Register new client"
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
          <QuickActionCard 
            icon={Car}
            title="Check-In Vehicle"
            subtitle="Start inspection"
            color="bg-gradient-to-br from-amber-500 to-amber-600"
          />
          <QuickActionCard 
            icon={Package}
            title="Manage Inventory"
            subtitle="Parts & supplies"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>
      </div>

    </div>
  )
}
