export type DatabaseProvider = "postgres" | "supabase" | "neon";

export interface DatabaseConfig {
  provider: DatabaseProvider;
  url: string;
  directUrl?: string;
  poolMax?: number;
  ssl?: boolean;
}

export interface DatabaseHealth {
  ok: boolean;
  provider: DatabaseProvider;
  latencyMs: number;
  checkedAt: string;
}
