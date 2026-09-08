import React from "react";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { MarkdownContent } from "@/components/guide/MarkdownContent";
import { getAllPosts } from "@/lib/blogs";

const flashArticle: BlogPost = {
  id: "flash",
  title: "Flash & ActionScript: Pioneer of Rich Interactive Web Development",
  date: "Era 1 (2000s)",
  category: "Architecture",
  readTime: "5 min read",
  summary:
    "An exploration of Macromedia Flash, ActionScript 2.0/3.0, vector graphics, and how early rich internet applications laid the foundation for modern web animation runtime engines.",
  href: "/flash",
  tags: ["Flash", "ActionScript", "GSAP", "Animation", "Web History"],
  content: `Before modern single-page applications (SPAs), CSS animations, or WebGL, **Macromedia Flash** (later Adobe Flash) was the definitive runtime for interactive web experiences, digital publishing platforms, and vector animations.

## The Era of Rich Internet Applications (RIAs)

In the early 2000s, standard browser DOMs were limited to basic HTML and DHTML. Flash provided a cross-browser vector rendering engine, timeline-based animation system, and ActionScript programming language.

### Key Contributions of the Flash Era:
* **Vector Graphics Engine**: Resolution-independent graphics rendered at high frame rates.
* **ActionScript (AS2 / AS3)**: Event-driven object-oriented scripting for complex interactive applications.
* **Component-Based UI Architecture**: MovieClip symbol instancing with encapsulated local states.
* **Rich Media & Streaming**: Integrated video playback and audio streaming long before HTML5 video standards.

## Evolution into Modern Web Animation

While Flash was eventually deprecated in favor of open web standards like HTML5, CSS3, and JavaScript ES6+, the core concepts of timeline orchestration, tweening math, and MovieClip composition live on in modern tools like **GSAP (GreenSock Animation Platform)** and component-driven UI systems.

\`\`\`ts
// Modern GSAP equivalent of ActionScript timeline animation
import { gsap } from "gsap";

const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".movieclip", { duration: 1, scale: 1.2, rotation: 360, ease: "power2.inOut" });
\`\`\`

## Legacy & Lessons for Modern Engineers

Working through the Flash era instilled core principles of interactive software engineering:
1. **Performance Awareness**: Optimizing redraw regions and vector curve points.
2. **State Management**: Managing complex UI control flows and nested timeline states.
3. **User Experience Design**: Building responsive, tactile interfaces that engage users.
`,
};

export default function FlashArticlePage() {
  const allPosts = [flashArticle, ...getAllPosts()];

  return (
    <ArticleLayout posts={allPosts} currentPost={flashArticle}>
      <MarkdownContent content={flashArticle.content || ""} />
    </ArticleLayout>
  );
}
