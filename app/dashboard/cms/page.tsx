"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  FileText,
  Palette,
  Menu,
  Shield,
  Settings,
  Workflow,
  DollarSign,
  Layers,
  Zap,
  History,
  Activity,
  Calendar,
  Webhook,
  Image as ImageIcon,
  Languages,
  ShieldCheck
} from "lucide-react"

// Import ALL CMS Modules (Original + New Enterprise Features)
import { ContentManagementEditor } from "@/components/cms/content-management-editor"
import { BrandingThemeEditor } from "@/components/cms/branding-theme-editor"
import { NavigationUIEditor } from "@/components/cms/navigation-ui-editor"
import { RoleExperienceEditor } from "@/components/cms/role-experience-editor"
import { SystemSettingsEditor } from "@/components/cms/system-settings-editor"
import { WorkflowEditor } from "@/components/cms/workflow-editor"
import { MarketPricingEditor } from "@/components/cms/market-pricing-editor"

// Enterprise Features (Benchmarked from Contentful/Strapi/Tekmetric)
import { ContentVersioning } from "@/components/cms/content-versioning"
import { AuditLogViewer } from "@/components/cms/audit-log-viewer"
import { ScheduledPublishing } from "@/components/cms/scheduled-publishing"
import { WebhooksApiManager } from "@/components/cms/webhooks-api-manager"
import { MediaLibrary } from "@/components/cms/media-library"
import { LocalizationPanel } from "@/components/cms/localization-panel"
import { ActivityFeed } from "@/components/cms/activity-feed"

export default function CMSControlCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              CMS CONTROL CENTER
            </Badge>
            <Badge variant="outline" className="text-slate-500">v2.0 Enterprise</Badge>
            <Badge className="bg-emerald-100 text-emerald-700 border-0 gap-1">
              <ShieldCheck className="w-3 h-3" /> Government-Grade
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            MASS OSS – Operational CMS
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Enterprise content management with versioning, audit logs, and multi-language support.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Zap className="w-4 h-4 text-orange-500" />
          <span>Benchmarked against Contentful, Strapi, & Tekmetric</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {[
          { label: "Pages", value: "5", icon: FileText, color: "text-blue-500" },
          { label: "Workflows", value: "2", icon: Workflow, color: "text-purple-500" },
          { label: "Roles", value: "4", icon: Shield, color: "text-emerald-500" },
          { label: "Webhooks", value: "3", icon: Webhook, color: "text-cyan-500" },
          { label: "Languages", value: "3", icon: Languages, color: "text-amber-500" },
          { label: "Media Files", value: "156", icon: ImageIcon, color: "text-pink-500" },
          { label: "Audit Events", value: "1.2K", icon: Activity, color: "text-orange-500" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main CMS Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 h-auto flex-wrap gap-1">
          {/* Core CMS Modules */}
          <TabsTrigger value="content" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <FileText className="w-4 h-4" /> Content
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <ImageIcon className="w-4 h-4" /> Media
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Palette className="w-4 h-4" /> Branding
          </TabsTrigger>
          <TabsTrigger value="navigation" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Menu className="w-4 h-4" /> Navigation
          </TabsTrigger>
          <TabsTrigger value="localization" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Languages className="w-4 h-4" /> Languages
          </TabsTrigger>
          {/* Enterprise Features */}
          <TabsTrigger value="scheduling" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Calendar className="w-4 h-4" /> Scheduling
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Webhook className="w-4 h-4" /> Webhooks
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Shield className="w-4 h-4" /> Audit Logs
          </TabsTrigger>
          {/* Operations */}
          <TabsTrigger value="roles" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Shield className="w-4 h-4" /> RBAC
          </TabsTrigger>
          <TabsTrigger value="workflows" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Workflow className="w-4 h-4" /> Workflows
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* CONTENT */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentManagementEditor />
            </div>
            <div className="space-y-6">
              <ContentVersioning />
              <ActivityFeed limit={5} />
            </div>
          </div>
        </TabsContent>

        {/* MEDIA */}
        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>

        {/* BRANDING */}
        <TabsContent value="branding">
          <BrandingThemeEditor />
        </TabsContent>

        {/* NAVIGATION */}
        <TabsContent value="navigation">
          <NavigationUIEditor />
        </TabsContent>

        {/* LOCALIZATION */}
        <TabsContent value="localization">
          <LocalizationPanel />
        </TabsContent>

        {/* SCHEDULING */}
        <TabsContent value="scheduling">
          <ScheduledPublishing />
        </TabsContent>

        {/* WEBHOOKS */}
        <TabsContent value="webhooks">
          <WebhooksApiManager />
        </TabsContent>

        {/* AUDIT LOGS */}
        <TabsContent value="audit">
          <AuditLogViewer />
        </TabsContent>

        {/* RBAC */}
        <TabsContent value="roles">
          <RoleExperienceEditor />
        </TabsContent>

        {/* WORKFLOWS */}
        <TabsContent value="workflows">
          <WorkflowEditor />
        </TabsContent>

        {/* SETTINGS */}
        <TabsContent value="settings">
          <SystemSettingsEditor />
        </TabsContent>
      </Tabs>

      {/* Architecture Badge */}
      <div className="flex justify-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 text-sm">
          <Layers className="w-4 h-4" />
          <span>MASS OSS CMS-as-Modules Architecture v2.0 (Enterprise Edition)</span>
        </div>
      </div>
    </div>
  )
}
