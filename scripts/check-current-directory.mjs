import { existsSync } from "node:fs";

let cwd;
try {
  cwd = process.cwd();
} catch (error) {
  console.error(
    [
      "",
      "The shell's current working directory no longer exists.",
      "This causes npm to fail with ENOENT/uv_cwd before reading package.json.",
      "",
      "Fix:",
      "  cd /workspaces/powerpay",
      "  npm install",
      "",
      "Open a new terminal if the directory was deleted or renamed.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

if (!existsSync(cwd)) {
  console.error(`Current directory does not exist: ${cwd}`);
  process.exit(1);
}

console.log(`Working directory: ${cwd}`);
