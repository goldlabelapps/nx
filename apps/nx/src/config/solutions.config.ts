export const solutionsConfig: SolutionsConfig = {
  title: "Simple & Flexible Plans",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
  cards: [
    {
      id: "standard",
      badge: "Open Source",
      tier: "Starter Plan",
      heading: "Free & Open Source",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      features: [
        "Modular React & Next.js components",
        "Tailwind CSS v4 & responsive utilities",
        "Full TypeScript strict mode support",
        "Light & dark mode theming support",
        "Automated CI & Vitest test suite",
      ],
      cta: {
        label: "Get Started",
        href: "/",
        variant: "primary",
      },
      highlighted: true,
    },
    {
      id: "enterprise",
      badge: "Enterprise",
      tier: "Enterprise Tier",
      heading: "Custom Solutions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
      features: [
        "Everything in Starter Plan",
        "Custom design tokens & branding system",
        "Advanced monorepo integrations",
        "Dedicated deployment pipelines",
        "Priority 24/7 technical support",
      ],
      cta: {
        label: "Contact Team",
        href: "/contact",
        variant: "secondary",
      },
      highlighted: false,
    },
  ],
};
