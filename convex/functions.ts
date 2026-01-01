import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ============================================================
// MASS Car Workshop - Convex Functions
// Real-time CRUD with automatic inventory management
// ============================================================

// ============ USERS ============
export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    role: v.union(
      v.literal("admin"),
      v.literal("staff"),
      v.literal("technician"),
      v.literal("customer")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      isActive: true,
      lastLoginAt: new Date().toISOString(),
    });
  },
});

// ============ CUSTOMERS ============
export const getCustomers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").collect();
  },
});

export const getCustomerById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addCustomer = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("customers").collect();
    const customerNumber = `CUST-${String(count.length + 1).padStart(6, "0")}`;
    
    return await ctx.db.insert("customers", {
      ...args,
      customerNumber,
      isActive: true,
    });
  },
});

export const updateCustomer = mutation({
  args: {
    id: v.id("customers"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// ============ VEHICLES ============
export const getVehicles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});

export const getVehiclesByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("vehicles")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect();
  },
});

export const addVehicle = mutation({
  args: {
    customerId: v.optional(v.id("customers")),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    vin: v.optional(v.string()),
    licensePlate: v.optional(v.string()),
    color: v.optional(v.string()),
    mileage: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("in-service"),
      v.literal("delivered"),
      v.literal("inactive")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("vehicles", args);
  },
});

export const updateVehicle = mutation({
  args: {
    id: v.id("vehicles"),
    mileage: v.optional(v.number()),
    status: v.optional(v.union(
      v.literal("active"),
      v.literal("in-service"),
      v.literal("delivered"),
      v.literal("inactive")
    )),
    lastServiceDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// ============ SUPPLIERS ============
export const getSuppliers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("suppliers").collect();
  },
});

export const addSupplier = mutation({
  args: {
    name: v.string(),
    contactPerson: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("suppliers").collect();
    const supplierCode = `SUP-${String(count.length + 1).padStart(4, "0")}`;
    
    return await ctx.db.insert("suppliers", {
      ...args,
      supplierCode,
      isActive: true,
    });
  },
});

// ============ INVENTORY (with stock tracking) ============
export const getInventory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inventory").collect();
  },
});

export const getInventoryByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inventory")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getLowStockItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("inventory").collect();
    return items.filter((item) => item.stockQuantity <= item.reorderPoint);
  },
});

export const addInventoryItem = mutation({
  args: {
    partNumber: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    brand: v.optional(v.string()),
    supplierId: v.optional(v.id("suppliers")),
    costPrice: v.number(),
    sellingPrice: v.number(),
    stockQuantity: v.number(),
    minStockLevel: v.number(),
    reorderPoint: v.number(),
    condition: v.union(
      v.literal("new"),
      v.literal("used"),
      v.literal("refurbished")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inventory", {
      ...args,
      isActive: true,
    });
  },
});

export const updateInventoryQuantity = mutation({
  args: {
    id: v.id("inventory"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { stockQuantity: args.quantity });
  },
});

// ============ LABOR GUIDE ============
export const getLaborGuide = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("laborGuide").collect();
  },
});

export const addLaborOperation = mutation({
  args: {
    operationCode: v.string(),
    description: v.string(),
    category: v.optional(v.string()),
    standardHours: v.number(),
    suggestedRate: v.number(),
    skillLevel: v.union(
      v.literal("basic"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("laborGuide", {
      ...args,
      isActive: true,
    });
  },
});

// ============ APPOINTMENTS ============
export const getAppointments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("appointments").collect();
  },
});

export const getAppointmentsByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("appointments")
      .withIndex("by_date", (q) => q.eq("appointmentDate", args.date))
      .collect();
  },
});

export const createAppointment = mutation({
  args: {
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    technicianId: v.optional(v.id("users")),
    appointmentDate: v.string(),
    durationMinutes: v.number(),
    serviceType: v.optional(v.string()),
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
      v.literal("urgent")
    ),
    customerNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("appointments").collect();
    const appointmentNumber = `APT-${String(count.length + 1).padStart(6, "0")}`;
    
    return await ctx.db.insert("appointments", {
      ...args,
      appointmentNumber,
      status: "scheduled",
      reminderSent: false,
    });
  },
});

// ============ WORK ORDERS ============
export const getWorkOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workOrders").collect();
  },
});

