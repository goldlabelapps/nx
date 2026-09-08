"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { nxConfig } from "@/lib/nxConfig";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const defaultConfigTheme = (nxConfig.theme.defaultTheme as ThemeMode) || "dark";
const defaultResolvedTheme = defaultConfigTheme === "light" ? "light" : "dark";

interface ThemeContextType {
  mode: ThemeMode;
  theme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: defaultConfigTheme,
  theme: defaultResolvedTheme,
  systemTheme: "light",
  setMode: () => {},
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyThemeClass(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove(resolved === "dark" ? "light" : "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function getStoredMode(): ThemeMode | null {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // ignore
  }
  return null;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultConfigTheme;
    return getStoredMode() || defaultConfigTheme;
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme: ResolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    applyThemeClass(resolvedTheme);
  }, [resolvedTheme]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("theme", newMode);
    } catch {
      // ignore
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setMode(newTheme);
    },
    [setMode]
  );

  const toggleTheme = useCallback(() => {
    setModeState((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: resolvedTheme,
        systemTheme,
        setMode,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}

export function useSystemTheme(): ResolvedTheme {
  return useContext(ThemeContext).systemTheme;
}

