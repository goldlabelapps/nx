# NX°
## @goldlabelapps/theme

> Shared Tailwind CSS v4 & Next.js theme tokens, UI primitives, and layout showcase blocks for Goldlabel applications.

## Installation

```bash
pnpm add @goldlabelapps/theme
# or
npm install @goldlabelapps/theme
```

## Setup & Styles

Import the global styles and CSS variables in your Next.js root layout:

```tsx
import "@goldlabelapps/theme/styles.css";
import { ConfigProvider, ThemeProvider, Header, Footer } from "@goldlabelapps/theme";
import { siteConfig } from "@/config/site.config";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider value={siteConfig}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
```

## Available Primitives & Blocks

- **Core UI**: `Button`, `Card`, `CustomCursorWrapper`, `ThemeToggle`
- **Hero & Canvas**: `HeroSection`, `ParticleCanvas`, `VideoModal`
- **Navigation & Footer**: `Header`, `Footer`, `DropdownMenu`, `MobileMenu`, `ShareMenu`, `BrandLogo`, `LogoContextMenu`
- **Showcase Blocks**: `FeatureExplorer`, `SolutionsSection`, `StatementSection`, `UseCaseSlider`, `VideoSection`, `BlogSection`
- **Lead Capture & Guides**: `DownloadBanner`, `GuideLayout`, `MarkdownContent`, `VideoLayout`
- **Context & Config**: `ConfigProvider`, `useSiteConfig`, `ThemeProvider`, `useTheme`
- **Utilities & Types**: `cn`, `detectUserOS`, full TypeScript definitions (`SiteConfig`, `BrandConfig`, etc.)

## Reference Implementation

The [`apps/nx`](../../apps/nx) application serves as the complete reference implementation demonstrating how to build a fully config-driven Next.js app using `@goldlabelapps/theme`.

## License

MIT ©[Goldlabel Apps Ltd](https://github.com/goldlabelapps)
