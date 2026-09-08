'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { CleverTextShortcode, FlashMovieShortcode } from '@goldlabelapps/flash';

export type I_RenderMarkdown = {
  children: React.ReactNode;
  config?: Record<string, unknown>;
  slug?: string;
};

export default function RenderMarkdown({
  children = '',
  config,
}: I_RenderMarkdown) {
  // --- Normalize children to array to prevent map errors ---
  const normalizeChildren = (children: React.ReactNode) =>
    Array.isArray(children) ? children : [children];

  const isBlockLikeNode = (node: React.ReactNode) => {
    if (!React.isValidElement(node)) return false;
    if (node.type === React.Fragment) return false;
    if (typeof node.type !== 'string') return true;

    const inlineTags = new Set([
      'a',
      'abbr',
      'b',
      'bdi',
      'bdo',
      'br',
      'cite',
      'code',
      'data',
      'dfn',
      'em',
      'i',
      'img',
      'kbd',
      'label',
      'mark',
      'q',
      'ruby',
      's',
      'samp',
      'small',
      'span',
      'strong',
      'sub',
      'sup',
      'time',
      'u',
      'var',
      'wbr',
    ]);

    return !inlineTags.has(node.type);
  };

  const renderChildrenWithShortcodes = (children: React.ReactNode) =>
    normalizeChildren(children).map((child, index) => {
      const renderedChild = typeof child === 'string' ? renderShortcode(child) : child;

      if (React.isValidElement(renderedChild)) {
        return React.cloneElement(renderedChild, {
          key: renderedChild.key ?? `md-${index}`,
        });
      }

      return renderedChild;
    });

  // --- Shortcode parser ---
  const renderShortcode = (text: string) => {
    const parseShortcode = (
      regex: RegExp,
      Component: React.ElementType,
      extraProps: Record<string, unknown> = {},
    ): React.ReactNode | null => {
      const match = text.match(regex);
      if (!match) return null;

      const attrs = match[1];
      const props: Record<string, unknown> = {};
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        let val: string | number | boolean = attrMatch[2];
        if (!isNaN(Number(val))) {
          val = Number(val);
        } else if (val === 'true' || val === 'false') {
          val = val === 'true';
        }
        props[attrMatch[1]] = val;
      }

      return <Component {...props} {...extraProps} config={config} />;
    };

    // CleverText
    const cleverText = parseShortcode(/\[CleverText\s+(.*?)\]/, CleverTextShortcode);
    if (cleverText) return cleverText;

    // FlashMovie
    const flashMovie = parseShortcode(/\[FlashMovie\s+(.*?)\]/, FlashMovieShortcode);
    if (flashMovie) return flashMovie;

    // fallback: simply return text
    return text;
  };

  return (
    <div>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          p: ({ children }) => {
            const renderedChildren = renderChildrenWithShortcodes(children);
            const hasBlockChild = renderedChildren.some(isBlockLikeNode);

            if (hasBlockChild) {
              return <div>{renderedChildren}</div>;
            }

            return <p>{renderedChildren}</p>;
          },
          li: ({ children }) => {
            const renderedChildren = renderChildrenWithShortcodes(children);
            const hasBlockChild = renderedChildren.some(isBlockLikeNode);

            if (hasBlockChild) {
              return <li>{renderedChildren}</li>;
            }

            return <li><span>{renderedChildren}</span></li>;
          },
          strong: ({ children }) => <span>{children}</span>,
          em: ({ children }) => <em>{children}</em>,
          a: ({ href = '', children }) => {
            const isExternal = /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children as string}
      </ReactMarkdown>
    </div>
  );
}
