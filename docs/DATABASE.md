# Database architecture

PowerPay beta 3 uses Prisma ORM with PostgreSQL. The schema supports merchants,
users, invoices, invoice lines, fees, payments, cross-border transfers, trusted
tokens, and zero-knowledge verification records.

## Providers

The same Prisma schema works with:

- standard PostgreSQL;
- Supabase Postgres;
- Neon serverless Postgres.

Use pooled connections for application traffic where supported and direct
connections for migrations.

## Commands

```bash
npm run db:generate
npm run db:validate
npm run db:migrate:dev
npm run db:migrate:deploy
npm run db:seed
npm run db:studio
```

The in-memory app database remains only for UI demonstrations. Production API
handlers should use `database/prisma.ts` and repository modules.
