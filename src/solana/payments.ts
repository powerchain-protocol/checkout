import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  type Commitment,
  type TransactionSignature,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  assertDifferentAddresses,
  getWalletTokenBalance,
  resolveMintInfo,
} from "./validation.js";
import { parseSol, parseUiAmount } from "./amounts.js";
import {
  requireConnectedWallet,
  type ConnectedSolanaWallet,
} from "./wallet.js";

export interface ConfirmedPayment {
  signature: TransactionSignature;
  payer: string;
  recipient: string;
  amountAtomic: string;
  decimals: number;
  mint?: string;
  reference: string;
  slot: number;
  confirmationStatus: "confirmed" | "finalized";
}

export interface SendPaymentBase {
  connection: Connection;
  wallet: ConnectedSolanaWallet;
  recipient: PublicKey;
  amount: string | number;
  reference?: Keypair;
  commitment?: Commitment;
}

async function prepareTransaction(
  connection: Connection,
  payer: PublicKey,
  transaction: Transaction,
  commitment: Commitment,
): Promise<{ blockhash: string; lastValidBlockHeight: number }> {
  const latest = await connection.getLatestBlockhash(commitment);
  transaction.feePayer = payer;
  transaction.recentBlockhash = latest.blockhash;

  const simulation = await connection.simulateTransaction(transaction);
  if (simulation.value.err) {
    throw new Error(
      `Payment simulation failed: ${JSON.stringify(simulation.value.err)}`,
    );
  }
  return latest;
}

async function sendAndConfirmWithWallet(params: {
  connection: Connection;
  wallet: ConnectedSolanaWallet;
  transaction: Transaction;
  commitment: Commitment;
  blockhash: string;
  lastValidBlockHeight: number;
}): Promise<{ signature: string; slot: number; status: "confirmed" | "finalized" }> {
  const signature = await params.wallet.sendTransaction(
    params.transaction,
    params.connection,
    {
      preflightCommitment: params.commitment,
      maxRetries: 3,
      skipPreflight: false,
    },
  );

  const confirmation = await params.connection.confirmTransaction(
    {
      signature,
      blockhash: params.blockhash,
      lastValidBlockHeight: params.lastValidBlockHeight,
    },
    params.commitment,
  );

  if (confirmation.value.err) {
    throw new Error(
      `Payment transaction failed: ${JSON.stringify(confirmation.value.err)}`,
    );
  }

  const status = await params.connection.getSignatureStatus(signature, {
    searchTransactionHistory: true,
  });
  const confirmationStatus = status.value?.confirmationStatus;
  if (status.value?.err || !confirmationStatus) {
    throw new Error("Payment signature could not be reconciled with the cluster");
  }

  return {
    signature,
    slot: status.context.slot,
    status: confirmationStatus === "finalized" ? "finalized" : "confirmed",
  };
}

export async function sendSolPayment(
  input: SendPaymentBase,
): Promise<ConfirmedPayment> {
  const commitment = input.commitment ?? "confirmed";
  const payer = await requireConnectedWallet(input.wallet);
  assertDifferentAddresses(payer, input.recipient);

  const lamports = parseSol(input.amount);
  const balance = BigInt(await input.connection.getBalance(payer, commitment));
  const feeReserve = 10_000n;

  if (balance < lamports + feeReserve) {
    throw new Error(
      `Insufficient SOL balance. Required at least ${lamports + feeReserve} lamports including fee reserve`,
    );
  }

  const reference = input.reference ?? Keypair.generate();
  const transfer = SystemProgram.transfer({
    fromPubkey: payer,
    toPubkey: input.recipient,
    lamports,
  });
  transfer.keys.push({
    pubkey: reference.publicKey,
    isSigner: false,
    isWritable: false,
  });

  const transaction = new Transaction().add(transfer);
  const latest = await prepareTransaction(
    input.connection,
    payer,
    transaction,
    commitment,
  );
  const result = await sendAndConfirmWithWallet({
    connection: input.connection,
    wallet: input.wallet,
    transaction,
    commitment,
    ...latest,
  });

  return {
    signature: result.signature,
    payer: payer.toBase58(),
    recipient: input.recipient.toBase58(),
    amountAtomic: lamports.toString(),
    decimals: 9,
    reference: reference.publicKey.toBase58(),
    slot: result.slot,
    confirmationStatus: result.status,
  };
}

export async function sendTokenPayment(
  input: SendPaymentBase & { mint: PublicKey },
): Promise<ConfirmedPayment> {
  const commitment = input.commitment ?? "confirmed";
  const payer = await requireConnectedWallet(input.wallet);
  assertDifferentAddresses(payer, input.recipient);

  const { decimals, tokenProgram } = await resolveMintInfo(
    input.connection,
    input.mint,
    commitment,
  );
  const amount = parseUiAmount(input.amount, decimals);
  const balance = await getWalletTokenBalance({
    connection: input.connection,
    owner: payer,
    mint: input.mint,
    tokenProgram,
    commitment,
  });
  if (balance < amount) {
    throw new Error(
      `Insufficient token balance. Required ${amount} atomic units but wallet has ${balance}`,
    );
  }

  const payerAta = getAssociatedTokenAddressSync(
    input.mint,
    payer,
    false,
    tokenProgram,
  );
  const recipientAta = getAssociatedTokenAddressSync(
    input.mint,
    input.recipient,
    false,
    tokenProgram,
  );
  const reference = input.reference ?? Keypair.generate();

  const transfer = createTransferCheckedInstruction(
    payerAta,
    input.mint,
    recipientAta,
    payer,
    amount,
    decimals,
    [],
    tokenProgram,
  );
  transfer.keys.push({
    pubkey: reference.publicKey,
    isSigner: false,
    isWritable: false,
  });

  const transaction = new Transaction().add(
    createAssociatedTokenAccountIdempotentInstruction(
      payer,
      recipientAta,
      input.recipient,
      input.mint,
      tokenProgram,
    ),
    transfer,
  );

  const latest = await prepareTransaction(
    input.connection,
    payer,
    transaction,
    commitment,
  );
  const result = await sendAndConfirmWithWallet({
    connection: input.connection,
    wallet: input.wallet,
    transaction,
    commitment,
    ...latest,
  });

  return {
    signature: result.signature,
    payer: payer.toBase58(),
    recipient: input.recipient.toBase58(),
    amountAtomic: amount.toString(),
    decimals,
    mint: input.mint.toBase58(),
    reference: reference.publicKey.toBase58(),
    slot: result.slot,
    confirmationStatus: result.status,
  };
}
