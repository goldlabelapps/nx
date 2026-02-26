"use client";
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Typography,
} from '@mui/material';

interface TextProps {
  children: React.ReactNode;
  variant?:
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'inherit';
  [key: string]: any;
}

export interface FadeInTextHandle {
  fadeInText: (duration?: number, params?: { onComplete?: () => void;[key: string]: any }) => void;
  fadeOutText: (duration?: number, params?: { onComplete?: () => void;[key: string]: any }) => void;
}

const Text = forwardRef<FadeInTextHandle, TextProps>(function Text(
  { children, variant = 'body1', ...props },
  ref
) {
  const innerRef = useRef<HTMLSpanElement | null>(null);

  // Expose fadeInText to parent
  useImperativeHandle(ref, () => ({
    fadeInText: (duration = 0.9, params: { onComplete?: () => void;[key: string]: any } = {}) => {
      if (innerRef.current) {
        const { onComplete, ...rest } = params;
        // Animate opacity from 0 to 1
        import('gsap').then(({ gsap }) => {
          gsap.fromTo(
            innerRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration,
              onComplete,
              ...rest,
            }
          );
        });
      } else if (params.onComplete) {
        params.onComplete();
      }
    },
    fadeOutText: (duration = 0.9, params: { onComplete?: () => void;[key: string]: any } = {}) => {
      if (innerRef.current) {
        const { onComplete, ...rest } = params;
        // Animate opacity from 1 to 0
        import('gsap').then(({ gsap }) => {
          gsap.to(
            innerRef.current,
            {
              opacity: 0,
              duration,
              onComplete,
              ...rest,
            }
          );
        });
      } else if (params.onComplete) {
        params.onComplete();
      }
    },
  }));

  return (
    <Typography
      variant={variant}
      {...props}
      ref={innerRef}
      style={{ opacity: 0, ...(props.style || {}) }}
    >
      {children}
    </Typography>
  );
});

export default Text;
