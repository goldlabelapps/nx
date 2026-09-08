/**
 * Supported parameter data types for action parameter definitions.
 */
export type ParameterType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object';

/**
 * Parameter definition for action input schemas.
 */
export interface ActionParameter {
  name: string;
  type: ParameterType;
  description: string;
  required: boolean;
  defaultValue?: unknown;
  enum?: unknown[];
}

/**
 * Result returned by an agent action execution.
 */
export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Executable handler function signature for an agent action.
 */
export type ActionHandler<TInput = Record<string, unknown>, TOutput = unknown> = (
  input: TInput
) => Promise<ActionResult<TOutput>> | ActionResult<TOutput>;

/**
 * An executable action exposed by the website/service to AI agents.
 */
export interface AgentAction {
  /** Unique name or identifier of the action (e.g. 'calculate_quote', 'check_requirements'). */
  name: string;
  /** Human & agent-oriented description of what the action does. */
  description: string;
  /** HTTP method or transport type if backed by an API endpoint (e.g., 'POST', 'GET', 'RPC'). */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'RPC';
  /** Endpoint path or URL if network-bound. */
  endpoint?: string;
  /** Schema defining required and optional parameters. */
  parameters: ActionParameter[];
  /** Optional categories or tags for filtering capabilities. */
  tags?: string[];
  /** Handler function registered to execute this action locally or via proxy. */
  handler?: ActionHandler;
}

/**
 * Capability grouping related actions and domain features.
 */
export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  actions: AgentAction[];
  version?: string;
}

/**
 * Central registry to manage and query agent capabilities and actions.
 */
export class CapabilityRegistry {
  private capabilities: Map<string, AgentCapability> = new Map();
  private actions: Map<string, AgentAction> = new Map();

  /** Register a capability and its nested actions. */
  registerCapability(capability: AgentCapability): this {
    this.capabilities.set(capability.id, capability);
    for (const action of capability.actions) {
      this.actions.set(action.name, action);
    }
    return this;
  }

  /** Register a standalone action. */
  registerAction(action: AgentAction): this {
    this.actions.set(action.name, action);
    return this;
  }

  /** Get a capability by ID. */
  getCapability(id: string): AgentCapability | undefined {
    return this.capabilities.get(id);
  }

  /** Get an action by name. */
  getAction(name: string): AgentAction | undefined {
    return this.actions.get(name);
  }

  /** List all registered capabilities. */
  listCapabilities(): AgentCapability[] {
    return Array.from(this.capabilities.values());
  }

  /** List all registered actions. */
  listActions(): AgentAction[] {
    return Array.from(this.actions.values());
  }

  /** Find actions by tag or category. */
  findActionsByTag(tag: string): AgentAction[] {
    return this.listActions().filter((a) => a.tags?.includes(tag));
  }

  /** Export registry as JSON for discovery output. */
  toJSON() {
    return {
      capabilities: this.listCapabilities().map((cap) => ({
        ...cap,
        actions: cap.actions.map(({ handler: _handler, ...actionMeta }) => actionMeta),
      })),
      standaloneActions: this.listActions()
        .filter((a) => !Array.from(this.capabilities.values()).some((c) => c.actions.some((ca) => ca.name === a.name)))
        .map(({ handler: _handler, ...actionMeta }) => actionMeta),
    };
  }
}
