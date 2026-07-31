import { existsSync, readFileSync } from "node:fs";

const required = [
  "app/src/components/system/StartupScreen.tsx",
  "app/src/hooks/use-app-startup.ts",
  "app/src/pages/loading.tsx",
  "app/index.html",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const startup = readFileSync(
  "app/src/components/system/StartupScreen.tsx",
  "utf8",
);
const app = readFileSync("app/src/App.tsx", "utf8");
const css = readFileSync("app/src/styles/app.css", "utf8");
const html = readFileSync("app/index.html", "utf8");

for (const marker of [
  "Powered by PowerChain",
  "Multi-chain ready",
  "Instant, secure payments",
  "Secure",
  "Encrypted",
  "Verified",
]) {
  if (!startup.includes(marker)) {
    throw new Error(`Startup screen missing ${marker}`);
  }
}

for (const marker of ["useAppStartup", "<StartupScreen"]) {
  if (!app.includes(marker)) {
    throw new Error(`App startup integration missing ${marker}`);
  }
}

for (const marker of [
  ".startup-screen",
  ".startup-progress",
  ".startup-assurance",
  ".startup-capabilities",
  "@media (prefers-color-scheme: dark)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(marker)) {
    throw new Error(`Startup styles missing ${marker}`);
  }
}

if (!html.includes("Starting PowerPay")) {
  throw new Error("Static startup fallback is missing");
}

console.log("Professional loading experience: OK");
