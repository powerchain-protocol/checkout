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
export declare function ThemeProvider({ children, defaultTheme, storageKey, }: ThemeProviderProps): any;
export declare function usePowerPayTheme(): ThemeContextValue;
export {};
