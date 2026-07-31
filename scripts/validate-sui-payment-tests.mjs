import { readFileSync } from "node:fs";

const contract = readFileSync(
  "contracts/sui/sources/payment.move",
  "utf8",
);
const tests = readFileSync(
  "contracts/sui/tests/payment_tests.move",
  "utf8",
);

for (const accessor of [
  "public fun merchant<T>",
  "public fun payer<T>",
  "public fun amount<T>",
  "public fun reference<T>",
]) {
  if (!contract.includes(accessor)) {
    throw new Error(`Missing receipt accessor: ${accessor}`);
  }
}

for (const test of [
  "fun test_pay_transfers_coin_and_receipt",
  "fun test_pay_rejects_zero_amount",
  "fun test_pay_rejects_self_payment",
]) {
  if (!tests.includes(test)) {
    throw new Error(`Missing Sui Move test: ${test}`);
  }
}

for (const assertion of [
  "scenario.take_from_sender",
  "coin::value(&merchant_coin) == PAYMENT_AMOUNT",
  "payment::reference(&receipt) == &reference",
  "location = powerpay_sui::payment",
]) {
  if (!tests.includes(assertion)) {
    throw new Error(`Missing test assertion marker: ${assertion}`);
  }
}

if (tests.includes("Add Sui Move unit tests")) {
  throw new Error("Placeholder Sui test comment remains");
}

console.log("Sui payment tests: OK");
