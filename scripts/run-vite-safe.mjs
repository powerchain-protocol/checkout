import {
  existsSync,
  realpathSync,
  rmSync,
  statSync,
} from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { checkToolchainIntegrity } from "./lib/toolchain-integrity.mjs";

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


async function portAvailable(port, host = "0.0.0.0") {
  return await new Promise((resolveAvailability) => {
    const server = createServer();
    server.unref();
    server.once("error", () => resolveAvailability(false));
    server.listen({ port, host }, () => {
      server.close(() => resolveAvailability(true));
    });
  });
}

async function availablePort(start = 5173, end = 5193) {
  for (let port = start; port <= end; port += 1) {
    if (await portAvailable(port)) return port;
  }
  throw new Error(`No available development port between ${start} and ${end}`);
}

function hasPortArgument(args) {
  return args.some(
    (argument, index) =>
      argument === "--port" ||
      argument.startsWith("--port=") ||
      (index > 0 && args[index - 1] === "--port"),
  );
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

async function runVite({ force = false, fallback = false } = {}) {
  const integrity = await checkToolchainIntegrity(repositoryRoot);
  if (!integrity.ok) {
    console.error(`PowerPay detected a corrupted Vite installation: ${integrity.reason}`);
    console.error("Run: npm run install:repair");
    process.exitCode = 1;
    return;
  }

  const executable = viteExecutable();
  if (!executable) {
    console.error(
      "PowerPay could not locate Vite or the install was interrupted.",
    );
    console.error("Run: npm run install:repair");
    console.error("Then run: npm run dev:safe");
    process.exitCode = 1;
    return;
  }

  const selectedPort = hasPortArgument(forwardedArgs)
    ? null
    : await availablePort(
        Number(process.env.POWERPAY_DEV_PORT ?? process.env.PORT ?? 5173),
      );

  if (selectedPort && selectedPort !== 5173) {
    console.warn(
      `Port 5173 is occupied; PowerPay will use http://localhost:${selectedPort}`,
    );
  }

  const configFile = resolve(appDirectory, "vite.config.ts");
  const args = [
    executable,
    appDirectory,
    "--config",
    configFile,
    ...(selectedPort ? ["--port", String(selectedPort)] : []),
    ...(force ? ["--force"] : []),
    ...forwardedArgs,
  ];

  const child = spawn(process.execPath, args, {
    cwd: repositoryRoot,
    stdio: ["inherit", "pipe", "pipe"],
    env: {
      ...process.env,
      PWD: repositoryRoot,
      INIT_CWD: repositoryRoot,
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
      void runVite({ force: true, fallback: true });
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
process.chdir(repositoryRoot);

console.log(`PowerPay repository root: ${repositoryRoot}`);
console.log(`PowerPay application root: ${appDirectory}`);

await runVite();
