'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { Stage } from './Stage';
import { Logo } from './MovieClips/Logo';
import { Pingpongball } from './MovieClips/Pingpongball';
import { LoadingMC } from './MovieClips/Loading';
import { SpriteMC } from './MovieClips/Sprite/SpriteMC';
import { TraceMC } from './MovieClips/Trace';
import { getActionScript } from './ActionScript';
import type { FlashHandle, FlashProps } from './types';

export type { FlashHandle, FlashProps } from './types';

export const Flash = forwardRef<FlashHandle, FlashProps>(function Flash(
  {
    movie,
    width = '100%',
    height = '100%',
    color = 'transparent',
    loop = false,
    autoPlay = true,
    debug = false,
    className,
    style,
  },
  ref,
) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const selectedActionScript = getActionScript(movie);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !selectedActionScript) {
      return;
    }

    const tl = selectedActionScript({
      target,
      loop,
    });

    timelineRef.current = tl;

    if (autoPlay) {
      tl.play();
    } else {
      tl.pause(0);
    }

    return () => {
      tl.kill();
      timelineRef.current = null;
      gsap.set(target, { clearProps: 'transform,opacity' });
    };
  }, [autoPlay, loop, movie, selectedActionScript]);

  useImperativeHandle(ref, () => ({
    play: () => {
      timelineRef.current?.play();
    },
    pause: () => {
      timelineRef.current?.pause();
    },
    restart: () => {
      timelineRef.current?.restart();
    },
  }));

  const renderMovieClip = () => {
    if (movie === 'nx') {
      return <Logo text="NX°" size={36} color="#f59e0b" />;
    }
    if (movie === 'logo') {
      return <Logo text="NX°" size={36} color="#f59e0b" />;
    }
    if (movie === 'pingpong') {
      return <Pingpongball />;
    }
    if (movie === 'loading') {
      const sizeVal = typeof width === 'number' ? width : typeof height === 'number' ? height : undefined;
      return <LoadingMC size={sizeVal} />;
    }
    if (movie === 'sprite' || movie === 'sprite-demo') {
      return <SpriteMC size={64} direction="E" moving />;
    }
    return null;
  };

  return (
    <Stage width={width} height={height} color={color} className={className} style={style}>
      <div
        data-flash-movie={movie}
        data-flash-loop={String(loop)}
        aria-label={`Flash movie: ${movie}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
        }}
      >
        {selectedActionScript ? (
          <div
            ref={targetRef}
            data-direction={movie === 'sprite' || movie === 'sprite-demo' ? 'E' : undefined}
            data-moving={movie === 'sprite' || movie === 'sprite-demo' ? 'true' : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderMovieClip()}
          </div>
        ) : null}
        <TraceMC movie={movie} active={debug} />
      </div>
    </Stage>
  );
});

export default Flash;
