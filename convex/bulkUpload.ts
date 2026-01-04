import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Bulk Import Customers
 */
export const bulkImportCustomers = mutation({
  args: {
    customers: v.array(v.object({
      customerNumber: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      address: v.optional(v.string()),
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      zipCode: v.optional(v.string()),
      orgId: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const customer of args.customers) {
      const id = await ctx.db.insert("customers", customer);
      results.push(id);
    }
    return results;
  },
});

/**
 * Bulk Import Vehicles
 */
export const bulkImportVehicles = mutation({
  args: {
    vehicles: v.array(v.object({
      make: v.string(),
      model: v.string(),
      year: v.number(),
      vin: v.optional(v.string()),
      licensePlate: v.optional(v.string()),
      color: v.optional(v.string()),
      status: v.string(),
      orgId: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const vehicle of args.vehicles) {
      const id = await ctx.db.insert("vehicles", vehicle);
      results.push(id);
    }
    return results;
  },
});

/**
 * Bulk Import Inventory
 */
export const bulkImportInventory = mutation({
  args: {
    items: v.array(v.object({
      partNumber: v.string(),
      name: v.string(),
      description: v.optional(v.string()),
      category: v.string(),
      orgId: v.string(),
      quantity: v.number(),
      costPrice: v.number(),
      sellingPrice: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const item of args.items) {
      const id = await ctx.db.insert("inventory", item);
      results.push(id);
    }
    return results;
  },
});
