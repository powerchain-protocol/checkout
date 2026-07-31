export type UserRole = "owner" | "admin" | "operator" | "viewer" | "customer";

export interface User {
  id: string;
  email?: string;
  displayName: string;
  walletAddress?: string;
  role: UserRole;
  merchantId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmbeddedWalletRecord {
  id: string;
  userId: string;
  address: string;
  provider: "embedded";
  createdAt: string;
}
