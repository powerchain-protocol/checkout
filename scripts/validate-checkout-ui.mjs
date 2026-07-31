import { existsSync, readFileSync } from "node:fs";

const required = [
  "app/src/components/checkout/payment-form.tsx",
  "app/src/components/checkout/merchant-checkout.tsx",
  "app/src/components/checkout/client-qr-payment.tsx",
  "app/src/components/checkout/power-pos.tsx",
  "app/src/data/clients.ts",
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
}

const page = readFileSync("app/src/pages/checkout.tsx", "utf8");
const css = readFileSync("app/src/styles/app.css", "utf8");

for (const marker of [
  "Select client",
  "Merchant checkout",
  "Client QR payment",
  "PowerPOS",
  "theme-dark",
]) {
  if (!page.includes(marker)) throw new Error(`Checkout page missing ${marker}`);
}

if (!css.includes("--checkout-green:#0b6b43")) {
  throw new Error("Forest green theme token is missing");
}
if (css.includes("--checkout-blue")) {
  throw new Error("Blue checkout token is not allowed");
}

console.log("Checkout UI/UX: OK");
