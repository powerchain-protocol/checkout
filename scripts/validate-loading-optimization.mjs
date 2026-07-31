import { existsSync, readFileSync, statSync } from "node:fs";

const assets = [
  "app/public/brand/powerpay-metallic.webp",
  "app/public/brand/powerpay-metallic-512.png",
];

for (const path of assets) {
  if (!existsSync(path)) throw new Error(`Missing optimized asset: ${path}`);
}

const webpSize = statSync(assets[0]).size;
const originalSize = statSync(
  "app/public/brand/powerpay-metallic.png",
).size;

if (webpSize >= originalSize) {
  throw new Error("Optimized WebP is not smaller than the original logo");
}

const component = readFileSync(
  "app/src/components/system/StartupScreen.tsx",
  "utf8",
);
const hook = readFileSync("app/src/hooks/use-app-startup.ts", "utf8");
const html = readFileSync("app/index.html", "utf8");

for (const marker of [
  "powerpay-metallic.webp",
  "powerpay-metallic-512.png",
  "fetchPriority",
]) {
  if (!component.includes(marker)) {
    throw new Error(`React loading asset strategy missing ${marker}`);
  }
}

for (const marker of [
  "MAXIMUM_STARTUP_MS",
  "sessionStorage",
  "Promise.allSettled",
]) {
  if (!hook.includes(marker)) {
    throw new Error(`Startup runtime optimization missing ${marker}`);
  }
}

if (!html.includes("powerpay-metallic.webp")) {
  throw new Error("Static loading screen does not preload optimized logo");
}

console.log(
  `Loading optimization: OK (${originalSize} -> ${webpSize} bytes)`,
);
