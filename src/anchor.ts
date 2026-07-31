import {
  AnchorProvider,
  Program,
  type Idl,
  type Wallet,
} from "@coral-xyz/anchor";
import {
  Connection,
  type Commitment,
} from "@solana/web3.js";

export interface CreateAnchorProviderOptions {
  connection: Connection;
  wallet: Wallet;
  commitment?: Commitment;
}

export function createAnchorProvider({
  connection,
  wallet,
  commitment = "confirmed",
}: CreateAnchorProviderOptions): AnchorProvider {
  return new AnchorProvider(connection, wallet, {
    commitment,
    preflightCommitment: commitment,
  });
}

/**
 * Creates a typed Anchor program from a modern IDL.
 *
 * Anchor 0.30+ IDLs include their deployed program address in IDL metadata.
 */
export function createAnchorProgram<T extends Idl>(
  idl: T,
  provider: AnchorProvider,
): Program<T> {
  return new Program(idl, provider);
}
