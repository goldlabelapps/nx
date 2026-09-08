import {
  CapabilityRegistry,
  KnowledgeGraph,
  AgentExecutor,
  createAgentManifest,
  createAgentFetchHandler,
  type AgentManifest,
} from "@goldlabelapps/agent-layer";
import { nxConfig } from "@/lib/nxConfig";
import { siteConfig } from "./site.config";

/**
 * Knowledge Graph setup for template app
 */
export function createTemplateKnowledgeGraph(): KnowledgeGraph {
  const kg = new KnowledgeGraph(nxConfig.name);

  // App Identity Entity
  kg.addEntity({
    id: "app-identity",
    type: "Application",
    name: nxConfig.name,
    attributes: {
      tagline: nxConfig.tagline,
      url: nxConfig.url,
      socials: nxConfig.social,
      theme: nxConfig.theme,
    },
  });

  // Feature Entities
  siteConfig.features.items.forEach((feature) => {
    kg.addEntity({
      id: `feature-${feature.id}`,
      type: "Feature",
      name: feature.title,
      attributes: {
        description: feature.description,
        tag: feature.tag,
        badge: feature.badge,
      },
    });

    kg.addRelation({
      subjectId: "app-identity",
      predicate: "provides_feature",
      objectId: `feature-${feature.id}`,
    });
  });

  return kg;
}

/**
 * Capability Registry setup for template app
 */
export function createTemplateCapabilityRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();

  registry.registerCapability({
    id: "app-info",
    name: "Application Information",
    description: "Queries general identity and configuration metadata for this application.",
    actions: [
      {
        name: "get_site_info",
        description: "Returns main site metadata including title, tagline, site URL, and social profiles.",
        method: "GET",
        endpoint: "/api/agent/execute",
        parameters: [],
        tags: ["metadata", "info"],
        handler: async () => ({
          success: true,
          data: {
            name: nxConfig.name,
            tagline: nxConfig.tagline,
            siteUrl: nxConfig.url,
            social: nxConfig.social,
            theme: nxConfig.theme,
          },
        }),
      },
    ],
  });

  registry.registerCapability({
    id: "features",
    name: "Feature Discovery",
    description: "Interrogates available modular features and application capabilities.",
    actions: [
      {
        name: "get_features",
        description: "Lists all modular features, descriptions, and tags.",
        method: "GET",
        endpoint: "/api/agent/execute",
        parameters: [
          {
            name: "tag",
            type: "string",
            description: "Optional filter tag (e.g., 'Theming', 'Tooling', 'TypeScript', 'CI/CD').",
            required: false,
          },
        ],
        tags: ["features", "discovery"],
        handler: async (input) => {
          const filterTag = input.tag as string | undefined;
          const items = filterTag
            ? siteConfig.features.items.filter((item) =>
                item.tag.toLowerCase().includes(filterTag.toLowerCase())
              )
            : siteConfig.features.items;

          return {
            success: true,
            data: {
              sectionTitle: siteConfig.features.sectionTitle,
              subtitle: siteConfig.features.subtitle,
              count: items.length,
              items,
            },
          };
        },
      },
    ],
  });

  registry.registerCapability({
    id: "content",
    name: "Content Discovery",
    description: "Queries published articles and content resources.",
    actions: [
      {
        name: "get_blogs",
        description: "Returns list of configured blog posts and articles.",
        method: "GET",
        endpoint: "/api/agent/execute",
        parameters: [],
        tags: ["content", "articles"],
        handler: async () => ({
          success: true,
          data: {
            title: siteConfig.blogs.title,
            posts: siteConfig.blogs.posts,
          },
        }),
      },
    ],
  });

  return registry;
}

// Singletons / shared instances for template app agent layer
export const templateKnowledgeGraph = createTemplateKnowledgeGraph();
export const templateCapabilityRegistry = createTemplateCapabilityRegistry();
export const templateAgentExecutor = new AgentExecutor(templateCapabilityRegistry);

export const templateAgentManifest: AgentManifest = createAgentManifest({
  name: nxConfig.name,
  description: `${nxConfig.name} - ${nxConfig.tagline}`,
  baseUrl: nxConfig.url,
  registry: templateCapabilityRegistry,
  knowledgeGraph: templateKnowledgeGraph,
});

export const getAgentFetchHandler = () =>
  createAgentFetchHandler({
    manifest: templateAgentManifest,
    executor: templateAgentExecutor,
    knowledgeGraph: templateKnowledgeGraph,
  });
