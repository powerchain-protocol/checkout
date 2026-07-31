import { existsSync, readFileSync } from "node:fs";

const required = [
  "app/src/components/ui/badge.tsx",
  "app/src/hooks/use-hash-route.ts",
  "app/src/hooks/use-mobile.ts",
  "app/src/hooks/use-wallets.ts",
  "src/hooks/use-mobile.ts",
  "src/hooks/use-wallets.ts",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const badge = readFileSync("app/src/components/ui/badge.tsx", "utf8");
for (const marker of [
  "BadgeVariant",
  "variant?: BadgeVariant",
  "dot?: boolean",
  "pp-badge--outline",
]) {
  if (!badge.includes(marker)) throw new Error(`Badge missing ${marker}`);
}

const route = readFileSync("app/src/hooks/use-hash-route.ts", "utf8");
if (!route.includes("export type AppRoute = PowerPayAppRoute")) {
  throw new Error("use-hash-route does not export AppRoute");
}

const startup = readFileSync(
  "app/src/components/system/StartupScreen.tsx",
  "utf8",
);
if (startup.includes("ShieldCheckIcon")) {
  throw new Error("Unsupported ShieldCheckIcon remains");
}
if (!startup.includes("LockClosedIcon")) {
  throw new Error("Startup screen is missing a supported security icon");
}

const sidebar = readFileSync(
  "app/src/components/layout/Sidebar.tsx",
  "utf8",
);
if (!sidebar.includes('href={`#/${route}`}')) {
  throw new Error("Sidebar hash links do not match router format");
}

const wallets = readFileSync("src/hooks/use-wallets.ts", "utf8");
for (const marker of [
  "WalletConnectionState",
  "WalletCapabilities",
  "shortAddress",
  "disconnecting",
]) {
  if (!wallets.includes(marker)) {
    throw new Error(`Wallet hook missing ${marker}`);
  }
}

console.log("App UI and SDK consistency: OK");
