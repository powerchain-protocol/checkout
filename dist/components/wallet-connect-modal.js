import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { usePowerPayCluster } from "../context/cluster-context.js";
import { CLUSTERS } from "../constants/clusters.js";
export function WalletConnectModal({ open, onOpenChange, }) {
    const { wallets, select, wallet, connecting } = useWallet();
    const { cluster, setCluster } = usePowerPayCluster();
    const walletModal = useWalletModal();
    useEffect(() => {
        if (!open)
            return;
        const close = (event) => {
            if (event.key === "Escape")
                onOpenChange(false);
        };
        document.addEventListener("keydown", close);
        return () => document.removeEventListener("keydown", close);
    }, [open, onOpenChange]);
    if (!open)
        return null;
    return (_jsx("div", { className: "pp-modal-backdrop", role: "presentation", onMouseDown: (event) => {
            if (event.target === event.currentTarget)
                onOpenChange(false);
        }, children: _jsxs("section", { className: "pp-wallet-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "pp-wallet-title", children: [_jsxs("header", { className: "pp-modal-header", children: [_jsxs("div", { children: [_jsx("p", { className: "pp-eyebrow", children: "Secure wallet connection" }), _jsx("h2", { id: "pp-wallet-title", children: "Connect to PowerPay" })] }), _jsx("button", { className: "pp-icon-button", type: "button", onClick: () => onOpenChange(false), "aria-label": "Close wallet dialog", children: "\u00D7" })] }), _jsxs("label", { className: "pp-field", children: [_jsx("span", { children: "Network" }), _jsx("select", { value: cluster, onChange: (event) => setCluster(event.target.value), children: ["devnet", "mainnet-beta"].map((id) => (_jsx("option", { value: id, children: CLUSTERS[id].label }, id))) })] }), _jsx("div", { className: "pp-wallet-list", children: wallets.map(({ adapter }) => (_jsxs("button", { className: "pp-wallet-option", type: "button", disabled: connecting, onClick: () => {
                            select(adapter.name);
                            walletModal.setVisible(true);
                            onOpenChange(false);
                        }, children: [adapter.icon ? (_jsx("img", { src: adapter.icon, alt: "", width: "34", height: "34" })) : (_jsx("span", { className: "pp-wallet-fallback", children: adapter.name.slice(0, 1) })), _jsxs("span", { children: [_jsx("strong", { children: adapter.name }), _jsx("small", { children: adapter.readyState })] }), _jsx("span", { "aria-hidden": "true", children: "\u2192" })] }, adapter.name))) }), _jsx("p", { className: "pp-modal-note", children: "PowerPay never receives your seed phrase or private keys." })] }) }));
}
//# sourceMappingURL=wallet-connect-modal.js.map