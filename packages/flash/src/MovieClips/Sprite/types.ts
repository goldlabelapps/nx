import type React from 'react';

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
