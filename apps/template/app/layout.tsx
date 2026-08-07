import type { Metadata } from "next";
import "./globals.css";
import "@nx/design-system/styles.css";
import "@nx/design-system/site-layout.css";
import nxConfig from "../nx.config.json";
import type { TemplateThemeMap, ThemeMode } from "../types";
import ThemeModeProvider from "./ThemeModeProvider";

const appName = nxConfig.name || "Template";
const appDescription = nxConfig.description || "Minimum app";
const designSystemConfig = nxConfig?.cartridges?.designSystem;
const defaultThemeName =
  typeof designSystemConfig?.defaultTheme === "string" && designSystemConfig.defaultTheme.trim()
    ? designSystemConfig.defaultTheme.trim()
    : "light";
const themes = (designSystemConfig?.themes || {}) as TemplateThemeMap;
const selectedTheme = themes[defaultThemeName] || themes.light || themes.dark || {};
const themeMode: ThemeMode = selectedTheme.mode === "dark" ? "dark" : "light";

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