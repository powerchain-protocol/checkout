import { existsSync, readFileSync } from "node:fs";

const files = [
  "contracts/sui/Move.toml",
  "contracts/sui/sources/payment.move",
  "contracts/sui/tests/payment_tests.move",
];

for (const file of files) {
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
}

const source = readFileSync(
  "contracts/sui/sources/payment.move",
  "utf8",
);
const tests = readFileSync(
  "contracts/sui/tests/payment_tests.move",
  "utf8",
);

for (const marker of [
  "public entry fun pay",
  "PaymentReceipt",
  "PaymentCompleted",
]) {
  if (!source.includes(marker)) {
    throw new Error(`Move source missing ${marker}`);
  }
}

for (const marker of [
  "test_pay_transfers_coin_and_receipt",
  "test_pay_rejects_zero_amount",
  "test_pay_rejects_self_payment",
]) {
  if (!tests.includes(marker)) {
    throw new Error(`Move tests missing ${marker}`);
  }
}

console.log("Sui contract structure: OK");
