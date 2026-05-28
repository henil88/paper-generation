import { auth } from "@paper-generation/auth";
import type { ac } from "@paper-generation/auth/permissions";
import type { Role } from "@paper-generation/auth/roles";
import { asyncHandler } from "@/utils/async-handler";

// Resource/Action types derived from access control
type Resource = keyof typeof ac.statements;
type Actions<T extends Resource> = (typeof ac.statements)[T][number];
type PermissionCheck<T extends Resource = Resource> = {
  [K in T]: Actions<K>[];
};

/**
 * Role-based access control middleware.
 * Only allows specified roles. Returns 403 if role doesn't match.
 */
export const requireRole = (...allowedRoles: Role[]) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });

    const userRole = req.user.role as Role;

    if (!allowedRoles.includes(userRole))
      return res.status(403).json({
        success: false,
        error: "Forbidden",
        message: `Required role: ${allowedRoles.join(" or ")}`,
      });
    next();
  });
};

/**
 * Permission-based access control middleware.
 * Checks if user's role has specific permissions on resources.
 */
export const requirePermission = <T extends Resource>(permissions: PermissionCheck<T>) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
    const result = await auth.api.userHasPermission({
      body: {
        userId: req.user.id,
        permissions,
      },
    });

    if (!result.success)
      return res.status(403).json({
        error: "Forbidden",
        message: "Insufficient permissions",
        required: permissions,
      });
    next();
  });
};
