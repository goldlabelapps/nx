export const blogsConfig: BlogsConfig = {
  title: "Blog",
  subtitle: "Explore detailed engineering insights, architectural decisions, and setup guides.",
  viewAllCta: {
    label: "View All",
    href: "/blog",
  },
  posts: [
    {
      id: "flash-history",
      title: "Flash History & Rich Internet Applications",
      date: "Sep 2026",
      category: "Engineering",
      readTime: "3 min read",
      summary: "An exploration of Macromedia Flash, ActionScript 2.0/3.0, vector graphics, and how early rich internet applications laid the foundation for modern web animation runtime engines.",
      href: "/blog/flash-history",
      image: "flash",
      tags: ["Flash", "ActionScript", "GSAP", "Animation"],
      content: `## Flash & ActionScript
#### [CleverText text="Pioneers of Rich Interactive Web Development"]

An exploration of Macromedia Flash, ActionScript 2.0/3.0, vector graphics, and how early rich internet applications laid the foundation for modern web animation runtime engines.

## The Era of Rich Internet Applications (RIAs)

In the early 2000s, standard browser DOMs were limited to basic HTML and DHTML. Flash provided a cross-browser vector rendering engine, timeline-based animation system, and ActionScript programming language.

### Key Contributions of the Flash Era

- **Vector graphics engine:** Resolution-independent graphics rendered at high frame rates.
- **ActionScript (AS2 / AS3):** Event-driven, object-oriented scripting for complex interactive applications.
- **Component-based UI architecture:** MovieClip symbol instancing with encapsulated local states.
- **Rich media and streaming:** Integrated video playback and audio streaming long before HTML5 video standards.

## Evolution into Modern Web Animation

While Flash was eventually deprecated in favor of open web standards like HTML5, CSS3, and JavaScript ES6+, the core concepts of timeline orchestration, tweening math, and MovieClip composition live on in modern tools like GSAP (GreenSock Animation Platform) and component-driven UI systems.

\`\`\`javascript
// Modern GSAP equivalent of ActionScript timeline animation
import { gsap } from "gsap";

const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".movieclip", { duration: 1, scale: 1.2, rotation: 360, ease: "power2.inOut" });
\`\`\`

## Legacy & Lessons for Modern Engineers

Working through the Flash era instilled core principles of interactive software engineering:

- **Performance awareness:** Optimizing redraw regions and vector curve points.
- **State management:** Managing complex UI control flows and nested timeline states.
- **User experience design:** Building responsive, tactile interfaces that engage users.`,
    },
    {
      id: "flash-vector-sprites",
      title: "Building Scalable 8-Directional Vector Sprites in React & Flash",
      date: "Sep 2026",
      category: "Architecture",
      readTime: "4 min read",
      summary: "An in-depth look at implementing 8-directional SVG character sprites with frame-based walk cycles and state management.",
      href: "/blog/flash-vector-sprites",
      image: "flash",
      content: `The [Flash Sprite documentation](/sprite) details the implementation of scalable SVG character sprites inspired by classic Macromedia Flash programming patterns.

## 8-Directional Facing & Walk Cycles

Unlike traditional raster sprite sheets that pixelate when scaled, the \`Sprite\` component renders crisp, resolution-independent vector artwork (\`SpriteArtwork.tsx\`) supporting:

- **8-Directional Facing**: \`N\`, \`NE\`, \`E\`, \`SE\`, \`S\`, \`SW\`, \`W\`, \`NW\` directions computed via \`getDirection()\` helper utilities.
- **State & Frame Cycles**: \`idle\` and \`walking\` states with controlled or auto-advancing 4-frame animation intervals.
- **Decoupled Architecture**: State and animation timing are managed in \`Sprite.tsx\`, while SVG geometry and limb pose transformations are isolated in \`SpriteArtwork.tsx\`.

Check out the full interactive guide and code samples on the [Flash Sprite documentation page](/sprite).`,
    },
    {
      id: "getting-started-guide",
      title: "Getting Started with the Application Template",
      date: "Aug 2026",
      category: "Installation",
      readTime: "4 min read",
      summary: "Learn how to configure identity, theme colors, and modular content across your Next.js project.",
      href: "/blog/getting-started-guide",
      image: "terminal",
      content: `Spinning up a new app from this template starts with three files: \`nx.config.json\` for identity and theme colors, and the modules under \`src/config\` for everything else.

## Where to start

1. Edit \`nx.config.json\` first — name, tagline, description, URL, social links, and light/dark theme colors all live there.
2. Walk through \`src/config/*.ts\` for structural content: navigation links, hero copy, feature list, video items, and footer columns.
3. Run \`pnpm dev\` and check every page renders with your new branding.

## Why config-driven?

Every page in this template reads from typed config objects rather than hardcoded JSX strings, so rebranding never means hunting through component files.`,
    },
    {
      id: "theming-and-customization",
      title: "Theming & Custom Design Tokens Guide",
      date: "Aug 2026",
      category: "Strategy",
      readTime: "3 min read",
      summary: "Discover how design tokens flow from nx.config.json through to dark mode and component styling.",
      href: "/blog/theming-and-customization",
      image: "theme",
      content: `Design tokens for this app flow from a single place: \`nx.config.json\`'s \`theme.light\`/\`theme.dark\` palettes.

## How colors flow through the app

Those palettes are passed straight into the shared \`@goldlabelapps/theme\` package's \`DesignSystemProvider\`, which builds an MUI theme from them. Any component that reads theme tokens (rather than a hardcoded hex value) picks up your palette automatically.

## Extending the palette

Add new palette keys to \`NxThemePalette\` in root \`types.d.ts\`, then reference them anywhere \`nxConfig.theme\` is imported.`,
    },
    {
      id: "architecture-and-extensibility",
      title: "Architecture, Type Safety & Monorepo Packages",
      date: "Jul 2026",
      category: "Architecture",
      readTime: "5 min read",
      summary: "An overview of monorepo package structure, ambient TypeScript definitions, and content loaders.",
      href: "/blog/architecture-and-extensibility",
      image: "typescript",
      content: `This template ships three example page kinds, each demonstrating a different content-authoring pattern:

* **Guides** (\`/how-to\`) — markdown files in \`public/md\`, loaded at build time via \`src/lib/markdown.ts\`.
* **Videos** (\`/videos\`) — structured data in \`videos.config.ts\`, loaded via \`src/lib/videos.ts\`.
* **Blogs** (\`/blog\`, this page) — structured data with inline markdown bodies in \`blogs.config.ts\`, loaded via \`src/lib/blogs.ts\`.

## All types come from one place

Every interface used across these loaders — \`GuideMeta\`, \`VideoItem\`, \`BlogPost\`, and friends — is declared as a global ambient type in root \`types.d.ts\`, so no import statements are needed to use them.`,
    },
  ],
};

