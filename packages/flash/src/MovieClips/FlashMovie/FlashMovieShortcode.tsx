'use client';

import * as React from 'react';
import { Flash } from '../../Flash';
import type { MovieName } from '../../types';

export interface FlashMovieShortcodeProps {
  slug?: string;
  movie?: MovieName;
  width?: string | number;
  height?: string | number;
  border?: boolean | string;
  color?: string;
  loop?: boolean | string;
  autoPlay?: boolean | string;
  debug?: boolean | string;
  className?: string;
  style?: React.CSSProperties;
}

export function FlashMovieShortcode({
  slug,
  movie,
  width = '100%',
  height = 150,
  border = false,
  color = 'transparent',
  loop = true,
  autoPlay = true,
  debug = false,
  className,
  style,
}: FlashMovieShortcodeProps) {
  const targetMovie = (slug || movie || 'logo') as MovieName;
  const isBorderActive = border === true || border === 'true';
  const isLoopActive = loop === true || loop === 'true';
  const isAutoPlayActive = autoPlay === true || autoPlay === 'true';
  const isDebugActive = debug === true || debug === 'true';

  const containerStyle: React.CSSProperties = {
    ...(isBorderActive ? { border: '1px solid red' } : {}),
    borderRadius: '0.75rem',
    overflow: 'hidden',
    position: 'relative',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      <Flash
        movie={targetMovie}
        width={width}
        height={height}
        color={color}
        loop={isLoopActive}
        autoPlay={isAutoPlayActive}
        debug={isDebugActive}
      />
    </div>
  );
}

export default FlashMovieShortcode;
