import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

declare global {
  var powerPayPrisma: PrismaClient | undefined;
}

export function createPrismaClient(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) throw new Error("DATABASE_URL is required");
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

export const prisma =
  globalThis.powerPayPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.powerPayPrisma = prisma;
}
