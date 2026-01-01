import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ============ VEHICLES ============
export const getVehicles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});

export const addVehicle = mutation({
  args: {
    make: v.string(),
    model: v.string(),
    year: v.number(),
    plate: v.string(),
    vin: v.string(),
    color: v.string(),
    mileage: v.number(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("vehicles", args);
  },
});

// ============ CUSTOMERS ============
export const getCustomers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").collect();
  },
});

export const addCustomer = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("customers", args);
  },
});

// ============ INVENTORY ============
export const getInventory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inventory").collect();
  },
});

export const addInventoryItem = mutation({
  args: {
    name: v.string(),
    sku: v.string(),
    category: v.string(),
    quantity: v.number(),
    price: v.number(),
    cost: v.optional(v.number()),
    warranty: v.optional(v.string()),
    condition: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inventory", args);
  },
});

export const updateInventoryQuantity = mutation({
  args: {
    id: v.id("inventory"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { quantity: args.quantity });
  },
});

// ============ WORK ORDERS ============
export const getWorkOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workOrders").collect();
  },
});

// ============ SALES / POS ============
export const getSales = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sales").collect();
  },
});

export const createSale = mutation({
  args: {
    items: v.array(v.object({
      inventoryId: v.id("inventory"),
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
    })),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    paymentMethod: v.string(),
    customerId: v.optional(v.id("customers")),
  },
  handler: async (ctx, args) => {
    // Create sale record
    const saleId = await ctx.db.insert("sales", {
      ...args,
      createdAt: new Date().toISOString(),
    });
    
    // Decrement inventory for each item
    for (const item of args.items) {
      const inventoryItem = await ctx.db.get(item.inventoryId);
      if (inventoryItem) {
        await ctx.db.patch(item.inventoryId, {
          quantity: inventoryItem.quantity - item.quantity,
        });
      }
    }
    
    return saleId;
  },
});

// ============ TECHNICIANS ============
export const getTechnicians = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("technicians").collect();
  },
});

// ============ DELIVERIES ============
export const getDeliveries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("deliveries").collect();
  },
});

// ============ REMINDERS ============
export const getReminders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reminders").collect();
  },
});

// ============ DASHBOARD STATS ============
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();
    const customers = await ctx.db.query("customers").collect();
    const inventory = await ctx.db.query("inventory").collect();
    const technicians = await ctx.db.query("technicians").collect();
    const workOrders = await ctx.db.query("workOrders").collect();
    
    return {
      totalVehicles: vehicles.length,
      totalCustomers: customers.length,
      totalParts: inventory.reduce((sum, item) => sum + item.quantity, 0),
      totalTechnicians: technicians.length,
      activeWorkOrders: workOrders.filter(wo => wo.status !== "complete").length,
      completedToday: workOrders.filter(wo => wo.status === "complete").length,
    };
  },
});
