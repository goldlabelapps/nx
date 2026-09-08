'use client';

export { Flash } from './Flash';
export { Stage } from './Stage';
export { LightningBolt } from './MovieClips/LightningBolt';
export { Logo } from './MovieClips/Logo';
export { Pingpongball } from './MovieClips/Pingpongball';
export { LoadingMC, LoadingAS, loadingActionScript, CharacterAvatar, CHARACTER_NAMES } from './MovieClips/Loading';
export type { LoadingMCProps, CharacterName, CharacterAvatarProps } from './MovieClips/Loading';
export { TraceMC } from './MovieClips/Trace';
export { CleverText } from './MovieClips/CleverText';
export { default as CleverTextShortcode } from './MovieClips/CleverText/CleverTextShortcode';
export { FlashMovieShortcode, default as FlashMovie } from './MovieClips/FlashMovie/FlashMovieShortcode';
export { SpriteMC, SpriteMC as Sprite } from './MovieClips/Sprite/SpriteMC';
export { SpriteArtwork } from './MovieClips/Sprite/SpriteArtwork';
export { actionScripts, getActionScript, registerActionScript } from './ActionScript';
export type { LightningBoltProps } from './MovieClips/LightningBolt';
export type { CleverTextProps, CleverTextOptions } from './MovieClips/CleverText';
export type {
  ActionScriptFactory,
  ActionScriptOptions,
  BuiltinMovie,
  FlashHandle,
  FlashProps,
  LogoProps,
  MovieName,
  PingpongballProps,
  StageProps,
  TraceMCProps,
} from './types';
