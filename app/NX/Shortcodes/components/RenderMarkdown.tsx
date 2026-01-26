'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Link as MuiLink,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  BuyNow,
  FeedbackBtn,
} from '../../Shortcodes';
import {
  CommerceShortcode,
} from '../../Commerce';

export type I_RenderMarkdown = {
  children: React.ReactNode;
  config: any;
};

export default function RenderMarkdown({
  children = '',
  config,
}: I_RenderMarkdown) {
  const theme = useTheme();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // --- Normalize children to array to prevent map errors ---
  const normalizeChildren = (children: any) =>
    Array.isArray(children) ? children : [children];

  // --- Shortcode parser ---
  const renderShortcode = (text: string) => {
    const parseShortcode = (
      regex: RegExp,
      Component: React.ElementType,
    ): React.ReactNode | null => {
      const match = text.match(regex);
      if (!match) return null;

      const attrs = match[1];
      const props: Record<string, any> = {};
      const attrRegex = /(\w+)="(.*?)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        let val: any = attrMatch[2];
        if (!isNaN(Number(val))) {
          val = Number(val);
        } else if (val === 'true' || val === 'false') {
          val = val === 'true';
        }
        props[attrMatch[1]] = val;
      }

      return <Component {...props} config={config} />;
    };

    // BuyNow
    const buyNow = parseShortcode(/\[BuyNow\s+(.*?)\]/, BuyNow);
    if (buyNow) return buyNow;

    // Commerce
    const commerce = parseShortcode(/\[CommerceShortcode\s+(.*?)\]/, CommerceShortcode);
    if (commerce) return commerce;

    // FeedbackBtn
    const feedbackBtn = parseShortcode(/\[FeedbackBtn\s+(.*?)\]/, FeedbackBtn);
    if (feedbackBtn) return feedbackBtn;

    // fallback: simply return text
    return text;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollbarWidth: 'auto',
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
          '&::-webkit-scrollbar': { width: '12px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.paper,
          },
        }}
        tabIndex={0}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Typography variant="h4" sx={{ my: 1, fontWeight: 'lighter' }}>
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" sx={{ my: 1, fontWeight: 'lighter' }}>
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" sx={{ my: 1, fontWeight: 'lighter' }}>
                {children}
              </Typography>
            ),

            blockquote: ({ children }) => (
              <Box
                component="blockquote"
                sx={{
                  borderLeft: `2px solid ${theme.palette.primary.main}`,
                  pl: 2,
                  ml: 0,
                  my: 2,
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic',
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.05)
                      : alpha(theme.palette.primary.main, 0.02),
                }}
              >
                {children}
              </Box>
            ),

            p: ({ children }) => (
              <Typography
                variant="body1"
                component="span"
                display="block"
                sx={{ my: 1, fontWeight: 'normal' }}
              >
                {normalizeChildren(children).map((child, i) => (
                  <React.Fragment key={i}>
                    {typeof child === 'string' ? renderShortcode(child) : child}
                  </React.Fragment>
                ))}
              </Typography>
            ),
            li: ({ children }) => (
              <li>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'normal' }}
                >
                  {normalizeChildren(children).map((child, i) => (
                    <React.Fragment key={i}>
                      {typeof child === 'string'
                        ? renderShortcode(child)
                        : child}
                    </React.Fragment>
                  ))}
                </Typography>
              </li>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            a: ({ href = '', children }) => {
              const isExternal = /^https?:\/\//.test(href);
              return (
                <MuiLink
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  color={theme.palette.text.primary}
                  underline="none"
                >
                  <strong>{children}</strong>
                </MuiLink>
              );
            },
          }}
        >
          {children as string}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
