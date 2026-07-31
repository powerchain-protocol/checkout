# Solana Pay

PowerPay creates standard Solana Pay transfer-request URLs and QR data URLs.

Every order receives a unique reference public key. Incoming transactions are
located by reference and validated against recipient, amount, mint, and
commitment.

A merchant should not mark an order paid merely because a wallet opened the QR
code or returned a signature. Reconciliation must complete successfully.
