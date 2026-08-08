import assert from 'node:assert/strict';
import test from 'node:test';
import {
  findBlockShortcodes,
  findInlineShortcodes,
  parseShortcodeAttributes,
  renderShortcodes,
  tokenizeShortcodes,
} from '../src/index';

test('parseShortcodeAttributes parses scalars and coercions', () => {
  const attrs = parseShortcodeAttributes(' text="Hello" enabled="true" count="3" ratio="1.5" ');

  assert.equal(attrs.text, 'Hello');
  assert.equal(attrs.enabled, true);
  assert.equal(attrs.count, 3);
  assert.equal(attrs.ratio, 1.5);
});

test('findInlineShortcodes extracts shortcode metadata', () => {
  const markdown = 'Start [CleverText text="Installable on any phone"] end';
  const matches = findInlineShortcodes(markdown);

  assert.equal(matches.length, 1);
  assert.equal(matches[0].name, 'CleverText');
  assert.equal(matches[0].attrs.text, 'Installable on any phone');
  assert.equal(matches[0].raw, '[CleverText text="Installable on any phone"]');
});

test('findBlockShortcodes parses paired shortcode content', () => {
  const markdown = '[alert type="warning"]Watch this space[/alert]';
  const matches = findBlockShortcodes(markdown);

  assert.equal(matches.length, 1);
  assert.equal(matches[0].name, 'alert');
  assert.equal(matches[0].attrs.type, 'warning');
  assert.equal(matches[0].content, 'Watch this space');
});

test('tokenizeShortcodes keeps text and shortcode sequence', () => {
  const markdown = 'A [PageLink url="/features/shortcodes" label="Learn"] B';
  const tokens = tokenizeShortcodes(markdown);

  assert.equal(tokens.length, 3);
  assert.equal(tokens[0].type, 'text');
  assert.equal(tokens[1].type, 'shortcode');
  assert.equal(tokens[2].type, 'text');

  if (tokens[1].type === 'shortcode') {
    assert.equal(tokens[1].value.name, 'PageLink');
    assert.equal(tokens[1].value.attrs.url, '/features/shortcodes');
  }
});

test('renderShortcodes maps shortcode names to renderers with fallback', () => {
  const markdown = 'Intro [CleverText text="How Shortcodes Work"] tail [Unknown foo="bar"]';
  const rendered = renderShortcodes(markdown, {
    CleverText: (match) => `<CleverText text="${String(match.attrs.text)}" />`,
  });

  assert.deepEqual(rendered, [
    'Intro ',
    '<CleverText text="How Shortcodes Work" />',
    ' tail ',
    '[Unknown foo="bar"]',
  ]);
});
