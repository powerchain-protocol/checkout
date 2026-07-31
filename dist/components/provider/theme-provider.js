import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
const ThemeContext = createContext(null);
function resolveTheme(theme) {
    if (theme !== "system")
        return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}
export function ThemeProvider({ children, defaultTheme = "system", storageKey = "powerpay-theme", }) {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === "undefined")
            return defaultTheme;
        return (window.localStorage.getItem(storageKey) ??
            defaultTheme);
    });
    const [resolvedTheme, setResolvedTheme] = useState("light");
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const apply = () => {
            const resolved = resolveTheme(theme);
            setResolvedTheme(resolved);
            document.documentElement.dataset.theme = resolved;
            document.documentElement.style.colorScheme = resolved;
        };
        apply();
        media.addEventListener?.("change", apply);
        return () => media.removeEventListener?.("change", apply);
    }, [theme]);
    const setTheme = useCallback((next) => {
        window.localStorage.setItem(storageKey, next);
        setThemeState(next);
    }, [storageKey]);
    const toggleTheme = useCallback(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"), [resolvedTheme, setTheme]);
    const value = useMemo(() => ({ theme, resolvedTheme, setTheme, toggleTheme }), [theme, resolvedTheme, setTheme, toggleTheme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
export function usePowerPayTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("usePowerPayTheme must be used inside ThemeProvider");
    return context;
}
//# sourceMappingURL=theme-provider.js.map