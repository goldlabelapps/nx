import { Card, Heading } from "@nx/design-system";
import nxConfig from "../nx.config.json";

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
const theme = themes[defaultThemeName] || themes.light || themes.dark || {};

const colorRows = [
  ["primary", theme.primary],
  ["secondary", theme.secondary],
  ["background", theme.background],
  ["paper", theme.paper],
  ["text", theme.text],
  ["textSecondary", theme.textSecondary],
] as const;

export default function Page() {
  return (
    <main className="template-main">
      <Heading variant="h2">Template App</Heading>
      <p className="template-subtitle">
        A minimal version of the www app. Theme colors are sourced from nx.config.json.
      </p>

      <Card>
        <Heading variant="h4">Active Theme: {defaultThemeName}</Heading>
        <div className="template-grid" style={{ marginTop: "1rem" }}>
          {colorRows.map(([label, value]) => (
            <div
              key={label}
              className="template-swatch"
              style={{ backgroundColor: value || "transparent", color: label === "background" || label === "paper" ? theme.text || "#000" : "inherit" }}
            >
              <strong>{label}</strong>
              <span className="template-muted">{value || "not set"}</span>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}