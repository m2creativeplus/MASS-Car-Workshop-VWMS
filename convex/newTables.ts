import { defineTable } from "convex/server";
import { v } from "convex/values";

// Blog posts table for content marketing
export const blogPosts = defineTable({
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  content: v.string(), // HTML or Markdown
  featuredImage: v.optional(v.string()),
  author: v.optional(v.id("users")),
  category: v.string(),
  tags: v.array(v.string()),
  status: v.union(
    v.literal("draft"),
    v.literal("published"),
    v.literal("scheduled")
  ),
  publishedAt: v.optional(v.string()),
  scheduledFor: v.optional(v.string()),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  views: v.number(),
  orgId: v.optional(v.string()),
}).index("by_slug", ["slug"])
  .index("by_status", ["status"])
  .index("by_category", ["category"]);

// Newsletter subscribers
export const subscribers = defineTable({
  email: v.string(),
  name: v.optional(v.string()),
  status: v.union(
    v.literal("active"),
    v.literal("unsubscribed"),
    v.literal("bounced")
  ),
  source: v.optional(v.string()), // "footer", "popup", "blog"
  subscribedAt: v.string(),
  unsubscribedAt: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  orgId: v.optional(v.string()),
}).index("by_email", ["email"])
  .index("by_status", ["status"]);

// Support tickets
export const tickets = defineTable({
  ticketNumber: v.string(),
  customerId: v.optional(v.id("customers")),
  email: v.string(),
  name: v.string(),
  subject: v.string(),
  message: v.string(),
  status: v.union(
    v.literal("open"),
    v.literal("in-progress"),
    v.literal("waiting"),
    v.literal("resolved"),
    v.literal("closed")
  ),
  priority: v.union(
    v.literal("low"),
    v.literal("normal"),
    v.literal("high"),
    v.literal("urgent")
  ),
  assignedTo: v.optional(v.id("users")),
  category: v.optional(v.string()),
  createdAt: v.string(),
  updatedAt: v.optional(v.string()),
  resolvedAt: v.optional(v.string()),
  orgId: v.string(),
}).index("by_status", ["status"])
  .index("by_customer", ["customerId"])
  .index("by_org", ["orgId"]);

// Ticket messages/replies
export const ticketMessages = defineTable({
  ticketId: v.id("tickets"),
  senderId: v.optional(v.id("users")),
  senderType: v.union(v.literal("customer"), v.literal("staff")),
  message: v.string(),
  attachments: v.optional(v.array(v.string())),
  createdAt: v.string(),
}).index("by_ticket", ["ticketId"]);

// Vendors (for multi-vendor marketplace)
export const vendors = defineTable({
  userId: v.id("users"),
  businessName: v.string(),
  slug: v.string(),
  description: v.optional(v.string()),
  logo: v.optional(v.string()),
  banner: v.optional(v.string()),
  phone: v.string(),
  email: v.string(),
  address: v.optional(v.string()),
  city: v.string(),
  status: v.union(
    v.literal("pending"),
    v.literal("approved"),
    v.literal("rejected"),
    v.literal("suspended")
  ),
  commissionRate: v.number(), // Percentage
  totalSales: v.number(),
  totalEarnings: v.number(),
  pendingBalance: v.number(),
  socialLinks: v.optional(v.object({
    facebook: v.optional(v.string()),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    website: v.optional(v.string()),
  })),
  verifiedAt: v.optional(v.string()),
  createdAt: v.string(),
  orgId: v.optional(v.string()),
}).index("by_slug", ["slug"])
  .index("by_status", ["status"])
  .index("by_user", ["userId"]);

// Site settings (dynamic content)
export const siteSettings = defineTable({
  key: v.string(),
  value: v.string(), // JSON stringified for complex values
  type: v.union(
    v.literal("text"),
    v.literal("image"),
    v.literal("json"),
    v.literal("boolean")
  ),
  category: v.string(), // "header", "footer", "seo", "social"
  description: v.optional(v.string()),
  updatedAt: v.string(),
  updatedBy: v.optional(v.id("users")),
}).index("by_key", ["key"])
  .index("by_category", ["category"]);
