import { MemoryCacheService } from "../../src/services/cache-service";

export const appCache = new MemoryCacheService();

export async function cached<T>(
  key: string,
  loader: () => Promise<T>,
  ttlMs = 30_000,
): Promise<T> {
  const existing = await appCache.get<T>(key);
  if (existing !== null) return existing;

  const value = await loader();
  await appCache.set(key, value, ttlMs);
  return value;
}
