#[test_only]
module powerpay_sui::payment_tests;

use powerpay_sui::payment::{Self, PaymentReceipt};
use std::vector;
use sui::coin::{Self, Coin};
use sui::sui::SUI;
use sui::test_scenario as ts;

const PAYER: address = @0xA11CE;
const MERCHANT: address = @0xB0B;
const PAYMENT_AMOUNT: u64 = 42_000;
const E_ZERO_AMOUNT: u64 = 1;
const E_WRONG_RECIPIENT: u64 = 2;

#[test]
fun test_pay_transfers_coin_and_receipt() {
    let mut scenario = ts::begin(PAYER);
    let reference = b"invoice-beta-10";
    let payment_coin = coin::mint_for_testing<SUI>(
        PAYMENT_AMOUNT,
        scenario.ctx(),
    );

    payment::pay(
        payment_coin,
        MERCHANT,
        reference,
        scenario.ctx(),
    );

    // The payer receives a typed receipt containing immutable payment data.
    scenario.next_tx(PAYER);
    let receipt: PaymentReceipt<SUI> = scenario.take_from_sender();

    assert!(payment::payer(&receipt) == PAYER);
    assert!(payment::merchant(&receipt) == MERCHANT);
    assert!(payment::amount(&receipt) == PAYMENT_AMOUNT);
    assert!(
        vector::length(payment::reference(&receipt))
            == vector::length(&reference),
    );
    assert!(payment::reference(&receipt) == &reference);

    scenario.return_to_sender(receipt);

    // The merchant receives the exact coin value.
    scenario.next_tx(MERCHANT);
    let merchant_coin: Coin<SUI> = scenario.take_from_sender();
    assert!(coin::value(&merchant_coin) == PAYMENT_AMOUNT);
    scenario.return_to_sender(merchant_coin);

    let _summary = ts::end(scenario);
}

#[test]
#[expected_failure(
    abort_code = E_ZERO_AMOUNT,
    location = powerpay_sui::payment,
)]
fun test_pay_rejects_zero_amount() {
    let mut scenario = ts::begin(PAYER);
    let zero_coin = coin::mint_for_testing<SUI>(0, scenario.ctx());

    payment::pay(
        zero_coin,
        MERCHANT,
        b"zero-payment",
        scenario.ctx(),
    );

    abort 0
}

#[test]
#[expected_failure(
    abort_code = E_WRONG_RECIPIENT,
    location = powerpay_sui::payment,
)]
fun test_pay_rejects_self_payment() {
    let mut scenario = ts::begin(PAYER);
    let payment_coin = coin::mint_for_testing<SUI>(
        PAYMENT_AMOUNT,
        scenario.ctx(),
    );

    payment::pay(
        payment_coin,
        PAYER,
        b"self-payment",
        scenario.ctx(),
    );

    abort 0
}
