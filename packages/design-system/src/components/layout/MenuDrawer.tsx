'use client';

import { useId, useState } from 'react';
import { Box, Drawer } from '@mui/material';
import IconButton from '../buttons/IconButton';
import Icon from '../icons/Icon';
import type { MenuDrawerProps } from '../../types';

export default function MenuDrawer({ navItems, toggleAriaLabel = 'Toggle navigation menu' }: MenuDrawerProps) {
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
          },
        }}
      >
        <nav id={navId} aria-label="Primary navigation">
          {navItems}
        </nav>
      </Drawer>
    </Box>
  );
}