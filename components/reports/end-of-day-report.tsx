"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Car,
  Wrench,
  Users,
  CreditCard,
  Banknote,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Download
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// Sample EOD Data - In production, this would come from Convex
const eodData = {
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  financial: {
    totalROCount: 12,
    grossSales: 8450,
    netSales: 7850,
    partsSales: 3200,
    laborSales: 4100,
    subletSales: 550,
    fees: 600,
    discounts: 600,
  },
  performance: {
    closeRatio: 62,
    effectiveLaborRate: 95,
    aro: 654.17,
    awro: 1054.17,
    hoursBilled: 43.2,
    partsGP: 48.5,
    laborGP: 72.3,
  },
  payments: {
    cash: 1850,
    card: 4200,
    check: 800,
    financing: 500,
    ar: 500,
    other: 0,
  },
  comparison: {
    salesChange: 12.5,
    carCountChange: 8.3,
    aroChange: 4.2,
  }
}

const paymentBreakdown = [
  { name: 'Card', value: eodData.payments.card, color: '#3B82F6' },
  { name: 'Cash', value: eodData.payments.cash, color: '#10B981' },
  { name: 'Check', value: eodData.payments.check, color: '#F59E0B' },
  { name: 'Financing', value: eodData.payments.financing, color: '#8B5CF6' },
  { name: 'A/R', value: eodData.payments.ar, color: '#EF4444' },
]

const salesBreakdown = [
  { name: 'Labor', value: eodData.financial.laborSales, color: '#3B82F6' },
  { name: 'Parts', value: eodData.financial.partsSales, color: '#10B981' },
  { name: 'Sublet', value: eodData.financial.subletSales, color: '#F59E0B' },
  { name: 'Fees', value: eodData.financial.fees, color: '#8B5CF6' },
]

const hourlyData = [
  { hour: '8AM', sales: 450, cars: 2 },
  { hour: '9AM', sales: 890, cars: 3 },
  { hour: '10AM', sales: 1200, cars: 2 },
  { hour: '11AM', sales: 750, cars: 1 },
  { hour: '12PM', sales: 320, cars: 1 },
  { hour: '1PM', sales: 580, cars: 2 },
  { hour: '2PM', sales: 1450, cars: 3 },
  { hour: '3PM', sales: 980, cars: 2 },
  { hour: '4PM', sales: 730, cars: 2 },
  { hour: '5PM', sales: 500, cars: 1 },
]

// KPI Status Helper
function getKPIStatus(value: number, target: number, isHigherBetter = true) {
  const ratio = value / target
  if (isHigherBetter) {
    if (ratio >= 1) return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle }
    if (ratio >= 0.85) return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle }
    return { color: 'text-red-600', bg: 'bg-red-100', icon: TrendingDown }
  }
  // For metrics where lower is better
  if (ratio <= 1) return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle }
  if (ratio <= 1.15) return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle }
  return { color: 'text-red-600', bg: 'bg-red-100', icon: TrendingDown }
}

export function EndOfDayReport() {
  const [dateRange, setDateRange] = useState("today")

  const closeRatioStatus = getKPIStatus(eodData.performance.closeRatio, 50)
  const partsGPStatus = getKPIStatus(eodData.performance.partsGP, 45)
  const laborGPStatus = getKPIStatus(eodData.performance.laborGP, 65)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            End of Day Report
          </h2>
          <p className="text-muted-foreground">{eodData.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">RO Count</p>
                <p className="text-2xl font-bold">{eodData.financial.totalROCount}</p>
              </div>
              <Car className="h-8 w-8 text-primary/20" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+{eodData.comparison.carCountChange}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Gross Sales</p>
                <p className="text-2xl font-bold">${eodData.financial.grossSales.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500/20" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+{eodData.comparison.salesChange}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Net Sales</p>
                <p className="text-2xl font-bold">${eodData.financial.netSales.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">After discounts</p>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${closeRatioStatus.color.replace('text-', 'border-l-')}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Close Ratio</p>
                <p className={`text-2xl font-bold ${closeRatioStatus.color}`}>{eodData.performance.closeRatio}%</p>
              </div>
              <Target className="h-8 w-8 text-muted/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: ≥50%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">ARO</p>
                <p className="text-2xl font-bold">${eodData.performance.aro.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500/20" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+{eodData.comparison.aroChange}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Hours Billed</p>
                <p className="text-2xl font-bold">{eodData.performance.hoursBilled}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Labor hours sold</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Hourly Sales Performance</CardTitle>
            <CardDescription>Revenue generated throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value}`, 'Sales']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Breakdown Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>How customers paid today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {paymentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Financial Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Parts Sales</span>
              <span className="font-medium">${eodData.financial.partsSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Labor Sales</span>
              <span className="font-medium">${eodData.financial.laborSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sublet</span>
              <span className="font-medium">${eodData.financial.subletSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fees</span>
              <span className="font-medium">${eodData.financial.fees.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gross Total</span>
              <span className="font-bold text-green-600">${eodData.financial.grossSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-500">Discounts</span>
              <span className="font-medium text-red-500">-${eodData.financial.discounts.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-medium">Net Sales</span>
              <span className="font-bold text-lg">${eodData.financial.netSales.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance KPIs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Close Ratio</span>
                <Badge className={`${closeRatioStatus.bg} ${closeRatioStatus.color}`}>
                  {eodData.performance.closeRatio}% <span className="ml-1 opacity-70">(≥50%)</span>
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${Math.min(eodData.performance.closeRatio, 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Parts GP%</span>
                <Badge className={`${partsGPStatus.bg} ${partsGPStatus.color}`}>
                  {eodData.performance.partsGP}% <span className="ml-1 opacity-70">(≥45%)</span>
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min(eodData.performance.partsGP, 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Labor GP%</span>
                <Badge className={`${laborGPStatus.bg} ${laborGPStatus.color}`}>
                  {eodData.performance.laborGP}% <span className="ml-1 opacity-70">(≥65%)</span>
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${Math.min(eodData.performance.laborGP, 100)}%` }}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Eff. Labor Rate</p>
                <p className="text-lg font-bold">${eodData.performance.effectiveLaborRate}/hr</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AWRO</p>
                <p className="text-lg font-bold">${eodData.performance.awro.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Banknote className="h-4 w-4" /> Cash
              </span>
              <span className="font-medium">${eodData.payments.cash.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Credit/Debit
              </span>
              <span className="font-medium">${eodData.payments.card.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Check</span>
              <span className="font-medium">${eodData.payments.check.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Financing</span>
              <span className="font-medium">${eodData.payments.financing.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">A/R (Charge)</span>
              <span className="font-medium text-amber-600">${eodData.payments.ar.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Collected</span>
              <span className="font-bold text-lg text-green-600">
                ${(eodData.payments.cash + eodData.payments.card + eodData.payments.check + eodData.payments.financing).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formula Reference (Collapsible) */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">📊 KPI Formulas Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="font-medium">Close Ratio</span>
              <p className="text-muted-foreground">(Approved $ / Written $) × 100</p>
            </div>
            <div>
              <span className="font-medium">ARO</span>
              <p className="text-muted-foreground">Total Sales / Car Count</p>
            </div>
            <div>
              <span className="font-medium">Eff. Labor Rate</span>
              <p className="text-muted-foreground">Labor Sales / Billed Hours</p>
            </div>
            <div>
              <span className="font-medium">GP% (Margin)</span>
              <p className="text-muted-foreground">(Revenue - Cost) / Revenue × 100</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
