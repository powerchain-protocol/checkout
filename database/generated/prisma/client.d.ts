/**
 * Editor-only fallback for the Prisma 7 generated client.
 *
 * `npm run db:generate` replaces this declaration with the real generated
 * client. The Prisma 7 `prisma-client` generator owns PrismaClient and Prisma;
 * they must not be re-exported from `@prisma/client`.
 */

export interface PrismaClientOptions {
  adapter?: unknown;
  log?: Array<
    | "query"
    | "info"
    | "warn"
    | "error"
    | {
        emit: "stdout" | "event";
        level: "query" | "info" | "warn" | "error";
      }
  >;
}

export interface PrismaDelegate {
  findUnique(args?: unknown): Promise<unknown>;
  findFirst(args?: unknown): Promise<unknown>;
  findMany(args?: unknown): Promise<unknown[]>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
  upsert(args: unknown): Promise<unknown>;
  delete(args: unknown): Promise<unknown>;
  count(args?: unknown): Promise<number>;
}

export declare class PrismaClient {
  constructor(options?: PrismaClientOptions);

  readonly merchant: PrismaDelegate;
  readonly user: PrismaDelegate;
  readonly invoice: PrismaDelegate;
  readonly invoiceLine: PrismaDelegate;
  readonly invoiceFee: PrismaDelegate;
  readonly payment: PrismaDelegate;
  readonly crossBorderTransfer: PrismaDelegate;
  readonly trustedToken: PrismaDelegate;
  readonly zkVerification: PrismaDelegate;

  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $transaction<T>(
    input:
      | Promise<T>[]
      | ((client: PrismaClient) => Promise<T>),
  ): Promise<T>;
}

export declare namespace Prisma {
  type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonValue[];

  type JsonObject = {
    [key: string]: JsonValue;
  };

  type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonValue[];

  type InputJsonObject = {
    readonly [key: string]: InputJsonValue | null;
  };

  type TransactionClient = Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$transaction"
  >;

  class Decimal {
    constructor(value: string | number | Decimal);
    toString(): string;
    toNumber(): number;
  }
}
