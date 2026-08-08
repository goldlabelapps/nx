import React from 'react';
import type { Direction, SpriteArtworkProps, SpritePalette } from '../../../types';

const WALK_STRIDE = [-2, -1, 2, 1];
const WALK_BOB = [0, -1, 0, 1];
const IDLE_BOB = [0, 0, 1, 0];

const DEFAULT_PALETTE: SpritePalette = {
  skin: '#f0be95',
  hair: '#3a2a1f',
  shirt: '#2d85d5',
  shirtShadow: '#2267a5',
  pants: '#42556a',
  boots: '#5d4635',
  outline: '#211911',
  shadow: 'rgba(0, 0, 0, 0.26)',
  eye: '#121212',
  accessory: '#89baf3',
};

type Vector2 = { x: number; y: number };

const DIRECTION_VECTORS: Record<Direction, Vector2> = {
  N: { x: 0, y: -1 },
  NE: { x: 1, y: -1 },
  E: { x: 1, y: 0 },
  SE: { x: 1, y: 1 },
  S: { x: 0, y: 1 },
  SW: { x: -1, y: 1 },
  W: { x: -1, y: 0 },
  NW: { x: -1, y: -1 },
};

function getFrameValue(values: number[], frame: number): number {
  return values[Math.abs(frame) % values.length];
}

export const SpriteArtwork: React.FC<SpriteArtworkProps> = ({ direction, state, frame, palette }) => {
  const colors = { ...DEFAULT_PALETTE, ...palette };
  const vector = DIRECTION_VECTORS[direction];
  const mirrored = vector.x < 0;
  const side = vector.y === 0 && vector.x !== 0;
  const diagonal = vector.x !== 0 && vector.y !== 0;
  const facingNorth = vector.y < 0;
  const facingSouth = vector.y > 0;

  const stride = state === 'walking' ? getFrameValue(WALK_STRIDE, frame) : 0;
  const bob = state === 'walking' ? getFrameValue(WALK_BOB, frame) : getFrameValue(IDLE_BOB, frame);

  const torsoX = side ? 25 : diagonal ? 23 : 22;
  const torsoW = side ? 14 : diagonal ? 18 : 20;
  const headX = side ? 25 : diagonal ? 23 : 22;
  const headW = side ? 14 : diagonal ? 18 : 20;

  const legWidth = side ? 7 : 8;
  const leftLegX = side ? 24 : 22;
  const rightLegX = side ? 33 : 34;

  const leftLegDx = facingNorth ? -stride : stride;
  const rightLegDx = facingNorth ? stride : -stride;

  const leftArmX = side ? 23 : 16;
  const rightArmX = side ? 39 : 42;
  const backArmDx = Math.round((-stride * (diagonal ? 0.7 : 0.9)));
  const frontArmDx = Math.round((stride * (diagonal ? 0.7 : 0.9)));

  const leanX = vector.x * (state === 'walking' ? 1 : 0);
  const leanY = vector.y < 0 ? -1 : 0;

  const shellTransform = mirrored ? 'translate(64 0) scale(-1 1)' : undefined;

  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" role="img" aria-label={`Sprite facing ${direction}`}>
      <g transform={shellTransform}>
        <ellipse cx={32} cy={54} rx={12} ry={5} fill={colors.shadow} />

        <g transform={`translate(${leanX} ${bob + leanY})`}>
          <rect
            x={leftLegX + leftLegDx}
            y={40 + Math.floor(Math.abs(leftLegDx) / 2)}
            width={legWidth}
            height={14}
            fill={colors.pants}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
          <rect
            x={rightLegX + rightLegDx}
            y={40 + Math.floor(Math.abs(rightLegDx) / 2)}
            width={legWidth}
            height={14}
            fill={colors.pants}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          <rect
            x={leftLegX + leftLegDx}
            y={52 + Math.floor(Math.abs(leftLegDx) / 2)}
            width={legWidth}
            height={3}
            fill={colors.boots}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
          <rect
            x={rightLegX + rightLegDx}
            y={52 + Math.floor(Math.abs(rightLegDx) / 2)}
            width={legWidth}
            height={3}
            fill={colors.boots}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          <rect
            x={leftArmX + backArmDx}
            y={27}
            width={6}
            height={13}
            fill={colors.shirtShadow}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          <rect
            x={torsoX}
            y={24}
            width={torsoW}
            height={17}
            fill={facingNorth ? colors.shirtShadow : colors.shirt}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          {facingNorth ? (
            <rect
              x={torsoX + 2}
              y={28}
              width={torsoW - 4}
              height={5}
              fill={colors.accessory}
              opacity={0.9}
              shapeRendering="crispEdges"
            />
          ) : null}

          <rect
            x={rightArmX + frontArmDx}
            y={27}
            width={6}
            height={13}
            fill={colors.shirt}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          <rect
            x={headX}
            y={10}
            width={headW}
            height={14}
            fill={colors.skin}
            stroke={colors.outline}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />

          <rect
            x={headX}
            y={10}
            width={headW}
            height={4}
            fill={colors.hair}
            shapeRendering="crispEdges"
          />

          {facingNorth ? (
            <rect
              x={headX + 2}
              y={16}
              width={headW - 4}
              height={4}
              fill={colors.hair}
              opacity={0.85}
              shapeRendering="crispEdges"
            />
          ) : side ? (
            <rect x={headX + 9} y={16} width={2} height={2} fill={colors.eye} shapeRendering="crispEdges" />
          ) : diagonal ? (
            <>
              <rect x={headX + 6} y={16} width={2} height={2} fill={colors.eye} shapeRendering="crispEdges" />
              <rect x={headX + 12} y={16} width={2} height={2} fill={colors.eye} shapeRendering="crispEdges" />
            </>
          ) : (
            <>
              <rect x={headX + 5} y={16} width={2} height={2} fill={colors.eye} shapeRendering="crispEdges" />
              <rect x={headX + headW - 7} y={16} width={2} height={2} fill={colors.eye} shapeRendering="crispEdges" />
            </>
          )}

          {facingSouth ? (
            <rect
              x={headX + (side ? 5 : 7)}
              y={20}
              width={side ? 3 : 5}
              height={1}
              fill={colors.outline}
              shapeRendering="crispEdges"
            />
          ) : null}
        </g>
      </g>
    </svg>
  );
};

export default SpriteArtwork;
