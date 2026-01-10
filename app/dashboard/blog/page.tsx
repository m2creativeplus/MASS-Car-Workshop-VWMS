"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

// Sample blog data (will be replaced by Convex query when table is deployed)
const samplePosts = [
  {
    _id: "1",
    title: "5 Signs Your Car Needs Immediate Brake Service",
    slug: "signs-car-needs-brake-service",
    excerpt: "Don't wait until it's too late. Learn the warning signs that indicate your brakes need professional attention.",
    category: "Maintenance Tips",
    featuredImage: "/blog/brakes.jpg",
    publishedAt: "2026-01-08",
    author: "Mohamed Ahmed",
    views: 1250,
  },
  {
    _id: "2",
    title: "Complete Guide to Vehicle Inspections in Somaliland",
    slug: "vehicle-inspection-guide-somaliland",
    excerpt: "Everything you need to know about getting your vehicle inspected, from documentation to common issues.",
    category: "Guides",
    featuredImage: "/blog/inspection.jpg",
    publishedAt: "2026-01-05",
    author: "Fatima Omar",
    views: 890,
  },
  {
    _id: "3",
    title: "Why ZAAD & eDahab Payments Are Transforming Auto Workshops",
    slug: "mobile-money-auto-workshops",
    excerpt: "How mobile payments are making car repairs more accessible and convenient for Somaliland customers.",
    category: "Industry News",
    featuredImage: "/blog/payments.jpg",
    publishedAt: "2026-01-02",
    author: "Ahmed Ali",
    views: 2100,
  },
  {
    _id: "4", 
    title: "Top 10 Common Car Problems in Hot Climates",
    slug: "common-car-problems-hot-climates",
    excerpt: "Living in Somaliland means dealing with extreme heat. Here's how it affects your vehicle.",
    category: "Maintenance Tips",
    featuredImage: "/blog/heat.jpg",
    publishedAt: "2025-12-28",
    author: "Hassan Yusuf",
    views: 1800,
  },
]

const categories = ["All", "Maintenance Tips", "Guides", "Industry News", "Announcements"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-orange-500" />
            Blog & News
          </h1>
          <p className="text-muted-foreground">
            Industry insights, maintenance tips, and workshop updates
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Featured Post */}
      {filteredPosts[0] && (
        <Card className="overflow-hidden bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <Badge className="bg-amber-500">Featured</Badge>
              <h2 className="text-2xl font-bold">{filteredPosts[0].title}</h2>
              <p className="text-muted-foreground">{filteredPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {filteredPosts[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {filteredPosts[0].publishedAt}
                </span>
              </div>
              <Link href={`/dashboard/blog/${filteredPosts[0].slug}`}>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-slate-800 rounded-lg h-48 md:h-auto flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-slate-600" />
            </div>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(1).map((post) => (
          <Card key={post._id} className="overflow-hidden hover:border-orange-500/50 transition-colors cursor-pointer group">
            <div className="h-40 bg-slate-800 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-slate-600 group-hover:text-orange-500 transition-colors" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.views} views</span>
              </div>
              <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {post.publishedAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
          <div>
            <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground">Get the latest automotive tips and workshop updates</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input placeholder="Enter your email" className="md:w-64" />
            <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
