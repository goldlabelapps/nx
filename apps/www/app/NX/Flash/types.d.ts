// Augment ImportMeta to support import.meta.hot (for Vite/webpack HMR)
declare global {
  interface ImportMeta {
    hot?: {
      accept: (cb: () => void) => void;
    };
  }
}
import React from 'react';

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
