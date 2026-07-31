# PowerPay contracts

## Sui

`contracts/sui` contains a beta Move payment-receipt scaffold. It accepts a
generic `Coin<T>`, transfers the full coin to the merchant, emits a payment
event, and returns a typed receipt object to the payer.

Before publishing:

- pin the Sui framework revision to the intended network release;
- run and maintain the included Move unit tests;
- review generic-coin and receipt storage behavior;
- establish package upgrade authority policy;
- publish to devnet/testnet first;
- record deployed package IDs in environment configuration;
- complete an independent security audit.

The contract has not been compiled in this environment.


## Sui payment tests

`contracts/sui/tests/payment_tests.move` covers:

- successful SUI payment execution;
- exact merchant coin delivery;
- payer receipt ownership;
- receipt payer, merchant, amount, and reference fields;
- rejection of zero-value payments;
- rejection of payer-to-self payments.

Run:

```bash
cd contracts/sui
sui move test
```
