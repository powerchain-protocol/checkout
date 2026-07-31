import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { usePowerPayCluster } from "../context/cluster-context.js";
import { CLUSTERS, type PowerPayCluster } from "../constants/clusters.js";

export interface WalletConnectModalProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function WalletConnectModal({
  open,
  onOpenChange,
}: WalletConnectModalProps) {
  const { wallets, select, wallet, connecting } = useWallet();
  const { cluster, setCluster } = usePowerPayCluster();
  const walletModal = useWalletModal();

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="pp-modal-backdrop"
      role="presentation"
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <section
        className="pp-wallet-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pp-wallet-title"
      >
        <header className="pp-modal-header">
          <div>
            <p className="pp-eyebrow">Secure wallet connection</p>
            <h2 id="pp-wallet-title">Connect to PowerPay</h2>
          </div>
          <button
            className="pp-icon-button"
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close wallet dialog"
          >
            ×
          </button>
        </header>

        <label className="pp-field">
          <span>Network</span>
          <select
            value={cluster}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setCluster(event.target.value as PowerPayCluster)
            }
          >
            {(["devnet", "mainnet-beta"] as const).map((id) => (
              <option key={id} value={id}>
                {CLUSTERS[id].label}
              </option>
            ))}
          </select>
        </label>

        <div className="pp-wallet-list">
          {wallets.map(({ adapter }) => (
            <button
              className="pp-wallet-option"
              type="button"
              key={adapter.name}
              disabled={connecting}
              onClick={() => {
                select(adapter.name);
                walletModal.setVisible(true);
                onOpenChange(false);
              }}
            >
              {adapter.icon ? (
                <img src={adapter.icon} alt="" width="34" height="34" />
              ) : (
                <span className="pp-wallet-fallback">
                  {adapter.name.slice(0, 1)}
                </span>
              )}
              <span>
                <strong>{adapter.name}</strong>
                <small>{adapter.readyState}</small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>

        <p className="pp-modal-note">
          PowerPay never receives your seed phrase or private keys.
        </p>
      </section>
    </div>
  );
}
