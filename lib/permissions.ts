
// Access Control Logic for MASS RBAC System

export type Permission = 
  // Work Orders & Jobs
  | "work_orders.view"
  | "work_orders.create"
  | "work_orders.edit"
  | "work_orders.delete"
  
  // Estimates & Financials
  | "estimates.view"
  | "estimates.create"
  | "estimates.approve" // Can finalize estimates
  | "invoices.view"
  | "invoices.create"
  | "payments.process"
  
  // Inventory
  | "inventory.view"
  | "inventory.manage" // Create/Edit/Adjust stock
  
  // Customer Data
  | "customers.view"
  | "customers.manage"
  
  // Settings & Admin
  | "settings.view"
  | "settings.manage"
  | "users.manage";

export const DEFAULT_ROLES = {
  admin: [
    "work_orders.view", "work_orders.create", "work_orders.edit", "work_orders.delete",
    "estimates.view", "estimates.create", "estimates.approve",
    "invoices.view", "invoices.create", "payments.process",
    "inventory.view", "inventory.manage",
    "customers.view", "customers.manage",
    "settings.view", "settings.manage", "users.manage"
  ],
  staff: [
    "work_orders.view", "work_orders.create", "work_orders.edit",
    "estimates.view", "estimates.create",
    "invoices.view", "invoices.create",
    "inventory.view",
    "customers.view", "customers.manage"
  ],
  technician: [
    "work_orders.view", "work_orders.edit", // Can edit own jobs
    "inventory.view",
    "customers.view"
  ]
};

/**
 * Checks if a user has the required permission based on their role and custom permissions
 */
export function hasPermission(
  userRole: "admin" | "staff" | "technician" | "custom",
  customPermissions: string[] | undefined,
  requiredPermission: Permission
): boolean {
  // 1. Check custom permissions first (override)
  if (customPermissions && customPermissions.includes(requiredPermission)) {
    return true;
  }

  // 2. Fallback to default role permissions
  if (userRole !== "custom") {
    const rolePermissions = DEFAULT_ROLES[userRole] || [];
    return rolePermissions.includes(requiredPermission);
  }

  return false;
}
