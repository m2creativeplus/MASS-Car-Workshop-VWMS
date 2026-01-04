import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Fetch public inventory items for the store
export const getPublicInventory = query({
  args: { 
    orgId: v.string(),
    subdomain: v.optional(v.string()) // Can lookup by subdomain too
  },
  handler: async (ctx, args) => {
    // In a real implementation, we would filter by a "isPublic" flag on inventory items.
    // Since we didn't add that to the schema yet (cost of change), we will simply return 
    // ALL active items for now, but limit fields to public safe ones.
    
    // 1. Validate Store is Active
    const settings = await ctx.db
      .query("storeSettings")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .first();

    // If no settings found or inactive, return empty (store closed)
    // if (!settings || !settings.isActive) return []; 

    // 2. Fetch Inventory
    const inventory = await ctx.db
      .query("inventory")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .take(50); // Pagination in v2

    // 3. Transform for Public View (Hide Cost Price!)
    return inventory.map(item => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      partNumber: item.partNumber,
      category: item.category,
      price: item.sellingPrice,
      inStock: item.stockQuantity > 0,
      brand: item.brand,
    }));
  },
});

// Get Store Settings (Banner, Colors, Currency)
export const getStoreSettings = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("storeSettings")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .first();
      
    return settings || {
      // Defaults if not configured
      orgId: args.orgId,
      subdomain: "shop",
      isActive: true, // Default active for demo
      currency: "SLSH",
      bannerImage: "/placeholder-banner.jpg",
      accentColor: "#F59E0B",
    };
  },
});

// Configure Store Settings (Admin Only)
export const updateStoreSettings = mutation({
  args: {
    orgId: v.string(),
    subdomain: v.string(),
    isActive: v.boolean(),
    bannerImage: v.optional(v.string()),
    accentColor: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("storeSettings")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("storeSettings", args);
    }
  },
});

// Create a new Order from Public Storefront
export const createStoreOrder = mutation({
  args: {
    orgId: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    customerEmail: v.optional(v.string()),
    items: v.array(v.object({
      itemId: v.string(),
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
    })),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
  },
  handler: async (ctx, args) => {
    // Generate Order Number (Simple timestamp based for now)
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const orderId = await ctx.db.insert("storeOrders", {
      ...args,
      orderNumber,
      status: "new",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    });

    return { orderId, orderNumber };
  },
});

// Get Orders for Workshop Dashboard (Admin)
export const getStoreOrders = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("storeOrders")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc") // Newest first
      .take(100);
  },
});
