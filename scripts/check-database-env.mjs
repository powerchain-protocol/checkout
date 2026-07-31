const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not configured");
  process.exit(1);
}

const parsed = new URL(url);
if (!["postgres:", "postgresql:"].includes(parsed.protocol)) {
  console.error("DATABASE_URL must use PostgreSQL");
  process.exit(1);
}

console.log(`Database environment: ${parsed.hostname}`);
