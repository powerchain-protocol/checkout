import { existsSync, readFileSync, statSync } from "node:fs";

const path = "scripts/build-programs.sh";
if (!existsSync(path)) throw new Error(`Missing ${path}`);

const source = readFileSync(path, "utf8");
for (const marker of [
  "command -v",
  "cargo-build-sbf",
  "cargo-build-bpf",
  "if has_command cargo",
  "validate-program-layer.mjs",
  "validate-program-registry.mjs",
  "exit 0",
]) {
  if (!source.includes(marker)) {
    throw new Error(`Program build script missing ${marker}`);
  }
}

if ((statSync(path).mode & 0o111) === 0) {
  throw new Error("Program build script is not executable");
}

if (/else[\s\S]*cargo check --workspace[\s\S]*fi/.test(source) &&
    !source.includes("if has_command cargo")) {
  throw new Error("Program build script may invoke Cargo without checking it");
}

console.log("Program build fallback: OK");
