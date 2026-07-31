import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

const root = process.cwd();
const appSource = join(root, "app", "src");
const errors = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
    } else if ([".ts", ".tsx"].includes(extname(path))) {
      inspect(path);
    }
  }
}

function resolvesFile(base) {
  return [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
    join(base, "index.js"),
  ].some(existsSync);
}

function inspect(path) {
  const source = readFileSync(path, "utf8");
  const imports = [
    ...source.matchAll(
      /(?:from\s+|import\s+)["']([^"']+)["']/g,
    ),
  ].map((match) => match[1]);

  for (const specifier of imports) {
    if (/(?:^|\/)src\/index\.(?:js|ts)$/.test(specifier)) {
      errors.push(
        `${path}: import the root SDK through @powerpay/sdk, not ${specifier}`,
      );
      continue;
    }

    if (specifier.startsWith(".")) {
      const target = resolve(dirname(path), specifier);
      if (!resolvesFile(target)) {
        errors.push(`${path}: unresolved relative import ${specifier}`);
      }
    }
  }
}

walk(appSource);

const requiredAliases = {
  "@powerpay/sdk": join(root, "src", "index.ts"),
  "@app-lib/utils": join(root, "app", "lib", "utils.ts"),
  "@app/lib/demo": join(root, "app", "src", "lib", "demo.ts"),
};

for (const [alias, target] of Object.entries(requiredAliases)) {
  if (!existsSync(target)) {
    errors.push(`${alias} target does not exist: ${target}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Application imports: OK");
