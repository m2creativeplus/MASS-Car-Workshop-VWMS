import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Vehicles table
  vehicles: defineTable({
    make: v.string(),
    model: v.string(),
    year: v.number(),
    plate: v.string(),
    vin: v.string(),
    color: v.string(),
    mileage: v.number(),
    ownerId: v.optional(v.id("customers")),
    status: v.string(), // "active" | "in-service" | "delivered"
  }),

  // Customers table
  customers: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    status: v.string(), // "active" | "inactive"
  }),

  // Work Orders / Repairs
  workOrders: defineTable({
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    status: v.string(), // "check-in" | "inspecting" | "awaiting-approval" | "in-progress" | "complete"
    services: v.array(v.string()),
    technicianId: v.optional(v.id("technicians")),
    checkinDate: v.string(),
    estimatedTotal: v.optional(v.number()),
    priority: v.string(), // "normal" | "high" | "urgent"
  }),

  // Inventory / Parts
  inventory: defineTable({
    name: v.string(),
    sku: v.string(),
    category: v.string(),
    quantity: v.number(),
    price: v.number(),
    cost: v.optional(v.number()),
    warranty: v.optional(v.string()),
    condition: v.string(), // "new" | "used" | "refurbished"
  }),

  // Technicians
  technicians: defineTable({
    name: v.string(),
    role: v.string(),
    phone: v.string(),
    status: v.string(), // "available" | "working" | "break" | "offline"
    specialties: v.array(v.string()),
  }),

  // Sales / POS Transactions
  sales: defineTable({
    items: v.array(v.object({
      inventoryId: v.id("inventory"),
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
    })),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    paymentMethod: v.string(), // "cash" | "zaad" | "edahab" | "card"
    customerId: v.optional(v.id("customers")),
    createdAt: v.string(),
  }),

  // Deliveries
  deliveries: defineTable({
    workOrderId: v.id("workOrders"),
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    driverId: v.optional(v.id("technicians")),
    scheduledDate: v.string(),
    scheduledTime: v.string(),
    status: v.string(), // "pending" | "in-transit" | "delivered" | "cancelled"
    address: v.string(),
  }),

  // Reminders
  reminders: defineTable({
    type: v.string(), // "service" | "registration" | "insurance" | "inspection"
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    dueDate: v.string(),
    status: v.string(), // "pending" | "sent" | "completed" | "overdue"
    notes: v.optional(v.string()),
  }),
});
