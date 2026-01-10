"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Wrench } from "lucide-react"
import Link from "next/link"

// Sample posts (will be replaced by Convex query when deployed)
const samplePosts = [
  {
    _id: "1",
    title: "5 Signs Your Car Needs Immediate Brake Service",
    slug: "signs-car-needs-brake-service",
    excerpt: "Don't wait until it's too late. Learn the warning signs that indicate your brakes need professional attention.",
    content: `
## Warning Signs You Shouldn't Ignore

Your vehicle's braking system is one of the most critical safety features. Here are the key warning signs:

### 1. Squealing or Grinding Sounds
If you hear a high-pitched squeal when braking, your brake pads may be worn down. A grinding noise indicates metal-on-metal contact – this requires immediate attention.

### 2. Vibration When Braking
A vibrating brake pedal often indicates warped rotors. This can be caused by excessive heat from heavy braking.

### 3. Soft or Spongy Brake Pedal
If your brake pedal feels soft or goes to the floor, you may have air in the brake lines or a brake fluid leak.

### 4. Vehicle Pulling to One Side
Uneven brake wear or a stuck caliper can cause your car to pull when braking.

### 5. Warning Light on Dashboard
Modern vehicles have brake warning lights. If this light comes on, get your brakes inspected immediately.

## Schedule Your Brake Inspection Today

At MASS-certified workshops, our technicians use Digital Vehicle Inspection (DVI) to provide photo and video evidence of your brake condition. You'll see exactly what we see.

**Special Offer:** Book a free brake inspection this month at participating Hargeisa workshops.
    `,
    category: "Maintenance Tips",
    featuredImage: "/blog/brakes.jpg",
    publishedAt: "2026-01-08",
    author: "Mohamed Ahmed",
    authorRole: "Master Technician",
    views: 1250,
    readingTimeMinutes: 5,
    relatedService: "brake-inspection",
  },
  {
    _id: "2",
    title: "Complete Guide to Vehicle Inspections in Somaliland",
    slug: "vehicle-inspection-guide-somaliland",
    excerpt: "Everything you need to know about getting your vehicle inspected, from documentation to common issues.",
    content: `
## Vehicle Inspection Requirements in Somaliland

Understanding the inspection process helps you prepare and avoid delays.

### What Documents Do You Need?
- Vehicle registration
- Insurance certificate
- Previous inspection report (if applicable)

### Common Inspection Points
1. Lights and signals
2. Brakes and tires
3. Steering and suspension
4. Engine and emissions
5. Body condition

### Tips for Passing Inspection
- Check all lights before your appointment
- Ensure wipers and washers work
- Top up all fluids
- Address any dashboard warning lights
    `,
    category: "Guides",
    featuredImage: "/blog/inspection.jpg",
    publishedAt: "2026-01-05",
    author: "Fatima Omar",
    authorRole: "Service Advisor",
    views: 890,
    readingTimeMinutes: 7,
    relatedService: "vehicle-inspection",
  },
  {
    _id: "3",
    title: "Why ZAAD & eDahab Payments Are Transforming Auto Workshops",
    slug: "mobile-money-auto-workshops",
    excerpt: "How mobile payments are making car repairs more accessible and convenient for Somaliland customers.",
    content: `
## The Mobile Money Revolution in Automotive

Somaliland's mobile money ecosystem is changing how workshops operate.

### Benefits for Customers
- No need to carry cash for expensive repairs
- Instant payment receipts via SMS
- Split payment options for large repairs

### Benefits for Workshops
- Reduced cash handling risks
- Faster payment processing
- Better financial tracking

### How MASS Integrates ZAAD & eDahab
Our platform automatically generates payment links and records transactions, making your workshop operations smoother.
    `,
    category: "Industry News",
    featuredImage: "/blog/payments.jpg",
    publishedAt: "2026-01-02",
    author: "Ahmed Ali",
    authorRole: "Business Development",
    views: 2100,
    readingTimeMinutes: 4,
    relatedService: null,
  },
]

export default function BlogArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<typeof samplePosts[0] | null>(null)

  useEffect(() => {
    // Find the post by slug (will be replaced by Convex query)
    const foundPost = samplePosts.find(p => p.slug === params.slug)
    if (foundPost) {
      setPost(foundPost)
    }
  }, [params.slug])

  if (!post) {
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
            {post.author}
            {post.authorRole && <span className="text-amber-500">• {post.authorRole}</span>}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </div>

      {/* Featured Image Placeholder */}
      <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center">
        <BookOpen className="h-20 w-20 text-slate-600" />
      </div>

      {/* Article Content */}
      <Card>
        <CardContent className="prose prose-invert max-w-none p-6 md:p-8">
          <div className="whitespace-pre-line text-slate-300 leading-relaxed">
            {post.content}
          </div>
        </CardContent>
      </Card>

      {/* Related Service CTA */}
      {post.relatedService && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Need This Service?</h3>
                <p className="text-muted-foreground">Book a {post.category.toLowerCase()} appointment at a MASS-certified workshop</p>
              </div>
              <Link href="/dashboard/appointments">
                <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
                  <Wrench className="h-4 w-4" /> Book Service Now
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
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
