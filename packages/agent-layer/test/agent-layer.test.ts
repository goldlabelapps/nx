import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KnowledgeGraph,
  CapabilityRegistry,
  createAgentManifest,
  AgentExecutor,
} from '../src/index.ts';
import type { AgentCapability, AgentAction } from '../src/index.ts';

test('KnowledgeGraph entity and relation management', () => {
  const kg = new KnowledgeGraph('Pet Transport Domain');

  kg.addEntity({
    id: 'animal-1',
    type: 'Animal',
    name: 'Springer Spaniel',
    attributes: { breed: 'English Springer Spaniel', weightKg: 22 },
  });

  kg.addEntity({
    id: 'provider-1',
    type: 'Provider',
    name: 'PetAir UK',
    attributes: { service: 'International Pet Transport' },
  });

  kg.addRelation({
    subjectId: 'provider-1',
    predicate: 'transports',
    objectId: 'animal-1',
  });

  kg.addConstraint({
    id: 'weight-limit',
    targetType: 'Animal',
    field: 'weightKg',
    operator: 'lte',
    value: 50,
    description: 'Max weight for standard road transport',
  });

  assert.equal(kg.getEntitiesByType('Animal').length, 1);
  assert.equal(kg.getEntity('animal-1')?.name, 'Springer Spaniel');
  assert.equal(kg.getRelationsForEntity('animal-1').length, 1);
  assert.equal(kg.getConstraintsForType('Animal').length, 1);

  const json = kg.toJSON();
  assert.equal(json.domainName, 'Pet Transport Domain');
  assert.equal(json.entities.length, 2);
});

test('CapabilityRegistry action management and filtering', () => {
  const registry = new CapabilityRegistry();

  const quoteAction: AgentAction = {
    name: 'calculate_quote',
    description: 'Calculates pet transport quote based on specs',
    tags: ['pricing', 'transport'],
    parameters: [
      { name: 'origin', type: 'string', description: 'Origin country', required: true },
      { name: 'destination', type: 'string', description: 'Destination country', required: true },
      { name: 'weightKg', type: 'number', description: 'Weight of animal in kg', required: true },
    ],
  };

  const cap: AgentCapability = {
    id: 'pet-transport-services',
    name: 'Pet Transport Capabilities',
    description: 'Services for moving animals across borders',
    actions: [quoteAction],
  };

  registry.registerCapability(cap);

  assert.equal(registry.listCapabilities().length, 1);
  assert.equal(registry.getAction('calculate_quote')?.name, 'calculate_quote');
  assert.equal(registry.findActionsByTag('pricing').length, 1);
});

test('createAgentManifest generates valid manifest metadata', () => {
  const kg = new KnowledgeGraph('Pet Transport');
  kg.addEntity({
    id: 'dog-1',
    type: 'Animal',
    attributes: {},
  });

  const registry = new CapabilityRegistry();
  registry.registerAction({
    name: 'check_eligibility',
    description: 'Check pet transport requirements',
    parameters: [],
  });

  const manifest = createAgentManifest({
    name: 'Dog Abroad',
    description: 'International Pet Relocation Service',
    baseUrl: 'https://dogabroad.example.com',
    registry,
    knowledgeGraph: kg,
  });

  assert.equal(manifest.name, 'Dog Abroad');
  assert.equal(manifest.specVersion, '1.0.0');
  assert.deepEqual(manifest.knowledge?.entityTypes, ['Animal']);
  assert.ok(manifest.capabilities);
});

test('AgentExecutor validates inputs and executes handlers successfully', async () => {
  const registry = new CapabilityRegistry();

  registry.registerAction({
    name: 'calculate_quote',
    description: 'Calculate quote',
    parameters: [
      { name: 'origin', type: 'string', description: 'Origin', required: true },
      { name: 'weightKg', type: 'number', description: 'Weight', required: true },
      {
        name: 'serviceType',
        type: 'string',
        description: 'Type of service',
        required: false,
        enum: ['standard', 'express'],
      },
    ],
    handler: async (input) => {
      const weight = input.weightKg as number;
      const baseCost = weight * 10;
      return {
        success: true,
        data: { quoteAmount: baseCost, currency: 'GBP' },
      };
    },
  });

  const executor = new AgentExecutor(registry);

  // Failure: missing required parameter
  const invalidRes = await executor.execute('calculate_quote', { origin: 'UK' });
  assert.equal(invalidRes.success, false);
  assert.equal(invalidRes.error?.code, 'INVALID_INPUT');

  // Failure: enum mismatch
  const invalidEnumRes = await executor.execute('calculate_quote', {
    origin: 'UK',
    weightKg: 20,
    serviceType: 'teleport',
  });
  assert.equal(invalidEnumRes.success, false);
  assert.equal(invalidEnumRes.error?.code, 'INVALID_INPUT');

  // Success
  const validRes = await executor.execute<{ quoteAmount: number; currency: string }>(
    'calculate_quote',
    {
      origin: 'UK',
      weightKg: 22,
      serviceType: 'express',
    }
  );

  assert.equal(validRes.success, true);
  assert.equal(validRes.data?.quoteAmount, 220);
  assert.equal(validRes.data?.currency, 'GBP');
});
