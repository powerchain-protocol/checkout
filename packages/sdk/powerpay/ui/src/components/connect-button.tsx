import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "../validate.js";
import { WalletConnectModal } from "./wallet-connect-modal.js";

export interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className = "" }: ConnectButtonProps) {
  const [open, setOpen] = useState(false);
  const { publicKey, connected, connecting, disconnect } = useWallet();

  if (connected && publicKey) {
    return (
      <button
        className={`pp-connect-button pp-connected ${className}`}
        type="button"
        onClick={() => void disconnect()}
        title="Disconnect wallet"
      >
        <span className="pp-status-dot" />
        {shortenAddress(publicKey)}
      </button>
    );
  }

  return (
    <>
      <button
        className={`pp-connect-button ${className}`}
        type="button"
        onClick={() => setOpen(true)}
        disabled={connecting}
      >
        <span aria-hidden="true">◈</span>
        {connecting ? "Connecting…" : "Connect wallet"}
      </button>
      <WalletConnectModal open={open} onOpenChange={setOpen} />
    </>
  );
}
