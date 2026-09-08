# agent-layer

## @goldlabelapps/agent-layer

> From Web Pages to Agent-Readable Knowledge

### Towards an Agent-Consumable Web

> The web was largely designed around a human interaction model: information is presented to a person, the person interprets it, makes a decision, and then interacts with the website to perform an action.

The emergence of increasingly capable AI agents introduces a different interaction model. An agent may be asked to research a subject, compare alternatives, determine which information is relevant to a particular user, and ultimately perform an action or initiate a transaction on the user's behalf.

This creates a potentially significant limitation in the current web architecture. Although modern AI systems are capable of interpreting human-oriented web pages, doing so requires substantial inference. Information is embedded in prose, page structure, navigation, visual presentation and implicit relationships. The agent must reconstruct the underlying knowledge before it can reason over it.

This paper explores the proposition that websites should increasingly expose an additional, machine-oriented representation of their information and capabilities: **an AI-helpful layer**.

The objective is not to replace the human-facing website, nor to make content merely "AI-readable". Rather, it is to make web-based information **machine-actionable**: explicitly structured, queryable and connected to the actions that can be performed against it.

The paper considers the technical foundations of such an approach, its relationship to existing standards such as structured data and APIs, and the potential implications for search, affiliate commerce and transaction-oriented websites.

## 1. Introduction

The traditional web assumes a human at the other end of the connection. A website presents information. A human reads it, interprets it and decides what to do next.

This model has remained remarkably effective. Search engines improved the process by indexing and ranking pages, but the fundamental interaction remained unchanged:

```
search → visit → read → understand → decide → act
```
Large language models have changed the first part of this process. Users can increasingly ask an AI system to perform research on their behalf rather than searching for and visiting individual websites themselves.

The next logical development is more significant. Instead of merely asking an AI system to summarise information from websites, users may ask it to:

- Research options
- Compare products or services
- Determine which option is appropriate
- Obtain prices
- Check eligibility or requirements
- Make recommendations
- Initiate bookings or purchases

The interaction therefore becomes:

```
query → research → compare → decide → act
```
This raises a question for website owners:

> **If an AI agent encounters your website while performing this task, can it actually use the information and capabilities that the website provides?**

The answer is not necessarily yes. A website can be perfectly understandable to a human while being comparatively difficult for an autonomous agent to interrogate reliably. This paper explores the technical implications of that distinction.

## 2. The Human-Oriented Web

Most websites contain considerably more information than is explicitly represented as data. Consider a page describing the transportation of a dog from the UK to another country.

A human might read several paragraphs and infer:

- The animal's size
- Its likely transport requirements
- The relevant destination
- Applicable restrictions
- Which transport provider may be appropriate
- Approximate costs
- What information the customer needs to provide next
Much of this knowledge may never exist as explicit fields. Instead it exists as natural language. For a human, this is often desirable—humans are extremely good at extracting meaning from prose and context.

For an AI agent, the same information introduces an additional reasoning step. The agent must perform something resembling:

```
retrieve → parse → extract → interpret → resolve ambiguity → reason
```

This is possible with modern language models, but it is inherently less deterministic than querying explicitly structured information.

## 3. From AI-Readable to AI-Actionable

There is an important distinction between two concepts.

### AI-readable

The information can be understood by an AI model. Modern language models are increasingly good at this—in principle, almost any reasonably written webpage can be interpreted.

### AI-actionable

The information is exposed in a form that allows an agent to reliably determine:

1. What the information means
2. How different pieces of information relate to one another
3. What operations can be performed
4. What inputs those operations require
5. What the resulting outputs mean

The second is considerably more interesting. The goal is therefore not simply to make websites "AI-readable". It is to make them **agent-consumable**.

## 4. An AI-Helpful Layer

One possible architecture is to retain the existing human-facing website while introducing a second representation specifically designed for machine consumption.

The human interface might remain:
```
HTML → browser → human
```

