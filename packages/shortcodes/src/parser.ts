import {
  type ShortcodeAttributes,
  type ShortcodeBlockMatch,
  type ShortcodeMatch,
  type ShortcodeResolverMap,
  type ShortcodeToken,
} from './types';

const INLINE_SHORTCODE_RE = /\[(?!\/)([A-Za-z][\w-]*)([^\]]*)\]/g;
const BLOCK_SHORTCODE_RE = /\[(?!\/)([A-Za-z][\w-]*)([^\]]*)\]([\s\S]*?)\[\/\1\]/g;
const ATTR_RE = /([A-Za-z][\w-]*)="([^"]*)"/g;

function coerceAttributeValue(rawValue: string): string | number | boolean {
  if (rawValue === 'true') return true;
  if (rawValue === 'false') return false;

  if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
    const parsed = Number(rawValue);
    if (!Number.isNaN(parsed)) return parsed;
  }

  return rawValue;
}

export function parseShortcodeAttributes(input: string): ShortcodeAttributes {
  const attrs: ShortcodeAttributes = {};

  for (const match of input.matchAll(ATTR_RE)) {
    const key = match[1];
    const rawValue = match[2] ?? '';
    attrs[key] = coerceAttributeValue(rawValue);
  }

  return attrs;
}

export function findInlineShortcodes(input: string): ShortcodeMatch[] {
  const matches: ShortcodeMatch[] = [];

  for (const match of input.matchAll(INLINE_SHORTCODE_RE)) {
    const [raw, name, attrChunk = ''] = match;
    matches.push({
      name,
      attrs: parseShortcodeAttributes(attrChunk),
      raw,
      index: match.index ?? 0,
    });
  }

  return matches;
}

export function findBlockShortcodes(input: string): ShortcodeBlockMatch[] {
  const matches: ShortcodeBlockMatch[] = [];

  for (const match of input.matchAll(BLOCK_SHORTCODE_RE)) {
    const [raw, name, attrChunk = '', content = ''] = match;
    matches.push({
      name,
      attrs: parseShortcodeAttributes(attrChunk),
      content,
      raw,
      index: match.index ?? 0,
    });
  }

  return matches;
}

export function tokenizeShortcodes(input: string): ShortcodeToken[] {
  const tokens: ShortcodeToken[] = [];
  let cursor = 0;

  for (const match of input.matchAll(INLINE_SHORTCODE_RE)) {
    const start = match.index ?? 0;
    const raw = match[0] ?? '';
    const end = start + raw.length;

    if (start > cursor) {
      tokens.push({
        type: 'text',
        value: input.slice(cursor, start),
      });
    }

    tokens.push({
      type: 'shortcode',
      value: {
        name: match[1],
        attrs: parseShortcodeAttributes(match[2] ?? ''),
        raw,
        index: start,
      },
    });

    cursor = end;
  }

  if (cursor < input.length) {
    tokens.push({
      type: 'text',
      value: input.slice(cursor),
    });
  }

  return tokens;
}

export function renderShortcodes<T>(
  input: string,
  resolvers: ShortcodeResolverMap<T>,
  fallback: (match: ShortcodeMatch) => T | string = (match) => match.raw,
): Array<string | T> {
  const rendered: Array<string | T> = [];

  for (const token of tokenizeShortcodes(input)) {
    if (token.type === 'text') {
      rendered.push(token.value);
      continue;
    }

    const resolver = resolvers[token.value.name];
    if (resolver) {
      rendered.push(resolver(token.value));
      continue;
    }

    rendered.push(fallback(token.value));
  }

  return rendered;
}
