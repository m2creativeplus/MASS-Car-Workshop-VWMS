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
  MoreHorizontal
} from "lucide-react"
import { useState } from "react"
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

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-6 p-2">
      
      {/* 1. Header is handled by the main layout, so we focus on the content */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-xl font-bold text-orange-600 tracking-tight uppercase">
          MASS WORKSHOP DASHBOARD
        </h2>
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            System Live
          </span>
        </div>
      </motion.div>

      {/* 2. Info Cards Row with Framer Motion Spring Physics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Parts (Cyan/Blue) */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-[#00c0ef] text-white border-none shadow-md overflow-hidden relative cursor-pointer">
            <CardContent className="p-4 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold">465</h3>
                  <p className="text-sm font-medium opacity-90 mt-1">PARTS IN STOCK</p>
                </div>
                <Wrench className="h-16 w-16 opacity-20 absolute right-4 top-2 text-black" />
              </div>
            </CardContent>
            <div className="bg-black/10 p-2 text-center text-xs font-medium cursor-pointer flex justify-center items-center hover:bg-black/20 transition-colors">
              More info <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </Card>
        </motion.div>

        {/* Card 2: Customers (Orange) */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-[#F39C12] text-white border-none shadow-md overflow-hidden relative cursor-pointer">
            <CardContent className="p-4 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold">35</h3>
                  <p className="text-sm font-medium opacity-90 mt-1">CUSTOMERS</p>
                </div>
                <Users className="h-16 w-16 opacity-20 absolute right-4 top-2 text-black" />
              </div>
            </CardContent>
            <div className="bg-black/10 p-2 text-center text-xs font-medium cursor-pointer flex justify-center items-center hover:bg-black/20 transition-colors">
              More info <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </Card>
        </motion.div>

        {/* Card 3: Cars (Green) */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-[#00A65A] text-white border-none shadow-md overflow-hidden relative cursor-pointer">
            <CardContent className="p-4 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold">10</h3>
                  <p className="text-sm font-medium opacity-90 mt-1">CARS IN STOCK</p>
                </div>
                <Car className="h-16 w-16 opacity-20 absolute right-4 top-2 text-black" />
              </div>
            </CardContent>
            <div className="bg-black/10 p-2 text-center text-xs font-medium cursor-pointer flex justify-center items-center hover:bg-black/20 transition-colors">
              More info <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </Card>
        </motion.div>

        {/* Card 4: Mechanics (Red) */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-[#DD4B39] text-white border-none shadow-md overflow-hidden relative cursor-pointer">
            <CardContent className="p-4 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold">12</h3>
                  <p className="text-sm font-medium opacity-90 mt-1">MECHANICS</p>
                </div>
                <Settings className="h-16 w-16 opacity-20 absolute right-4 top-2 text-black" />
              </div>
            </CardContent>
            <div className="bg-black/10 p-2 text-center text-xs font-medium cursor-pointer flex justify-center items-center hover:bg-black/20 transition-colors">
              More info <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </Card>
        </motion.div>

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
