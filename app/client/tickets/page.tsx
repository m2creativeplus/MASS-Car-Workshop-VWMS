"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";

// Mock tickets for demo
const MOCK_TICKETS = [
  {
    id: "TKT-A1B2C3",
    subject: "Invoice discrepancy for work order #WO-2024-156",
    status: "open",
    priority: "normal",
    category: "billing",
    createdAt: "2024-01-03T10:30:00Z",
    messages: [
      {
        senderId: "customer",
        senderType: "customer",
        message: "I noticed the invoice shows $450 but I was quoted $380. Can you please clarify?",
        timestamp: "2024-01-03T10:30:00Z",
      },
      {
        senderId: "staff",
        senderType: "staff",
        message: "Thank you for reaching out. Let me check the work order details and get back to you shortly.",
        timestamp: "2024-01-03T11:15:00Z",
      },
    ],
  },
  {
    id: "TKT-D4E5F6",
    subject: "Question about warranty on brake service",
    status: "resolved",
    priority: "low",
    category: "general",
    createdAt: "2024-01-01T14:20:00Z",
    messages: [
      {
        senderId: "customer",
        senderType: "customer",
        message: "Does the brake pad replacement come with warranty?",
        timestamp: "2024-01-01T14:20:00Z",
      },
    ],
  },
];

export default function CustomerTicketsPage() {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "general",
    priority: "normal",
    description: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-amber-100 text-amber-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCreateTicket = () => {
    const ticket = {
      id: `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      subject: newTicket.subject,
      status: "open" as const,
      priority: newTicket.priority,
      category: newTicket.category,
      createdAt: new Date().toISOString(),
      messages: [
        {
          senderId: "customer",
          senderType: "customer",
          message: newTicket.description,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setTickets([ticket, ...tickets]);
    setIsDialogOpen(false);
    setNewTicket({ subject: "", category: "general", priority: "normal", description: "" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;
    
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              senderId: "customer",
              senderType: "customer" as const,
              message: newMessage,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return t;
    });
    
    setTickets(updatedTickets);
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
    setNewMessage("");
  };


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Support Tickets
          </h1>
          <p className="text-gray-500">Get help with your repairs and billing</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Input
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(v) => setNewTicket({ ...newTicket, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="repair">Repair Question</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(v) => setNewTicket({ ...newTicket, priority: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTicket}
                  disabled={!newTicket.subject || !newTicket.description}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-3">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className={`cursor-pointer transition-all ${
                selectedTicket?.id === ticket.id
                  ? "ring-2 ring-emerald-500"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-medium text-sm line-clamp-2">{ticket.subject}</h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <MessageSquare className="w-3 h-3" />
                  {ticket.messages.length} messages
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedTicket.subject}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Ticket #{selectedTicket.id}
                    </p>
                  </div>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status === "resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {selectedTicket.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedTicket.messages.map((msg: any, idx: number) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.senderType === "customer" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.senderType === "customer"
                            ? "bg-emerald-100 dark:bg-emerald-900"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                {selectedTicket.status !== "closed" && (
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a ticket to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
