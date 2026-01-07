"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Plus, 
  FileText, 
  Globe,
  Eye,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Languages,
  Image as ImageIcon,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Page Data
const SAMPLE_PAGES = [
  { id: 1, title: "Home", slug: "/", status: "published", updatedAt: "2026-01-07", language: "en" },
  { id: 2, title: "About Us", slug: "/about", status: "published", updatedAt: "2026-01-05", language: "en" },
  { id: 3, title: "Privacy Policy", slug: "/privacy", status: "published", updatedAt: "2026-01-01", language: "en" },
  { id: 4, title: "Terms of Service", slug: "/terms", status: "draft", updatedAt: "2026-01-06", language: "en" },
  { id: 5, title: "Nidaamka Shuruudaha", slug: "/terms-so", status: "draft", updatedAt: "2026-01-06", language: "so" },
]

const SAMPLE_ARTICLES = [
  { id: 1, title: "How to Maintain Your Toyota Hilux", category: "Guides", status: "published", views: 1250, author: "Admin" },
  { id: 2, title: "Understanding DVI Reports", category: "Education", status: "published", views: 890, author: "Admin" },
  { id: 3, title: "Top 5 Common Repairs in Somaliland", category: "News", status: "draft", views: 0, author: "Admin" },
]

export function ContentManagementEditor() {
  const [activeTab, setActiveTab] = useState("pages")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPage, setSelectedPage] = useState<typeof SAMPLE_PAGES[0] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-500" />
            Content Management
          </h2>
          <p className="text-slate-500">
            Manage pages, articles, listings, and SEO metadata
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Globe className="w-4 h-4" /> Preview Site
          </Button>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4" /> New Content
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-900">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>

        {/* PAGES TAB */}
        <TabsContent value="pages" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input placeholder="Search pages..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer">All</Badge>
                  <Badge variant="outline" className="cursor-pointer">Published</Badge>
                  <Badge variant="outline" className="cursor-pointer">Draft</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-900">
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLE_PAGES.map((page) => (
                    <TableRow key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="font-mono text-sm text-slate-500">{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <Languages className="w-3 h-3" />
                          {page.language.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          page.status === "published" 
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                        )}>
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">{page.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ARTICLES TAB */}
        <TabsContent value="articles" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Articles & Blog Posts</CardTitle>
              <CardDescription>Knowledge base, guides, and news</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-900">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLE_ARTICLES.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                      <TableCell className="text-slate-500">{article.author}</TableCell>
                      <TableCell className="font-mono">{article.views.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          article.status === "published" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-amber-100 text-amber-700"
                        )}>
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LISTINGS TAB */}
        <TabsContent value="listings">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Public Directory Listings</CardTitle>
              <CardDescription>Workshops, suppliers, and service providers visible on the public site</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12 text-slate-500">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Directory listings are managed via the Suppliers & Network module.</p>
              <Button variant="link" className="mt-2">Go to Suppliers →</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>SEO & Meta Configuration</CardTitle>
              <CardDescription>Search engine optimization settings for your public pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Meta Title</Label>
                  <Input defaultValue="MASS Workshop | Automotive Services in Somaliland" />
                </div>
                <div className="space-y-2">
                  <Label>Title Separator</Label>
                  <Input defaultValue=" | " className="w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Default Meta Description</Label>
                <Textarea 
                  defaultValue="Enterprise-grade automotive workshop management trusted by leading workshops across East Africa. Book services, track repairs, and manage your vehicle history."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>OG Image</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="/og-image.png" disabled />
                    <Button variant="outline" className="gap-2">
                      <ImageIcon className="w-4 h-4" /> Upload
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="/favicon.ico" disabled />
                    <Button variant="outline" className="gap-2">
                      <ImageIcon className="w-4 h-4" /> Upload
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div>
                  <p className="font-medium">Generate Sitemap</p>
                  <p className="text-sm text-slate-500">Auto-generate /sitemap.xml for search engines</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" /> Save SEO Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
