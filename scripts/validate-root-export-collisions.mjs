import { readFileSync } from "node:fs";

const source = readFileSync("src/index.ts", "utf8");

const namedExports = new Map();
const exportPattern =
  /export\s+(?:type\s+)?\{([\s\S]*?)\}\s+from\s+["']([^"']+)["'];/g;

for (const match of source.matchAll(exportPattern)) {
  const modulePath = match[2];
  const specifiers = match[1]
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const specifier of specifiers) {
    const parts = specifier.split(/\s+as\s+/);
    const exportedName = (parts[1] ?? parts[0]).trim();
    const locations = namedExports.get(exportedName) ?? [];
    locations.push(modulePath);
    namedExports.set(exportedName, locations);
  }
}

const duplicates = [...namedExports.entries()].filter(
  ([, modules]) => modules.length > 1,
);

if (duplicates.length > 0) {
  throw new Error(
    `Duplicate named root exports: ${duplicates
      .map(([name, modules]) => `${name} (${modules.join(", ")})`)
      .join("; ")}`,
  );
}

const apiClientExports =
  source.match(/\bPowerPayApiClient\b/g)?.length ?? 0;
const apiClientOptionExports =
  source.match(/\bPowerPayApiClientOptions\b/g)?.length ?? 0;

if (apiClientExports !== 1 || apiClientOptionExports !== 1) {
  throw new Error(
    `PowerPay API root exports must occur exactly once; found client=${apiClientExports}, options=${apiClientOptionExports}`,
  );
}

console.log("Root SDK named exports are collision-free.");
