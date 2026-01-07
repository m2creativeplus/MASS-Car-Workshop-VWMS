"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { 
  Languages,
  Plus,
  Check,
  AlertCircle,
  Globe,
  Flag,
  ChevronRight,
  Edit,
  Trash2,
  Copy,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Locales
const LOCALES = [
  { 
    code: "en", 
    name: "English", 
    nativeName: "English",
    flag: "🇬🇧",
    isDefault: true,
    completeness: 100,
    lastUpdated: "2026-01-07"
  },
  { 
    code: "so", 
    name: "Somali", 
    nativeName: "Af-Soomaali",
    flag: "🇸🇴",
    isDefault: false,
    completeness: 45,
    lastUpdated: "2026-01-05"
  },
  { 
    code: "ar", 
    name: "Arabic", 
    nativeName: "العربية",
    flag: "🇸🇦",
    isDefault: false,
    completeness: 20,
    lastUpdated: "2026-01-03"
  },
]

// Sample Translation Keys
const TRANSLATION_KEYS = [
  { key: "nav.dashboard", en: "Dashboard", so: "Guriga", ar: "لوحة القيادة" },
  { key: "nav.customers", en: "Customers", so: "Macaamiisha", ar: "العملاء" },
  { key: "nav.vehicles", en: "Vehicles", so: "Gaadiidka", ar: "المركبات" },
  { key: "nav.workOrders", en: "Work Orders", so: "Hawlaha", ar: "أوامر العمل" },
  { key: "common.save", en: "Save", so: "Keydi", ar: "حفظ" },
  { key: "common.cancel", en: "Cancel", so: "Ka noqo", ar: "إلغاء" },
  { key: "common.delete", en: "Delete", so: "Tirtir", ar: "حذف" },
  { key: "status.pending", en: "Pending", so: "La sugayo", ar: "قيد الانتظار" },
  { key: "status.completed", en: "Completed", so: "La dhammeeyay", ar: "مكتمل" },
]

export function LocalizationPanel() {
  const [selectedLocale, setSelectedLocale] = useState<string | null>("so")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredKeys = TRANSLATION_KEYS.filter(t => 
    t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.en.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: Locale List */}
      <div className="lg:col-span-4 space-y-4">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-orange-500" />
                Languages
              </CardTitle>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => setSelectedLocale(locale.code)}
                className={cn(
                  "w-full p-4 rounded-lg text-left transition-all",
                  selectedLocale === locale.code
                    ? "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500"
                    : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{locale.flag}</span>
                    <div>
                      <p className="font-medium">{locale.name}</p>
                      <p className="text-xs text-slate-500">{locale.nativeName}</p>
                    </div>
                  </div>
                  {locale.isDefault && (
                    <Badge className="bg-orange-500 text-white">Default</Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Completeness</span>
                    <span className={cn(
                      "font-medium",
                      locale.completeness === 100 ? "text-emerald-600" :
                      locale.completeness >= 50 ? "text-amber-600" : "text-red-600"
                    )}>
                      {locale.completeness}%
                    </span>
                  </div>
                  <Progress 
                    value={locale.completeness} 
                    className={cn(
                      "h-1.5",
                      locale.completeness === 100 ? "[&>div]:bg-emerald-500" :
                      locale.completeness >= 50 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"
                    )}
                  />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Keys</span>
              <span className="font-mono font-bold">{TRANSLATION_KEYS.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Missing (Somali)</span>
              <span className="font-mono font-bold text-amber-600">
                {TRANSLATION_KEYS.filter(t => !t.so).length}
              </span>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <RefreshCw className="w-4 h-4" /> Sync from Code
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Translation Editor */}
      <div className="lg:col-span-8">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Translation Editor</CardTitle>
                <CardDescription>
                  Editing: {LOCALES.find(l => l.code === selectedLocale)?.name}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Copy className="w-4 h-4" /> Copy from English
                </Button>
                <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                  <Check className="w-4 h-4" /> Save All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <Input 
              placeholder="Search translation keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Translation List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredKeys.map((item) => {
                const targetValue = item[selectedLocale as keyof typeof item] as string
                const isMissing = !targetValue
                
                return (
                  <div 
                    key={item.key}
                    className={cn(
                      "p-4 rounded-lg border",
                      isMissing 
                        ? "border-amber-300 bg-amber-50 dark:bg-amber-900/10" 
                        : "border-slate-200 dark:border-slate-800"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {item.key}
                      </code>
                      {isMissing && (
                        <Badge className="bg-amber-500 text-white gap-1">
                          <AlertCircle className="w-3 h-3" /> Missing
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">English (Source)</p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {item.en}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">
                          {LOCALES.find(l => l.code === selectedLocale)?.name}
                        </p>
                        <Input 
                          defaultValue={targetValue || ""}
                          placeholder="Enter translation..."
                          className={cn(
                            isMissing && "border-amber-400 focus:border-amber-500"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
