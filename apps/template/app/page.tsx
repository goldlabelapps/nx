"use client";

import {
  AppShell,
  Button,
  Card,
  Heading,
  List,
  ListItem,
  PageSection,
  SwatchGroup,
} from "@nx/design-system";
import nxConfig from "../nx.config.json";
import { useThemeMode } from "./ThemeModeProvider";

type ThemeConfig = {
  primary?: string;
  secondary?: string;
  background?: string;
  paper?: string;
  text?: string;
  textSecondary?: string;
};

const designSystemConfig = nxConfig?.cartridges?.designSystem;
const defaultThemeName =
  typeof designSystemConfig?.defaultTheme === "string" && designSystemConfig.defaultTheme.trim()
    ? designSystemConfig.defaultTheme.trim()
    : "light";
const themes = (designSystemConfig?.themes || {}) as Record<string, ThemeConfig>;

export default function Page() {
  const { mode, toggleMode } = useThemeMode();
  const theme = themes[mode] || themes[defaultThemeName] || themes.light || themes.dark || {};
  const nextMode = mode === "light" ? "dark" : "light";
  const colorRows = [
    ["primary", theme.primary],
    ["secondary", theme.secondary],
    ["background", theme.background],
    ["paper", theme.paper],
    ["text", theme.text],
    ["textSecondary", theme.textSecondary],
  ] as const;

  return (
    <AppShell>
      <PageSection
        title="Template App"
        subtitle="A minimal version of the www app. Theme colors are sourced from nx.config.json."
      >
        <Card>
          <List disablePadding>
            <ListItem disableGutters>
              <Heading variant="h4">Active Theme: {mode}</Heading>
            </ListItem>
            <ListItem disableGutters>
              <Button variant="outline" tone="neutral" onClick={toggleMode}>
                Switch to {nextMode}
              </Button>
            </ListItem>
          </List>

          <SwatchGroup
            items={colorRows.map(([label, value]) => ({ label, value }))}
          />
        </Card>
      </PageSection>
    </AppShell>
  );
}