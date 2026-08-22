# @nx/shortcodes

WordPress-style shortcode parsing utilities for markdown-driven content.

## Why this package exists

Shortcodes let content editors embed dynamic features in markdown without writing React code directly.

Example:

```txt
[CleverText text="How Shortcodes Work"]
```

This package provides reusable parsing primitives so apps can map shortcode tags to UI components.

## API

- `parseShortcodeAttributes(input)`
- `findInlineShortcodes(input)`
- `findBlockShortcodes(input)`
- `tokenizeShortcodes(input)`
- `renderShortcodes(input, resolvers, fallback?)`

## Example

```ts
import { renderShortcodes } from '@nx/shortcodes';

const output = renderShortcodes('Hi [CleverText text="World"]', {
  CleverText: (match) => `<CleverText text="${String(match.attrs.text)}" />`,
});
```
