import * as React from 'react';

export default function MapPin({ 
  size = 32, 
  color = '#ff3b30',
}: { 
  size?: number; 
  color?: string 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: 'block' }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.2"
      />
    </svg>
  );
}
