"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Clock,
  HeartHandshake,
  Wrench,
  AlertTriangle,
  Copy,
  Play,
  Settings,
  MessageSquare,
  Mail,
} from "lucide-react";

interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  trigger: string;
  triggerDays: number;
  icon: React.ElementType;
  color: string;
  smsTemplate: string;
  emailSubject: string;
  isActive: boolean;
}

const defaultTemplates: CampaignTemplate[] = [
  {
    id: "we-miss-you",
    name: "We Miss You",
    description: "Reach out to customers who haven't visited in 90+ days",
    trigger: "Last service date",
    triggerDays: 90,
    icon: HeartHandshake,
    color: "bg-pink-500",
    smsTemplate: "Hi {customer_name}! It's been a while since your last visit to MASS Workshop. We miss you! Book your next service today and get 10% off: {booking_link}",
    emailSubject: "We Miss You at MASS Workshop!",
    isActive: false,
  },
  {
    id: "service-due",
    name: "Service Due Reminder",
    description: "Automated reminders based on mileage or date intervals",
    trigger: "Service interval",
    triggerDays: 180, // 6 months
    icon: Clock,
    color: "bg-orange-500",
    smsTemplate: "Hi {customer_name}! Your {vehicle_make} {vehicle_model} is due for service. Schedule your appointment today: {booking_link}",
    emailSubject: "Service Due for Your {vehicle_make} {vehicle_model}",
    isActive: true,
  },
  {
    id: "declined-followup",
    name: "Declined Service Follow-up",
    description: "Follow up on services customer declined during last visit",
    trigger: "Declined estimate",
    triggerDays: 7,
    icon: AlertTriangle,
    color: "bg-amber-500",
    smsTemplate: "Hi {customer_name}! We noticed you declined the {service_name} for your {vehicle_make}. Ready to reconsider? We can schedule it at your convenience: {booking_link}",
    emailSubject: "About Your Recommended Service - {service_name}",
    isActive: false,
  },
  {
    id: "post-service",
    name: "Post-Service Thank You",
    description: "Thank customers and request feedback after service completion",
    trigger: "Work order closed",
    triggerDays: 1,
    icon: Wrench,
    color: "bg-emerald-500",
    smsTemplate: "Thanks for choosing MASS Workshop, {customer_name}! How was your experience? Leave us a review: {review_link}",
    emailSubject: "Thank You for Choosing MASS Workshop!",
    isActive: true,
  },
];

export function CampaignTemplates() {
  const [templates, setTemplates] = useState<CampaignTemplate[]>(defaultTemplates);
  const [previewTemplate, setPreviewTemplate] = useState<CampaignTemplate | null>(null);

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  const activeCount = templates.filter((t) => t.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaign Templates</h2>
          <p className="text-muted-foreground">
            Based on Tekmetric's proven marketing automation playbook
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {activeCount} / {templates.length} Active
        </Badge>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.id}
              className={`relative overflow-hidden transition-all ${
                template.isActive ? "border-primary shadow-md" : "opacity-75"
              }`}
            >
              {/* Color Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${template.color}`} />

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${template.color} bg-opacity-20`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={template.isActive}
                    onCheckedChange={() => toggleTemplate(template.id)}
                  />
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Trigger: {template.trigger} ({template.triggerDays} days)
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Preview: {previewTemplate?.name}</DialogTitle>
            <DialogDescription>
              Preview how your automated message will appear to customers
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-4 pt-4">
              {/* SMS Preview */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4" /> SMS Message
                </Label>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                  {previewTemplate.smsTemplate}
                </div>
              </div>

              {/* Email Preview */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" /> Email Subject
                </Label>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm font-medium">
                  {previewTemplate.emailSubject}
                </div>
              </div>

              {/* Variables */}
              <div className="text-xs text-muted-foreground pt-2 border-t">
                <strong>Available Variables:</strong> {`{customer_name}`}, {`{vehicle_make}`},{" "}
                {`{vehicle_model}`}, {`{service_name}`}, {`{booking_link}`}, {`{review_link}`}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            <Button onClick={() => setPreviewTemplate(null)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
