"use client";

import React from 'react';

type T_ShareVirusProps = {
  config?: {
    tenant?: string;
  };
  is404?: boolean;
};

export const ShareVirus: React.FC<T_ShareVirusProps> = ({ config, is404 = false }) => {
  const tenant = config?.tenant || process.env.NEXT_PUBLIC_TENANT || 'nx';
  const svgSrc = `/${tenant}/svg/${is404 ? 'NXLogo404.svg' : 'NXLogo.svg'}`;

  return (
    <section
      aria-label="Share module wireframe"
      style={{
        width: '100%',
        minHeight: 280,
        border: '1px dashed rgba(0,0,0,0.28)',
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(245,245,245,0.7))',
        padding: 24,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <img
          src={svgSrc}
          alt="NX Logo"
          data-testid="nx-logo"
          data-svg-src={svgSrc}
          style={{ width: 180, maxWidth: '70%', height: 'auto', opacity: 0.9, marginBottom: 14 }}
        />
        <h3 style={{ margin: 0, fontSize: 20 }}>Wireframe Share Placeholder</h3>
        <p style={{ margin: '8px 0 0 0', opacity: 0.72 }}>
          Theme package components were removed. This placeholder keeps the slot functional.
        </p>
      </div>
    </section>
  );
};

export default ShareVirus;