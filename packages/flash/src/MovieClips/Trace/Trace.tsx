import type { TraceMCProps } from '../../types';

export type { TraceMCProps } from '../../types';

export function TraceMC({ movie, active = true }: TraceMCProps) {
  if (!active) {
    return null;
  }

  return (
    <div
      aria-label="TraceMC"
      style={{
        position: 'absolute',
        left: 8,
        top: 8,
        background: 'rgba(0, 0, 0, 0.75)',
        color: '#00ff66',
        fontFamily: 'monospace',
        fontSize: 11,
        padding: '4px 8px',
        borderRadius: 4,
        pointerEvents: 'none',
        zIndex: 9999,
        border: '1px solid rgba(0, 255, 102, 0.3)',
      }}
    >
      [TraceMC] movie: {movie}
    </div>
  );
}

export default TraceMC;
