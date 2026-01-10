"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Plus,
  Settings,
  DollarSign,
  Package,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample vendor data
  const vendorStats = {
    totalSales: 12500,
    pendingBalance: 3250,
    totalOrders: 45,
    productsListed: 28,
    rating: 4.8,
    reviews: 32,
  }

  const recentOrders = [
    { id: "ORD-001", product: "Brake Pads - Toyota Hilux", amount: 85, status: "completed", date: "2026-01-10" },
    { id: "ORD-002", product: "Oil Filter - Universal", amount: 25, status: "pending", date: "2026-01-10" },
    { id: "ORD-003", product: "Air Filter - Nissan Patrol", amount: 45, status: "shipped", date: "2026-01-09" },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Store className="h-8 w-8 text-orange-500" />
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your products and track sales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="h-5 w-5 text-green-500 mb-2" />
            <div className="text-2xl font-bold">${vendorStats.totalSales.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Sales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="h-5 w-5 text-orange-500 mb-2" />
            <div className="text-2xl font-bold">${vendorStats.pendingBalance.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Pending Balance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <TrendingUp className="h-5 w-5 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{vendorStats.totalOrders}</div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Package className="h-5 w-5 text-purple-500 mb-2" />
            <div className="text-2xl font-bold">{vendorStats.productsListed}</div>
            <div className="text-xs text-muted-foreground">Products Listed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <BarChart3 className="h-5 w-5 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{vendorStats.rating}★</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{vendorStats.reviews}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track and manage your customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{order.product}</div>
                      <div className="text-sm text-muted-foreground">{order.id} • {order.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${order.amount}</span>
                      <Badge className={
                        order.status === "completed" ? "bg-green-500/15 text-green-500" :
                        order.status === "pending" ? "bg-yellow-500/15 text-yellow-500" :
                        "bg-blue-500/15 text-blue-500"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
              <CardDescription>Manage your product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your products will appear here</p>
                <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Track your earnings and withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">${vendorStats.pendingBalance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Available for withdrawal</div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Request Payout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>View your performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 opacity-50" />
              <span className="ml-4">Charts coming soon</span>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
