"use client"

import { useState } from "react"
import { 
  Settings, 
  Palette, 
  Globe, 
  Database, 
  Upload, 
  ShieldCheck, 
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

import { CMSEditor } from "@/components/admin/cms-editor"
import { BulkUpload } from "@/components/admin/bulk-upload"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    toast.success("Settings saved successfully", {
      description: "Brand personality and system configurations updated.",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Super Admin Settings
          </h1>
          <p className="text-slate-400 mt-1">Configure system-wide branding, CMS content, and data management.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
        >
          {isSaving ? <span className="animate-spin mr-2">⏳</span> : <Save className="h-4 w-4 mr-2" />}
          {isSaving ? "Saving Changes..." : "Save All Changes"}
        </Button>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="bg-slate-900 border border-white/10 p-1 mb-8">
          <TabsTrigger value="branding" className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
            <Palette className="h-4 w-4" /> Branding
          </TabsTrigger>
          <TabsTrigger value="cms" className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
            <Globe className="h-4 w-4" /> CMS Editor
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
            <Database className="h-4 w-4" /> Data & Bulk Upload
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
            <ShieldCheck className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-white/10 text-white">
              <CardHeader>
                <CardTitle>System Theme</CardTitle>
                <CardDescription>Default brand personality for the entire system.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Brand Accent color</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#B68A35] border border-white/20 ring-2 ring-primary ring-offset-2 ring-offset-slate-900" />
                      <div className="w-8 h-8 rounded-full bg-[#C6C6C6] border border-white/20" />
                      <div className="w-8 h-8 rounded-full bg-[#00843D] border border-white/20" />
                      <div className="w-8 h-8 rounded-full bg-[#EF3340] border border-white/20" />
                    </div>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode by Default</Label>
                    <p className="text-xs text-slate-400">Force system to use dark theme for all users.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Logo & Assets</CardTitle>
                <CardDescription>Upload your workshop branding assets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-primary/20 border-2 border-dashed border-primary/40 flex items-center justify-center text-primary">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Main Logo</h4>
                    <p className="text-xs text-slate-400">SVG or PNG recommended (max 2MB).</p>
                    <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 hover:bg-white/10">Replace Logo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cms">
           <Card className="bg-slate-900/50 border-white/10 text-white">
              <CardHeader>
                <CardTitle>CMS Content Editor</CardTitle>
                <CardDescription>Edit public-facing website content and portal messages.</CardDescription>
              </CardHeader>
              <CardContent>
                <CMSEditor />
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="data">
           <Card className="bg-slate-900/50 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Bulk Data Import</CardTitle>
                <CardDescription>Upload CSV or JSON files to seed your workshop data.</CardDescription>
              </CardHeader>
              <CardContent>
                <BulkUpload />
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
