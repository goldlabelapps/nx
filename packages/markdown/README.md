# @nx/markdown

Markdown rendering and extension utilities for NX content experiences.

## Why this package exists

This package centralizes the markdown pipeline: it handles React Markdown rendering, shortcode-style syntax, and future markdown extensions for content-driven experiences.

Example:

```txt
[CleverText text="How Shortcodes Work"]
```

The package provides reusable parsing primitives so apps can map shortcode tags to UI components while preserving standard markdown behavior.

## API

- `parseShortcodeAttributes(input)`
- `findInlineShortcodes(input)`
- `findBlockShortcodes(input)`
- `tokenizeShortcodes(input)`
- `renderShortcodes(input, resolvers, fallback?)`

## Example

```ts
import { renderShortcodes } from '@nx/markdown';

const output = renderShortcodes('Hi [CleverText text="World"]', {
  CleverText: (match) => `<CleverText text="${String(match.attrs.text)}" />`,
});
```
