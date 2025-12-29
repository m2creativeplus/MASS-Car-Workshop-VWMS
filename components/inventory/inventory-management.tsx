"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Plus, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Filter,
  Download
} from "lucide-react"

// Mock inventory data
const mockInventory = [
  { id: "P-001", name: "Engine Oil 5W-30", category: "Fluids", sku: "OIL-5W30-4L", quantity: 45, minStock: 20, maxStock: 100, cost: 25, price: 45, supplier: "Gulf Oil", location: "A-12" },
  { id: "P-002", name: "Brake Pads (Front)", category: "Brakes", sku: "BP-FRONT-001", quantity: 8, minStock: 10, maxStock: 30, cost: 85, price: 150, supplier: "Bosch", location: "B-05" },
  { id: "P-003", name: "Oil Filter", category: "Filters", sku: "OF-STD-001", quantity: 62, minStock: 25, maxStock: 100, cost: 8, price: 15, supplier: "Mann Filter", location: "A-15" },
  { id: "P-004", name: "Air Filter", category: "Filters", sku: "AF-STD-001", quantity: 34, minStock: 20, maxStock: 80, cost: 12, price: 22, supplier: "Mann Filter", location: "A-16" },
  { id: "P-005", name: "Spark Plugs (Set of 4)", category: "Ignition", sku: "SP-SET4-001", quantity: 18, minStock: 15, maxStock: 50, cost: 32, price: 60, supplier: "NGK", location: "C-03" },
  { id: "P-006", name: "Coolant 5L", category: "Fluids", sku: "COOL-5L-001", quantity: 3, minStock: 10, maxStock: 40, cost: 22, price: 40, supplier: "Shell", location: "A-14" },
  { id: "P-007", name: "Brake Fluid DOT 4", category: "Fluids", sku: "BF-DOT4-500ML", quantity: 28, minStock: 15, maxStock: 50, cost: 18, price: 32, supplier: "Castrol", location: "A-13" },
  { id: "P-008", name: "Wiper Blades (Pair)", category: "Accessories", sku: "WB-PAIR-001", quantity: 22, minStock: 15, maxStock: 40, cost: 15, price: 28, supplier: "Bosch", location: "D-02" },
]

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredInventory = mockInventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const lowStockItems = filteredInventory.filter(item => item.quantity <= item.minStock)
  const overStockItems = filteredInventory.filter(item => item.quantity >= item.maxStock)
  
  const totalValue = mockInventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0)
  const potentialProfit = mockInventory.reduce((sum, item) => sum + (item.quantity * (item.price - item.cost)), 0)

  const displayItems = activeTab === "low" ? lowStockItems : activeTab === "over" ? overStockItems : filteredInventory

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Management</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{mockInventory.length}</p>
              </div>
              <Package className="h-10 w-10 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Low Stock</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-red-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Potential Profit</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">${potentialProfit.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Items ({filteredInventory.length})</TabsTrigger>
            <TabsTrigger value="low" className="text-red-600">
              Low Stock ({lowStockItems.length})
            </TabsTrigger>
            <TabsTrigger value="over">Overstock ({overStockItems.length})</TabsTrigger>
          </TabsList>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-semibold text-sm text-slate-700 dark:text-slate-300">
              <div className="col-span-3">Item Details</div>
              <div className="col-span-1">SKU</div>
              <div className="col-span-1 text-center">Stock</div>
              <div className="col-span-1 text-center">Min/Max</div>
              <div className="col-span-1 text-right">Cost</div>
              <div className="col-span-1 text-right">Price</div>
              <div className="col-span-1 text-right">Margin</div>
              <div className="col-span-2">Supplier</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {displayItems.map((item) => {
                const isLowStock = item.quantity <= item.minStock
                const isOverStock = item.quantity >= item.maxStock
                const margin = ((item.price - item.cost) / item.cost * 100).toFixed(1)

                return (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Item Details */}
                    <div className="col-span-3">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{item.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Loc: {item.location}</span>
                      </div>
                    </div>

                    {/* SKU */}
                    <div className="col-span-1 flex items-center">
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{item.sku}</code>
                    </div>

                    {/* Stock */}
                    <div className="col-span-1 flex items-center justify-center">
                      <div className={`
                        px-3 py-1 rounded-full font-bold text-sm
                        ${isLowStock ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                          isOverStock ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' : 
                          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}
                      `}>
                        {item.quantity}
                      </div>
                    </div>

                    {/* Min/Max */}
                    <div className="col-span-1 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400">
                      {item.minStock}/{item.maxStock}
                    </div>

                    {/* Cost */}
                    <div className="col-span-1 flex items-center justify-end text-sm font-medium">
                      ${item.cost}
                    </div>

                    {/* Price */}
                    <div className="col-span-1 flex items-center justify-end text-sm font-semibold text-green-600">
                      ${item.price}
                    </div>

                    {/* Margin */}
                    <div className="col-span-1 flex items-center justify-end">
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {margin}%
                      </Badge>
                    </div>

                    {/* Supplier */}
                    <div className="col-span-2 flex items-center text-sm text-slate-600 dark:text-slate-400">
                      {item.supplier}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Order
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
