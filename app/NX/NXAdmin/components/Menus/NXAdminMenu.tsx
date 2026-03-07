'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch } from '../../../Uberedux';
import { Icon, setDesignSystem, useDesignSystem } from '../../../DesignSystem';
import { firebaseLogout } from '../../../Paywall';

export default function NXAdminMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const designSystem = useDesignSystem();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const currentThemeMode = designSystem?.themeMode ?? 'light';

  const handleThemeModeToggle = () => {
    const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
    dispatch(setDesignSystem('themeMode', nextMode));
  }

  const handleLogout = async () => {
    await firebaseLogout();
  };

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
        <Box
          sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 1 }}
          role="presentation"
        >

          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ mb: 2 }}>
              <List dense>
                <ListItemButton
                  id="signout-btn"
                  onClick={handleLogout}
                >
                  <ListItemIcon>
                    <Icon icon="signout" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign Out"
                  />
                </ListItemButton>

                <ListItemButton
                  id="theme-toggle-btn"
                  onClick={handleThemeModeToggle}
                >
                  <ListItemIcon>
                    <Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={currentThemeMode === 'light' ? 'Dark' : 'Light'}
                  />
                </ListItemButton>

                <ListItemButton
                  id="home-btn"
                  onClick={() => { handleMenuClick('/') }}
                >
                  <ListItemText
                    primary="View site"
                  />
                  <ListItemIcon>
                    <Icon icon="right" color="primary" />
                  </ListItemIcon>
                </ListItemButton>

              </List>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
