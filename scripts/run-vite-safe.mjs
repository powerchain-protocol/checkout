import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const appDirectory = resolve(repositoryRoot, "app");
const viteBin = resolve(
  repositoryRoot,
  "node_modules",
  "vite",
  "bin",
  "vite.js",
);

for (const [label, path] of [
  ["repository root", repositoryRoot],
  ["application directory", appDirectory],
  ["Vite executable", viteBin],
]) {
  if (!existsSync(path)) {
    console.error(`${label} does not exist: ${path}`);
    console.error(
      "Open a new terminal, change to the repository root, and run npm install.",
    );
    process.exit(1);
  }
}

try {
  process.chdir(appDirectory);
} catch (error) {
  console.error(`Unable to enter application directory: ${appDirectory}`);
  console.error(error);
  process.exit(1);
}

const child = spawn(
  process.execPath,
  [viteBin, ...process.argv.slice(2)],
  {
    cwd: appDirectory,
    stdio: "inherit",
    env: {
      ...process.env,
      INIT_CWD: repositoryRoot,
    },
  },
);

child.on("error", (error) => {
  console.error("Failed to start Vite:", error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Vite stopped by signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 1);
});
