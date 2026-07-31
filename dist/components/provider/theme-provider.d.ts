import React from "react";
export type PowerPayTheme = "light" | "dark" | "system";
interface ThemeContextValue {
    theme: PowerPayTheme;
    resolvedTheme: Exclude<PowerPayTheme, "system">;
    setTheme(theme: PowerPayTheme): void;
    toggleTheme(): void;
}
export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: PowerPayTheme;
    storageKey?: string;
}
export declare function ThemeProvider({ children, defaultTheme, storageKey, }: ThemeProviderProps): React.JSX.Element;
export declare function usePowerPayTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=theme-provider.d.ts.map