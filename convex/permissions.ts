import { QueryCtx, MutationCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { DEFAULT_ROLES, Permission } from "../lib/permissions";

/**
 * Checks if the current authenticated user has the required permission.
 * Throws an error if permission is denied.
 */
export async function requirePermission(
  ctx: QueryCtx | MutationCtx,
  permission: Permission
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized: Please login first");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .first();

  if (!user) {
    throw new Error("Unauthorized: User not found");
  }

  // Find user's role in the organization
  // For now, we assume single organization context or find ANY valid role
  // In a real multi-tenant app, you'd pass orgId to check specific org permission
  const userRole = await ctx.db
    .query("userOrgRoles")
    .withIndex("by_user", (q) => q.eq("userId", user._id))
    .first();

  if (!userRole) {
    throw new Error("Unauthorized: No role assigned");
  }

  // 1. Check custom permissions override
  if (userRole.permissions && userRole.permissions.includes(permission)) {
    return true;
  }

  // 2. Check Custom Role Definition
  if (userRole.role === "custom" && userRole.customRoleId) {
    const customRole = await ctx.db.get(userRole.customRoleId);
    if (customRole && customRole.permissions.includes(permission)) {
      return true;
    }
  }

  // 3. Fallback to Default Roles
  if (userRole.role !== "custom") {
    const defaultPermissions = DEFAULT_ROLES[userRole.role];
    if (defaultPermissions && defaultPermissions.includes(permission)) {
      return true;
    }
  }

  // If we get here, permission is denied
  throw new Error(`Permission Denied: Required '${permission}'`);
}
