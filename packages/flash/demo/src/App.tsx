import Flash from '../../src/Flash';
import MovieClip from '../../src/MovieClips/MovieClip';
import LightningBolt from '../../src/MovieClips/Lightning/LightningBolt';
import Macromedia from '../../src/MovieClips/Icons/Macromedia';
import Sprite from '../../src/MovieClips/Sprite';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

export default function App() {
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

        <MovieClip
          pos="top-right"
          width={330}
          height={330}
          style={{ right: 16, top: 14, left: 'auto', transform: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 14,
              background: 'rgba(8, 10, 14, 0.44)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: 10,
              color: '#f7fbff',
              fontSize: 11,
              letterSpacing: 0.3,
              boxSizing: 'border-box',
            }}
          >
            <div style={{ marginBottom: 8, opacity: 0.85, textTransform: 'uppercase' }}>
              8-direction sprite walk cycle
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: 10,
              }}
            >
              {directions.map((direction) => (
                <div
                  key={direction}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <Sprite direction={direction} state="walking" size={56} />
                  <span style={{ fontSize: 10, opacity: 0.86 }}>{direction}</span>
                </div>
              ))}
            </div>
          </div>
        </MovieClip>
      </Flash>

      <div className="playground-frame" />
    </>
  );
}
