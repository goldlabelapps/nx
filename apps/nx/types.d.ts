// Global ambient type declarations for this app.
// No import/export statements here on purpose — this keeps every type below
// available project-wide without needing an import statement.

interface NxThemePalette {
  mode: "light" | "dark";
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
  textSecondary: string;
}

interface NxConfig {
  name: string;
  tagline: string;
  favicon: string;
  url: string;
  port: number;
  founder: {
    name: string;
    email: string;
  };
  social: {
    github?: string;
    twitter?: string;
    twitterHandle?: string;
  };
  theme: {
    defaultTheme: "light" | "dark";
    light: NxThemePalette;
    dark: NxThemePalette;
  };
}

interface SiteMetadata {
  title: string;
  tagline: string;
  siteUrl: string;
  ogImage?: string;
  twitterImage?: string;
  twitterHandle?: string;
  themeColor?: string;
}

interface BrandConfig {
  name: string;
  tagline?: string;
  logoType: "svg" | "text" | "custom" | "image";
  logoSrc?: string;
  logoLight?: string;
  logoDark?: string;
  customSvgLogo?: string;
  contextMenu: {
    enabled: boolean;
    copySvgLabel: string;
    guidelinesLabel: string;
    guidelinesUrl: string;
  };
}

interface DropdownItem {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
}

interface DropdownGroup {
  heading?: string;
  items: DropdownItem[];
}

interface NavItem {
  label: string;
  href?: string;
  badge?: string;
  external?: boolean;
  dropdown?: DropdownGroup[] | DropdownItem[];
}

interface NavigationConfig {
  remoteControlBadge?: {
    enabled: boolean;
    label: string;
    href: string;
    tooltip?: string;
  };
  links: NavItem[];
  primaryCta: {
    label: string;
    href: string;
    icon?: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: string;
  };
}

interface ParticleConfig {
  enabled: boolean;
  count: number;
  interactive: boolean;
  colors: string[];
  maxSpeed?: number;
  connectionDistance?: number;
}

interface HeroConfig {
  headline: string;
  subheadline?: string;
  gradientWords?: string[];
  primaryCta: {
    label: string;
    href: string;
    icon?: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon?: string;
  };
  video: {
    enabled: boolean;
    badge?: string;
    title?: string;
    youtubeEmbedUrl?: string;
    thumbnailImage?: string;
    hoverText?: string;
  };
  particleField: ParticleConfig;
}

interface FloatingIcon {
  name: string;
  symbol: string;
  label?: string;
  color?: string;
  x: number; // percentage from left
  y: number; // percentage from top
  size?: number; // size in px
  delay?: number;
}

interface StatementConfig {
  badge?: string;
  headline: string;
  subtext?: string;
  floatingIcons: FloatingIcon[];
}

interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
}

interface TerminalCommand {
  cmd?: string;
  output?: string;
  isComment?: boolean;
}

interface TerminalSnippet {
  prompt?: string;
  commands: TerminalCommand[];
}

interface FeatureItem {
  id: string;
  tag: string;
  tabLabel?: string;
  title: string;
  description: string;
  badge?: string;
  cta?: {
    label: string;
    href: string;
  };
  previewType: "terminal" | "code" | "interactive-ui" | "graphic";
  codeSnippet?: CodeSnippet;
  terminalSnippet?: TerminalSnippet;
  uiMockup?: {
    type: "agent-manager" | "ide" | "cli" | "sdk" | "monorepo" | "cartridge";
    accentColor?: string;
  };
}

interface FeaturesConfig {
  sectionTitle?: string;
  subtitle?: string;
  items: FeatureItem[];
}

interface VideoItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  videoUrl: string;
  orientation: "landscape" | "portrait";
  duration: string;
  badge?: string;
  category?: string;
  tags?: string[];
  script?: string;
  keyFeatures?: string[];
  image?: string;
  featuredImage?: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface VideosConfig {
  title: string;
  subtitle: string;
  items: VideoItem[];
}

interface UseCaseItem {
  id: string;
  role: string;
  tagline: string;
  description: string;
  youtubeEmbedUrl?: string;
  videoUrl?: string;
  orientation?: "landscape" | "portrait";
  duration?: string;
  badge?: string;
  thumbnailGradient?: string;
  cta: {
    label: string;
    href: string;
  };
  keyFeatures?: string[];
}

interface UseCasesConfig {
  title: string;
  subtitle: string;
  items: UseCaseItem[];
}

interface SolutionCard {
  id: string;
  badge: string;
  tier: string;
  heading: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  highlighted?: boolean;
}

interface SolutionsConfig {
  title: string;
  subtitle: string;
  cards: SolutionCard[];
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: "Product" | "Enterprise" | "Model" | "Engineering" | "Announcement" | "Architecture" | "Installation" | "Strategy";
  readTime?: string;
  href: string;
  summary?: string;
  content?: string;
  gradient?: string;
  tags?: string[];
  image?: string;
  featuredImage?: string;
}

interface BlogsConfig {
  title: string;
  subtitle?: string;
  viewAllCta: {
    label: string;
    href: string;
  };
  posts: BlogPost[];
}

interface AuthCtaConfig {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  cliQuickInstall: {
    label: string;
    command: string;
  };
  trustBadge: string;
}

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
    badge?: string;
  }>;
}

interface FooterConfig {
  tagline: string;
  address?: string;
  companyNumber?: string;
  columns: FooterColumn[];
  bottomLinks: Array<{
    label: string;
    href: string;
  }>;
  socialLinks?: Array<{
    platform: string;
    href: string;
  }>;
  copyright: string;
}

interface PwaIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

interface PwaConfig {
  enabled: boolean;
  name: string;
  shortName: string;
  tagline: string;
  startUrl: string;
  scope: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  orientation: "any" | "natural" | "landscape" | "portrait";
  themeColor: string;
  backgroundColor: string;
  appleTouchIcon?: string;
  favicon?: string;
  icons: PwaIcon[];
}

interface SiteConfig {
  metadata: SiteMetadata;
  brand: BrandConfig;
  pwa: PwaConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  statement: StatementConfig;
  features: FeaturesConfig;
  videos: VideosConfig;
  useCases: UseCasesConfig;
  solutions: SolutionsConfig;
  blogs: BlogsConfig;
  authCta: AuthCtaConfig;
  footer: FooterConfig;
}
