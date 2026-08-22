# Shortcodes

Shortcodes are special tags that allow non-developers to easily embed dynamic functionality or content into markdown files, without writing code. They are inspired by the shortcode system in WordPress, where users can insert features like galleries, forms, or custom widgets using simple bracketed tags (e.g., `[gallery id="123"]`).

## Purpose in This Project

The `Shortcodes` directory provides a way to extend markdown content with custom components or logic. By using shortcodes, content creators can:

- Add interactive or dynamic elements to markdown pages
- Reuse common UI components or features
- Keep markdown files clean and readable
- Empower non-developers to enhance content without editing code

---

## Example Usage

Suppose you want to embed a custom alert box in your markdown:

```
[alert type="warning"]
This is a warning message!
[/alert]
```

When the markdown is rendered, the shortcode is replaced with the corresponding React component or HTML, displaying the alert box.

---

## How It Works

- Shortcodes are parsed from markdown files at render time.
- Each shortcode maps to a React component or function in this directory.
- Arguments and content inside the shortcode are passed as props to the component.

---

## Available Shortcodes

The following shortcodes are available out of the box:

| Shortcode         | Description                                      | Example Usage                                      |
|-------------------|--------------------------------------------------|----------------------------------------------------|
| `BuyNow`          | Renders a "Buy Now" card with a link             | `[BuyNow url="https://example.com" label="Buy Now!"]` |
| `GithubLink`      | Button linking to a GitHub repo or file          | `[GithubLink url="https://github.com/" label="View Repo"]` |
| `FeedbackBtn`     | Button to trigger feedback UI                    | `[FeedbackBtn url="/feedback" label="Send Feedback"]` |
| `CleverText`      | Renders clever/animated text                     | `[CleverText text="Hello, world!"]`                |
| `ContentCard`     | Embeds a card with markdown content by slug      | `[ContentCard slug="/docs/intro"]`                  |
| `PageLink`        | Renders a styled link to a page or URL           | `[PageLink url="/about" title="About Us"]`         |

---

## Adding New Shortcodes

1. Create a new component in the `components/` folder.
2. Register the shortcode in the main `index.tsx` and/or the shortcode handler (see `RenderMarkdown.tsx`).
3. Document the usage for content creators.

---

## Technical Details

- Shortcodes are parsed using regular expressions in `RenderMarkdown.tsx`.
- Each shortcode is mapped to a React component and receives its attributes as props.
- Shortcodes can be used inline in markdown paragraphs, lists, or as standalone blocks.
- The system is extensible: add new components and update the parser to support new shortcodes.

---

## Why Use Shortcodes?

- Empower non-developers to add rich features to content
- Keep markdown files clean and maintainable
- Centralize UI logic for embedded features
- Make content more interactive and engaging

---



 