'use client';

import { Box, Button as MuiButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { AlertProps } from './types';

export default function Alert({ children, title, severity = 'info', dismissible = false }: AlertProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const tone = {
    info: {
      border: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.3)',
      bg: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(37, 99, 235, 0.08)',
      accent: isDark ? '#60A5FA' : '#2563EB',
      title: isDark ? '#93C5FD' : '#1E40AF',
      text: isDark ? '#F8FAFC' : '#1E293B',
    },
    success: {
      border: isDark ? 'rgba(74, 222, 128, 0.4)' : 'rgba(22, 163, 74, 0.3)',
      bg: isDark ? 'rgba(74, 222, 128, 0.12)' : 'rgba(22, 163, 74, 0.08)',
      accent: isDark ? '#4ADE80' : '#16A34A',
      title: isDark ? '#86EFAC' : '#166534',
      text: isDark ? '#F8FAFC' : '#1E293B',
    },
    warning: {
      border: isDark ? 'rgba(251, 191, 36, 0.4)' : 'rgba(217, 119, 6, 0.3)',
      bg: isDark ? 'rgba(251, 191, 36, 0.12)' : 'rgba(217, 119, 6, 0.08)',
      accent: isDark ? '#FBBF24' : '#D97706',
      title: isDark ? '#FDE047' : '#92400E',
      text: isDark ? '#F8FAFC' : '#1E293B',
    },
    error: {
      border: isDark ? 'rgba(248, 113, 113, 0.4)' : 'rgba(220, 38, 38, 0.3)',
      bg: isDark ? 'rgba(248, 113, 113, 0.12)' : 'rgba(220, 38, 38, 0.08)',
      accent: isDark ? '#F87171' : '#DC2626',
      title: isDark ? '#FCA5A5' : '#991B1B',
      text: isDark ? '#F8FAFC' : '#1E293B',
    }
  }[severity];

  return (
    <Box sx={{
      border: `1px solid ${tone.border}`,
      borderLeft: `4px solid ${tone.accent}`,
      borderRadius: '3px',
      bgcolor: tone.bg,
      p: 2.25,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 2
    }}>
      <Box>
        {title && <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600, color: tone.title }}>{title}</Typography>}
        <Typography variant="body2" sx={{ color: tone.text }}>{children}</Typography>
      </Box>
      {dismissible && <MuiButton size="small" variant="text" sx={{ color: tone.accent }}>Dismiss</MuiButton>}
    </Box>
  );
}