While an agent could interact with:
```
structured knowledge → query → reasoning → action
```

The additional layer could expose:

- Structured entities
- Relationships between entities
- Explicit attributes
- Constraints and requirements
- Pricing information
- Availability
- Provider information
- Provenance
- Confidence or uncertainty
- Machine-readable actions
This does not necessarily require a completely separate application. It could be implemented through a combination of existing technologies:

- Schema.org / JSON-LD
- Structured HTML
- APIs
- Well-defined JSON endpoints
- OpenAPI specifications
- Action-oriented APIs
- Semantic identifiers
- Explicit relationships between entities

The important conceptual shift is that the website becomes more than a collection of documents. It becomes **an interface to a body of knowledge and capabilities**.

## 5. The Difference in Interaction

Consider an agent asked:

> "I need to move my 22kg English Springer Spaniel from the UK to Portugal. What are my options?"
Using a conventional website, the agent may need to:

1. Discover the appropriate page
2. Read several sections
3. Identify relevant information
4. Determine whether the information applies to a Springer Spaniel
5. Determine whether the stated weight falls within a relevant range
6. Identify appropriate transport methods
7. Find applicable providers
8. Interpret pricing information
9. Determine what action is possible
A structured representation could expose the underlying concepts directly:

```json
{
  "animal": {
    "breed": "English Springer Spaniel",
    "weight": "22kg"
  },
  "journey": {
    "origin": "UK",
    "destination": "Portugal"
  },
  "transport": {
    "methods": ["air", "road"]
  },
  "provider": {
    "name": "...",
    "service": "...",
    "eligibility": "..."
  },
  "actions": [
    "get_quote",
    "check_requirements",
    "request_booking"
  ]
}
```
The agent's task becomes closer to:

```
query → filter → reason → act
```

The difference is subtle but important. The website is no longer merely supplying documents to an agent. It is **supplying knowledge that an agent can operate upon**.

## 6. Why This Matters for Transactional Websites

The distinction becomes particularly important for websites whose ultimate purpose is not simply information consumption but conversion.
An information website can succeed if an AI system accurately extracts and cites its content. A transactional website needs something more. It needs the agent to progress from:

```
knowledge → decision → action → transaction
```
This creates a new version of an old conversion problem. Historically, websites have been optimised around human conversion:

```
landing page → information → persuasion → call to action → conversion
```

In an agent-mediated environment, the equivalent could become:

```
structured knowledge → agent reasoning → eligibility → action → transaction
```
This potentially creates an entirely new surface on which conversion can be optimized.

## 7. Existing Technologies Are Already Pointing in This Direction

The concept is not based on the assumption that an entirely new technical infrastructure must be invented. Several existing web technologies already move towards explicit machine representation.

### Structured data

Schema.org and JSON-LD allow websites to describe entities and attributes explicitly rather than leaving all meaning embedded in presentation.

### APIs

APIs already allow software to interact with applications without using a human interface.

### OpenAPI

OpenAPI provides machine-readable descriptions of API capabilities, inputs and outputs.

### Semantic identifiers

Explicit identifiers allow systems to distinguish entities and establish relationships between them.
These technologies, however, have traditionally been developed for search engines, software integrations and data exchange. The emerging question is whether they can be combined into a more general **agent interface to the web**.

## 8. The Missing Layer: Intent and Action

Structured information alone may not be sufficient. An agent does not merely need to know that a company provides dog transportation. It needs to know what it can do.

For example:

```yaml
Provider: PetAir

Capabilities:
  - international_pet_transport
  - quote_request

Required inputs:
  - origin
  - destination
  - species
  - breed
  - weight
  - travel_date

Available actions:
  - calculate_quote
  - check_requirements
  - request_quote
```
This begins to resemble an interface definition rather than a webpage. The critical concept is therefore **capability discovery**.

An agent should be able to determine not only:

> "What does this website know?"

But also:

