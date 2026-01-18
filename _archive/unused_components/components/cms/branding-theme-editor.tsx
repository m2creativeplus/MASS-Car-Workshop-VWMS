"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Palette, 
  Upload,
  Sun,
  Moon,
  Type,
  Image as ImageIcon,
  Paintbrush,
  Eye,
  Save,
  Loader2,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Brand Configuration
const DEFAULT_BRAND = {
  logoLight: "/logo-light.png",
  logoDark: "/logo-dark.png",
  primaryColor: "#f97316", // MASS Orange
  secondaryColor: "#1e293b", // Slate
  accentColor: "#10b981", // Emerald
  fontFamily: "Inter",
  fontSize: "16",
}

const COLOR_PRESETS = [
  { name: "MASS Orange", primary: "#f97316", secondary: "#1e293b" },
  { name: "Government Blue", primary: "#2563eb", secondary: "#1e3a8a" },
  { name: "Emerald Pro", primary: "#10b981", secondary: "#064e3b" },
  { name: "Royal Purple", primary: "#8b5cf6", secondary: "#4c1d95" },
  { name: "Somaliland Green", primary: "#16a34a", secondary: "#14532d" },
]

const FONT_OPTIONS = [
  { name: "Inter", className: "font-sans" },
  { name: "Poppins", className: "font-poppins" },
  { name: "DM Sans", className: "font-dm-sans" },
  { name: "Outfit", className: "font-outfit" },
]

export function BrandingThemeEditor() {
  const [brand, setBrand] = useState(DEFAULT_BRAND)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("dark")

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-6 h-6 text-orange-500" />
            Branding & Theme
          </h2>
          <p className="text-slate-500">
            Customize colors, logos, and typography for your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-orange-600 hover:bg-orange-700">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Configuration */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Logo Section */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Logo Configuration
              </CardTitle>
              <CardDescription>Upload logos for light and dark modes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Light Mode Logo</Label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Drop image or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-2">Choose File</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Dark Mode Logo</Label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Drop image or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-2">Choose File</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Colors Section */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="w-5 h-5" /> Color Palette
              </CardTitle>
              <CardDescription>Define your brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Presets */}
              <div className="space-y-3">
                <Label>Quick Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setBrand({ ...brand, primaryColor: preset.primary, secondaryColor: preset.secondary })}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                        brand.primaryColor === preset.primary
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      )}
                    >
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Custom Colors */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700"
                      style={{ backgroundColor: brand.primaryColor }}
                    />
                    <Input 
                      value={brand.primaryColor}
                      onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700"
                      style={{ backgroundColor: brand.secondaryColor }}
                    />
                    <Input 
                      value={brand.secondaryColor}
                      onChange={(e) => setBrand({ ...brand, secondaryColor: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700"
                      style={{ backgroundColor: brand.accentColor }}
                    />
                    <Input 
                      value={brand.accentColor}
                      onChange={(e) => setBrand({ ...brand, accentColor: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Section */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" /> Typography
              </CardTitle>
              <CardDescription>Font family and size settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Font Family</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setBrand({ ...brand, fontFamily: font.name })}
                        className={cn(
                          "p-3 rounded-lg border text-center transition-all",
                          brand.fontFamily === font.name
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                        )}
                      >
                        <span className={cn("text-lg font-medium", font.className)}>{font.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Base Font Size</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      value={brand.fontSize}
                      onChange={(e) => setBrand({ ...brand, fontSize: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-slate-500">px</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="lg:col-span-5">
          <Card className="border-slate-200 dark:border-slate-800 sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode("light")}
                    className={cn(
                      "p-2 rounded-md transition-all",
                      previewMode === "light" && "bg-white dark:bg-slate-700 shadow"
                    )}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode("dark")}
                    className={cn(
                      "p-2 rounded-md transition-all",
                      previewMode === "dark" && "bg-white dark:bg-slate-700 shadow"
                    )}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Preview Card */}
              <div 
                className={cn(
                  "rounded-lg p-6 space-y-4",
                  previewMode === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900 border"
                )}
                style={{ fontFamily: brand.fontFamily }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    M
                  </div>
                  <div>
                    <p className="font-bold">MASS Workshop</p>
                    <p className="text-sm opacity-60">Your Organization</p>
                  </div>
                </div>
                <Separator className={previewMode === "dark" ? "bg-slate-700" : ""} />
                <div className="space-y-2">
                  <h3 className="font-semibold">Dashboard Preview</h3>
                  <p className="text-sm opacity-70">This is how your brand colors will appear across the system.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: brand.secondaryColor }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
