import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PowerPayTheme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: PowerPayTheme;
  resolvedTheme: Exclude<PowerPayTheme, "system">;
  setTheme(theme: PowerPayTheme): void;
  toggleTheme(): void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: PowerPayTheme;
  storageKey?: string;
}

function resolveTheme(theme: PowerPayTheme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "powerpay-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<PowerPayTheme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (
      (window.localStorage.getItem(storageKey) as PowerPayTheme | null) ??
      defaultTheme
    );
  });
  const [resolvedTheme, setResolvedTheme] =
    useState<"light" | "dark">("light");

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

  const setTheme = useCallback(
    (next: PowerPayTheme) => {
      window.localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey],
  );

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    [resolvedTheme, setTheme],
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function usePowerPayTheme(): ThemeContextValue {
  const context = useContext<ThemeContextValue | null>(ThemeContext);
  if (!context)
    throw new Error("usePowerPayTheme must be used inside ThemeProvider");
  return context;
}
