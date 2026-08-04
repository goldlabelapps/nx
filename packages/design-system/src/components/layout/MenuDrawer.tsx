'use client';

import { useId, useState } from 'react';
import { Box, Drawer } from '@mui/material';
import IconButton from '../buttons/IconButton';
import Heading from '../headings/Heading';
import Icon from '../icons/Icon';
import type { MenuDrawerProps } from '../../types';

export default function MenuDrawer({ navItems, actions, toggleAriaLabel = 'Toggle navigation menu' }: MenuDrawerProps) {
  const [open, setOpen] = useState(false);
  const navId = useId();

  const handleToggle = () => {
    setOpen((current) => !current);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton
        icon={<Icon icon="expand" color="secondary" />}
        ariaLabel={toggleAriaLabel}
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? navId : undefined}
      />
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: 'min(90vw, 360px)', sm: 360 },
            p: 2,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#161616' : '#F2F2F2'),
          },
        }}
      >
        
        {actions ? (
          <Box sx={{ 
            mt: 0, 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            gap: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
              {actions}
            </Box>
            <IconButton
              icon={<Icon icon="close" color="secondary" />}
              ariaLabel="Close navigation menu"
              onClick={handleClose}
            />
          </Box>
        ) : null}

        <Heading sx={{ mt: 3, mb: 3 }}>
          Navigation
        </Heading>

        <nav id={navId} aria-label="Primary navigation">
          {navItems}
        </nav>

      </Drawer>
    </Box>
  );
}