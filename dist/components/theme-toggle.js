import { jsx as _jsx } from "react/jsx-runtime";
import { usePowerPayTheme } from "./provider/theme-provider.js";
export function ThemeToggle() {
    const { resolvedTheme, toggleTheme } = usePowerPayTheme();
    const dark = resolvedTheme === "dark";
    return (_jsx("button", { className: "pp-icon-button", type: "button", onClick: toggleTheme, "aria-label": `Switch to ${dark ? "light" : "dark"} theme`, title: `Switch to ${dark ? "light" : "dark"} theme`, children: _jsx("span", { "aria-hidden": "true", children: dark ? "☀" : "☾" }) }));
}
//# sourceMappingURL=theme-toggle.js.map