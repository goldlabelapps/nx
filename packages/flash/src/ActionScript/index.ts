import logoActionScript from './logo';
import pingpongActionScript from './pingpong';
import loadingActionScript from './loading';
import spriteActionScript from './sprite';
import type { ActionScriptFactory, BuiltinMovie } from '../types';

export type { ActionScriptFactory } from '../types';

const builtinRegistry: Record<BuiltinMovie, ActionScriptFactory> = {
  pingpong: pingpongActionScript,
  logo: logoActionScript,
  nx: logoActionScript,
  loading: loadingActionScript,
  sprite: spriteActionScript,
  'sprite-demo': spriteActionScript,
};

const customRegistry = new Map<string, ActionScriptFactory>();

/**
 * Register a custom ActionScript timeline factory under a given movie name.
 */
export function registerActionScript(name: string, factory: ActionScriptFactory): void {
  customRegistry.set(name, factory);
}

/**
 * Look up an ActionScript timeline factory by movie name.
 * Searches built-in registry first, then dynamic custom registry.
 */
export function getActionScript(movieName: string): ActionScriptFactory | undefined {
  if (Object.prototype.hasOwnProperty.call(builtinRegistry, movieName)) {
    return builtinRegistry[movieName as BuiltinMovie];
  }
  return customRegistry.get(movieName);
}

/**
 * Read-only object mapping of built-in ActionScripts.
 */
export const actionScripts = builtinRegistry;
