# Sui Move payment tests

The payment package uses `sui::test_scenario` to model separate payer and
merchant transactions.

## Successful payment

The test mints a test-only `Coin<SUI>`, calls `payment::pay`, then verifies:

- the payer owns `PaymentReceipt<SUI>`;
- receipt payer and merchant addresses;
- exact atomic amount;
- unchanged reference bytes;
- the merchant owns a `Coin<SUI>` with the exact payment value.

## Failure paths

The suite expects the payment module to abort when:

- the coin value is zero (`E_ZERO_AMOUNT`);
- the merchant is the transaction sender (`E_WRONG_RECIPIENT`).

## Run

```bash
cd contracts/sui
sui move test
```

The JavaScript repository check validates test structure only. A successful
`sui move test` invocation is required before publishing or deploying the Move
package.
