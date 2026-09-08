export const featuresConfig: FeaturesConfig = {
  sectionTitle: "Modular Features & Primitives",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
  items: [
    {
      id: "design-system",
      tag: "Theming",
      tabLabel: "Design Primitives",
      title: "Customizable Theme & Design System",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      badge: "Theming",
      previewType: "code",
      codeSnippet: {
        language: "json",
        filename: "theme-config.json",
        code: `{
  "theme": {
    "name": "corporate-slate",
    "primaryColor": "#0f172a",
    "borderRadius": "0.5rem",
    "mode": "light",
    "typography": "Plus Jakarta Sans"
  },
  "modules": ["hero", "features", "solutions", "videos"]
}`,
      },
      cta: {
        label: "View Documentation",
        href: "/",
      },
    },
    {
      id: "developer-tooling",
      tag: "Tooling",
      tabLabel: "CLI & Scripts",
      title: "Interactive CLI & Monorepo Tooling",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      badge: "Fast",
      previewType: "terminal",
      terminalSnippet: {
        prompt: "template-monorepo",
        commands: [
          { cmd: "pnpm dev" },
          { output: "✔ Ready on http://localhost:4500" },
          { cmd: "pnpm test" },
          { output: "✦ All unit tests passed in 1.2s" },
        ],
      },
      cta: {
        label: "Explore CLI Guide",
        href: "/api-reference",
      },
    },
    {
      id: "type-safe-configs",
      tag: "TypeScript",
      tabLabel: "Type Safety",
      title: "Strict Type Safety & Schemas",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      badge: "TypeScript",
      previewType: "code",
      codeSnippet: {
        language: "typescript",
        filename: "site.config.ts",
        code: `export interface SiteConfig {
  brand: BrandConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  features: FeaturesConfig;
  solutions: SolutionsConfig;
  videos: VideosConfig;
}`,
      },
      cta: {
        label: "View Architecture",
        href: "/calculator",
      },
    },
    {
      id: "automated-workflows",
      tag: "CI/CD",
      tabLabel: "Automations",
      title: "Continuous Integration & Testing",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
      badge: "Automated",
      previewType: "interactive-ui",
      cta: {
        label: "Read Setup Guide",
        href: "/configuration",
      },
    },
  ],
};
