import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const required = [
  "dotenv/config",
  "prisma/config",
  "@prisma/client",
  "@prisma/adapter-pg",
  "pg",
];

const missing = required.filter((name) => {
  try {
    require.resolve(name);
    return false;
  } catch {
    return true;
  }
});

if (missing.length) {
  console.error([
    "Missing Prisma dependencies:",
    ...missing.map((name) => `- ${name}`),
    "",
    "Run:",
    "  pnpm install",
    "  pnpm approve-builds",
    "  pnpm db:generate",
    "  pnpm db:validate",
  ].join("\n"));
  process.exit(1);
}

console.log("Prisma dependency resolution: OK");
