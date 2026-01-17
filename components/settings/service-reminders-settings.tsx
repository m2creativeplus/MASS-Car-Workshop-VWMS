"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  MessageSquare,
  Clock,
  Calendar,
  Settings,
  Send,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Mail,
  Zap,
  Plus,
  Trash2,
  Edit2
} from "lucide-react";
import { SMS_TEMPLATES } from "@/lib/sms-automation";

interface ReminderRule {
  id: string;
  name: string;
  trigger: string;
  channel: "sms" | "email" | "both";
  timing: string;
  enabled: boolean;
}

const DEFAULT_RULES: ReminderRule[] = [
  { id: "1", name: "Service Due Reminder", trigger: "30 days before service due", channel: "sms", timing: "9:00 AM", enabled: true },
  { id: "2", name: "Appointment Confirmation", trigger: "On booking", channel: "both", timing: "Immediate", enabled: true },
  { id: "3", name: "24h Reminder", trigger: "24 hours before appointment", channel: "sms", timing: "9:00 AM", enabled: true },
  { id: "4", name: "Vehicle Ready", trigger: "Work order complete", channel: "sms", timing: "Immediate", enabled: true },
  { id: "5", name: "Invoice Follow-up", trigger: "7 days after unpaid invoice", channel: "email", timing: "10:00 AM", enabled: false },
  { id: "6", name: "Thank You", trigger: "After payment received", channel: "sms", timing: "Immediate", enabled: true },
];

/**
 * Service Reminders Settings
 * 
 * Configure SMS/Email automation rules
 * Source: M2 Dev Library - n8n automation
 */
export function ServiceRemindersSettings() {
  const [rules, setRules] = useState<ReminderRule[]>(DEFAULT_RULES);
  const [testPhone, setTestPhone] = useState("");
  const [isSending, setIsSending] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const sendTestSms = async () => {
    if (!testPhone) return;
    setIsSending(true);
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    setIsSending(false);
    alert(`Test SMS sent to ${testPhone}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-orange-500" />
            Service Reminders
          </h1>
          <p className="text-muted-foreground">
            Automated SMS and email notifications
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 gap-1">
          <Zap className="h-3 w-3" />
          n8n Powered
        </Badge>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules" className="gap-2">
            <Settings className="h-4 w-4" />
            Automation Rules
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="test" className="gap-2">
            <Send className="h-4 w-4" />
            Test
          </TabsTrigger>
        </TabsList>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-3">
            {rules.map(rule => (
              <Card key={rule.id} className={!rule.enabled ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {rule.name}
                          <Badge variant="outline" className="gap-1">
                            {rule.channel === "sms" && <Smartphone className="h-3 w-3" />}
                            {rule.channel === "email" && <Mail className="h-3 w-3" />}
                            {rule.channel === "both" && (
                              <>
                                <Smartphone className="h-3 w-3" />
                                <Mail className="h-3 w-3" />
                              </>
                            )}
                            {rule.channel}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {rule.trigger}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {rule.timing}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <Card className="bg-slate-50 dark:bg-slate-900">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">1,247</p>
                  <p className="text-xs text-muted-foreground">SMS Sent This Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">98.2%</p>
                  <p className="text-xs text-muted-foreground">Delivery Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">23</p>
                  <p className="text-xs text-muted-foreground">Appointments Booked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          {Object.entries(SMS_TEMPLATES).map(([key, templateFn]) => (
            <Card key={key}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm capitalize flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-orange-500" />
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {templateFn({
                    customerId: "123",
                    customerName: "Ahmed",
                    phone: "+252631234567",
                    vehicleMake: "Toyota",
                    vehicleModel: "Land Cruiser",
                    serviceType: "Oil Change",
                    dueDate: "Jan 20, 2026",
                    appointmentTime: "10:00 AM",
                  })}
                </pre>
                <Button variant="ghost" size="sm" className="mt-2 gap-1">
                  <Edit2 className="h-3 w-3" />
                  Edit Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Test Tab */}
        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Test SMS</CardTitle>
              <CardDescription>
                Test your SMS configuration with a sample message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+252 63 123 4567"
                  value={testPhone}
                  onChange={e => setTestPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Message Preview</Label>
                <Textarea
                  value={SMS_TEMPLATES.serviceReminder({
                    customerId: "test",
                    customerName: "Test User",
                    phone: testPhone,
                    vehicleMake: "Toyota",
                    vehicleModel: "Land Cruiser",
                    serviceType: "Oil Change",
                    dueDate: "Tomorrow",
                  })}
                  readOnly
                  rows={4}
                />
              </div>
              <Button 
                className="w-full gap-2 bg-orange-500 hover:bg-orange-600"
                onClick={sendTestSms}
                disabled={!testPhone || isSending}
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Test SMS
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>n8n Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>n8n Webhook URL</Label>
                <Input
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  type="password"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Zaad API Key</Label>
                  <Input placeholder="••••••••" type="password" />
                </div>
                <div className="space-y-2">
                  <Label>eDahab API Key</Label>
                  <Input placeholder="••••••••" type="password" />
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
