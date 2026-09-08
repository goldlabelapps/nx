import { CapabilityRegistry } from './capability';
import { KnowledgeGraph } from './knowledge';

/**
 * Standard manifest structure served to AI agents (e.g., at `/.well-known/agent-layer.json`).
 */
export interface AgentManifest {
  /** Spec version of the agent-layer manifest format. */
  specVersion: string;
  /** Name of the site or service. */
  name: string;
  /** Description of the application's domain and capabilities. */
  description: string;
  /** Base URL of the website or API. */
  baseUrl?: string;
  /** Contact or maintainer information. */
  provider?: {
    name: string;
    url?: string;
  };
  /** Exposed knowledge graph summary or endpoint. */
  knowledge?: {
    endpoint?: string;
    domainName?: string;
    entityTypes?: string[];
  };
  /** Exposed capabilities and actions. */
  capabilities?: ReturnType<CapabilityRegistry['toJSON']>;
}

export interface AgentManifestOptions {
  name: string;
  description: string;
  specVersion?: string;
  baseUrl?: string;
  provider?: {
    name: string;
    url?: string;
  };
  registry?: CapabilityRegistry;
  knowledgeGraph?: KnowledgeGraph;
}

/**
 * Generates an AgentManifest object from site metadata, registries, and knowledge graphs.
 */
export function createAgentManifest(options: AgentManifestOptions): AgentManifest {
  const {
    name,
    description,
    specVersion = '1.0.0',
    baseUrl,
    provider,
    registry,
    knowledgeGraph,
  } = options;

  const manifest: AgentManifest = {
    specVersion,
    name,
    description,
    baseUrl,
    provider,
  };

  if (knowledgeGraph) {
    const json = knowledgeGraph.toJSON();
    const entityTypes = Array.from(new Set(json.entities.map((e) => e.type)));
    manifest.knowledge = {
      domainName: json.domainName,
      entityTypes,
    };
  }

  if (registry) {
    manifest.capabilities = registry.toJSON();
  }

  return manifest;
}
