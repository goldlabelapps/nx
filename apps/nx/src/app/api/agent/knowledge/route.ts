import { getAgentFetchHandler } from "@/config/agent-layer.config";

export async function GET(request: Request) {
  const handler = await getAgentFetchHandler();
  const response = await handler(request);
  if (response) return response;
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
