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
  MessageSquare,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
} from "lucide-react"

// Sample tickets
const sampleTickets = [
  {
    _id: "1",
    ticketNumber: "TKT-2026-001",
    subject: "Unable to access dashboard after login",
    status: "open",
    priority: "high",
    createdAt: "2026-01-10T10:30:00",
    lastMessage: "I keep getting redirected to the login page...",
  },
  {
    _id: "2",
    ticketNumber: "TKT-2026-002",
    subject: "Question about invoice export",
    status: "in-progress",
    priority: "normal",
    createdAt: "2026-01-09T14:20:00",
    lastMessage: "Thanks for the clarification. I have one more question...",
  },
  {
    _id: "3",
    ticketNumber: "TKT-2026-003",
    subject: "Feature request: Bulk SMS reminders",
    status: "resolved",
    priority: "low",
    createdAt: "2026-01-08T09:15:00",
    lastMessage: "Great, this feature sounds perfect!",
  },
]

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; icon: any }> = {
    open: { color: "bg-yellow-500/15 text-yellow-500", icon: AlertCircle },
    "in-progress": { color: "bg-blue-500/15 text-blue-500", icon: Clock },
    resolved: { color: "bg-green-500/15 text-green-500", icon: CheckCircle2 },
  }
  const config = statusConfig[status] || statusConfig.open
  const Icon = config.icon

  return (
    <Badge className={config.color}>
      <Icon className="h-3 w-3 mr-1" />
      {status.replace("-", " ")}
    </Badge>
  )
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("tickets")
  const [showNewTicket, setShowNewTicket] = useState(false)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-orange-500" />
            Support Center
          </h1>
          <p className="text-muted-foreground">
            Get help with your account and workshop management
          </p>
        </div>
        <Button 
          onClick={() => setShowNewTicket(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-500">1</div>
            <div className="text-sm text-muted-foreground">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-500">1</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">1</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tickets..." className="pl-9" />
          </div>

          {/* Tickets List */}
          <div className="space-y-3">
            {sampleTickets.map((ticket) => (
              <Card key={ticket._id} className="hover:border-orange-500/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">
                          {ticket.ticketNumber}
                        </span>
                        <StatusBadge status={ticket.status} />
                      </div>
                      <h3 className="font-semibold">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {ticket.lastMessage}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { q: "How do I reset my password?", a: "Go to Settings > Security > Change Password" },
                { q: "How do I add a new technician?", a: "Navigate to Mechanics and click 'Add Technician'" },
                { q: "Can I export my data?", a: "Yes, use the Export Center to download CSVs" },
                { q: "How do I set up ZAAD/eDahab payments?", a: "Go to Settings > Payment Methods to configure" },
              ].map((faq, i) => (
                <div key={i} className="border-b pb-4 last:border-0">
                  <h4 className="font-medium">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="What do you need help with?" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Describe your issue..." rows={5} />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Ticket Modal would go here */}
    </div>
  )
}
