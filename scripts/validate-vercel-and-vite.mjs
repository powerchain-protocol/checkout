import { existsSync, readFileSync } from "node:fs";

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));

if ("$schema" in vercel) {
  throw new Error("vercel.json must not reference a remote schema");
}

if (vercel.outputDirectory !== "app/dist") {
  throw new Error("Vercel outputDirectory must point to app/dist");
}

const spaRewrite = vercel.rewrites?.find(
  (item) => item.destination === "/index.html",
);
if (!spaRewrite) {
  throw new Error("Vercel SPA rewrite to /index.html is missing");
}

for (const path of [
  "_redirects",
  "public/_redirects",
  "app/public/_redirects",
]) {
  if (existsSync(path)) {
    throw new Error(`Conflicting redirects file exists: ${path}`);
  }
}

const launcher = readFileSync("scripts/run-vite-safe.mjs", "utf8");
for (const marker of [
  "Rolldown panic",
  "SIGABRT",
  "clearViteState",
  "VITE_FORCE_ESBUILD",
]) {
  if (!launcher.includes(marker)) {
    throw new Error(`Safe Vite launcher missing ${marker}`);
  }
}

const component = readFileSync(
  "app/src/components/system/StartupScreen.tsx",
  "utf8",
);
if (component.includes("pp-startup__energy")) {
  throw new Error("Bolt divider remains in StartupScreen");
}

const css = readFileSync("app/src/styles/app.css", "utf8");
if (!css.includes("width: 44px")) {
  throw new Error("Smaller loading ring styles are missing");
}
if (!css.includes('color: #ffffff')) {
  throw new Error("Dark full-white wordmark style is missing");
}

console.log("Vercel routing, Vite recovery, and startup refinement: OK");
