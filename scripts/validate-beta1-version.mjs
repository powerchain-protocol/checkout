import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const expected = "1.0.0-beta.1";
const ignored = new Set(["node_modules", ".git", "target"]);
const extensions = new Set([
  ".json", ".ts", ".tsx", ".js", ".mjs", ".md", ".yaml", ".yml", ".toml",
]);

const errors = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
      continue;
    }
    if (!extensions.has(extname(path))) continue;
    const source = readFileSync(path, "utf8");
    for (const match of source.matchAll(/1\.0\.0-beta\.\d+/g)) {
      if (match[0] !== expected) {
        errors.push(`${path}: ${match[0]}`);
      }
    }
  }
}

walk(".");

for (const path of ["package.json", "app/package.json"]) {
  const value = JSON.parse(readFileSync(path, "utf8")).version;
  if (value !== expected) errors.push(`${path}: version=${value}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Version normalization: ${expected}`);
