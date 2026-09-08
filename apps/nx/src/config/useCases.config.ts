import { videosConfig } from "./videos.config";

export const useCasesConfig: UseCasesConfig = {
  title: videosConfig.title,
  subtitle: videosConfig.subtitle,
  items: videosConfig.items.map((v) => ({
    id: v.id,
    role: v.title,
    tagline: v.tagline,
    description: v.description,
    videoUrl: v.videoUrl,
    orientation: v.orientation,
    duration: v.duration,
    badge: v.badge,
    keyFeatures: v.keyFeatures,
    cta: v.cta || { label: "Learn More", href: `/videos/${v.id}` },
  })),
};
