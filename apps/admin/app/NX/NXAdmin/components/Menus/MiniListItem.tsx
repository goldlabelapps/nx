'use client';
import * as React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Icon } from '../../../../NX/DesignSystem';

export default function MiniListItem({ 
    open,
    options,
    onClick, 
}: { 
  open: boolean;
    onClick: (route?: string) => void;
  options: {
    label: string;
    icon: string;
    route?: string;
  }
}) {

    const {
        icon,
        label = 'Dashboard',
        route,
    } = options;

  return (
      <ListItem
          disablePadding
          sx={{ display: 'block' }}>
          <ListItemButton
              onClick={() => onClick(route)}
              sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
              ]}
          >
              <ListItemIcon
                  sx={[
                      { minWidth: 0, justifyContent: 'center' },
                      open ? { mr: 3 } : { mr: 'auto' },
                  ]}
              >
                  <Icon icon={icon as any} color="default" />
              </ListItemIcon>
              <ListItemText
                  primary={<Typography color="text.secondary">{label}</Typography>}
                  sx={[
                      open ? { opacity: 1 } : { opacity: 0 },
                  ]}
              />
          </ListItemButton>
      </ListItem>
  );
}
