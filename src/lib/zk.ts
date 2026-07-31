export interface ZkProofEnvelope {
  circuit: string;
  version: string;
  publicInputs: string[];
  proof: string;
}

export interface ZkVerificationResult {
  valid: boolean;
  verifier: string;
  verifiedAt: string;
  reason?: string;
}

export interface ZkVerifier {
  verify(proof: ZkProofEnvelope): Promise<ZkVerificationResult>;
}

export class RejectingZkVerifier implements ZkVerifier {
  async verify(): Promise<ZkVerificationResult> {
    return {
      valid: false,
      verifier: "unconfigured",
      verifiedAt: new Date().toISOString(),
      reason:
        "No audited zero-knowledge verifier has been configured for this deployment",
    };
  }
}

export async function requireValidProof(
  verifier: ZkVerifier,
  envelope: ZkProofEnvelope,
): Promise<ZkVerificationResult> {
  const result = await verifier.verify(envelope);
  if (!result.valid) {
    throw new Error(result.reason ?? "Zero-knowledge proof is invalid");
  }
  return result;
}