> "What can I do through this website?"
That distinction could become increasingly important as AI systems move from **information retrieval** towards **autonomous task execution**.

## 9. A Possible Architecture

A future-oriented website could therefore expose three related layers.

### Layer 1 — Human interface

Designed for people.

- HTML
- CSS
- JavaScript
- UX
- Content

### Layer 2 — Machine knowledge

Designed to expose meaning.

- Entities
- Attributes
- Relationships
- Constraints
- Structured data

### Layer 3 — Agent capabilities

Designed to expose actions.

- Queries
- APIs
- Functions
- Transactions
- Availability
- Quotes
- Bookings
Conceptually:

```
                ┌─────────────────┐
                │      HUMAN      │
                └────────┬────────┘
                         │
                     Website
                         │
            ┌────────────┴────────────┐
            │                         │
         HTML/UI            AI-helpful layer
                                      │
                          ┌───────────┴───────────┐
                          │                       │
                     Knowledge               Capabilities
                          │                       │
                     Structured             Actions/API
                          │                       │
                          └───────────┬───────────┘
                                      │
                                  AI AGENT
                                      │
                                User's intent
```
The human website and agent interface therefore become **two representations of the same underlying business capability**.

## 10. Dog Abroad as a Case Study

A useful experimental environment for investigating this proposition is a domain such as international pet transportation. The domain is unusually information-dense. A single transaction can involve:

- Animal characteristics
- Breed
- Size
- Weight
- Origin
- Destination
- Transport method
- Airline restrictions
- Country requirements
- Documentation
- Timing
- Provider capabilities
- Pricing
- Availability
Much of this information currently exists as human-oriented content. This makes the domain suitable for investigating whether explicit representation improves agent performance.

The objective would not initially be to replace the existing user experience. Instead, the existing site could be treated as the control condition. An agent could be given an identical task and asked to complete it using:

**A.** The conventional website

and then:

**B.** The website plus an agent-oriented information and capability layer

Performance could then be measured.

## 11. Measuring Agent Consumability

The concept becomes considerably more interesting if it can be measured objectively. Possible metrics include:

### Information retrieval accuracy
Can the agent correctly identify relevant facts?

### Entity resolution
Can it correctly determine which information applies to the user's specific circumstances?

### Task completion
Can it successfully complete the requested task?

### Number of interactions
How many page visits, searches or requests are required?

### Ambiguity
How often does the agent need to infer or guess?

### Error rate
How frequently does it select an incorrect provider, requirement or option?

### How often does the agent progress from information retrieval to a meaningful transaction?

This suggests the possibility of an **Agent Consumability Index** or similar measurement framework. The precise methodology would require experimentation.

## 12. The Emerging Conversion Funnel

Traditional digital marketing has spent decades optimizing the human funnel. A simplified model is:

```
Traffic → Landing → Engagement → Conversion
```

An agent-mediated model may look different:

```
Intent → Discovery → Knowledge extraction → Qualification → Recommendation → Action → Transaction
```
This introduces new optimization questions. For example:

- Does the agent discover the site?
- Can it identify the site's expertise?
- Can it determine whether the information is authoritative?
- Can it resolve the user's specific requirements?
- Can it compare the site's offerings against alternatives?
- Can it identify an available action?
- Can it execute that action?
- Does the action ultimately produce a transaction?
The website may therefore become part of an **agent's decision-making infrastructure** rather than merely a destination for human traffic.

## 13. A Potential Shift in SEO

This also suggests a possible evolution of search optimization.

**Traditional SEO** asks:
> How do we make this page discoverable and attractive to search engines?

**An emerging form of optimization** may ask:
> How do we make this knowledge discoverable, interpretable and actionable by autonomous systems?
The distinction is important. A search engine primarily needs to understand a document well enough to rank it. An agent needs to understand a business well enough to use it. That is a substantially more demanding requirement.

The optimization target therefore moves from:

```
page visibility
```

towards:

```
knowledge and capability accessibility
```