export const getWorkOrdersByStatus = query({
  args: {
    status: v.union(
      v.literal("check-in"),
      v.literal("inspecting"),
      v.literal("awaiting-approval"),
      v.literal("in-progress"),
      v.literal("waiting-parts"),
      v.literal("complete"),
      v.literal("invoiced"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workOrders")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const createWorkOrder = mutation({
  args: {
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    technicianId: v.optional(v.id("users")),
    services: v.array(v.string()),
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
      v.literal("urgent")
    ),
    customerComplaint: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("workOrders").collect();
    const jobNumber = `JOB-${String(count.length + 1).padStart(6, "0")}`;
    
    // Update vehicle status to in-service
    await ctx.db.patch(args.vehicleId, { status: "in-service" });
    
    return await ctx.db.insert("workOrders", {
      ...args,
      jobNumber,
      status: "check-in",
      checkinDate: new Date().toISOString(),
    });
  },
});

export const updateWorkOrderStatus = mutation({
  args: {
    id: v.id("workOrders"),
    status: v.union(
      v.literal("check-in"),
      v.literal("inspecting"),
      v.literal("awaiting-approval"),
      v.literal("in-progress"),
      v.literal("waiting-parts"),
      v.literal("complete"),
      v.literal("invoiced"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const workOrder = await ctx.db.get(args.id);
    
    const updates: Record<string, string> = { status: args.status };
    
    if (args.status === "in-progress" && !workOrder?.startedAt) {
      updates.startedAt = new Date().toISOString();
    }
    
    if (args.status === "complete") {
      updates.completedAt = new Date().toISOString();
      // Update vehicle status back to active
      if (workOrder?.vehicleId) {
        await ctx.db.patch(workOrder.vehicleId, { status: "active" });
      }
    }
    
    await ctx.db.patch(args.id, updates);
  },
});

// ============ INSPECTIONS ============
export const getInspections = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inspections").collect();
  },
});

export const createInspection = mutation({
  args: {
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    technicianId: v.optional(v.id("users")),
    workOrderId: v.optional(v.id("workOrders")),
    items: v.array(v.object({
      name: v.string(),
      category: v.string(),
      status: v.union(
        v.literal("ok"),
        v.literal("attention"),
        v.literal("immediate-attention"),
        v.literal("not-applicable")
      ),
      notes: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("inspections").collect();
    const inspectionNumber = `INS-${String(count.length + 1).padStart(6, "0")}`;
    
    // Determine overall condition based on items
    const hasImmediate = args.items.some((i) => i.status === "immediate-attention");
    const hasAttention = args.items.some((i) => i.status === "attention");
    
    const overallCondition = hasImmediate ? "poor" : hasAttention ? "fair" : "good";
    const safetyRating = hasImmediate ? "unsafe" : hasAttention ? "attention-needed" : "safe";
    
    return await ctx.db.insert("inspections", {
      ...args,
      inspectionNumber,
      status: "completed",
      overallCondition,
      safetyRating,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    });
  },
});

// ============ ESTIMATES ============
export const getEstimates = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("estimates").collect();
  },
});

export const createEstimate = mutation({
  args: {
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    lineItems: v.array(v.object({
      type: v.union(
        v.literal("part"),
        v.literal("labor"),
        v.literal("service"),
        v.literal("misc")
      ),
      description: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      totalPrice: v.number(),
      isApproved: v.boolean(),
    })),
    workDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("estimates").collect();
    const estimateNumber = `EST-${String(count.length + 1).padStart(6, "0")}`;
    
    const subtotal = args.lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAmount = subtotal * 0.05; // 5% tax
    const totalAmount = subtotal + taxAmount;
    
    return await ctx.db.insert("estimates", {
      ...args,
      estimateNumber,
      status: "draft",
      priority: "normal",
      subtotal,
      taxAmount,
      totalAmount,
    });
  },
});

// ============ INVOICES ============
export const getInvoices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("invoices").collect();
  },
});

// ============ SALES / POS ============
// KEY FEATURE: Automatic inventory decrement on sale
export const getSales = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sales").collect();
  },
});

export const getSalesToday = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];
    const sales = await ctx.db.query("sales").collect();
    return sales.filter((sale) => sale.createdAt.startsWith(today));
  },
});

