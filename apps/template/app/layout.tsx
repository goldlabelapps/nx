import type { Metadata } from "next";
import "./globals.css";
import "@nx/design-system/styles.css";
import "@nx/design-system/site-layout.css";
import nxConfig from "../nx.config.json";
import ThemeModeProvider from "./ThemeModeProvider";

type ThemeConfig = {
  mode?: "light" | "dark";
  primary?: string;
  secondary?: string;
  background?: string;
  paper?: string;
  text?: string;
  textSecondary?: string;
};

const appName = nxConfig.name || "Template";
const appDescription = nxConfig.description || "Minimum app";
const designSystemConfig = nxConfig?.cartridges?.designSystem;
const defaultThemeName =
  typeof designSystemConfig?.defaultTheme === "string" && designSystemConfig.defaultTheme.trim()
    ? designSystemConfig.defaultTheme.trim()
    : "light";
const themes = (designSystemConfig?.themes || {}) as Record<string, ThemeConfig>;
const selectedTheme = themes[defaultThemeName] || themes.light || themes.dark || {};
const themeMode: "light" | "dark" = selectedTheme.mode === "dark" ? "dark" : "light";

export const metadata: Metadata = {
  title: appName,
  description: appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeModeProvider
          initialMode={themeMode}
          themeConfigs={{
            light: themes.light,
            dark: themes.dark,
          }}
        >
          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}