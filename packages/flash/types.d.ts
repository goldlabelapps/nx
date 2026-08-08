import type * as React from 'react';

// Augment ImportMeta to support import.meta.hot (for Vite/webpack HMR)
declare global {
  interface ImportMeta {
    hot?: {
      accept: (cb: () => void) => void;
    };
  }
}

export type TState = {
  [key: string]: any;
};

export type TMovieClip = {
  id?: string;
  children?: React.ReactNode;
  style?: any;
  border?: boolean;
  width?: number | string;
  height?: number | string;
  position?:
    | 'top-left'
    | 'top-middle'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-middle'
    | 'bottom-right';
};

export type TFlashConfig = {
  width?: number | string;
  height?: number | string;
  [key: string]: any;
};

export type TStage = {
  id?: string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
};

export type TTrace = {
  children?: React.ReactNode;
};

export interface I_Flash {
  id?: string;
  children?: React.ReactNode;
}

export interface I_MovieClip {
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  border?: boolean;
  minWidth?: number | string;
  maxWidth?: number | string;
  zIndex?: number;
  pos?:
    | 'top-left'
    | 'top-middle'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-middle'
    | 'bottom-right';
  align?: 'left' | 'right' | 'center';
  offsetX?: number;
  offsetY?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export interface TextProps {
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
  fadeInText: (duration?: number, params?: { onComplete?: () => void; [key: string]: any }) => void;
  fadeOutText: (duration?: number, params?: { onComplete?: () => void; [key: string]: any }) => void;
}

export interface I_Chunk {
  [key: string]: any;
}

export interface I_Chatbot {
  id?: string;
  title?: string;
  logo?: React.ReactNode;
  [key: string]: any;
}

export interface I_Response {
  text: string;
  from: 'user' | 'bot';
  avatar?: React.ReactNode;
  [key: string]: any;
}

/** @deprecated Use I_Response instead. */
export type I_Resonse = I_Response;

export type Direction =
  | 'N'
  | 'NE'
  | 'E'
  | 'SE'
  | 'S'
  | 'SW'
  | 'W'
  | 'NW';

export type SpriteState = 'idle' | 'walking';

export interface SpriteProps {
  direction: Direction;
  state?: SpriteState;
  moving?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  frame?: number;
  fps?: number;
  idleFps?: number;
  animateIdle?: boolean;
  colors?: Partial<SpritePalette>;
}

export interface SpritePalette {
  skin: string;
  hair: string;
  shirt: string;
  shirtShadow: string;
  pants: string;
  boots: string;
  outline: string;
  shadow: string;
  eye: string;
  accessory: string;
}

export interface SpriteArtworkProps {
  direction: Direction;
  state: SpriteState;
  frame: number;
  palette?: Partial<SpritePalette>;
}
