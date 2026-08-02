import { NextRequest } from 'next/server';

import {
  QueryEngine,
} from '@composio/query';
import OpenAI from 'openai';

import {
  makeRes,
  makeTime,
} from '../';
import {
  getLinkedInLookupPrompt,
  getMagentoPluginPrompt,
} from './';

const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const composio = COMPOSIO_API_KEY
  ? new QueryEngine({ apiKey: COMPOSIO_API_KEY })
  : null;

type T_PromptType = 'linkedinLookup' | 'magentoPlugin';

const MODEL = 'gpt-4.1';

const getPrompt = (
  type: T_PromptType,
): string | null => {
  if (type === 'linkedinLookup') {
    return getLinkedInLookupPrompt();
  }

  if (type === 'magentoPlugin') {
    return getMagentoPluginPrompt();
  }

  return null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type: T_PromptType = body?.type;

    if (!type) {
      return Response.json(
        makeRes({
          severity: 'error',
          message: 'Missing required "type" in request body',
        }),
        { status: 400 },
      );
    }

    const prompt = getPrompt(type);

    if (!prompt) {
      return Response.json(
        makeRes({
          severity: 'error',
          message: `Unsupported prompt type: "${type}"`,
        }),
        { status: 400 },
      );
    }

    const now = makeTime();
    const promptMarkdown = `# Prompt Generated (${now})\n\n${prompt}`;

    let queryResponse: any = null;
    if (composio) {
      queryResponse = await composio.query(prompt);
    }

    const llmResponse = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a pragmatic engineering assistant. Use the provided prompt and available context to produce clear, actionable output.',
        },
        {
          role: 'user',
          content: [
            `Prompt Type: ${type}`,
            `\n\n# Prompt\n${prompt}`,
            queryResponse
              ? `\n\n# Context Retrieved\n${JSON.stringify(queryResponse, null, 2)}`
              : '\n\n# Context Retrieved\n(No external context available)',
          ].join('\n'),
        },
      ],
      temperature: 0.3,
    });

    const aiOutput = llmResponse.choices?.[0]?.message?.content || '';

    return Response.json(
      makeRes({
        severity: 'success',
        message: 'Prompt generated and processed successfully',
        data: {
          promptType: type,
          prompt: promptMarkdown,
          context: queryResponse,
          aiOutput,
          generatedAt: now,
        },
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      makeRes({
        severity: 'error',
        message: 'Failed to generate prompt output',
        data: {
          error: error?.message || 'Unknown error',
        },
      }),
      { status: 500 },
    );
  }
}