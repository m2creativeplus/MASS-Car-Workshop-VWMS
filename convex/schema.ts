import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ============================================================
// MASS Car Workshop - Complete Convex Schema (13 Tables)
// Type-safe definitions for Vehicles, Inventory, Work Orders, POS
// ============================================================

export default defineSchema({
  // ============ 1. USERS (Profile & Authentication) ============
  users: defineTable({
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
    isActive: v.boolean(),
    avatarUrl: v.optional(v.string()),
    lastLoginAt: v.optional(v.string()),
  }).index("by_email", ["email"])
    .index("by_role", ["role"]),

  // ============ 2. CUSTOMERS (CRM) ============
  customers: defineTable({
    customerNumber: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    preferredContact: v.optional(v.union(
      v.literal("phone"),
      v.literal("email"),
      v.literal("sms")
    )),
    notes: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_email", ["email"])
    .index("by_phone", ["phone"])
    .index("by_customerNumber", ["customerNumber"]),

  // ============ 3. VEHICLES (Fleet Registry) ============
  vehicles: defineTable({
    customerId: v.optional(v.id("customers")),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    vin: v.optional(v.string()),
    licensePlate: v.optional(v.string()),
    color: v.optional(v.string()),
    engineType: v.optional(v.string()),
    transmission: v.optional(v.string()),
    fuelType: v.optional(v.union(
      v.literal("gasoline"),
      v.literal("diesel"),
      v.literal("electric"),
      v.literal("hybrid")
    )),
    mileage: v.number(),
    lastServiceDate: v.optional(v.string()),
    nextServiceDue: v.optional(v.number()),
    insuranceExpiry: v.optional(v.string()),
    registrationExpiry: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("in-service"),
      v.literal("delivered"),
      v.literal("inactive")
    ),
  }).index("by_customer", ["customerId"])
    .index("by_vin", ["vin"])
    .index("by_plate", ["licensePlate"])
    .index("by_status", ["status"]),

  // ============ 4. SUPPLIERS (Vendor Database) ============
  suppliers: defineTable({
    supplierCode: v.string(),
    name: v.string(),
    contactPerson: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    category: v.optional(v.string()),
    paymentTerms: v.optional(v.string()),
    creditLimit: v.optional(v.number()),
    taxId: v.optional(v.string()),
    website: v.optional(v.string()),
    notes: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_code", ["supplierCode"])
    .index("by_category", ["category"]),

  // ============ 5. INVENTORY (Parts Catalog) ============
  inventory: defineTable({
    partNumber: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    subcategory: v.optional(v.string()),
    brand: v.optional(v.string()),
    supplierId: v.optional(v.id("suppliers")),
    costPrice: v.number(),
    sellingPrice: v.number(),
    markupPercentage: v.optional(v.number()),
    stockQuantity: v.number(),
    minStockLevel: v.number(),
    maxStockLevel: v.optional(v.number()),
    reorderPoint: v.number(),
    unitOfMeasure: v.optional(v.string()),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    warrantyPeriod: v.optional(v.number()), // in months
    barcode: v.optional(v.string()),
    location: v.optional(v.string()),
    condition: v.union(
      v.literal("new"),
      v.literal("used"),
      v.literal("refurbished")
    ),
    isActive: v.boolean(),
  }).index("by_partNumber", ["partNumber"])
    .index("by_category", ["category"])
    .index("by_supplier", ["supplierId"])
    .index("by_barcode", ["barcode"]),

  // ============ 6. LABOR GUIDE (Service Operations) ============
  laborGuide: defineTable({
    operationCode: v.string(),
    description: v.string(),
    category: v.optional(v.string()),
    subcategory: v.optional(v.string()),
    standardHours: v.number(),
    suggestedRate: v.number(),
    skillLevel: v.union(
      v.literal("basic"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    ),
    toolsRequired: v.optional(v.array(v.string())),
    safetyNotes: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_code", ["operationCode"])
    .index("by_category", ["category"]),

  // ============ 7. APPOINTMENTS (Scheduling) ============
  appointments: defineTable({
    appointmentNumber: v.string(),
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    technicianId: v.optional(v.id("users")),
    serviceAdvisorId: v.optional(v.id("users")),
    appointmentDate: v.string(),
    durationMinutes: v.number(),
    serviceType: v.optional(v.string()),
    status: v.union(
      v.literal("scheduled"),
      v.literal("confirmed"),
      v.literal("in-progress"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("no-show")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
      v.literal("urgent")
    ),
    customerNotes: v.optional(v.string()),
    internalNotes: v.optional(v.string()),
    estimatedCost: v.optional(v.number()),
    reminderSent: v.boolean(),
  }).index("by_date", ["appointmentDate"])
    .index("by_customer", ["customerId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_technician", ["technicianId"])
    .index("by_status", ["status"]),

  // ============ 8. WORK ORDERS (Job Cards) ============
  workOrders: defineTable({
    jobNumber: v.string(),
    appointmentId: v.optional(v.id("appointments")),
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    technicianId: v.optional(v.id("users")),
    serviceAdvisorId: v.optional(v.id("users")),
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
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
      v.literal("urgent")
    ),
    services: v.array(v.string()),
    customerComplaint: v.optional(v.string()),
    diagnosis: v.optional(v.string()),
    workPerformed: v.optional(v.string()),
    recommendations: v.optional(v.string()),
    mileageIn: v.optional(v.number()),
    mileageOut: v.optional(v.number()),
    laborHours: v.optional(v.number()),
    partsTotal: v.optional(v.number()),
    laborTotal: v.optional(v.number()),
    taxAmount: v.optional(v.number()),
    totalAmount: v.optional(v.number()),
    checkinDate: v.string(),
    startedAt: v.optional(v.string()),
    completedAt: v.optional(v.string()),
  }).index("by_jobNumber", ["jobNumber"])
    .index("by_customer", ["customerId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_technician", ["technicianId"])
    .index("by_status", ["status"]),

  // ============ 9. INSPECTIONS (Digital Vehicle Inspection) ============
  inspections: defineTable({
    inspectionNumber: v.string(),
    workOrderId: v.optional(v.id("workOrders")),
    vehicleId: v.id("vehicles"),
    customerId: v.id("customers"),
    technicianId: v.optional(v.id("users")),
    status: v.union(
      v.literal("draft"),
      v.literal("in-progress"),
      v.literal("completed"),
      v.literal("approved"),
      v.literal("declined")
    ),
    mileage: v.optional(v.number()),
    fuelLevel: v.optional(v.string()),
    overallCondition: v.union(
      v.literal("excellent"),
      v.literal("good"),
      v.literal("fair"),
      v.literal("poor")
    ),
    safetyRating: v.union(
      v.literal("safe"),
      v.literal("attention-needed"),
      v.literal("unsafe")
    ),
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
      photoUrls: v.optional(v.array(v.string())),
    })),
    customerNotes: v.optional(v.string()),
    technicianNotes: v.optional(v.string()),
    recommendations: v.optional(v.string()),
    nextInspectionDue: v.optional(v.string()),
    startedAt: v.optional(v.string()),
    completedAt: v.optional(v.string()),
    approvedAt: v.optional(v.string()),
  }).index("by_vehicle", ["vehicleId"])
    .index("by_customer", ["customerId"])
    .index("by_technician", ["technicianId"])
    .index("by_status", ["status"]),

  // ============ 10. ESTIMATES (Quotes) ============
  estimates: defineTable({
    estimateNumber: v.string(),
    workOrderId: v.optional(v.id("workOrders")),
    inspectionId: v.optional(v.id("inspections")),
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    technicianId: v.optional(v.id("users")),
    serviceAdvisorId: v.optional(v.id("users")),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("approved"),
      v.literal("declined"),
      v.literal("expired"),
      v.literal("revised")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("normal"),
      v.literal("high"),
      v.literal("urgent")
    ),
    lineItems: v.array(v.object({
      type: v.union(
        v.literal("part"),
        v.literal("labor"),
        v.literal("service"),
        v.literal("misc")
      ),
      description: v.string(),
      partId: v.optional(v.id("inventory")),
      laborId: v.optional(v.id("laborGuide")),
      quantity: v.number(),
      unitPrice: v.number(),
      discountPercentage: v.optional(v.number()),
      totalPrice: v.number(),
      isApproved: v.boolean(),
    })),
    workDescription: v.optional(v.string()),
    customerNotes: v.optional(v.string()),
    internalNotes: v.optional(v.string()),
    subtotal: v.number(),
    discountPercentage: v.optional(v.number()),
    discountAmount: v.optional(v.number()),
    taxPercentage: v.optional(v.number()),
    taxAmount: v.number(),
    totalAmount: v.number(),
    validUntil: v.optional(v.string()),
    sentAt: v.optional(v.string()),
    viewedAt: v.optional(v.string()),
    approvedAt: v.optional(v.string()),
    declinedAt: v.optional(v.string()),
    declineReason: v.optional(v.string()),
  }).index("by_customer", ["customerId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_status", ["status"])
    .index("by_estimateNumber", ["estimateNumber"]),

  // ============ 11. INVOICES (Billing) ============
  invoices: defineTable({
    invoiceNumber: v.string(),
    workOrderId: v.optional(v.id("workOrders")),
    estimateId: v.optional(v.id("estimates")),
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("paid"),
      v.literal("partial"),
      v.literal("overdue"),
      v.literal("cancelled")
    ),
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
    })),
    subtotal: v.number(),
    discountAmount: v.optional(v.number()),
    taxAmount: v.number(),
    totalAmount: v.number(),
    paidAmount: v.number(),
    balanceDue: v.number(),
    dueDate: v.optional(v.string()),
    paymentTerms: v.optional(v.string()),
    notes: v.optional(v.string()),
    sentAt: v.optional(v.string()),
  }).index("by_customer", ["customerId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_status", ["status"])
    .index("by_invoiceNumber", ["invoiceNumber"]),

  // ============ 12. SALES (POS Transactions) ============
  // KEY FEATURE: Inventory auto-decrements when a sale is recorded
  sales: defineTable({
    saleNumber: v.string(),
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
    createdAt: v.string(),
  }).index("by_date", ["createdAt"])
    .index("by_customer", ["customerId"])
    .index("by_paymentMethod", ["paymentMethod"]),

  // ============ 13. REMINDERS (Notifications) ============
  reminders: defineTable({
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
    workOrderId: v.optional(v.id("workOrders")),
    title: v.string(),
    message: v.optional(v.string()),
    dueDate: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("completed"),
      v.literal("overdue"),
      v.literal("cancelled")
    ),
    notificationChannel: v.optional(v.union(
      v.literal("sms"),
      v.literal("email"),
      v.literal("whatsapp"),
      v.literal("app")
    )),
    sentAt: v.optional(v.string()),
    completedAt: v.optional(v.string()),
    notes: v.optional(v.string()),
  }).index("by_customer", ["customerId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_dueDate", ["dueDate"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),
});
