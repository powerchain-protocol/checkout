import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "../validate.js";
import { WalletConnectModal } from "./wallet-connect-modal.js";
export function ConnectButton({ className = "" }) {
    const [open, setOpen] = useState(false);
    const { publicKey, connected, connecting, disconnect } = useWallet();
    if (connected && publicKey) {
        return (_jsxs("button", { className: `pp-connect-button pp-connected ${className}`, type: "button", onClick: () => void disconnect(), title: "Disconnect wallet", children: [_jsx("span", { className: "pp-status-dot" }), shortenAddress(publicKey)] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("button", { className: `pp-connect-button ${className}`, type: "button", onClick: () => setOpen(true), disabled: connecting, children: [_jsx("span", { "aria-hidden": "true", children: "\u25C8" }), connecting ? "Connecting…" : "Connect wallet"] }), _jsx(WalletConnectModal, { open: open, onOpenChange: setOpen })] }));
}
