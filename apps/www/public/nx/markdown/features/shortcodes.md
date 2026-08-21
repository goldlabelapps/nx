---
order: 195
title: Shortcodes
description: A WordPress concept
slug: /features/shortcodes
icon: wordpress
tags: wordpress
---

> [CleverText text="How Shortcodes Work"] 

Shortcodes bridge the gap between developers and content editors, making it easy for anyone to add dynamic features to markdown content.

- Shortcodes are parsed from markdown files at render time
- Each shortcode maps to a React component or function in this directory
- Arguments and content inside the shortcode are passed as props to the component

Shortcodes provide a way to extend markdown content with custom components or logic. 
By using shortcodes, content creators can

- Add interactive or dynamic elements to markdown pages
- Reuse common UI components or features
- Keep markdown files clean and readable
- Empower non-developers to enhance content without editing code

#### Example Usage

Suppose you want to embed a line of chatbot response style text in your markdown, you would do this

```
[CleverText text="Installable on any phone"]
```

When the markdown is rendered, the shortcode is replaced with the corresponding React component or HTML