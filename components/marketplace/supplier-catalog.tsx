"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  Package, 
  Filter, 
  Zap,
  Box,
  Truck
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Data derived from MASS_MARKET_INTELLIGENCE.md
const CATEGORIES = [
  { id: "all", label: "All Parts", icon: Box },
  { id: "engine", label: "Engine", icon: Zap },
  { id: "brakes", label: "Brakes", icon: Filter },
  { id: "suspension", label: "Suspension", icon: Truck },
  { id: "electrical", label: "Electrical", icon: Zap },
]

const SUPPLIER_ITEMS = [
  {
    id: 1,
    name: "Fuel Injector Set (2KD-FTV)",
    partNumber: "23670-30050",
    price: 1200,
    currency: "USD",
    supplier: "Sanyare Motors",
    location: "Hargeisa",
    stockStatus: "In Stock",
    tier: "oem", // oem, aftermarket
    image: "/images/parts/injector.png", // placeholder
    delivery: "Instant"
  },
  {
    id: 2,
    name: "Fuel Injector Set (2KD-FTV)",
    partNumber: "23670-30050",
    price: 850,
    currency: "USD",
    supplier: "Autocom Japan",
    location: "Dubai",
    stockStatus: "3 Days",
    tier: "aftermarket",
    image: "/images/parts/injector-box.png",
    delivery: "Air Freight"
  },
  {
    id: 3,
    name: "Front Brake Pads (Prado 150)",
    partNumber: "04465-60320",
    price: 85,
    currency: "USD",
    supplier: "Khaliij Parts",
    location: "Hargeisa",
    stockStatus: "Low Stock",
    tier: "oem",
    delivery: "Instant"
  },
  {
    id: 4,
    name: "Front Brake Pads (Prado 150)",
    partNumber: "04465-60320",
    price: 45,
    currency: "USD",
    supplier: "Al-Baraka",
    location: "Hargeisa",
    stockStatus: "In Stock",
    tier: "aftermarket",
    delivery: "Instant"
  },
]

export function SupplierCatalog() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search part number, VIN or name..." 
            className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                 <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                <ShoppingCart className="w-4 h-4" /> Cart (0)
            </Button>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              activeCategory === cat.id 
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* SUPPLIER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUPPLIER_ITEMS.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
            <div className="p-1">
                <div className="bg-slate-100 dark:bg-slate-950 h-32 rounded-lg flex items-center justify-center relative">
                    <Package className="w-12 h-12 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    {item.tier === "oem" && (
                        <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">OEM</Badge>
                    )}
                    {item.tier === "aftermarket" && (
                        <Badge variant="secondary" className="absolute top-2 right-2">Aftermarket</Badge>
                    )}
                </div>
            </div>
            <CardContent className="p-4 pt-2">
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-xs font-mono text-slate-500">{item.partNumber}</p>
                 </div>
                 <div className="text-right">
                    <span className="block font-bold text-lg text-slate-900 dark:text-white">${item.price}</span>
                 </div>
              </div>

              <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          <Box className="w-3.5 h-3.5" />
                          <span>{item.supplier}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                      </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                       <span className={cn(
                           "flex items-center gap-1",
                           item.stockStatus === "In Stock" ? "text-emerald-500" : "text-amber-500"
                       )}>
                           <span className="w-1.5 h-1.5 rounded-full bg-current" />
                           {item.stockStatus}
                       </span>
                       <span className="text-slate-400">{item.delivery}</span>
                  </div>
              </div>

              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 group-hover:bg-orange-600 dark:group-hover:bg-orange-600 dark:group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
