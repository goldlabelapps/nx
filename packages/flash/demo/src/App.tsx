import { useState } from 'react';
import Flash from '../../src/Flash';
import MovieClip from '../../src/MovieClips/MovieClip';
import LightningBolt from '../../src/MovieClips/Lightning/LightningBolt';
import Macromedia from '../../src/MovieClips/Icons/Macromedia';
import Sprite from '../../src/MovieClips/Sprite';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

export default function App() {
  const [directionIndex, setDirectionIndex] = useState(0);
  const activeDirection = directions[directionIndex];

  const rotateDirection = (step: number) => {
    setDirectionIndex((current) => {
      const next = current + step;
      return (next + directions.length) % directions.length;
    });
  };

  return (
    <>
      <Flash>
        <MovieClip pos="top-left" width={360} height={100} style={{ padding: 18 }}>
          <div style={{ letterSpacing: 2, textTransform: 'uppercase', opacity: 0.95 }}>
            Flash Playground
          </div>
        </MovieClip>

        <MovieClip pos="middle-left" width={220} height={220} className="float" style={{ left: 110 }}>
          <Macromedia width="100%" height="100%" />
        </MovieClip>

        <MovieClip
          pos="middle-right"
          width={230}
          height={500}
          style={{ right: 90, left: 'auto' }}
          className="pulse"
        >
          <LightningBolt />
        </MovieClip>

        <MovieClip
          pos="bottom-middle"
          width={620}
          height={120}
          style={{
            bottom: 28,
            borderRadius: 18,
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            color: '#f7fbff',
            fontSize: 18,
            fontWeight: 600,
            textAlign: 'center',
            padding: '0 22px',
          }}
        >
          <div>
            Visual sandbox for MovieClips, icons, and stage composition.
            <br />
            Edit demo/src/App.tsx and the stage hot-reloads.
          </div>
        </MovieClip>

        <MovieClip width={420} height={420}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 14,
              background: 'rgba(8, 10, 14, 0.44)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: 14,
              color: '#f7fbff',
              fontSize: 12,
              letterSpacing: 0.3,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ marginBottom: 12, opacity: 0.85, textTransform: 'uppercase' }}>
              8-direction sprite walk cycle
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sprite direction={activeDirection} state="walking" size={224} />
            </div>
            <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 700, letterSpacing: 1.2 }}>
              Facing: {activeDirection}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => rotateDirection(-1)}
                style={{
                  padding: '8px 12px',
                  background: '#0f253a',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: '#eaf4ff',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: 0.6,
                }}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => rotateDirection(1)}
                style={{
                  padding: '8px 12px',
                  background: '#1d3f2b',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: '#effff0',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: 0.6,
                }}
              >
                Next
              </button>
            </div>
          </div>
        </MovieClip>
      </Flash>

      <div className="playground-frame" />
    </>
  );
}