## 14. Open Questions

The concept raises a number of unresolved technical and commercial questions.

### Standardisation
Will agent interfaces converge on common standards, or will each AI platform develop its own mechanism?

### Trust
How does an agent establish whether structured information is authoritative and current?

### Provenance
Can individual facts be traced back to their source?

### Freshness
How can prices, availability and requirements be guaranteed to be current?

### Security
How should websites expose transactional capabilities without creating unacceptable security risks?

### Authentication
How does an autonomous agent authenticate when acting on behalf of a user?

### Liability
Who is responsible when an agent misinterprets information and performs an incorrect action?

### Economics
Who owns the customer relationship when an AI agent becomes the intermediary between the user and the website?
These questions suggest that **agent-consumable web infrastructure** may eventually become a distinct area of web engineering.

## 15. Conclusion

The web has historically been built around the assumption that humans are the primary consumers of its interfaces. AI agents challenge that assumption.

A modern language model can already interpret conventional web pages. The more important question is whether interpretation alone represents the optimal interface for increasingly autonomous systems.

A website designed for agents could expose its underlying knowledge explicitly and provide machine-discoverable capabilities for acting upon that knowledge.

The resulting model is not simply:

```
make websites readable by AI
```

It is:

```
make websites understandable, queryable and actionable by AI
```
The distinction may become increasingly important as users move from asking AI systems to **find information** towards asking them to **complete tasks**.

If that transition occurs at scale, websites may need to evolve from documents designed to be read into interfaces designed to be consumed by both humans and autonomous agents.

The technical foundations for this transition already exist in structured data, APIs, semantic representations and machine-readable interface specifications. What remains uncertain is how these technologies will converge into a coherent agent-oriented web.

That makes the question less a matter of marketing and more a legitimate area for experimentation:

> **If an AI agent were given a real-world task, how easily could it understand what a website knows, determine what is relevant, and actually do something with it?**

That is a question that can be tested empirically. And Dog Abroad provides a particularly useful environment in which to do so.

---

## 16. Developer Guide: Testing & Demonstration

This section outlines how to implement, test, and demonstrate `@goldlabelapps/agent-layer` in Node.js, Web/Edge standard environments, and LLM frameworks.

### 16.1 Quickstart Code Example

```typescript
import {
  KnowledgeGraph,
  CapabilityRegistry,
  createAgentManifest,
  AgentExecutor,
  toOpenAITools,
  toMcpTools,
  createAgentFetchHandler,
} from '@goldlabelapps/agent-layer';

// 1. Build Knowledge Graph
const kg = new KnowledgeGraph('Pet Relocation');
kg.addEntity({
  id: 'pet-1',
  type: 'Animal',
  name: 'Buddy',
  attributes: { breed: 'Springer Spaniel', weightKg: 22 },
});

// 2. Register Capabilities & Action Handlers
const registry = new CapabilityRegistry();
registry.registerAction({
  name: 'calculate_quote',
  description: 'Calculates pet transport quote based on parameters',
  parameters: [
    { name: 'origin', type: 'string', description: 'Origin country', required: true },
    { name: 'destination', type: 'string', description: 'Destination country', required: true },
    { name: 'weightKg', type: 'number', description: 'Weight in kg', required: true },
  ],
  handler: async (input) => {
    const cost = (input.weightKg as number) * 10;
    return { success: true, data: { quoteAmount: cost, currency: 'GBP' } };
  },
});

// 3. Generate Agent Manifest & Executor
const manifest = createAgentManifest({
  name: 'Dog Abroad API',
  description: 'AI-Helpful Layer for International Pet Relocation',
  registry,
  knowledgeGraph: kg,
});

const executor = new AgentExecutor(registry);

// 4. Create Web Fetch Request Handler (Next.js / Cloudflare / Node http)
export const fetchHandler = await createAgentFetchHandler({ manifest, knowledgeGraph: kg, executor });
```

