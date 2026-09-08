import type { CSSProperties } from 'react';
import type { StageProps } from './types';

export type { StageProps } from './types';

export function Stage({
  width = '100%',
  height = '100%',
  color = 'transparent',
  children,
  className,
  style: customStyle,
}: StageProps) {
  const stageStyle: CSSProperties = {
    width,
    height,
    minHeight: 64,
    backgroundColor: color,
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    ...customStyle,
  };

  return (
    <div className={className} style={stageStyle} data-stage="true" aria-label="Flash stage">
      {children}
    </div>
  );
}

export default Stage;
