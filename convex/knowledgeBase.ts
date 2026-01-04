import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listArticles = query({
  args: { category: v.optional(v.string()), orgId: v.string() },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("knowledgeBase")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .filter((q) => q.eq("orgId", args.orgId))
        .collect();
    }
    return await ctx.db
      .query("knowledgeBase")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});

export const addArticle = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.object({
      html: v.string(),
      text: v.string(),
      images: v.array(v.string()),
      links: v.array(v.string()),
    })),
    category: v.optional(v.string()),
    section: v.optional(v.string()),
    url: v.string(),
    scrapedAt: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("knowledgeBase")
      .withIndex("by_url", (q) => q.eq("url", args.url))
      .filter((q) => q.eq("orgId", args.orgId))
      .unique();

    if (existing) {
      return await ctx.db.patch(existing._id, args);
    }
    return await ctx.db.insert("knowledgeBase", args);
  },
});
