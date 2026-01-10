"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Wrench, Loader2, Eye } from "lucide-react"
import Link from "next/link"

export default function BlogArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  // Fetch post from Convex
  const post = useQuery(api.blog.getBySlug, { slug })
  const incrementViews = useMutation(api.blog.incrementViews)

  // Increment view count on page load
  useEffect(() => {
    if (post?._id) {
      incrementViews({ id: post._id })
    }
  }, [post?._id, incrementViews])

  // Loading state
  if (post === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  // Not found state
  if (post === null) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="max-w-md text-center p-8">
          <BookOpen className="h-16 w-16 mx-auto text-slate-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/dashboard/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Calculate reading time if not set
  const readingTime = post.readingTimeMinutes || Math.ceil(post.content.split(' ').length / 200)

  // Determine related service based on category
  const getRelatedService = (category: string) => {
    const serviceMap: Record<string, { name: string; route: string }> = {
      "Maintenance Tips": { name: "Maintenance Service", route: "/dashboard/appointments" },
      "Brakes": { name: "Brake Inspection", route: "/dashboard/appointments" },
      "Guides": { name: "Vehicle Inspection", route: "/dashboard/inspections" },
    }
    return serviceMap[category]
  }
  
  const relatedService = getRelatedService(post.category)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/dashboard/blog">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <Badge className="bg-amber-500">{post.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author || "MASS Team"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.publishedAt || "Recent"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views} views
          </span>
        </div>
      </div>

      {/* Featured Image Placeholder */}
      <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center">
        <BookOpen className="h-20 w-20 text-slate-600" />
      </div>

      {/* Excerpt */}
      <p className="text-lg text-muted-foreground italic border-l-4 border-amber-500 pl-4">
        {post.excerpt}
      </p>

      {/* Article Content */}
      <Card>
        <CardContent className="prose prose-invert max-w-none p-6 md:p-8">
          <div className="whitespace-pre-line text-slate-300 leading-relaxed">
            {post.content}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Related Service CTA */}
      {relatedService && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Need This Service?</h3>
                <p className="text-muted-foreground">Book a {relatedService.name.toLowerCase()} appointment at a MASS-certified workshop</p>
              </div>
              <Link href={relatedService.route}>
                <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
                  <Wrench className="h-4 w-4" /> Book {relatedService.name}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Share Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Share this article</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`
                  window.open(url, '_blank')
                }}
              >
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                }}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
