'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch } from '../../../../NX/Uberedux';
// import { setNXAdmin, setCRUD, useCRUD } from '../../../NXAdmin'
import { Icon } from '../../../../NX/DesignSystem';

export default function MiniListItem({ 
    open,
options 
}: { 
  open: boolean;
  options: {
    label: string;
    icon: string;
    route?: string;
  }
}) {

    const dispatch = useDispatch();
    const router = useRouter();
    const {
        icon,
        label = 'Dashboard',
        route = '/nx-admin',
    } = options;

  return (
      <ListItem
          disablePadding
          sx={{ display: 'block' }}>
          <ListItemButton
              onClick={() => {
                window.location.href = route;
              }}
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
                  <Icon icon={icon as any} color="primary" />
              </ListItemIcon>
              <ListItemText
                  primary={label}
                  sx={[
                      open ? { opacity: 1 } : { opacity: 0 },
                  ]}
              />
          </ListItemButton>
      </ListItem>
  );
}
