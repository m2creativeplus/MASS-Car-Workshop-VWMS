"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
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
  Languages,
  Image as ImageIcon,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function ContentManagementEditor() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pages")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // NEW FORM STATE
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: false
  })
  
  const [newArticle, setNewArticle] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "guides",
    tags: [] as string[],
    status: "draft" as "draft" | "published"
  })

  // CONVEX QUERIES - Real-time data!
  const dynamicPages = useQuery(api.cms.getAllDynamicPages) || []
  const blogPosts = useQuery(api.cms.getAllBlogPosts, {}) || []
  const faqs = useQuery(api.cms.getAllFaqs) || []
  
  // CONVEX MUTATIONS
  const createPage = useMutation(api.cms.createDynamicPage)
  const updatePage = useMutation(api.cms.updateDynamicPage)
  const deletePage = useMutation(api.cms.deleteDynamicPage)
  const createPost = useMutation(api.cms.createBlogPost)
  const updatePost = useMutation(api.cms.updateBlogPost)
  const deletePost = useMutation(api.cms.deleteBlogPost)
  
  // Filter by search
  const filteredPages = dynamicPages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredPosts = blogPosts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // CREATE PAGE HANDLER
  const handleCreatePage = async () => {
    if (!newPage.title || !newPage.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" })
      return
    }
    
    setIsSaving(true)
    try {
      await createPage({
        title: newPage.title,
        slug: newPage.slug.startsWith("/") ? newPage.slug : `/${newPage.slug}`,
        content: newPage.content || "",
        metaTitle: newPage.metaTitle || undefined,
        metaDescription: newPage.metaDescription || undefined,
        isPublished: newPage.isPublished,
        orgId: "default"
      })
      toast({ title: "Success", description: "Page created successfully!" })
      setIsCreateOpen(false)
      setNewPage({ title: "", slug: "", content: "", metaTitle: "", metaDescription: "", isPublished: false })
    } catch (error) {
      toast({ title: "Error", description: "Failed to create page", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }
  
  // CREATE ARTICLE HANDLER
  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" })
      return
    }
    
    setIsSaving(true)
    try {
      await createPost({
        title: newArticle.title,
        slug: newArticle.slug,
        content: newArticle.content || "",
        excerpt: newArticle.excerpt || undefined,
        status: newArticle.status,
        tags: newArticle.tags,
        orgId: "default"
      })
      toast({ title: "Success", description: "Article created successfully!" })
      setIsCreateOpen(false)
      setNewArticle({ title: "", slug: "", content: "", excerpt: "", category: "guides", tags: [], status: "draft" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to create article", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }
  
  // DELETE HANDLERS
  const handleDeletePage = async (id: any) => {
    if (!confirm("Are you sure you want to delete this page?")) return
    try {
      await deletePage({ id })
      toast({ title: "Deleted", description: "Page deleted successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" })
    }
  }
  
  const handleDeletePost = async (id: any) => {
    if (!confirm("Are you sure you want to delete this article?")) return
    try {
      await deletePost({ id })
      toast({ title: "Deleted", description: "Article deleted successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete article", variant: "destructive" })
    }
  }

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
            Manage pages, articles, and SEO metadata - <span className="text-emerald-600 font-medium">Connected to Convex</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Globe className="w-4 h-4" /> Preview Site
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4" /> New Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New {activeTab === "pages" ? "Page" : "Article"}</DialogTitle>
              </DialogHeader>
              {activeTab === "pages" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Page Title *</Label>
                      <Input 
                        value={newPage.title} 
                        onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                        placeholder="About Us"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug *</Label>
                      <Input 
                        value={newPage.slug} 
                        onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                        placeholder="/about"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      value={newPage.content} 
                      onChange={(e) => setNewPage({...newPage, content: e.target.value})}
                      placeholder="Page content..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input 
                        value={newPage.metaTitle} 
                        onChange={(e) => setNewPage({...newPage, metaTitle: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Input 
                        value={newPage.metaDescription} 
                        onChange={(e) => setNewPage({...newPage, metaDescription: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={newPage.isPublished} 
                      onCheckedChange={(checked) => setNewPage({...newPage, isPublished: checked})}
                    />
                    <Label>Publish immediately</Label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Article Title *</Label>
                      <Input 
                        value={newArticle.title} 
                        onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                        placeholder="How to Maintain Your Vehicle"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug *</Label>
                      <Input 
                        value={newArticle.slug} 
                        onChange={(e) => setNewArticle({...newArticle, slug: e.target.value})}
                        placeholder="vehicle-maintenance-guide"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Input 
                      value={newArticle.excerpt} 
                      onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                      placeholder="Brief summary..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      value={newArticle.content} 
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      placeholder="Article content..."
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={newArticle.status === "published"} 
                      onCheckedChange={(checked) => setNewArticle({...newArticle, status: checked ? "published" : "draft"})}
                    />
                    <Label>Publish immediately</Label>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button 
                  onClick={activeTab === "pages" ? handleCreatePage : handleCreateArticle}
                  disabled={isSaving}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create {activeTab === "pages" ? "Page" : "Article"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-900">
          <TabsTrigger value="pages">Pages ({dynamicPages.length})</TabsTrigger>
          <TabsTrigger value="articles">Articles ({blogPosts.length})</TabsTrigger>
          <TabsTrigger value="faqs">FAQs ({faqs.length})</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>

        {/* PAGES TAB */}
        <TabsContent value="pages" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input 
                    placeholder="Search pages..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {dynamicPages.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No pages yet. Click "New Content" to create your first page.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-900">
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.map((page) => (
                      <TableRow key={page._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell className="font-mono text-sm text-slate-500">{page.slug}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            page.isPublished 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                          )}>
                            {page.isPublished ? "published" : "draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                              onClick={() => handleDeletePage(page._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ARTICLES TAB */}
        <TabsContent value="articles" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Articles & Blog Posts</CardTitle>
              <CardDescription>Knowledge base, guides, and news - Live from Convex database</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {blogPosts.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No articles yet. Click "New Content" to create your first article.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-900">
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((article) => (
                      <TableRow key={article._id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell className="font-mono text-sm text-slate-500">{article.slug}</TableCell>
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDeletePost(article._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQS TAB */}
        <TabsContent value="faqs" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage FAQ entries for your public site</CardDescription>
            </CardHeader>
            <CardContent>
              {faqs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No FAQs yet. Add your first FAQ entry.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={faq._id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                      <p className="font-medium">{faq.question}</p>
                      <p className="text-sm text-slate-500 mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
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
