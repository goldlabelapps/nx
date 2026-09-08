"use client";

import React from "react";
import { DesignSystemProvider } from "@goldlabelapps/theme";
import { UbereduxProvider } from "@goldlabelapps/uberedux";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { nxConfig } from "@/lib/nxConfig";
import { LoadingOverlay } from "@/components/navigation/LoadingOverlay";

function DesignSystemBridge({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const themeConfig = theme === "dark" ? nxConfig.theme.dark : nxConfig.theme.light;

  return (
    <DesignSystemProvider mode={theme} themeConfig={themeConfig}>
      <LoadingOverlay />
      {children}
    </DesignSystemProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <UbereduxProvider>
      <ThemeProvider>
        <DesignSystemBridge>{children}</DesignSystemBridge>
      </ThemeProvider>
    </UbereduxProvider>
  );
}
