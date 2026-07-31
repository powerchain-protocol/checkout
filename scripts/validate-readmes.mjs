import { existsSync, readFileSync } from "node:fs";

const files = ["README.md", "app/README.md", "docs/DESIGN_SYSTEM.md"];

for (const path of files) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const root = readFileSync("README.md", "utf8");
const app = readFileSync("app/README.md", "utf8");
const design = readFileSync("docs/DESIGN_SYSTEM.md", "utf8");

for (const marker of [
  "PowerPay",
  "1.0.0-beta.1",
  "Merchant checkout",
  "Client QR payments",
  "PowerPOS",
  "Docker",
  "Architecture",
]) {
  if (!root.includes(marker)) {
    throw new Error(`Root README missing ${marker}`);
  }
}

for (const marker of [
  "Checkout workspace",
  "Client QR payments",
  "PowerPOS",
  "Visual system",
  "Accessibility and UX",
]) {
  if (!app.includes(marker)) {
    throw new Error(`App README missing ${marker}`);
  }
}

if (!design.includes("#0b6b43")) {
  throw new Error("Design system is missing the forest-green brand token");
}

console.log("Professional README documentation: OK");
