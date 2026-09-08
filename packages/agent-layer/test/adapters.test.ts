import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import {
  CapabilityRegistry,
  KnowledgeGraph,
  createAgentManifest,
  AgentExecutor,
  toOpenAITools,
  toMcpTools,
  createAgentFetchHandler,
  handleNodeAgentRequest,
} from '../src/index.ts';

test('Protocol Adapters: toOpenAITools and toMcpTools', () => {
  const registry = new CapabilityRegistry();

  registry.registerAction({
    name: 'calculate_quote',
    description: 'Calculate transport quote',
    parameters: [
      { name: 'origin', type: 'string', description: 'Origin country', required: true },
      {
        name: 'serviceType',
        type: 'string',
        description: 'Type of service',
        required: false,
        enum: ['standard', 'express'],
      },
    ],
  });

  const openAiTools = toOpenAITools(registry);
  assert.equal(openAiTools.length, 1);
  assert.equal(openAiTools[0].type, 'function');
  assert.equal(openAiTools[0].function.name, 'calculate_quote');
  assert.equal(openAiTools[0].function.parameters.required[0], 'origin');
  assert.deepEqual(openAiTools[0].function.parameters.properties.serviceType.enum, [
    'standard',
    'express',
  ]);

  const mcpTools = toMcpTools(registry);
  assert.equal(mcpTools.length, 1);
  assert.equal(mcpTools[0].name, 'calculate_quote');
  assert.equal(mcpTools[0].inputSchema.required[0], 'origin');
  assert.deepEqual(mcpTools[0].inputSchema.properties.serviceType.enum, ['standard', 'express']);
});

test('HTTP Router & Fetch Handler: Manifest, Knowledge, Execution endpoints', async () => {
  const kg = new KnowledgeGraph('Pet Relocation');
  kg.addEntity({ id: 'pet-1', type: 'Animal', name: 'Buddy', attributes: { weightKg: 15 } });

  const registry = new CapabilityRegistry();
  registry.registerAction({
    name: 'check_pet_eligibility',
    description: 'Check if pet is eligible for travel',
    parameters: [
      { name: 'petId', type: 'string', description: 'Pet ID', required: true },
    ],
    handler: async (input) => {
      return {
        success: true,
        data: { eligible: true, petId: input.petId },
      };
    },
  });

  const manifest = createAgentManifest({
    name: 'Pet Relocation API',
    description: 'Services for pet travel',
    registry,
    knowledgeGraph: kg,
  });

  const executor = new AgentExecutor(registry);
  const fetchHandler = await createAgentFetchHandler({
    manifest,
    knowledgeGraph: kg,
    executor,
  });

  // 1. Test Manifest GET
  const manifestReq = new Request('http://localhost/.well-known/agent-layer.json');
  const manifestRes = await fetchHandler(manifestReq);
  assert.ok(manifestRes);
  assert.equal(manifestRes.status, 200);
  const manifestBody = await manifestRes.json();
  assert.equal(manifestBody.name, 'Pet Relocation API');

  // 2. Test Knowledge GET
  const knowledgeReq = new Request('http://localhost/api/agent/knowledge');
  const knowledgeRes = await fetchHandler(knowledgeReq);
  assert.ok(knowledgeRes);
  assert.equal(knowledgeRes.status, 200);
  const knowledgeBody = await knowledgeRes.json();
  assert.equal(knowledgeBody.entities.length, 1);

  // 3. Test Action POST
  const executeReq = new Request('http://localhost/api/agent/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'check_pet_eligibility',
      input: { petId: 'pet-1' },
    }),
  });
  const executeRes = await fetchHandler(executeReq);
  assert.ok(executeRes);
  assert.equal(executeRes.status, 200);
  const executeBody = await executeRes.json();
  assert.equal(executeBody.success, true);
  assert.equal(executeBody.data.eligible, true);

  // 4. Test Unhandled path
  const unhandledReq = new Request('http://localhost/other/path');
  const unhandledRes = await fetchHandler(unhandledReq);
  assert.equal(unhandledRes, null);
});

test('Node HTTP Handler: native node http integration', async () => {
  const registry = new CapabilityRegistry();
  registry.registerAction({
    name: 'ping',
    description: 'Ping action',
    parameters: [],
    handler: () => ({ success: true, data: 'pong' }),
  });

  const manifest = createAgentManifest({
    name: 'Ping Service',
    description: 'Ping',
    registry,
  });

  const executor = new AgentExecutor(registry);

  const server = createServer(async (req, res) => {
    const handled = await handleNodeAgentRequest({ manifest, executor }, req, res);
    if (!handled) {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;

  try {
    const res = await fetch(`http://localhost:${port}/.well-known/agent-layer.json`);
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.name, 'Ping Service');

    const execRes = await fetch(`http://localhost:${port}/api/agent/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ping', input: {} }),
    });
    assert.equal(execRes.status, 200);
    const execJson = await execRes.json();
    assert.equal(execJson.data, 'pong');
  } finally {
    server.close();
  }
});
