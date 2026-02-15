import React from 'react';

export type TState = {
  [key: string]: any;
}

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
