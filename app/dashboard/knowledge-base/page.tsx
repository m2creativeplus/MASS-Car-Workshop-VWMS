"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { BookOpen, Search, ChevronRight, ExternalLink, Clock, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const articles = useQuery(api.knowledgeBase.listArticles, { orgId: "demo-org-1" })

  const filteredArticles = articles?.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Knowledge Base
          </h1>
          <p className="text-slate-400 mt-1">Browse Tekmetric-inspired guides and workshop documentation.</p>
        </div>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input 
          placeholder="Search articles, guides, or categories..." 
          className="pl-10 bg-slate-900/50 border-white/10 text-white focus-visible:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Categories */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white px-2">Categories</h3>
          <div className="space-y-1">
            {["Getting Started", "Inventory", "Work Orders", "Inspections", "Reporting"].map((cat) => (
              <Button 
                key={cat}
                variant="ghost" 
                className="w-full justify-between hover:bg-white/5 text-slate-400 hover:text-white group"
              >
                {cat}
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="lg:col-span-2 space-y-4">
          {!articles ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="bg-slate-900/30 border-white/5">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 bg-white/5" />
                    <Skeleton className="h-4 w-1/2 bg-white/5" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredArticles?.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/20 rounded-2xl border border-dashed border-white/10">
              <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No articles found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredArticles?.map((article) => (
              <Card key={article._id} className="bg-slate-900/50 border-white/10 hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                      {article.category || "General"}
                    </Badge>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {new Date(article.scrapedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {article.content?.text}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{article.section || "Documentation"}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:bg-primary/10" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        View Original <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
