import React from "react";
import { usePowerPayTheme } from "../providers/theme-provider.js";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = usePowerPayTheme();
  const dark = resolvedTheme === "dark";
  return (
    <button
      className="pp-icon-button"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
    </button>
  );
}
