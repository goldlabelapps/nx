import {
  ActionParameter,
  ActionResult,
  AgentAction,
  CapabilityRegistry,
} from './capability';

export interface ExecutionValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates action input against parameter definitions without external heavy dependencies.
 */
export function validateActionInput(
  params: ActionParameter[],
  input: Record<string, unknown>
): ExecutionValidationResult {
  const errors: string[] = [];

  for (const param of params) {
    const value = input[param.name];

    if (param.required && (value === undefined || value === null)) {
      errors.push(`Missing required parameter: '${param.name}'`);
      continue;
    }

    if (value === undefined || value === null) {
      continue;
    }

    // Type check
    switch (param.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`Parameter '${param.name}' must be of type string`);
        }
        break;
      case 'number':
        if (typeof value !== 'number' || Number.isNaN(value)) {
          errors.push(`Parameter '${param.name}' must be of type number`);
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`Parameter '${param.name}' must be of type boolean`);
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          errors.push(`Parameter '${param.name}' must be an array`);
        }
        break;
      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push(`Parameter '${param.name}' must be an object`);
        }
        break;
    }

    // Enum check
    if (param.enum && param.enum.length > 0) {
      if (!param.enum.includes(value)) {
        errors.push(
          `Parameter '${param.name}' value '${String(value)}' is not in allowed enum: [${param.enum.join(', ')}]`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Executor responsible for validating parameters and dispatching agent action requests.
 */
export class AgentExecutor {
  constructor(private registry: CapabilityRegistry) {}

  /**
   * Execute a registered action by name with input validation.
   */
  async execute<TOutput = unknown>(
    actionName: string,
    input: Record<string, unknown>
  ): Promise<ActionResult<TOutput>> {
    const action: AgentAction | undefined = this.registry.getAction(actionName);

    if (!action) {
      return {
        success: false,
        error: {
          code: 'ACTION_NOT_FOUND',
          message: `Action '${actionName}' is not registered in the CapabilityRegistry.`,
        },
      };
    }

    if (!action.handler) {
      return {
        success: false,
        error: {
          code: 'NO_HANDLER',
          message: `Action '${actionName}' does not have an attached execution handler.`,
        },
      };
    }

    const validation = validateActionInput(action.parameters, input);
    if (!validation.valid) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: `Validation failed for action '${actionName}': ${validation.errors.join('; ')}`,
          details: validation.errors,
        },
      };
    }

    try {
      return (await action.handler(input)) as ActionResult<TOutput>;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: {
          code: 'EXECUTION_FAILED',
          message: `Execution of action '${actionName}' failed: ${message}`,
        },
      };
    }
  }
}
