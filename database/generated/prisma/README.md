# Prisma 7 generated client

Generate the real client with:

```bash
npm run db:generate
```

The committed `client.d.ts` is an editor fallback for a fresh checkout before
generation. It declares the generated client surface locally and deliberately
does not import or re-export `PrismaClient` or `Prisma` from `@prisma/client`.

Database code imports from:

```ts
import { PrismaClient } from "./generated/prisma/client.js";
```
