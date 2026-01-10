"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@/components/providers/organization-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Users, 
  DollarSign, 
  Share2, 
  Copy, 
  Plus, 
  ExternalLink,
  TrendingUp
} from "lucide-react"

export default function AffiliateDashboardPage() {
  const { organization } = useOrganization()
  const affiliates = useQuery(api.affiliates.getAffiliates, 
    organization ? { orgId: organization._id } : "skip"
  )
  const createAffiliate = useMutation(api.affiliates.createAffiliate)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    commissionRate: 5,
  })

  // Calculate high-level stats
  const totalAffiliates = affiliates?.length || 0
  const activeAffiliates = affiliates?.filter(a => a.status === "active").length || 0
  const totalPaidOut = affiliates?.reduce((sum, a) => sum + (a.totalEarnings - a.balance), 0) || 0
  const totalPending = affiliates?.reduce((sum, a) => sum + a.balance, 0) || 0

  if (!organization) return null

  const handleCreate = async () => {
    try {
      await createAffiliate({
        orgId: organization._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        code: formData.code.toUpperCase(), // Encourage uppercase codes
        commissionRate: Number(formData.commissionRate),
        paymentMethod: "zaad", // Default
      })
      setIsCreateOpen(false)
      setFormData({ name: "", email: "", phone: "", code: "", commissionRate: 5 })
    } catch (error) {
      console.error("Failed to create affiliate:", error)
      alert("Error: Code might be taken or invalid data.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Affiliate Program</h2>
          <p className="text-muted-foreground">Manage your referral partners and track commissions.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Affiliate
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffiliates}</div>
            <p className="text-xs text-muted-foreground">{activeAffiliates} active now</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaidOut.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime commissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Link</CardTitle>
            <Share2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xs truncate bg-slate-100 dark:bg-slate-800 p-1 rounded">
              mass.app/shop/{organization.slug}
            </div>
            <Button variant="link" size="sm" className="px-0 h-auto mt-1">
              Copy General Link
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="partners">
        <TabsList>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="payouts">Payout Requests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Partners</CardTitle>
              <CardDescription>
                List of all mechanics, influencers, and partners promoting your workshop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                    <tr>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Code</th>
                      <th className="p-4 font-medium">Rate</th>
                      <th className="p-4 font-medium">Pending</th>
                      <th className="p-4 font-medium">Total Earned</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliates?.map((affiliate) => (
                      <tr key={affiliate._id} className="border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="p-4 font-medium">
                          {affiliate.name}
                          <div className="text-xs text-muted-foreground">{affiliate.phone}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-mono">{affiliate.code}</Badge>
                        </td>
                        <td className="p-4">{affiliate.commissionRate}%</td>
                        <td className="p-4 font-bold text-orange-600">${affiliate.balance.toFixed(2)}</td>
                        <td className="p-4 text-muted-foreground">${affiliate.totalEarnings.toFixed(2)}</td>
                        <td className="p-4">
                          <Badge variant={affiliate.status === "active" ? "default" : "secondary"}>
                            {affiliate.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                    {(!affiliates || affiliates.length === 0) && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          No affiliates found. Add your first partner to start tracking referrals.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payouts">
          <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed">
            <DollarSign className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Pending Payout Requests</h3>
            <p className="text-muted-foreground max-w-sm text-center mt-2">
              When affiliates request a withdrawal, it will appear here for your approval.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Affiliate</DialogTitle>
            <DialogDescription>
              Create a new partner account manually. They will recieve an email with their login link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="col-span-3" 
                placeholder="e.g. Garage Jua Kali"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="col-span-3" 
                placeholder="partner@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="col-span-3" 
                placeholder="+252..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">Code</Label>
              <Input 
                id="code" 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="col-span-3 font-mono uppercase" 
                placeholder="e.g. PARTNER20"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rate" className="text-right">Comm. %</Label>
              <Input 
                id="rate" 
                type="number"
                value={formData.commissionRate}
                onChange={(e) => setFormData({...formData, commissionRate: Number(e.target.value)})}
                className="col-span-3" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="bg-orange-500 hover:bg-orange-600">Create Partner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
