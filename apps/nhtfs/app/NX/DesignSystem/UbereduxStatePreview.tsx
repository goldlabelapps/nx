'use client';

import { useSlice } from '@nx/uberedux';

export default function UbereduxStatePreview() {
  const state = useSlice();

  return (
    <pre
      style={{
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontSize: '0.8rem',
        lineHeight: 1.4,
        overflowX: 'auto',
      }}
    >
      {JSON.stringify(state, null, 2)}
    </pre>
  );
}
