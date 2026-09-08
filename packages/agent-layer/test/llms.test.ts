import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateLlmsTxt,
  resolveResourceUrl,
  createAgentFetchHandler,
  AgentHttpRouter,
} from '../src/index.ts';

test('resolveResourceUrl correctly handles relative and absolute URLs', () => {
  const baseUrl = 'https://goldlabel.pro';

  // Absolute URLs remain unchanged
  assert.equal(
    resolveResourceUrl('https://example.com/docs', baseUrl),
    'https://example.com/docs'
  );
  assert.equal(
    resolveResourceUrl('http://example.com/api', baseUrl),
    'http://example.com/api'
  );

  // Relative URLs resolved against baseUrl
  assert.equal(
    resolveResourceUrl('/services/web-development', baseUrl),
    'https://goldlabel.pro/services/web-development'
  );
  assert.equal(
    resolveResourceUrl('about', baseUrl),
    'https://goldlabel.pro/about'
  );

  // Trailing slashes on base URL handled cleanly
  assert.equal(
    resolveResourceUrl('/contact', 'https://goldlabel.pro/'),
    'https://goldlabel.pro/contact'
  );

  // Without baseUrl, relative URLs remain as given
  assert.equal(resolveResourceUrl('/services/ai'), '/services/ai');
});

test('generateLlmsTxt creates minimal valid document', () => {
  const output = generateLlmsTxt({
    site: {
      name: 'Goldlabel',
    },
  });

  assert.equal(output, '# Goldlabel\n');
});

test('generateLlmsTxt includes site description, details, sections, and resources', () => {
  const output = generateLlmsTxt({
    site: {
      name: 'Goldlabel',
      description: 'Software development and AI consultancy',
      url: 'https://goldlabel.pro',
      details: 'Building intelligent web applications.',
    },
    resources: [
      {
        title: 'Home',
        url: '/',
        description: 'Main landing page',
      },
    ],
    sections: [
      {
        title: 'Services',
        description: 'Core consultancy services offered.',
        resources: [
          {
            title: 'Web Development',
            url: '/services/web-development',
            description: 'Modern full-stack web applications',
          },
          {
            title: 'AI Consulting',
            url: '/services/ai-consulting',
          },
        ],
      },
      {
        title: 'Company',
        resources: [
          {
            title: 'About Us',
            url: 'https://goldlabel.pro/about',
            description: 'Learn about our team',
          },
        ],
      },
    ],
  });

  const expected = `# Goldlabel

> Software development and AI consultancy

Building intelligent web applications.

- [Home](https://goldlabel.pro/): Main landing page

## Services

Core consultancy services offered.

- [Web Development](https://goldlabel.pro/services/web-development): Modern full-stack web applications
- [AI Consulting](https://goldlabel.pro/services/ai-consulting)

## Company

- [About Us](https://goldlabel.pro/about): Learn about our team
`;

  assert.equal(output, expected);
});

test('generateLlmsTxt handles empty sections and missing optional fields gracefully', () => {
  const output = generateLlmsTxt({
    site: {
      name: 'Empty Section Test',
    },
    sections: [
      {
        title: 'Empty Section',
        resources: [],
      },
      {
        title: 'Populated Section',
        resources: [
          {
            title: 'Docs',
            url: '/docs',
          },
        ],
      },
    ],
  });

  const expected = `# Empty Section Test

## Populated Section

- [Docs](/docs)
`;

  assert.equal(output, expected);
});

test('generateLlmsTxt throws TypeError on invalid input', () => {
  // Invalid options
  assert.throws(
    () => generateLlmsTxt(null as unknown as LlmsTxtOptions),
    /Options object is required/
  );


  // Missing site name
  assert.throws(
    () => generateLlmsTxt({ site: { name: '' } }),
    /site.name is required/
  );

  // Resource missing title or url
  assert.throws(
    () =>
      generateLlmsTxt({
        site: { name: 'Test' },
        resources: [{ title: '', url: '/test' }],
      }),
    /resource must have a valid title and url/
  );

  assert.throws(
    () =>
      generateLlmsTxt({
        site: { name: 'Test' },
        resources: [{ title: 'Title', url: '' }],
      }),
    /resource must have a valid title and url/
  );
});

test('generateLlmsTxt output is deterministic', () => {
  const options = {
    site: {
      name: 'Deterministic Site',
      description: 'Test description',
      url: 'https://example.com',
    },
    sections: [
      {
        title: 'Section A',
        resources: [
          { title: 'Page A1', url: '/a1', description: 'Desc A1' },
          { title: 'Page A2', url: '/a2' },
        ],
      },
    ],
  };

  const output1 = generateLlmsTxt(options);
  const output2 = generateLlmsTxt(options);

  assert.equal(output1, output2);
});

test('AgentHttpRouter and createAgentFetchHandler serve /llms.txt', async () => {
  const llmsOptions = {
    site: {
      name: 'Fetch Test Site',
      description: 'Fetch test description',
      url: 'https://fetch.example.com',
    },
    sections: [
      {
        title: 'API',
        resources: [{ title: 'Docs', url: '/docs' }],
      },
    ],
  };

  const manifest = {
    specVersion: '1.0.0',
    name: 'Fetch Test Site',
    description: 'Fetch test description',
  };

  const router = new AgentHttpRouter({
    manifest,
    llmsTxt: llmsOptions,
  });

  const res = await router.handleRequest('GET', '/llms.txt');
  assert.notEqual(res, null);
  assert.equal(res?.status, 200);
  assert.equal(res?.headers['Content-Type'], 'text/plain; charset=utf-8');
  assert.ok(res?.body.includes('# Fetch Test Site'));
  assert.ok(res?.body.includes('- [Docs](https://fetch.example.com/docs)'));

  // Test Fetch Handler
  const fetchHandler = await createAgentFetchHandler({
    manifest,
    llmsTxt: llmsOptions,
  });

  const response = await fetchHandler(new Request('https://fetch.example.com/llms.txt'));
  assert.notEqual(response, null);
  assert.equal(response?.status, 200);
  assert.equal(response?.headers.get('Content-Type'), 'text/plain; charset=utf-8');
  const bodyText = await response?.text();
  assert.ok(bodyText?.includes('# Fetch Test Site'));
});
