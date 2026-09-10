import { blogsConfig } from "./blogs.config";

export const navigationConfig: NavigationConfig = {
  remoteControlBadge: {
    enabled: true,
    label: "Docs",
    href: "/",
    tooltip: "Access documentation and guides",
  },
  links: [
    {
      label: "Blog",
      href: "/blog",
      dropdown: blogsConfig.posts.slice(0, 3).map((post) => ({
        title: post.title,
        description: post.summary || post.category,
        href: post.href,
        badge: post.category,
        icon: "BookOpen",
      })),
    },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: {
    label: "GitHub",
    href: "/#github",
    icon: "Github",
  },
  secondaryCta: {
    label: "Documentation",
    href: "/",
  },
};
