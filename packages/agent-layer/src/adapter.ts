import { ActionParameter, AgentAction, CapabilityRegistry } from './capability';

export interface JsonSchemaProperty {
  type: string;
  description: string;
  enum?: unknown[];
}

export interface JsonSchemaObject {
  type: 'object';
  properties: Record<string, JsonSchemaProperty>;
  required: string[];
}

export interface OpenAITool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: JsonSchemaObject;
  };
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: JsonSchemaObject;
}

/**
 * Converts ActionParameter array into a standard JSON Schema object.
 */
export function toJsonSchema(parameters: ActionParameter[]): JsonSchemaObject {
  const properties: Record<string, JsonSchemaProperty> = {};
  const required: string[] = [];

  for (const param of parameters) {
    const prop: JsonSchemaProperty = {
      type: param.type,
      description: param.description,
    };
    if (param.enum && param.enum.length > 0) {
      prop.enum = param.enum;
    }
    properties[param.name] = prop;

    if (param.required) {
      required.push(param.name);
    }
  }

  return {
    type: 'object',
    properties,
    required,
  };
}

/**
 * Convert a single AgentAction to an OpenAI Tool definition.
 */
export function actionToOpenAITool(action: AgentAction): OpenAITool {
  return {
    type: 'function',
    function: {
      name: action.name,
      description: action.description,
      parameters: toJsonSchema(action.parameters),
    },
  };
}

/**
 * Convert all actions in a CapabilityRegistry to an array of OpenAI Tools definitions.
 */
export function toOpenAITools(registry: CapabilityRegistry): OpenAITool[] {
  return registry.listActions().map(actionToOpenAITool);
}

/**
 * Convert a single AgentAction to an MCP Tool definition.
 */
export function actionToMcpTool(action: AgentAction): McpTool {
  return {
    name: action.name,
    description: action.description,
    inputSchema: toJsonSchema(action.parameters),
  };
}

/**
 * Convert all actions in a CapabilityRegistry to an array of MCP Tools definitions.
 */
export function toMcpTools(registry: CapabilityRegistry): McpTool[] {
  return registry.listActions().map(actionToMcpTool);
}
