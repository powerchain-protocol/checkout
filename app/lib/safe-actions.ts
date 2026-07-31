import { z } from "zod";

export interface ActionSuccess<T> {
  ok: true;
  data: T;
}

export interface ActionFailure {
  ok: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[] | undefined>;
  };
}

export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

export function safeAction<Input, Output>(
  schema: z.ZodType<Input>,
  handler: (input: Input) => Promise<Output>,
) {
  return async (input: unknown): Promise<ActionResult<Output>> => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "The submitted data is invalid",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
      };
    }

    try {
      return { ok: true, data: await handler(parsed.data) };
    } catch (cause) {
      return {
        ok: false,
        error: {
          code: "ACTION_FAILED",
          message:
            cause instanceof Error
              ? cause.message
              : "The action could not be completed",
        },
      };
    }
  };
}
