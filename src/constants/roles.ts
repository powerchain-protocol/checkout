export const POWERPAY_ROLES = [
  "owner",
  "admin",
  "operator",
  "viewer",
  "customer",
] as const;

export type PowerPayRole = (typeof POWERPAY_ROLES)[number];

export const POWERPAY_PERMISSIONS = [
  "payments:read",
  "payments:write",
  "sessions:read",
  "sessions:write",
  "clients:read",
  "clients:write",
  "integrations:read",
  "integrations:write",
  "webhooks:read",
  "webhooks:write",
  "storage:read",
  "storage:write",
  "settings:read",
  "settings:write",
] as const;

export type PowerPayPermission =
  (typeof POWERPAY_PERMISSIONS)[number];

export const POWERPAY_ROLE_PERMISSIONS: Record<
  PowerPayRole,
  readonly PowerPayPermission[]
> = {
  owner: POWERPAY_PERMISSIONS,
  admin: POWERPAY_PERMISSIONS.filter(
    (permission) => permission !== "settings:write",
  ),
  operator: [
    "payments:read",
    "payments:write",
    "sessions:read",
    "sessions:write",
    "clients:read",
    "clients:write",
    "integrations:read",
    "storage:read",
  ],
  viewer: [
    "payments:read",
    "sessions:read",
    "clients:read",
    "integrations:read",
    "webhooks:read",
    "storage:read",
    "settings:read",
  ],
  customer: ["payments:read", "sessions:read"],
};

export function roleCan(
  role: PowerPayRole,
  permission: PowerPayPermission,
): boolean {
  return POWERPAY_ROLE_PERMISSIONS[role].includes(permission);
}
