export const SOL_DECIMALS = 9;
export const LAMPORTS_PER_SOL_BIGINT = 1_000_000_000n;

export function assertDecimals(decimals: number): void {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 255) {
    throw new RangeError("Token decimals must be an integer from 0 through 255");
  }
}

export function parseUiAmount(value: string | number, decimals: number): bigint {
  assertDecimals(decimals);
  const input = String(value).trim();

  if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(input)) {
    throw new Error("Amount must be a non-negative decimal string");
  }

  const [whole, fraction = ""] = input.split(".");
  if (fraction.length > decimals) {
    throw new RangeError(
      `Amount has ${fraction.length} decimal places but the mint supports ${decimals}`,
    );
  }

  const padded = fraction.padEnd(decimals, "0");
  const atomic = BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || "0");

  if (atomic <= 0n) throw new RangeError("Payment amount must be greater than zero");
  return atomic;
}

export function formatAtomicAmount(
  amount: bigint,
  decimals: number,
  trimTrailingZeros = true,
): string {
  assertDecimals(decimals);
  if (amount < 0n) throw new RangeError("Atomic amount cannot be negative");

  const divisor = 10n ** BigInt(decimals);
  const whole = amount / divisor;
  const fraction = (amount % divisor).toString().padStart(decimals, "0");
  if (decimals === 0) return whole.toString();

  const normalized = trimTrailingZeros ? fraction.replace(/0+$/, "") : fraction;
  return normalized ? `${whole}.${normalized}` : whole.toString();
}

export function parseSol(value: string | number): bigint {
  return parseUiAmount(value, SOL_DECIMALS);
}
