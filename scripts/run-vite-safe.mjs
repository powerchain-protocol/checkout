import {
  existsSync,
  realpathSync,
  rmSync,
  statSync,
} from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = realpathSync(resolve(scriptDirectory, ".."));
const appDirectory = realpathSync(resolve(repositoryRoot, "app"));
const forwardedArgs = process.argv.slice(2);

function validateDirectory(path, label) {
  if (!existsSync(path)) {
    throw new Error(`${label} does not exist: ${path}`);
  }
  if (!statSync(path).isDirectory()) {
    throw new Error(`${label} is not a directory: ${path}`);
  }
}

function clearViteState() {
  for (const path of [
    resolve(repositoryRoot, "node_modules/.vite"),
    resolve(appDirectory, "node_modules/.vite"),
    resolve(appDirectory, ".vite"),
  ]) {
    rmSync(path, { recursive: true, force: true });
  }
}

const viteSegments = ["node_modules", "vite", "bin", "vite.js"];

function viteExecutable() {
  const candidates = [
    resolve(repositoryRoot, ...viteSegments),
    resolve(appDirectory, ...viteSegments),
  ];
  return candidates.find(existsSync);
}

function runVite({ force = false, fallback = false } = {}) {
  const executable = viteExecutable();
  if (!executable) {
    console.error(
      "PowerPay could not locate Vite. Run `npm install` at the repository root.",
    );
    process.exitCode = 1;
    return;
  }

  const args = [
    executable,
    "--config",
    resolve(appDirectory, "vite.config.ts"),
    ...(force ? ["--force"] : []),
    ...forwardedArgs,
  ];

  const child = spawn(process.execPath, args, {
    cwd: appDirectory,
    stdio: ["inherit", "pipe", "pipe"],
    env: {
      ...process.env,
      FORCE_COLOR: process.env.FORCE_COLOR ?? "1",
      RUST_BACKTRACE: process.env.RUST_BACKTRACE ?? "0",
      RUST_MIN_STACK: process.env.RUST_MIN_STACK ?? "8388608",
      VITE_CJS_IGNORE_WARNING: "true",
      ...(fallback
        ? {
            VITE_FORCE_ESBUILD: "true",
            ROLLDOWN_DISABLE: "1",
          }
        : {}),
    },
  });

  let output = "";
  const mirror = (stream, target) => {
    stream.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      target.write(chunk);
    });
  };

  mirror(child.stdout, process.stdout);
  mirror(child.stderr, process.stderr);

  child.on("exit", (code, signal) => {
    const panic =
      signal === "SIGABRT" ||
      /rolldown\/issues\/new\?template=panic_report|fatal runtime error|failed to initiate panic/i.test(
        output,
      );

    if (panic && !fallback) {
      console.warn(
        "\nPowerPay detected a Rolldown panic. Clearing cached state and retrying with the stable fallback.\n",
      );
      clearViteState();
      runVite({ force: true, fallback: true });
      return;
    }

    if (signal) {
      console.error(`Vite stopped by signal ${signal}`);
      process.exitCode = 1;
      return;
    }

    process.exitCode = code ?? 1;
  });
}

validateDirectory(repositoryRoot, "Repository root");
validateDirectory(appDirectory, "Application directory");
process.chdir(appDirectory);

if (process.cwd() !== appDirectory) {
  console.log(`PowerPay Vite launcher using application cwd: ${appDirectory}`);
}

runVite();
