"use client";
import React, { useEffect, useMemo, useState } from 'react';
import SpriteArtwork from './SpriteArtwork';
import type { SpriteProps, SpriteState } from './types';

const WALKING_FRAMES = 4;
const IDLE_FRAMES = 4;

function normalizeFrame(frame: number, frameCount: number): number {
  if (frameCount <= 0) return 0;
  return ((Math.floor(frame) % frameCount) + frameCount) % frameCount;
}

export const Sprite: React.FC<SpriteProps> = ({
  direction,
  state,
  moving,
  size = 64,
  className,
  style,
  frame,
  fps = 8,
  idleFps = 2,
  animateIdle = true,
  colors,
}) => {
  const resolvedState: SpriteState = state ?? (moving ? 'walking' : 'idle');
  const isFrameControlled = typeof frame === 'number';

  const frameCount = resolvedState === 'walking' ? WALKING_FRAMES : IDLE_FRAMES;
  const animationFps = resolvedState === 'walking' ? fps : idleFps;
  const shouldAnimate = resolvedState === 'walking' || animateIdle;

  const [internalFrame, setInternalFrame] = useState(0);

  useEffect(() => {
    if (isFrameControlled || !shouldAnimate || animationFps <= 0) {
      return;
    }

    const tick = 1000 / animationFps;
    const timer = window.setInterval(() => {
      setInternalFrame((value) => normalizeFrame(value + 1, frameCount));
    }, tick);

    return () => {
      window.clearInterval(timer);
    };
  }, [animationFps, frameCount, isFrameControlled, shouldAnimate]);

  const activeFrame = useMemo(() => {
    if (isFrameControlled) {
      return normalizeFrame(frame as number, frameCount);
    }
    return normalizeFrame(internalFrame, frameCount);
  }, [frame, frameCount, internalFrame, isFrameControlled]);

  return (
    <div
      className={className}
      style={{ width: size, height: size, display: 'inline-block', ...style }}
      data-direction={direction}
      data-state={resolvedState}
      data-frame={activeFrame}
    >
      <SpriteArtwork direction={direction} state={resolvedState} frame={activeFrame} palette={colors} />
    </div>
  );
};

export default Sprite;
