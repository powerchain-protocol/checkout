module powerpay_sui::payment;

use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::event;
use sui::object::{Self, ID, UID};
use sui::transfer;
use sui::tx_context::{Self, TxContext};

const E_ZERO_AMOUNT: u64 = 1;
const E_WRONG_RECIPIENT: u64 = 2;

public struct PaymentReceipt<phantom T> has key, store {
    id: UID,
    merchant: address,
    payer: address,
    amount: u64,
    reference: vector<u8>,
}

public struct PaymentCompleted<phantom T> has copy, drop {
    receipt_id: ID,
    merchant: address,
    payer: address,
    amount: u64,
}


/// Merchant that received the payment.
public fun merchant<T>(receipt: &PaymentReceipt<T>): address {
    receipt.merchant
}

/// Address that initiated the payment.
public fun payer<T>(receipt: &PaymentReceipt<T>): address {
    receipt.payer
}

/// Atomic amount transferred to the merchant.
public fun amount<T>(receipt: &PaymentReceipt<T>): u64 {
    receipt.amount
}

/// Merchant-defined payment reference.
public fun reference<T>(receipt: &PaymentReceipt<T>): &vector<u8> {
    &receipt.reference
}

/// Stable abort code for zero-value payments.
public fun zero_amount_abort_code(): u64 {
    E_ZERO_AMOUNT
}

/// Stable abort code for payer-equals-merchant payments.
public fun wrong_recipient_abort_code(): u64 {
    E_WRONG_RECIPIENT
}

public entry fun pay<T>(
    coin: Coin<T>,
    merchant: address,
    reference: vector<u8>,
    ctx: &mut TxContext,
) {
    let amount = coin::value(&coin);
    assert!(amount > 0, E_ZERO_AMOUNT);

    let payer = tx_context::sender(ctx);
    assert!(merchant != payer, E_WRONG_RECIPIENT);

    transfer::public_transfer(coin, merchant);

    let receipt = PaymentReceipt<T> {
        id: object::new(ctx),
        merchant,
        payer,
        amount,
        reference,
    };

    event::emit(PaymentCompleted<T> {
        receipt_id: object::id(&receipt),
        merchant,
        payer,
        amount,
    });

    transfer::public_transfer(receipt, payer);
}