/**
 * CREATE SALE - with automatic inventory decrement
 * When a part sale is recorded in the POS, this mutation:
 * 1. Creates the sale record
 * 2. Automatically decreases inventory stock for each item sold
 */
export const createSale = mutation({
  args: {
    items: v.array(v.object({
      inventoryId: v.id("inventory"),
      partNumber: v.string(),
      name: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      totalPrice: v.number(),
    })),
    subtotal: v.number(),
    taxAmount: v.number(),
    discountAmount: v.optional(v.number()),
    totalAmount: v.number(),
    paymentMethod: v.union(
      v.literal("cash"),
      v.literal("zaad"),
      v.literal("edahab"),
      v.literal("card"),
      v.literal("bank-transfer")
    ),
    paymentReference: v.optional(v.string()),
    customerId: v.optional(v.id("customers")),
    cashierId: v.optional(v.id("users")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Generate sale number
    const count = await ctx.db.query("sales").collect();
    const saleNumber = `SALE-${String(count.length + 1).padStart(6, "0")}`;
    
    // 1. Create the sale record
    const saleId = await ctx.db.insert("sales", {
      ...args,
      saleNumber,
      createdAt: new Date().toISOString(),
    });
    
    // 2. AUTO-DECREMENT: Reduce inventory stock for each item sold
    for (const item of args.items) {
      const inventoryItem = await ctx.db.get(item.inventoryId);
      if (inventoryItem) {
        const newQuantity = Math.max(0, inventoryItem.stockQuantity - item.quantity);
        await ctx.db.patch(item.inventoryId, {
          stockQuantity: newQuantity,
        });
      }
    }
    
    return saleId;
  },
});

// ============ REMINDERS ============
export const getReminders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reminders").collect();
  },
});

export const getPendingReminders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("reminders")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
  },
});

export const createReminder = mutation({
  args: {
    type: v.union(
      v.literal("service"),
      v.literal("registration"),
      v.literal("insurance"),
      v.literal("inspection"),
      v.literal("payment"),
      v.literal("follow-up")
    ),
    vehicleId: v.optional(v.id("vehicles")),
    customerId: v.id("customers"),
    title: v.string(),
    message: v.optional(v.string()),
    dueDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reminders", {
      ...args,
      status: "pending",
    });
  },
});

// ============ DASHBOARD STATS ============
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();
    const customers = await ctx.db.query("customers").collect();
    const inventory = await ctx.db.query("inventory").collect();
    const workOrders = await ctx.db.query("workOrders").collect();
    const sales = await ctx.db.query("sales").collect();
    
    // Today's data
    const today = new Date().toISOString().split("T")[0];
    const todaySales = sales.filter((s) => s.createdAt.startsWith(today));
    const todayRevenue = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
    
    // Inventory stats
    const totalParts = inventory.reduce((sum, item) => sum + item.stockQuantity, 0);
    const lowStockItems = inventory.filter((item) => item.stockQuantity <= item.reorderPoint);
    
    // Work order stats
    const activeWorkOrders = workOrders.filter(
      (wo) => !["complete", "invoiced", "cancelled"].includes(wo.status)
    );
    const completedToday = workOrders.filter(
      (wo) => wo.completedAt?.startsWith(today)
    );
    
    return {
      totalVehicles: vehicles.length,
      vehiclesInService: vehicles.filter((v) => v.status === "in-service").length,
      totalCustomers: customers.length,
      totalParts,
      lowStockCount: lowStockItems.length,
      activeWorkOrders: activeWorkOrders.length,
      completedToday: completedToday.length,
      todayRevenue,
      todaySalesCount: todaySales.length,
    };
  },
});

// ============ TECHNICIANS (Users with technician role) ============
export const getTechnicians = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "technician"))
      .collect();
  },
});

// ============ DELIVERIES (from Work Orders marked as complete) ============
export const getDeliveries = query({
  args: {},
  handler: async (ctx) => {
    const completedOrders = await ctx.db
      .query("workOrders")
      .withIndex("by_status", (q) => q.eq("status", "complete"))
      .collect();
    
    // Enrich with vehicle and customer data
    const deliveries = await Promise.all(
      completedOrders.map(async (order) => {
        const vehicle = await ctx.db.get(order.vehicleId);
        const customer = await ctx.db.get(order.customerId);
        return {
          ...order,
          vehicle,
          customer,
        };
      })
    );
    
    return deliveries;
  },
});
