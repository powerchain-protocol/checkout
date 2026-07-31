import React, { useEffect } from "react";
import { transactionExplorerUrl, type SolanaCluster } from "../explorer.js";

export interface ConfirmationPopupCardProps {
  open: boolean;
  status?: "confirmed" | "processing" | "failed";
  amount: string;
  asset: string;
  signature?: string;
  cluster?: SolanaCluster;
  reference?: string;
  onClose: () => void;
}

export function ConfirmationPopupCard({ open, status = "confirmed", amount, asset, signature, cluster = "mainnet-beta", reference, onClose }: ConfirmationPopupCardProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
  if (!open) return null;
  const title = status === "confirmed" ? "Payment confirmed" : status === "processing" ? "Payment processing" : "Payment failed";
  const icon = status === "confirmed" ? "✓" : status === "processing" ? "…" : "!";
  return <div role="presentation" onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) onClose();
  }} style={overlay}>
    <section role="dialog" aria-modal="true" aria-labelledby="powerpay-confirmation-title" style={card}>
      <button aria-label="Close" onClick={onClose} style={close}>×</button>
      <div aria-hidden="true" style={{...iconStyle, background: status === "confirmed" ? "#34d399" : status === "failed" ? "#fb7185" : "#fbbf24"}}>{icon}</div>
      <h2 id="powerpay-confirmation-title" style={{margin: "0 0 8px"}}>{title}</h2>
      <p style={{fontSize: 28, fontWeight: 800, margin: "0 0 18px"}}>{amount} {asset}</p>
      {reference && <p style={muted}>Reference: {reference}</p>}
      {signature && <a href={transactionExplorerUrl(signature, cluster)} target="_blank" rel="noreferrer" style={link}>View transaction ↗</a>}
      <button onClick={onClose} style={primary}>Done</button>
    </section>
  </div>;
}

const overlay: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 9999, display: "grid", placeItems: "center", padding: 20, background: "rgba(4,8,20,.68)", backdropFilter: "blur(12px)" };
const card: React.CSSProperties = { position: "relative", width: "min(420px,100%)", padding: 32, borderRadius: 28, color: "#f8fafc", background: "linear-gradient(145deg,#111827,#080b14)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 30px 80px rgba(0,0,0,.45)", textAlign: "center", fontFamily: "Inter,system-ui,sans-serif" };
const close: React.CSSProperties = { position: "absolute", right: 16, top: 14, border: 0, color: "#94a3b8", background: "transparent", fontSize: 26, cursor: "pointer" };
const iconStyle: React.CSSProperties = { width: 58, height: 58, margin: "0 auto 18px", borderRadius: 18, display: "grid", placeItems: "center", color: "#07110d", fontSize: 30, fontWeight: 900 };
const muted: React.CSSProperties = { margin: "0 0 18px", color: "#94a3b8", overflowWrap: "anywhere" };
const link: React.CSSProperties = { display: "block", marginBottom: 20, color: "#a7f3d0", fontWeight: 700, textDecoration: "none" };
const primary: React.CSSProperties = { width: "100%", minHeight: 50, border: 0, borderRadius: 14, color: "#06261a", background: "#34d399", fontWeight: 800, cursor: "pointer" };
