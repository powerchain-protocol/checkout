import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { transactionExplorerUrl } from "../explorer.js";
export function ConfirmationPopupCard({ open, status = "confirmed", amount, asset, signature, cluster = "mainnet-beta", reference, onClose }) {
    useEffect(() => {
        if (!open)
            return;
        const handler = (event) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);
    if (!open)
        return null;
    const title = status === "confirmed" ? "Payment confirmed" : status === "processing" ? "Payment processing" : "Payment failed";
    const icon = status === "confirmed" ? "✓" : status === "processing" ? "…" : "!";
    return _jsx("div", { role: "presentation", onMouseDown: (event) => {
            if (event.currentTarget === event.target)
                onClose();
        }, style: overlay, children: _jsxs("section", { role: "dialog", "aria-modal": "true", "aria-labelledby": "powerpay-confirmation-title", style: card, children: [_jsx("button", { "aria-label": "Close", onClick: onClose, style: close, children: "\u00D7" }), _jsx("div", { "aria-hidden": "true", style: { ...iconStyle, background: status === "confirmed" ? "#34d399" : status === "failed" ? "#fb7185" : "#fbbf24" }, children: icon }), _jsx("h2", { id: "powerpay-confirmation-title", style: { margin: "0 0 8px" }, children: title }), _jsxs("p", { style: { fontSize: 28, fontWeight: 800, margin: "0 0 18px" }, children: [amount, " ", asset] }), reference && _jsxs("p", { style: muted, children: ["Reference: ", reference] }), signature && _jsx("a", { href: transactionExplorerUrl(signature, cluster), target: "_blank", rel: "noreferrer", style: link, children: "View transaction \u2197" }), _jsx("button", { onClick: onClose, style: primary, children: "Done" })] }) });
}
const overlay = { position: "fixed", inset: 0, zIndex: 9999, display: "grid", placeItems: "center", padding: 20, background: "rgba(4,8,20,.68)", backdropFilter: "blur(12px)" };
const card = { position: "relative", width: "min(420px,100%)", padding: 32, borderRadius: 28, color: "#f8fafc", background: "linear-gradient(145deg,#111827,#080b14)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 30px 80px rgba(0,0,0,.45)", textAlign: "center", fontFamily: "Inter,system-ui,sans-serif" };
const close = { position: "absolute", right: 16, top: 14, border: 0, color: "#94a3b8", background: "transparent", fontSize: 26, cursor: "pointer" };
const iconStyle = { width: 58, height: 58, margin: "0 auto 18px", borderRadius: 18, display: "grid", placeItems: "center", color: "#07110d", fontSize: 30, fontWeight: 900 };
const muted = { margin: "0 0 18px", color: "#94a3b8", overflowWrap: "anywhere" };
const link = { display: "block", marginBottom: 20, color: "#a7f3d0", fontWeight: 700, textDecoration: "none" };
const primary = { width: "100%", minHeight: 50, border: 0, borderRadius: 14, color: "#06261a", background: "#34d399", fontWeight: 800, cursor: "pointer" };
//# sourceMappingURL=ConfirmationPopupCard.js.map