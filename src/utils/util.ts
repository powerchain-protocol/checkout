export function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) throw new Error(message);
}

export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function shortenAddress(
  address: string,
  leading = 4,
  trailing = 4,
): string {
  if (address.length <= leading + trailing + 1) return address;
  return `${address.slice(0, leading)}…${address.slice(-trailing)}`;
}

export function createRequestId(prefix = "pwrp"): string {
  const random = crypto.getRandomValues(new Uint8Array(12));
  return `${prefix}_${Array.from(random, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("")}`;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
