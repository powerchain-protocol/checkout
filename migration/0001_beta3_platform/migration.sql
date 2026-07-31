CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'OPERATOR', 'VIEWER', 'CUSTOMER');
CREATE TYPE "PaymentStatus" AS ENUM ('DRAFT', 'PENDING', 'SUBMITTED', 'CONFIRMED', 'FINALIZED', 'FAILED', 'EXPIRED', 'REFUNDED');
CREATE TYPE "TransferStatus" AS ENUM ('CREATED', 'SOURCE_SUBMITTED', 'ATTESTING', 'DESTINATION_READY', 'COMPLETED', 'FAILED');

CREATE TABLE "merchants" (
  "id" UUID PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "authority" TEXT NOT NULL UNIQUE,
  "treasury" TEXT NOT NULL,
  "feeTreasury" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "users" (
  "id" UUID PRIMARY KEY,
  "email" TEXT UNIQUE,
  "displayName" TEXT NOT NULL,
  "role" "UserRole" NOT NULL,
  "walletAddress" TEXT UNIQUE,
  "merchantId" UUID REFERENCES "merchants"("id"),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "invoices" (
  "id" UUID PRIMARY KEY,
  "number" TEXT NOT NULL,
  "merchantId" UUID NOT NULL REFERENCES "merchants"("id"),
  "customerId" UUID REFERENCES "users"("id"),
  "currency" TEXT NOT NULL,
  "subtotal" NUMERIC(36,18) NOT NULL,
  "tax" NUMERIC(36,18) NOT NULL,
  "total" NUMERIC(36,18) NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'DRAFT',
  "dueAt" TIMESTAMPTZ,
  "notes" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("merchantId", "number")
);

CREATE TABLE "invoice_lines" (
  "id" UUID PRIMARY KEY,
  "invoiceId" UUID NOT NULL REFERENCES "invoices"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "quantity" INTEGER NOT NULL CHECK ("quantity" > 0),
  "unitAmount" NUMERIC(36,18) NOT NULL,
  "taxRate" NUMERIC(8,4)
);

CREATE TABLE "invoice_fees" (
  "id" UUID PRIMARY KEY,
  "invoiceId" UUID NOT NULL REFERENCES "invoices"("id") ON DELETE CASCADE,
  "code" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "amount" NUMERIC(36,18) NOT NULL
);

CREATE TABLE "payments" (
  "id" UUID PRIMARY KEY,
  "merchantId" UUID NOT NULL REFERENCES "merchants"("id"),
  "invoiceId" UUID REFERENCES "invoices"("id"),
  "orderId" TEXT NOT NULL,
  "payer" TEXT,
  "recipient" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "mint" TEXT,
  "amount" NUMERIC(36,18) NOT NULL,
  "amountAtomic" TEXT,
  "decimals" INTEGER,
  "reference" TEXT NOT NULL UNIQUE,
  "signature" TEXT UNIQUE,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "cluster" TEXT NOT NULL,
  "metadata" JSONB,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "confirmedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("merchantId", "orderId")
);

CREATE TABLE "cross_border_transfers" (
  "id" UUID PRIMARY KEY,
  "paymentId" UUID NOT NULL UNIQUE REFERENCES "payments"("id") ON DELETE CASCADE,
  "sourceNetwork" TEXT NOT NULL,
  "destinationNetwork" TEXT NOT NULL,
  "route" TEXT NOT NULL,
  "sourceSignature" TEXT,
  "cctpMessageHash" TEXT,
  "cctpAttestation" TEXT,
  "destinationSignature" TEXT,
  "status" "TransferStatus" NOT NULL DEFAULT 'CREATED',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "trusted_tokens" (
  "id" UUID PRIMARY KEY,
  "network" TEXT NOT NULL,
  "mint" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "decimals" INTEGER NOT NULL,
  "tokenProgram" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "issuer" TEXT,
  "stable" BOOLEAN NOT NULL DEFAULT FALSE,
  "metadata" JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("network", "mint")
);

CREATE TABLE "zk_verifications" (
  "id" UUID PRIMARY KEY,
  "subjectType" TEXT NOT NULL,
  "subjectId" TEXT NOT NULL,
  "circuit" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "proofHash" TEXT NOT NULL,
  "verifier" TEXT NOT NULL,
  "valid" BOOLEAN NOT NULL,
  "publicInputs" JSONB NOT NULL,
  "verifiedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX "payments_status_expiresAt_idx" ON "payments" ("status", "expiresAt");
CREATE INDEX "trusted_tokens_symbol_status_idx" ON "trusted_tokens" ("symbol", "status");
CREATE INDEX "zk_verifications_subject_idx" ON "zk_verifications" ("subjectType", "subjectId");
