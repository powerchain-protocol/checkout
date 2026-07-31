# Invoices and checkout

PowerPay beta 2 adds reusable invoice calculation, cart, payment-form, and
invoice-preview modules.

## Invoice service

`calculateInvoiceTotals` validates quantities and calculates subtotal, tax,
fees, and total from decimal strings.

The reference implementation uses two decimal places for invoice presentation.
The selected blockchain asset is still converted to its mint-specific atomic
amount before transaction construction.

## Checkout flow

The responsive checkout includes:

1. cart review;
2. quantity and removal controls;
3. visible invoice preview;
4. payment currency selection;
5. billing and receipt fields;
6. connected wallet summary;
7. explicit customer authorization;
8. loading and error states.

## Production integration

Replace the demonstration delay with `PaymentService.send` or a versioned API
payment request. Persist the invoice and order before asking for a signature.
After submission, reconcile the transaction by reference and update the invoice
only after confirmed or finalized validation.
