import { existsSync, readFileSync } from "node:fs";

const required = [
  "app/public/brand/powerpay-metallic.png",
  "app/src/components/system/StartupScreen.tsx",
  "app/src/hooks/use-app-startup.ts",
  "app/index.html",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const component = readFileSync("app/src/components/system/StartupScreen.tsx", "utf8");
const css = readFileSync("app/src/styles/app.css", "utf8");
const html = readFileSync("app/index.html", "utf8");

for (const marker of [
  "PowerChain Ecosystem",
  "Welcome back!",
  "Interface",
  "Wallets",
  "Network",
  "Ready",
  "powerpay-metallic.webp",
]) {
  if (!component.includes(marker)) throw new Error(`Component missing ${marker}`);
}

for (const marker of [
  ".pp-startup__rings",
  ".pp-startup__stages",
  ".pp-startup__security",
  ".pp-startup__footer",
  "prefers-color-scheme: dark",
]) {
  if (!css.includes(marker)) throw new Error(`Styles missing ${marker}`);
}

if (
  !html.includes("/brand/powerpay-metallic.webp") &&
  !html.includes("/brand/powerpay-metallic-512.png")
) {
  throw new Error("Static boot screen does not use optimized exact uploaded logo");
}

console.log("Exact PowerPay loading design: OK");
