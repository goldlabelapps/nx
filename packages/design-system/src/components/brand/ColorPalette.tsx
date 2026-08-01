'use client';

import { Box, Stack, Typography } from '@mui/material';
import type { ColorGroup, ColorPaletteProps, ColorToken } from '../../types';

const COLOR_GROUPS: readonly ColorGroup[] = [
  {
    title: 'Brand and secondary',
    tokens: [
      { label: 'Primary', cssVar: '--nx-clay', note: 'Primary brand accent' },
      { label: 'Secondary', cssVar: '--nx-ink', note: 'Deepest brand neutral' },
      { label: 'Secondary logo', cssVar: '--nx-ink-logo', note: 'Logo lockup tone' },
      { label: 'Dusty', cssVar: '--nx-dusty', note: 'Dense supporting neutral' },
      { label: 'Body', cssVar: '--nx-body', note: 'Default body copy base' },
      { label: 'Sign', cssVar: '--nx-sign', note: 'Secondary neutral' },
      { label: 'Muted', cssVar: '--nx-muted', note: 'Quiet supporting text' },
      { label: 'Fog', cssVar: '--nx-fog', note: 'Softest neutral accent' },
      { label: 'Oat', cssVar: '--nx-oat', note: 'Soft highlight neutral' },
    ],
  },
  {
    title: 'Text roles',
    tokens: [
      { label: 'Text strong', cssVar: '--text-strong', note: 'Primary readable text' },
      { label: 'Text body', cssVar: '--text-body', note: 'Long-form content' },
      { label: 'Text subtle', cssVar: '--text-subtle', note: 'Subheads and metadata' },
      { label: 'Text muted', cssVar: '--text-muted', note: 'Quiet helper text' },
      { label: 'Text accent', cssVar: '--text-accent', note: 'Accent copy and links' },
      { label: 'Text on secondary', cssVar: '--text-on-ink', note: 'Text on dark surfaces' },
      { label: 'Text on secondary dim', cssVar: '--text-on-ink-dim', note: 'Secondary text on dark surfaces' },
    ],
  },
  {
    title: 'Surfaces',
    tokens: [
      { label: 'Page', cssVar: '--surface-page', note: 'Main app background' },
      { label: 'Paper', cssVar: '--surface-paper', note: 'Raised panel background' },
      { label: 'Card', cssVar: '--surface-card', note: 'Card and tile surface' },
      { label: 'Glass', cssVar: '--surface-glass', note: 'Translucent overlays' },
      { label: 'Secondary', cssVar: '--surface-ink', note: 'High-contrast inverse surface' },
      { label: 'Input', cssVar: '--surface-input', note: 'Form field resting state' },
      { label: 'Input hover', cssVar: '--surface-input-hover', note: 'Form field hover state' },
      { label: 'Input focus', cssVar: '--surface-input-focus', note: 'Form field focus state' },
      { label: 'Input disabled', cssVar: '--surface-input-disabled', note: 'Form field disabled state' },
    ],
  },
  {
    title: 'Borders and focus',
    tokens: [
      { label: 'Hairline', cssVar: '--border-hairline', note: 'Standard divider and frame' },
      { label: 'Faint', cssVar: '--border-faint', note: 'Low-contrast separators' },
      { label: 'Input', cssVar: '--border-input', note: 'Form field border' },
      { label: 'Input hover', cssVar: '--border-input-hover', note: 'Form field hover border' },
      { label: 'Input focus', cssVar: '--border-input-focus', note: 'Form field focus border' },
      { label: 'Focus ring', cssVar: '--focus-ring', note: 'Accessible focus outline' },
    ],
  },
];

function normalizeColorValue(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { displayValue: 'Unavailable', rawValue: '' };
  }

  if (trimmedValue.startsWith('#')) {
    return { displayValue: trimmedValue.toUpperCase(), rawValue: trimmedValue.toUpperCase() };
  }

  if (trimmedValue.startsWith('rgb')) {
    const channels = trimmedValue.match(/[\d.]+/g);

    if (!channels || channels.length < 3) {
      return { displayValue: trimmedValue, rawValue: trimmedValue };
    }

    const [red, green, blue] = channels.slice(0, 3).map((channel) => Math.max(0, Math.min(255, Math.round(Number(channel)))));
    const alphaChannel = channels[3];
    const alpha = alphaChannel === undefined ? null : Math.max(0, Math.min(255, Math.round(Number(alphaChannel) * 255)));
    const hex = [red, green, blue, alpha]
      .filter((channel): channel is number => channel !== null)
      .map((channel) => channel.toString(16).padStart(2, '0').toUpperCase())
      .join('');

    return {
      displayValue: `#${hex}`,
      rawValue: trimmedValue,
    };
  }

  return { displayValue: trimmedValue, rawValue: trimmedValue };
}

function resolveCssVar(cssVar: string) {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

function ColorSwatch({ token }: { token: ColorToken }) {
  const rawValue = resolveCssVar(token.cssVar);
  const { displayValue, rawValue: normalizedRawValue } = normalizeColorValue(rawValue);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '56px 1fr', sm: '72px 1fr' },
        gap: 2,
        alignItems: 'center',
        p: 2,
        borderRadius: '20px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: '0 12px 30px rgba(30, 28, 52, 0.08)',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: { xs: 56, sm: 72 },
          height: { xs: 56, sm: 72 },
          borderRadius: '18px',
          backgroundColor: `var(${token.cssVar})`,
          border: '1px solid rgba(30, 28, 52, 0.12)',
        }}
      />
      <Stack spacing={0.75} sx={{ minWidth: 0 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.25, sm: 1 }}
          sx={{ alignItems: { sm: 'baseline' }, justifyContent: 'space-between' }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {token.label}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'text.secondary',
            }}
          >
            {token.cssVar}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {token.note}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
          <Box>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Hex
            </Typography>
            <Typography
              component="div"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                userSelect: 'all',
                wordBreak: 'break-all',
              }}
            >
              {displayValue}
            </Typography>
          </Box>
          {normalizedRawValue && normalizedRawValue !== displayValue && (
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Raw
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  userSelect: 'all',
                  wordBreak: 'break-all',
                }}
              >
                {normalizedRawValue}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default function ColorPalette({
  title = 'Theme colours',
  subtitle = 'Live colour tokens from the active design-system theme, grouped by how they are used.',
}: ColorPaletteProps) {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.75}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
          {subtitle}
        </Typography>
      </Stack>
      <Stack spacing={3}>
        {COLOR_GROUPS.map((group) => (
          <Stack key={group.title} spacing={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {group.title}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  xl: 'repeat(2, minmax(0, 1fr))',
                },
                gap: 2,
              }}
            >
              {group.tokens.map((token) => (
                <ColorSwatch key={token.cssVar} token={token} />
              ))}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}