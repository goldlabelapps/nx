import type { CSSProperties, ReactNode } from 'react';
import type { gsap } from 'gsap';

/**
 * Imperative handle exposed via React ref for controlling Flash movie playback.
 */
export interface FlashHandle {
  play: () => void;
  pause: () => void;
  restart: () => void;
}

/**
 * Configuration options passed to an ActionScript timeline factory.
 */
export interface ActionScriptOptions {
  /** The target HTML element hosting the MovieClip visual elements. */
  target: HTMLElement;
  /** Whether the timeline animation should loop continuously. */
  loop?: boolean;
  /** Optional completion callback triggered when a non-looping animation completes. */
  onComplete?: () => void;
  /** Optional playback speed multiplier for GSAP timeline (default: 1). */
  speed?: number;
}

/**
 * Factory function signature for creating a GSAP Timeline.
 */
export type ActionScriptFactory = (options: ActionScriptOptions) => gsap.core.Timeline;

/**
 * Built-in standard MovieClip names provided by @goldlabelapps/flash.
 */
export type BuiltinMovie = 'logo' | 'pingpong' | 'nx' | 'loading' | 'sprite' | 'sprite-demo';

/**
 * Movie name supporting built-in autocomplete while remaining open for custom registrations.
 */
export type MovieName = BuiltinMovie | (string & {});

/**
 * Props for the public `<Flash />` component.
 */
export interface FlashProps {
  /** Name of the movie to render and animate (e.g. 'logo', 'pingpong'). */
  movie: MovieName;
  /** Viewport width of the Flash stage. */
  width?: CSSProperties['width'];
  /** Viewport height of the Flash stage. */
  height?: CSSProperties['height'];
  /** Background stage color. */
  color?: string;
  /** Whether the animation should loop continuously (default: false). */
  loop?: boolean;
  /** Whether the animation should automatically start playing on mount (default: true). */
  autoPlay?: boolean;
  /** Enable debug overlay showing movie name and execution status (default: false). */
  debug?: boolean;
  /** Additional CSS class names for the container. */
  className?: string;
  /** Custom inline styles for the container. */
  style?: CSSProperties;
}

/**
 * Props for the `<Stage />` render surface component.
 */
export interface StageProps {
  /** Stage width constraint. */
  width?: CSSProperties['width'];
  /** Stage height constraint. */
  height?: CSSProperties['height'];
  /** Background stage color. */
  color?: string;
  /** Children MovieClip components rendered inside the Stage. */
  children?: ReactNode;
  /** Additional CSS class names. */
  className?: string;
  /** Custom inline styles. */
  style?: CSSProperties;
}

/**
 * Props for the `<TraceMC />` debug overlay.
 */
export interface TraceMCProps {
  /** The active movie name being traced. */
  movie: string;
  /** Whether the debug overlay is visible. */
  active?: boolean;
}

/**
 * Props for the `<Logo />` MovieClip component.
 */
export interface LogoProps {
  /** Display label text for the logo. */
  text?: string;
  /** Brand / fill color for the logo icon. */
  color?: string;
  /** Size dimension in pixels. */
  size?: number;
}

/**
 * Props for the `<Pingpongball />` MovieClip component.
 */
export interface PingpongballProps {
  /** Ball diameter in pixels. */
  size?: number;
  /** Ball color. */
  color?: string;
  /** Initial X offset. */
  x?: number;
  /** Initial Y offset. */
  y?: number;
}

/**
 * Generic MovieClip component props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TMovieClip = any;

