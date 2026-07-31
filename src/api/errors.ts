export class PowerPayApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(options: {
    message: string;
    status: number;
    code?: string;
    requestId?: string;
    details?: unknown;
    cause?: unknown;
  }) {
    super(options.message, { cause: options.cause });
    this.name = "PowerPayApiError";
    this.status = options.status;
    this.code = options.code ?? "POWERPAY_API_ERROR";
    this.requestId = options.requestId;
    this.details = options.details;
  }
}

export function isPowerPayApiError(
  value: unknown,
): value is PowerPayApiError {
  return value instanceof PowerPayApiError;
}
