import Flash from '../../src/Flash';
import MovieClip from '../../src/MovieClips/MovieClip';
import LightningBolt from '../../src/MovieClips/Lightning/LightningBolt';
import Macromedia from '../../src/MovieClips/Icons/Macromedia';

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
      </Flash>

      <div className="playground-frame" />
    </>
  );
}
