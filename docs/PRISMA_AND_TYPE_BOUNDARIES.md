# Prisma and ambient type boundaries

## Prisma 7

The repository uses the Prisma 7 `prisma-client` generator with a custom output:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../database/generated/prisma"
}
```

Therefore application code imports `PrismaClient` and `Prisma` from the
generated output, not from `@prisma/client`.

The committed declaration under `database/generated/prisma/client.d.ts` is only
an editor fallback before the first generation pass.

## Buffer and React types

`Buffer`, `ReactNode`, JSX, and React namespaces are owned by the official
`@types/node`, `@types/react`, and `@types/react-dom` packages.

The offline vendor shims now describe only missing external modules. They do
not redeclare global `Buffer`, React modules, JSX namespaces, or `ReactNode`.
This avoids block-scoped and duplicate-identifier diagnostics.
