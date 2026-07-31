import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function checkToolchainIntegrity(root) {
  const required = [
    "node_modules/typescript/bin/tsc",
    "node_modules/vite/bin/vite.js",
    "node_modules/vite/dist/node/index.js",
    "node_modules/@types/node/package.json",
  ];

  const missing = required.filter(
    (relativePath) => !existsSync(resolve(root, relativePath)),
  );

  if (missing.length > 0) {
    return {
      ok: false,
      reason: `Missing dependency files: ${missing.join(", ")}`,
    };
  }

  try {
    const vitePackage = JSON.parse(
      readFileSync(resolve(root, "node_modules/vite/package.json"), "utf8"),
    );
    if (!vitePackage.version) {
      return { ok: false, reason: "Vite package metadata is invalid" };
    }

    await import(
      `${pathToFileURL(resolve(root, "node_modules/vite/dist/node/index.js")).href}?integrity=${Date.now()}`
    );

    return {
      ok: true,
      viteVersion: vitePackage.version,
    };
  } catch (error) {
    return {
      ok: false,
      reason:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}
