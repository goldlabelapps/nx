import { AgentExecutor } from './executor';
import { KnowledgeGraph } from './knowledge';
import { AgentManifest } from './manifest';
import { LlmsTxtOptions, generateLlmsTxt } from './llms';

export interface AgentHttpOptions {
  manifest: AgentManifest;
  executor?: AgentExecutor;
  knowledgeGraph?: KnowledgeGraph;
  llmsTxt?: LlmsTxtOptions | string;
  basePath?: string;
}

export interface AgentHttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

export interface MinimalNodeRequest {
  url?: string;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  [Symbol.asyncIterator]?: () => AsyncIterator<unknown>;
}

export interface MinimalNodeResponse {
  writeHead(statusCode: number, headers?: Record<string, string>): void;
  end(chunk?: string | Uint8Array): void;
}

/**
 * Core HTTP Request Router for Agent Layer endpoints.
 */
export class AgentHttpRouter {
  private basePath: string;

  constructor(private options: AgentHttpOptions) {
    // Normalize basePath: strip trailing slash if present
    const raw = options.basePath || '';
    this.basePath = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  }

  /**
   * Route an incoming HTTP method and path string.
   */
  async handleRequest(
    method: string,
    pathname: string,
    bodyJson?: Record<string, unknown>
  ): Promise<AgentHttpResponse | null> {
    const uppercaseMethod = method.toUpperCase();
    const manifestPath = `${this.basePath}/.well-known/agent-layer.json`;
    const llmsTxtPath = `${this.basePath}/llms.txt`;
    const knowledgePath = `${this.basePath}/api/agent/knowledge`;
    const executePath = `${this.basePath}/api/agent/execute`;

    // 1. Manifest endpoint
    if (uppercaseMethod === 'GET' && pathname === manifestPath) {
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.options.manifest, null, 2),
      };
    }

    // 2. llms.txt endpoint
    if (uppercaseMethod === 'GET' && pathname === llmsTxtPath) {
      if (this.options.llmsTxt) {
        const body =
          typeof this.options.llmsTxt === 'string'
            ? this.options.llmsTxt
            : generateLlmsTxt(this.options.llmsTxt);

        return {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          body,
        };
      }
    }


    // 2. Knowledge Graph endpoint
    if (uppercaseMethod === 'GET' && pathname === knowledgePath) {
      const data = this.options.knowledgeGraph
        ? this.options.knowledgeGraph.toJSON()
        : { domainName: '', entities: [], relations: [], constraints: [] };

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2),
      };
    }

    // 3. Action Execution endpoint
    if (uppercaseMethod === 'POST' && pathname === executePath) {
      if (!this.options.executor) {
        return {
          status: 501,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: {
              code: 'NOT_IMPLEMENTED',
              message: 'No AgentExecutor attached to HTTP router.',
            },
          }),
        };
      }

      if (!bodyJson || typeof bodyJson !== 'object') {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: {
              code: 'INVALID_REQUEST_BODY',
              message: 'POST body must be a JSON object with action and input.',
            },
          }),
        };
      }

      const actionName = bodyJson.action as string;
      const input = (bodyJson.input as Record<string, unknown>) || {};

      if (!actionName || typeof actionName !== 'string') {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: {
              code: 'MISSING_ACTION_NAME',
              message: 'Field "action" is required in request body.',
            },
          }),
        };
      }

      const result = await this.options.executor.execute(actionName, input);

      return {
        status: result.success ? 200 : 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result, null, 2),
      };
    }

    // Not handled by Agent Router
    return null;
  }
}

/**
 * Web Standard `Fetch` Request Handler for Next.js, Cloudflare Workers, etc.
 * Returns null if the request path is not handled by the router.
 */
export async function createAgentFetchHandler(
  options: AgentHttpOptions
): Promise<(request: Request) => Promise<Response | null>> {
  const router = new AgentHttpRouter(options);

  return async (request: Request): Promise<Response | null> => {
    const url = new URL(request.url);
    let bodyJson: Record<string, unknown> | undefined;

    if (request.method.toUpperCase() === 'POST') {
      try {
        bodyJson = (await request.json()) as Record<string, unknown>;
      } catch {
        bodyJson = undefined;
      }
    }

    const routeRes = await router.handleRequest(request.method, url.pathname, bodyJson);
    if (!routeRes) return null;

    return new Response(routeRes.body, {
      status: routeRes.status,
      headers: routeRes.headers,
    });
  };
}

/**
 * Node.js `http` Request Listener for Express / Fastify / native `http.createServer`.
 * Returns true if the request was handled, false otherwise.
 */
export async function handleNodeAgentRequest(
  options: AgentHttpOptions,
  req: MinimalNodeRequest,
  res: MinimalNodeResponse
): Promise<boolean> {
  const router = new AgentHttpRouter(options);
  const host = (req.headers && req.headers.host) || 'localhost';
  const url = new URL(req.url || '/', `http://${host}`);
  const method = req.method || 'GET';

  let bodyJson: Record<string, unknown> | undefined;

  if (method.toUpperCase() === 'POST' && req[Symbol.asyncIterator]) {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req as AsyncIterable<Uint8Array | string>) {
      if (typeof chunk === 'string') {
        chunks.push(new TextEncoder().encode(chunk));
      } else {
        chunks.push(chunk);
      }
    }

    const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    const rawBody = new TextDecoder().decode(combined);
    try {
      bodyJson = JSON.parse(rawBody);
    } catch {
      bodyJson = undefined;
    }
  }

  const routeRes = await router.handleRequest(method, url.pathname, bodyJson);
  if (!routeRes) return false;

  res.writeHead(routeRes.status, routeRes.headers);
  res.end(routeRes.body);
  return true;
}
