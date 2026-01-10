import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ============================================================
// BLOG API FUNCTIONS
// ============================================================

// List all published blog posts
export const list = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let posts;
    
    if (args.category && args.category !== "All") {
      posts = await ctx.db
        .query("blogPosts")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .filter((q) => q.eq(q.field("status"), "published"))
        .order("desc")
        .take(args.limit || 50);
    } else {
      posts = await ctx.db
        .query("blogPosts")
        .withIndex("by_status", (q) => q.eq("status", "published"))
        .order("desc")
        .take(args.limit || 50);
    }
    
    return posts;
  },
});

// Get a single blog post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return post;
  },
});

// Get a blog post by ID
export const get = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new blog post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    author: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("scheduled")),
    readingTimeMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    
    const postId = await ctx.db.insert("blogPosts", {
      ...args,
      views: 0,
      publishedAt: args.status === "published" ? now : undefined,
      orgId: undefined,
    });
    
    return postId;
  },
});

// Update a blog post
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("scheduled"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If publishing, set publishedAt
    if (updates.status === "published") {
      const existing = await ctx.db.get(id);
      if (existing && !existing.publishedAt) {
        (updates as any).publishedAt = new Date().toISOString();
      }
    }
    
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Increment view count
export const incrementViews = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post) {
      await ctx.db.patch(args.id, { views: post.views + 1 });
    }
  },
});

// Search blog posts
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    
    const searchLower = args.query.toLowerCase();
    
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
    );
  },
});

// ============================================================
// SEED DATA FUNCTION (For Development)
// ============================================================

export const seedBlogPosts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if posts already exist
    const existing = await ctx.db.query("blogPosts").first();
    if (existing) {
      return { message: "Blog posts already seeded", count: 0 };
    }
    
    const samplePosts = [
      {
        title: "5 Signs Your Car Needs Immediate Brake Service",
        slug: "signs-car-needs-brake-service",
        excerpt: "Don't wait until it's too late. Learn the warning signs that indicate your brakes need professional attention.",
        content: `## Warning Signs You Shouldn't Ignore

Your vehicle's braking system is one of the most critical safety features. Here are the key warning signs:

### 1. Squealing or Grinding Sounds
If you hear a high-pitched squeal when braking, your brake pads may be worn down.

### 2. Vibration When Braking
A vibrating brake pedal often indicates warped rotors.

### 3. Soft or Spongy Brake Pedal
If your brake pedal feels soft or goes to the floor, you may have air in the brake lines.

### 4. Vehicle Pulling to One Side
Uneven brake wear or a stuck caliper can cause your car to pull when braking.

### 5. Warning Light on Dashboard
Modern vehicles have brake warning lights. If this light comes on, get your brakes inspected immediately.

**Book a free brake inspection at participating Hargeisa workshops.**`,
        category: "Maintenance Tips",
        tags: ["brakes", "safety", "maintenance"],
        author: "Mohamed Ahmed",
        status: "published" as const,
        views: 1250,
        readingTimeMinutes: 5,
        publishedAt: "2026-01-08",
      },
      {
        title: "Complete Guide to Vehicle Inspections in Somaliland",
        slug: "vehicle-inspection-guide-somaliland",
        excerpt: "Everything you need to know about getting your vehicle inspected, from documentation to common issues.",
        content: `## Vehicle Inspection Requirements in Somaliland

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
- Address any dashboard warning lights`,
        category: "Guides",
        tags: ["inspection", "documentation", "guide"],
        author: "Fatima Omar",
        status: "published" as const,
        views: 890,
        readingTimeMinutes: 7,
        publishedAt: "2026-01-05",
      },
      {
        title: "Why ZAAD & eDahab Payments Are Transforming Auto Workshops",
        slug: "mobile-money-auto-workshops",
        excerpt: "How mobile payments are making car repairs more accessible and convenient for Somaliland customers.",
        content: `## The Mobile Money Revolution in Automotive

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
Our platform automatically generates payment links and records transactions.`,
        category: "Industry News",
        tags: ["payments", "ZAAD", "eDahab", "mobile money"],
        author: "Ahmed Ali",
        status: "published" as const,
        views: 2100,
        readingTimeMinutes: 4,
        publishedAt: "2026-01-02",
      },
      {
        title: "Top 10 Common Car Problems in Hot Climates",
        slug: "common-car-problems-hot-climates",
        excerpt: "Living in Somaliland means dealing with extreme heat. Here's how it affects your vehicle.",
        content: `## How Heat Affects Your Vehicle

Somaliland's climate presents unique challenges for vehicle maintenance.

### Top Issues:
1. **Battery Drain** - Heat accelerates battery fluid evaporation
2. **Tire Blowouts** - Hot pavement + worn tires = danger
3. **AC Failure** - Overworked cooling systems break down
4. **Overheating Engines** - Coolant issues are common
5. **Faded Paint** - UV damage is accelerated
6. **Cracked Dashboards** - Interior plastics suffer
7. **Fuel Evaporation** - Loss through vapor
8. **Brake Fade** - Heat affects braking performance
9. **Belt Deterioration** - Rubber parts crack faster
10. **Oil Breakdown** - High temps degrade oil faster

### Prevention Tips
- Park in shade when possible
- Check coolant levels weekly
- Use sunshades for interior protection`,
        category: "Maintenance Tips",
        tags: ["heat", "climate", "maintenance", "Somaliland"],
        author: "Hassan Yusuf",
        status: "published" as const,
        views: 1800,
        readingTimeMinutes: 6,
        publishedAt: "2025-12-28",
      },
    ];
    
    let count = 0;
    for (const post of samplePosts) {
      await ctx.db.insert("blogPosts", {
        ...post,
        orgId: undefined,
        featuredImage: undefined,
        authorId: undefined,
        scheduledFor: undefined,
        seoTitle: undefined,
        seoDescription: undefined,
      });
      count++;
    }
    
    return { message: "Blog posts seeded successfully", count };
  },
});