### 16.2 Running Automated Tests

Run the native Node.js test runner suite:

```bash
npm test
```

This verifies:
- Entity, relationship, and constraint management in `KnowledgeGraph`
- Capability registration, action retrieval, and filtering in `CapabilityRegistry`
- Input schema validation and action handler dispatch in `AgentExecutor`
- Protocol adapter schema translations (`toOpenAITools` and `toMcpTools`)
- HTTP routing for standard `.well-known/agent-layer.json`, `/api/agent/knowledge`, and `/api/agent/execute`

### 16.3 Demonstrating HTTP Endpoints via cURL

When serving an agent-layer enabled site or API, you can demonstrate the standard machine-readable endpoints:

#### A. Discover Agent Capabilities
```bash
curl http://localhost:3000/.well-known/agent-layer.json
```

#### B. Fetch Knowledge Graph
```bash
curl http://localhost:3000/api/agent/knowledge
```

#### C. Execute Machine Action
```bash
curl -X POST http://localhost:3000/api/agent/execute \
  -H "Content-Type: application/json" \
  -d '{
    "action": "calculate_quote",
    "input": {
      "origin": "UK",
      "destination": "Portugal",
      "weightKg": 22
    }
  }'
```

### 16.4 LLM Schema Adapters (OpenAI & Anthropic MCP)

Export schemas directly to LLM tool registries or Model Context Protocol servers:

```typescript
// Export to OpenAI Function Calling Schema format
const openAiTools = toOpenAITools(registry);

// Export to Model Context Protocol (MCP) Tool format
const mcpTools = toMcpTools(registry);
```

### 16.5 Generating `llms.txt`

The `/llms.txt` format is an emerging convention for making web sites easier for AI systems and LLM agents to understand and navigate by providing a concise, curated Markdown representation of site structure and key resources. It is not an established SEO/ranking mechanism or guaranteed to be processed by search engines, but serves as a machine-helpful overview for agentic interactions.

`@goldlabelapps/agent-layer` provides a typed `generateLlmsTxt` function as well as built-in HTTP handler routing for `/llms.txt`.

#### Minimal Generator Example

```typescript
import { generateLlmsTxt } from '@goldlabelapps/agent-layer';

const llmsTxtContent = generateLlmsTxt({
  site: {
    name: 'Goldlabel',
    description: 'Software development and AI consultancy',
    url: 'https://goldlabel.pro',
    details: 'Building intelligent web applications and agent-consumable web infrastructure.',
  },
  sections: [
    {
      title: 'Services',
      resources: [
        {
          title: 'Web Development',
          url: '/services/web-development',
          description: 'Full-stack web application development and AI integration',
        },
        {
          title: 'AI Consulting',
          url: '/services/ai-consulting',
          description: 'Consultancy for autonomous agent interfaces',
        },
      ],
    },
  ],
});
```

#### Next.js App Router Example (`app/llms.txt/route.ts`)

In a Next.js App Router application, you can expose `/llms.txt` using a standard Route Handler:

```typescript
// app/llms.txt/route.ts
import { generateLlmsTxt } from '@goldlabelapps/agent-layer';

export function GET() {
  const content = generateLlmsTxt({
    site: {
      name: 'Goldlabel',
      description: 'Software development and AI consultancy',
      url: 'https://goldlabel.pro',
    },
    sections: [
      {
        title: 'Main Services',
        resources: [
          {
            title: 'Services Overview',
            url: '/services',
            description: 'Comprehensive list of consultancy services',
          },
        ],
      },
    ],
  });

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
```

Or pass `llmsTxt` directly into `createAgentFetchHandler` / `AgentHttpRouter`:

```typescript
export const fetchHandler = await createAgentFetchHandler({
  manifest,
  llmsTxt: {
    site: {
      name: 'Goldlabel',
      url: 'https://goldlabel.pro',
    },
    resources: [{ title: 'Docs', url: '/docs' }],
  },
});
```


