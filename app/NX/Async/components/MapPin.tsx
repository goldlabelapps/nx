import * as React from 'react';

export default function MapPin({ size = 32, color = '#d00' }: { size?: number; color?: string }) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
        fill={color}
      />
    </svg>
  );
}
