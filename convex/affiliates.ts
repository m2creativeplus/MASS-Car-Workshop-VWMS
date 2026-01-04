import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new affiliate
export const createAffiliate = mutation({
  args: {
    orgId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    code: v.string(), // Custom or auto-generated code
    commissionRate: v.number(),
    paymentMethod: v.optional(v.string()),
    paymentDetails: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if code is already taken
    const existing = await ctx.db
      .query("affiliates")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();

    if (existing) {
      throw new Error(`Affiliate code '${args.code}' is already taken.`);
    }

    const affiliateId = await ctx.db.insert("affiliates", {
      orgId: args.orgId,
      name: args.name,
      email: args.email,
      phone: args.phone,
      code: args.code,
      commissionRate: args.commissionRate,
      totalEarnings: 0,
      balance: 0,
      status: "active",
      paymentMethod: args.paymentMethod,
      paymentDetails: args.paymentDetails,
    });

    return affiliateId;
  },
});

// Track a referral (when a conversion happens)
export const trackReferral = mutation({
  args: {
    code: v.string(),
    orgId: v.string(),
    sourceType: v.union(v.literal("job"), v.literal("order")),
    sourceId: v.string(),
    amount: v.number(), // The commission amount earned
  },
  handler: async (ctx, args) => {
    // Find affiliate by code
    const affiliate = await ctx.db
      .query("affiliates")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();

    if (!affiliate) {
      console.warn(`Referral track failed: Affiliate code '${args.code}' not found.`);
      return null;
    }

    if (affiliate.status !== "active") {
      console.warn(`Referral track failed: Affiliate '${affiliate.name}' is not active.`);
      return null;
    }

    // Record referral
    const referralId = await ctx.db.insert("referrals", {
      affiliateId: affiliate._id,
      orgId: args.orgId,
      sourceType: args.sourceType,
      sourceId: args.sourceId,
      amount: args.amount,
      status: "pending", // Default to pending until job is paid/closed
      createdAt: new Date().toISOString(),
    });

    // Update affiliate balance
    await ctx.db.patch(affiliate._id, {
      totalEarnings: (affiliate.totalEarnings || 0) + args.amount,
      balance: (affiliate.balance || 0) + args.amount,
    });

    return referralId;
  },
});

// Get affiliate by code (for public validation)
export const getAffiliateByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const affiliate = await ctx.db
      .query("affiliates")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    
    if (!affiliate || affiliate.status !== "active") return null;

    return {
      id: affiliate._id,
      name: affiliate.name,
      code: affiliate.code,
      commissionRate: affiliate.commissionRate,
    };
  },
});

// Get all affiliates for an organization (Admin view)
export const getAffiliates = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("affiliates")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});

// Get detailed stats for a specific affiliate (Affiliate Portal view)
export const getAffiliateStats = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const affiliate = await ctx.db
      .query("affiliates")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();

    if (!affiliate) return null;

    // Get recent referrals
    const referrals = await ctx.db
      .query("referrals")
      .withIndex("by_affiliate", (q) => q.eq("affiliateId", affiliate._id))
      .order("desc") // Need to sort by creation time, simplified effectively
      .take(50);

    return {
      affiliate,
      referrals,
    };
  },
});
