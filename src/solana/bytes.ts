const encoder = new TextEncoder();

export function utf8(value: string): Uint8Array {
  return encoder.encode(value);
}

export function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

export function u8(value: number): Uint8Array {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new RangeError("u8 value must be an integer from 0 through 255");
  }
  return Uint8Array.of(value);
}

export function u32LE(value: number): Uint8Array {
  if (!Number.isInteger(value) || value < 0 || value > 0xffff_ffff) {
    throw new RangeError("u32 value is outside the unsigned 32-bit range");
  }
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value, true);
  return bytes;
}

export function u64LE(value: bigint): Uint8Array {
  if (value < 0n || value > 0xffff_ffff_ffff_ffffn) {
    throw new RangeError("u64 value is outside the unsigned 64-bit range");
  }
  const bytes = new Uint8Array(8);
  new DataView(bytes.buffer).setBigUint64(0, value, true);
  return bytes;
}

export function fixedBytes(value: Uint8Array, length: number, label: string): Uint8Array {
  if (value.length !== length) {
    throw new RangeError(`${label} must contain exactly ${length} bytes`);
  }
  return value;
}

export function lengthPrefixedUtf8(value: string): Uint8Array {
  const body = utf8(value);
  return concatBytes(u32LE(body.length), body);
}
