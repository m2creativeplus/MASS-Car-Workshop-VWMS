"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  TrendingUp, 
  TrendingDown,
  Search,
  Plus,
  RefreshCcw,
  DollarSign,
  Car
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Market Data (from MASS_MARKET_INTELLIGENCE.md)
const MARKET_PRICING_DATA = [
  { id: 1, make: "Toyota", model: "Land Cruiser 200", yearRange: "2010-2016", fobPrice: 35000, streetPrice: 50000, margin: 15000, trend: "up" },
  { id: 2, make: "Toyota", model: "Prado 150", yearRange: "2010-2016", fobPrice: 20000, streetPrice: 30000, margin: 10000, trend: "stable" },
  { id: 3, make: "Toyota", model: "Hilux", yearRange: "2010-2016", fobPrice: 12000, streetPrice: 18000, margin: 6000, trend: "up" },
  { id: 4, make: "Toyota", model: "Vitz (Yaris)", yearRange: "2010-2016", fobPrice: 3500, streetPrice: 5500, margin: 2000, trend: "down" },
  { id: 5, make: "Toyota", model: "Corolla", yearRange: "2010-2016", fobPrice: 5500, streetPrice: 9000, margin: 3500, trend: "stable" },
  { id: 6, make: "Suzuki", model: "Escudo", yearRange: "2010-2016", fobPrice: 6500, streetPrice: 10000, margin: 3500, trend: "up" },
  { id: 7, make: "Suzuki", model: "Jimny", yearRange: "2010-2018", fobPrice: 7000, streetPrice: 11000, margin: 4000, trend: "up" },
  { id: 8, make: "Suzuki", model: "Every", yearRange: "2010-2017", fobPrice: 4000, streetPrice: 6500, margin: 2500, trend: "stable" },
]

export function MarketPricingEditor() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = MARKET_PRICING_DATA.filter(item => 
    item.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-orange-500" />
            Market Price Index
          </h2>
          <p className="text-slate-500">
            Hargeisa Street Prices vs Japan FOB (The Arbitrage Database)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Sync Prices
          </Button>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4" /> Add Model
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search by make or model..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Toyota</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Suzuki</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Honda</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Nissan</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900">
                <TableHead className="font-semibold">Vehicle</TableHead>
                <TableHead className="text-right font-semibold">FOB Japan</TableHead>
                <TableHead className="text-right font-semibold">Hargeisa Street</TableHead>
                <TableHead className="text-right font-semibold">Margin</TableHead>
                <TableHead className="text-center font-semibold">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Car className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{item.make} {item.model}</p>
                        <p className="text-xs text-slate-500">{item.yearRange}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-slate-600 dark:text-slate-300">
                    ${item.fobPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-slate-900 dark:text-white">
                    ${item.streetPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +${item.margin.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.trend === "up" && (
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1">
                        <TrendingUp className="w-3 h-3" /> Up
                      </Badge>
                    )}
                    {item.trend === "down" && (
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 gap-1">
                        <TrendingDown className="w-3 h-3" /> Down
                      </Badge>
                    )}
                    {item.trend === "stable" && (
                      <Badge variant="outline" className="text-slate-500">Stable</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
