import bs58 from "bs58";

export function encodeBase58(value: Uint8Array | string): string {
  const bytes =
    typeof value === "string" ? new TextEncoder().encode(value) : value;
  return bs58.encode(bytes);
}

export function decodeBase58(value: string): Uint8Array {
  return bs58.decode(value);
}
