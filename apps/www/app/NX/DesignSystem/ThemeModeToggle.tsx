'use client';

import { IconButton as MuiIconButton } from '@mui/material';
import { Icon } from '@nx/design-system';
import { useThemeMode } from './ThemeModeContext';

export default function ThemeModeToggle() {
  const { mode, setMode } = useThemeMode();

  return (
    <MuiIconButton
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      size="small"
      color="secondary"
    >
      <Icon icon={mode === 'dark' ? 'lightmode' : 'darkmode'} />
    </MuiIconButton>
  );
}
