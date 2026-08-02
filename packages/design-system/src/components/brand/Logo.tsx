'use client';

import { Box } from '@mui/material';
import Heading from '../headings/Heading';
import type { LogoProps } from '../../types';

export default function Logo({ name = 'NX°', children, subtitle, favicon = false }: LogoProps) {
  const text = children ?? name;
  const hasText = !favicon && text !== undefined && text !== null && text !== '';
  const showTextBlock = !favicon && (hasText || Boolean(subtitle));

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        color: 'text.primary'
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: 36,
          height: 36,
          marginRight: 0.5,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
          lineHeight: 0
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" role="img" aria-label="NX Favicon">
          <g stroke="none" fill="none" fillRule="evenodd">
            <g>
              <rect fillOpacity="0" x="0" y="0" width="24" height="24" />
              <g transform="translate(1, 1)" fillRule="nonzero">
                <path
                  d="M11.9316955,0.00778516743 C18.2793961,0.234625 23.2318292,5.339499 22.9916183,11.4103978 C22.7565183,17.4812966 17.4207699,22.2190224 11.0730694,21.9921826 C4.72536881,21.7653428 -0.227064254,16.6604688 0.00803576687,10.58957 C0.248246659,4.51867123 5.58399495,-0.218565786 11.9316955,0.00778516743 Z"
                  fill="currentColor"
                />
                <path d="M8,12 C12.6203742,21.9973959 20,13.9133228 20,13.9133228 C14.7209979,15.4126605 8,12 8,12 Z" fill="#fff" />
              </g>
            </g>
          </g>
        </svg>
      </Box>
      {showTextBlock ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {hasText ? (
            <Heading variant="h1">
              {text}
            </Heading>
          ) : null}
          {subtitle ? (
            <Heading
              as="span"
              tone="secondary"
              style={{ lineHeight: 1.2, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'none' }}
            >
              {subtitle}
            </Heading>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}