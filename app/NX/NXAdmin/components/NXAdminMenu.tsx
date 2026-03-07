'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import { Icon } from '../../../NX/DesignSystem';

export default function NXAdminMenu() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const menuItems = [
    { label: 'Dashboard', slug: '/nx-admin/?command=DASHBOARD' },
    { label: 'Users', slug: '/nx-admin/?command=USERS' },
  ];

  const handleMenuClick = (slug: string) => {
    router.push(slug);
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
        <Icon icon="menu" />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map(item => (
              <ListItemButton key={item.slug} onClick={() => handleMenuClick(item.slug)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
