const HEX = Array.from({ length: 256 }, (_, index) =>
  index.toString(16).padStart(2, "0"),
);

export function uuid(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return [
    bytes.slice(0, 4),
    bytes.slice(4, 6),
    bytes.slice(6, 8),
    bytes.slice(8, 10),
    bytes.slice(10, 16),
  ]
    .map((part) => Array.from(part, (byte) => HEX[byte]).join(""))
    .join("-");
}

export function createId(
  prefix: string,
  value = uuid().replaceAll("-", ""),
): string {
  if (!/^[a-z][a-z0-9_]*$/i.test(prefix)) {
    throw new Error("ID prefix must begin with a letter");
  }
  return `${prefix}_${value}`;
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
