"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Mail, MessageSquare, Send, Sparkles, Star, LayoutTemplate } from "lucide-react"
import { CampaignTemplates } from "@/components/marketing/campaign-templates"
import { ReviewBooster } from "@/components/marketing/review-booster"
import { useOrganization } from "@/components/providers/organization-provider"

export default function MarketingPage() {
  const { organization, isLoading } = useOrganization()
  const campaigns = useQuery(
    api.functions.getCampaigns, 
    organization ? { orgId: organization._id } : "skip"
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Automation</h2>
          <p className="text-muted-foreground">
            Engage customers with automated email and SMS campaigns based on Tekmetric best practices.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">Higher than industry avg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,400</div>
            <p className="text-xs text-muted-foreground">Generated revenue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="templates" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            Campaign Templates
          </TabsTrigger>
          <TabsTrigger value="review-booster" className="gap-2">
            <Star className="h-4 w-4" />
            Review Booster
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="gap-2">
            <Send className="h-4 w-4" />
            All Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <CampaignTemplates />
        </TabsContent>

        <TabsContent value="review-booster">
          <ReviewBooster />
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Manage your active and past marketing blasts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Sent / Opened</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns?.map((campaign) => (
                    <TableRow key={campaign._id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        {campaign.type === "email" ? (
                          <Badge variant="outline"><Mail className="mr-1 h-3 w-3" /> Email</Badge>
                        ) : (
                          <Badge variant="outline"><MessageSquare className="mr-1 h-3 w-3" /> SMS</Badge>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{campaign.targetAudience.replace("_", " ")}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "completed" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.sentCount} / {campaign.openRate ? `${campaign.openRate}%` : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!campaigns || campaigns.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No campaigns found. Start your first campaign!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
