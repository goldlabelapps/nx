import type { Direction } from '../../../types';

const OCTANT_DIRECTIONS: Direction[] = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];

/**
 * Converts a movement vector into the nearest compass direction using
 * screen coordinates where +x points right and +y points down.
 */
export function getDirection(dx: number, dy: number, fallback: Direction = 'S'): Direction {
  if (dx === 0 && dy === 0) {
    return fallback;
  }

  const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
  const octant = Math.round(angle / (Math.PI / 4)) % 8;
  return OCTANT_DIRECTIONS[octant];
}
