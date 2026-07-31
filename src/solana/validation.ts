import {
  Connection,
  PublicKey,
  type Commitment,
} from "@solana/web3.js";
import {
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export function parseSolanaAddress(value: string, label = "address"): PublicKey {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} is required`);

  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(trimmed);
  } catch (cause) {
    throw new Error(`${label} is not a valid Solana public key`, { cause });
  }

  if (!PublicKey.isOnCurve(publicKey.toBytes())) {
    throw new Error(`${label} must be an on-curve wallet address`);
  }
  return publicKey;
}

export function assertDifferentAddresses(
  payer: PublicKey,
  recipient: PublicKey,
): void {
  if (payer.equals(recipient)) {
    throw new Error("Payer and merchant recipient addresses must be different");
  }
}

export async function resolveMintInfo(
  connection: Connection,
  mint: PublicKey,
  commitment: Commitment = "confirmed",
): Promise<{ decimals: number; tokenProgram: PublicKey }> {
  for (const tokenProgram of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
    try {
      const info = await getMint(connection, mint, commitment, tokenProgram);
      return { decimals: info.decimals, tokenProgram };
    } catch {
      // Try the other supported token program.
    }
  }
  throw new Error("Mint account was not found under SPL Token or Token-2022");
}

export async function getWalletTokenBalance(params: {
  connection: Connection;
  owner: PublicKey;
  mint: PublicKey;
  tokenProgram: PublicKey;
  commitment?: Commitment;
}): Promise<bigint> {
  const ata = getAssociatedTokenAddressSync(
    params.mint,
    params.owner,
    false,
    params.tokenProgram,
  );

  try {
    const account = await getAccount(
      params.connection,
      ata,
      params.commitment ?? "confirmed",
      params.tokenProgram,
    );
    return account.amount;
  } catch {
    return 0n;
  }
}
