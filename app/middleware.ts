import type {
  ApiRequest,
  ApiResponse,
} from "./api/v1/_shared";

export interface MiddlewareContext {
  requestId: string;
  startedAt: number;
  userId?: string;
  merchantId?: string;
}

export interface MiddlewareErrorBody {
  error: {
    code: string;
    message: string;
    requestId: string;
  };
}

export type MiddlewareResponse<T> =
  | ApiResponse<T>
  | ApiResponse<MiddlewareErrorBody>;

export type MiddlewareHandler<T = unknown> = (
  request: ApiRequest,
  context: MiddlewareContext,
) => Promise<MiddlewareResponse<T>>;

function methodNotAllowed(
  requestId: string,
): ApiResponse<MiddlewareErrorBody> {
  return {
    status: 405,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
    body: {
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Unsupported HTTP method",
        requestId,
      },
    },
  };
}

export function withMiddleware<T>(
  handler: MiddlewareHandler<T>,
): MiddlewareHandler<T> {
  return async (request, context) => {
    if (
      !["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(
        request.method.toUpperCase(),
      )
    ) {
      return methodNotAllowed(context.requestId);
    }

    const response = await handler(request, context);
    return {
      ...response,
      headers: {
        ...response.headers,
        "x-request-id": context.requestId,
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
        "permissions-policy": "camera=(), microphone=(), geolocation=()",
      },
    };
  };
}
