import { mkdirSync, writeFileSync } from "node:fs";

const name = process.argv[2];
if (!name || !/^[a-z0-9_-]+$/i.test(name)) {
  console.error("Usage: node scripts/create-migration.mjs <name>");
  process.exit(1);
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);
const directory = `migration/${stamp}_${name}`;
mkdirSync(directory, { recursive: true });
writeFileSync(
  `${directory}/migration.sql`,
  "-- Review and commit an idempotent PostgreSQL migration.\n",
);
console.log(directory);
