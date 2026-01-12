import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// =============================================================================
// SETTINGS CONVEX FUNCTIONS
// Handles Email SMTP, OAuth, Theme Colors, Email Templates, Trusted Badges
// Uses the existing siteSettings table with category-based organization
// =============================================================================

// =========================
// QUERIES
// =========================

/**
 * Get all settings for a specific category
 */
export const getSettingsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("siteSettings")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

/**
 * Get a single setting by key
 */
export const getSettingByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
  },
});

/**
 * Get all email templates
 */
export const getEmailTemplates = query({
  args: {},
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("siteSettings")
      .withIndex("by_category", (q) => q.eq("category", "email_templates"))
      .collect();
    
    return templates.map((t) => ({
      id: t.key,
      ...JSON.parse(t.value),
    }));
  },
});

/**
 * Get theme colors
 */
export const getThemeColors = query({
  args: {},
  handler: async (ctx) => {
    const theme = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "themeColors"))
      .first();
    
    if (!theme) return null;
    
    try {
      return JSON.parse(theme.value);
    } catch {
      return null;
    }
  },
});

// =========================
// MUTATIONS
// =========================

/**
 * Upsert (insert or update) a setting
 */
export const upsertSettings = mutation({
  args: {
    key: v.string(),
    value: v.any(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if setting exists
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    const now = new Date().toISOString();
    const valueString = typeof args.value === "string" 
      ? args.value 
      : JSON.stringify(args.value);

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        value: valueString,
        category: args.category,
        updatedAt: now,
      });
      return existing._id;
    } else {
      // Create new
      return await ctx.db.insert("siteSettings", {
        key: args.key,
        value: valueString,
        type: typeof args.value === "object" ? "json" : "text",
        category: args.category,
        updatedAt: now,
      });
    }
  },
});

/**
 * Upsert an email template
 */
export const upsertEmailTemplate = mutation({
  args: {
    templateId: v.string(),
    templateName: v.string(),
    subject: v.string(),
    body: v.string(),
    variables: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const key = `email_template_${args.templateId}`;
    
    // Check if template exists
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    const now = new Date().toISOString();
    const templateData = {
      name: args.templateName,
      subject: args.subject,
      body: args.body,
      variables: args.variables,
    };

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: JSON.stringify(templateData),
        updatedAt: now,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("siteSettings", {
        key,
        value: JSON.stringify(templateData),
        type: "json",
        category: "email_templates",
        updatedAt: now,
      });
    }
  },
});

/**
 * Delete a setting by key
 */
export const deleteSetting = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return true;
    }
    return false;
  },
});

/**
 * Bulk update settings for a category
 */
export const bulkUpdateSettings = mutation({
  args: {
    category: v.string(),
    settings: v.array(v.object({
      key: v.string(),
      value: v.any(),
    })),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const results = [];

    for (const setting of args.settings) {
      const existing = await ctx.db
        .query("siteSettings")
        .withIndex("by_key", (q) => q.eq("key", setting.key))
        .first();

      const valueString = typeof setting.value === "string"
        ? setting.value
        : JSON.stringify(setting.value);

      if (existing) {
        await ctx.db.patch(existing._id, {
          value: valueString,
          updatedAt: now,
        });
        results.push({ key: setting.key, action: "updated" });
      } else {
        await ctx.db.insert("siteSettings", {
          key: setting.key,
          value: valueString,
          type: typeof setting.value === "object" ? "json" : "text",
          category: args.category,
          updatedAt: now,
        });
        results.push({ key: setting.key, action: "created" });
      }
    }

    return results;
  },
});
