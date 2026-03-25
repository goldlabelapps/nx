---
order: 15
slug: /next-js/ssr
title: SSR
description: Server Side Rendering
tags: nx, goldlabel, coding
icon: js
image: /shared/png/nextjs.png
---

To implement a structure for your markdown documents that includes concepts like titles, featured images, and other metadata while setting up static site generation (SSG) in Next.js, follow these steps:


### **Markdown File Structure**
Use [YAML front matter](https://jekyllrb.com/docs/front-matter/) for metadata at the top of each markdown file. Here's an example:


## Welcome to the Example Page

This is the content of the example markdown page.
```

---

### **Project Structure**
Organize your files like this:
```
/markdown
  example.md
  another-doc.md
/pages
  docs
    [slug].js
```

---

### **Steps to Set Up Static Site Generation**

#### 1. Install Dependencies
Use `gray-matter` to parse the front matter from markdown files and `marked` or `remark` to render markdown content into HTML.

```bash
npm install gray-matter remark remark-html
```

---

#### 2. Read Markdown Files in SSG
Create utility functions to read and process the markdown files:

##### `/lib/markdown.js`
```javascript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const markdownDirectory = path.join(process.cwd(), "markdown");

export function getAllSlugs() {
  const filenames = fs.readdirSync(markdownDirectory);
  return filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ""),
    },
  }));
}

export function getMarkdownData(slug) {
  const filePath = path.join(markdownDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  return { slug, metadata: data, content };
}

export async function renderMarkdownToHtml(content) {
  const processedContent = await remark().use(html).process(content);
  return processedContent.toString();
}
```

---

#### 3. Create the Dynamic Page
Use `[slug].js` in your `/pages/docs` directory to generate static pages for each markdown file.

##### `/pages/docs/[slug].js`
```javascript
import { getAllSlugs, getMarkdownData, renderMarkdownToHtml } from "@/lib/markdown";

export async function getStaticPaths() {
  const paths = getAllSlugs();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { metadata, content } = getMarkdownData(slug);
  const htmlContent = await renderMarkdownToHtml(content);

  return {
    props: {
      metadata,
      htmlContent,
    },
  };
}

export default function MarkdownPage({ metadata, htmlContent }) {
  return (
    <div>
      <h1>{metadata.title}</h1>
      {metadata.featuredImage && (
        <img src={metadata.featuredImage} alt={metadata.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
```

---

### **How It Works**

1. **Markdown Metadata**: Use front matter in markdown files for metadata like `title`, `featuredImage`, `description`, etc.
2. **Dynamic Routes**: The `[slug].js` file dynamically creates pages for all markdown files using their filenames as slugs.
3. **Static Site Generation**: `getStaticPaths` generates paths for all markdown files, and `getStaticProps` fetches the content and metadata for each page.
4. **Rendering Markdown**: The `remark` library converts markdown content into HTML.

---

### **Future Scalability**
To add more metadata fields or concepts, simply include them in the front matter of the markdown files and render them in the component.

For example:
```markdown
---
title: "Advanced Page"
featuredImage: "/images/advanced-featured.jpg"
author: "Jane Doe"
tags:
  - "nextjs"
  - "markdown"
---
```

In the component:
```javascript
<p>Author: {metadata.author}</p>
<ul>
  {metadata.tags.map((tag) => (
    <li key={tag}>{tag}</li>
  ))}
</ul>
```

This setup gives you a flexible, extensible static site generator that leverages the power of Next.js and markdown.