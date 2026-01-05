"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronRight,
  CircleDollarSign
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

// Sample profit data - In production, from Convex
const profitLineItems = [
  {
    id: '1',
    roNumber: 'RO-2025-0145',
    customer: 'Ahmed Mohamed',
    job: 'Oil Change & Filter',
    items: [
      { type: 'Labor', name: 'Oil Change Labor', qty: 0.5, rate: 95, price: 47.50, cost: 15, profit: 32.50, margin: 68.4 },
      { type: 'Part', name: 'Oil Filter (OEM)', qty: 1, rate: 18.99, price: 18.99, cost: 8.50, profit: 10.49, margin: 55.2 },
      { type: 'Part', name: 'Synthetic Oil 5W-30 5Qt', qty: 1, rate: 42.99, price: 42.99, cost: 22.00, profit: 20.99, margin: 48.8 },
    ]
  },
  {
    id: '2',
    roNumber: 'RO-2025-0146',
    customer: 'Farah Hassan',
    job: 'Brake Pad Replacement',
    items: [
      { type: 'Labor', name: 'Front Brake Service', qty: 1.5, rate: 95, price: 142.50, cost: 45, profit: 97.50, margin: 68.4 },
      { type: 'Part', name: 'Front Brake Pads (Ceramic)', qty: 1, rate: 89.99, price: 89.99, cost: 38.00, profit: 51.99, margin: 57.8 },
      { type: 'Part', name: 'Brake Rotor Front Left', qty: 1, rate: 75.00, price: 75.00, cost: 32.00, profit: 43.00, margin: 57.3 },
      { type: 'Part', name: 'Brake Rotor Front Right', qty: 1, rate: 75.00, price: 75.00, cost: 32.00, profit: 43.00, margin: 57.3 },
    ]
  },
  {
    id: '3',
    roNumber: 'RO-2025-0147',
    customer: 'Omar Ali',
    job: 'AC Recharge',
    items: [
      { type: 'Labor', name: 'AC Diagnosis & Recharge', qty: 1, rate: 95, price: 95.00, cost: 30, profit: 65.00, margin: 68.4 },
      { type: 'Part', name: 'R-134a Refrigerant', qty: 2, rate: 25.00, price: 50.00, cost: 18.00, profit: 32.00, margin: 64.0 },
      { type: 'Sublet', name: 'AC Compressor Rebuild', qty: 1, rate: 350.00, price: 350.00, cost: 280.00, profit: 70.00, margin: 20.0 },
    ]
  },
]

// Summary data
const summaryData = {
  totalRevenue: 986.97,
  totalCost: 520.50,
  totalProfit: 466.47,
  avgMargin: 47.3,
  laborRevenue: 285.00,
  laborCost: 90.00,
  laborProfit: 195.00,
  partsRevenue: 351.97,
  partsCost: 150.50,
  partsProfit: 201.47,
  subletRevenue: 350.00,
  subletCost: 280.00,
  subletProfit: 70.00,
}

const marginByType = [
  { name: 'Labor', margin: 68.4, target: 65, color: '#3B82F6' },
  { name: 'Parts', margin: 57.3, target: 45, color: '#10B981' },
  { name: 'Sublet', margin: 20.0, target: 15, color: '#F59E0B' },
]

function getMarginColor(margin: number) {
  if (margin >= 55) return 'text-green-600 bg-green-100'
  if (margin >= 40) return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

export function ProfitDetailsReport() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-green-600" />
            Profit Details Report
          </h2>
          <p className="text-muted-foreground">Line-item profitability analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <p className="text-xs text-green-700 uppercase">Total Revenue</p>
            <p className="text-2xl font-bold text-green-800">${summaryData.totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <p className="text-xs text-red-700 uppercase">Total Cost</p>
            <p className="text-2xl font-bold text-red-800">${summaryData.totalCost.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <p className="text-xs text-blue-700 uppercase">Total Profit</p>
            <p className="text-2xl font-bold text-blue-800">${summaryData.totalProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <p className="text-xs text-purple-700 uppercase">Avg Margin</p>
            <p className="text-2xl font-bold text-purple-800">{summaryData.avgMargin}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Margin by Type Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Margin by Service Type</CardTitle>
          <CardDescription>Target vs Actual GP%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="margin" radius={[0, 4, 4, 0]}>
                  {marginByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search RO#, customer, or job..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="labor">Labor Only</SelectItem>
            <SelectItem value="parts">Parts Only</SelectItem>
            <SelectItem value="sublet">Sublet Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Profit Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>RO # / Customer</TableHead>
                <TableHead>Job</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitLineItems.map((ro) => {
                const isExpanded = expandedRows.includes(ro.id)
                const roRevenue = ro.items.reduce((sum, i) => sum + i.price, 0)
                const roCost = ro.items.reduce((sum, i) => sum + i.cost, 0)
                const roProfit = ro.items.reduce((sum, i) => sum + i.profit, 0)
                const roMargin = (roProfit / roRevenue) * 100

                return (
                  <Collapsible key={ro.id} open={isExpanded} onOpenChange={() => toggleRow(ro.id)} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </TableCell>
                          <TableCell>
                            <div>
                              <span className="font-medium">{ro.roNumber}</span>
                              <p className="text-sm text-muted-foreground">{ro.customer}</p>
                            </div>
                          </TableCell>
                          <TableCell>{ro.job}</TableCell>
                          <TableCell className="text-right font-medium">${roRevenue.toFixed(2)}</TableCell>
                          <TableCell className="text-right text-muted-foreground">${roCost.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">${roProfit.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Badge className={getMarginColor(roMargin)}>
                              {roMargin.toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <>
                          {ro.items.map((item, idx) => (
                            <TableRow key={idx} className="bg-muted/20">
                              <TableCell></TableCell>
                              <TableCell className="pl-10">
                                <Badge variant="outline" className="mr-2 text-xs">
                                  {item.type}
                                </Badge>
                                {item.name}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {item.qty} × ${item.rate.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right text-muted-foreground">${item.cost.toFixed(2)}</TableCell>
                              <TableCell className="text-right text-green-600">${item.profit.toFixed(2)}</TableCell>
                              <TableCell className="text-right">
                                <span className={getMarginColor(item.margin).split(' ')[0]}>
                                  {item.margin.toFixed(1)}%
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Formula Reference */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">📐 Profit Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="font-medium">Rate</span>
              <p className="text-muted-foreground">Price / Quantity</p>
            </div>
            <div>
              <span className="font-medium">Cost</span>
              <p className="text-muted-foreground">Unit Cost × Quantity</p>
            </div>
            <div>
              <span className="font-medium">Profit</span>
              <p className="text-muted-foreground">Price - Cost</p>
            </div>
            <div>
              <span className="font-medium">Margin</span>
              <p className="text-muted-foreground">(Profit / Price) × 100</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
