"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  Settings,
  Building2,
  CreditCard,
  Clock,
  Bell,
  Globe,
  Receipt,
  Calculator,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Organization Data
const DEFAULT_ORG = {
  name: "MASS Workshop Hargeisa",
  email: "info@massworkshop.so",
  phone: "+252 63 4 123456",
  address: "26th June Road, Hargeisa, Somaliland",
  website: "https://mass-workshop.vercel.app",
  taxId: "SL-TAX-2024-001",
}

const DEFAULT_BUSINESS = {
  currency: "USD",
  timezone: "Africa/Nairobi",
  taxRate: 5,
  invoicePrefix: "INV-",
  invoiceStartNumber: 1001,
  estimatePrefix: "EST-",
  workOrderPrefix: "WO-",
  workingHoursStart: "08:00",
  workingHoursEnd: "18:00",
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Sat"],
}

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "SLSH", name: "Somaliland Shilling", symbol: "Sl.Sh" },
  { code: "SOS", name: "Somali Shilling", symbol: "S.Sh" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
]

const TIMEZONES = [
  "Africa/Nairobi",
  "Africa/Mogadishu",
  "Africa/Addis_Ababa",
  "Africa/Djibouti",
  "Asia/Dubai",
]

export function SystemSettingsEditor() {
  const [org, setOrg] = useState(DEFAULT_ORG)
  const [business, setBusiness] = useState(DEFAULT_BUSINESS)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("organization")

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-orange-500" />
            System Settings
          </h2>
          <p className="text-slate-500">
            Organization profile, business rules, and system configuration
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-orange-600 hover:bg-orange-700">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-900">
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="w-4 h-4" /> Organization
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" /> Billing & Tax
          </TabsTrigger>
          <TabsTrigger value="operations" className="gap-2">
            <Clock className="w-4 h-4" /> Operations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        {/* ORGANIZATION TAB */}
        <TabsContent value="organization" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Organization Profile
              </CardTitle>
              <CardDescription>Basic information about your workshop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input 
                    value={org.name}
                    onChange={(e) => setOrg({ ...org, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    type="email"
                    value={org.email}
                    onChange={(e) => setOrg({ ...org, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    value={org.phone}
                    onChange={(e) => setOrg({ ...org, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input 
                    value={org.website}
                    onChange={(e) => setOrg({ ...org, website: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea 
                  value={org.address}
                  onChange={(e) => setOrg({ ...org, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Registration ID</Label>
                <Input 
                  value={org.taxId}
                  onChange={(e) => setOrg({ ...org, taxId: e.target.value })}
                  className="max-w-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" /> Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-slate-900"
                    value={business.currency}
                    onChange={(e) => setBusiness({ ...business, currency: e.target.value })}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.symbol} {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-slate-900"
                    value={business.timezone}
                    onChange={(e) => setBusiness({ ...business, timezone: e.target.value })}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Tax Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Default Tax Rate (%)</Label>
                  <Input 
                    type="number"
                    value={business.taxRate}
                    onChange={(e) => setBusiness({ ...business, taxRate: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" /> Document Numbering
              </CardTitle>
              <CardDescription>Prefixes and starting numbers for invoices, estimates, and work orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Invoice Prefix</Label>
                  <Input 
                    value={business.invoicePrefix}
                    onChange={(e) => setBusiness({ ...business, invoicePrefix: e.target.value })}
                  />
                  <p className="text-xs text-slate-500">Next: {business.invoicePrefix}{business.invoiceStartNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label>Estimate Prefix</Label>
                  <Input 
                    value={business.estimatePrefix}
                    onChange={(e) => setBusiness({ ...business, estimatePrefix: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Work Order Prefix</Label>
                  <Input 
                    value={business.workOrderPrefix}
                    onChange={(e) => setBusiness({ ...business, workOrderPrefix: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OPERATIONS TAB */}
        <TabsContent value="operations" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Opening Time</Label>
                  <Input 
                    type="time"
                    value={business.workingHoursStart}
                    onChange={(e) => setBusiness({ ...business, workingHoursStart: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Closing Time</Label>
                  <Input 
                    type="time"
                    value={business.workingHoursEnd}
                    onChange={(e) => setBusiness({ ...business, workingHoursEnd: e.target.value })}
                  />
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-3">
                <Label>Working Days</Label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        const newDays = business.workingDays.includes(day)
                          ? business.workingDays.filter(d => d !== day)
                          : [...business.workingDays, day]
                        setBusiness({ ...business, workingDays: newDays })
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg border transition-all",
                        business.workingDays.includes(day)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email-new-job", label: "Email notification for new jobs", enabled: true },
                { id: "email-payment", label: "Email notification for payments", enabled: true },
                { id: "sms-ready", label: "SMS when vehicle is ready", enabled: false },
                { id: "whatsapp-reminder", label: "WhatsApp appointment reminders", enabled: false },
              ].map((pref) => (
                <div 
                  key={pref.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <span className="font-medium">{pref.label}</span>
                  <Switch defaultChecked={pref.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
