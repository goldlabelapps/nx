'use client';
import * as React from 'react';
import {useRouter} from 'next/navigation';
import {
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { useDispatch } from '../../../Uberedux';
import { Icon, setDesignSystem, navigateTo } from '../../../DesignSystem';
import { logout, UserSpot, AccountCard } from '../../../Paywall';
import { MiniListItem } from '../../../NXAdmin';

export default function NXAdminMenu() {

  const router = useRouter();
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = React.useState(false);
  const currentThemeMode = useTheme().palette.mode;
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleThemeModeToggle = () => {
    const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
    dispatch(setDesignSystem('themeMode', nextMode));
    handleMenuClose();
  }

  const handleLogout = () => {
    handleMenuClose();
    setConfirmLogoutOpen(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setConfirmLogoutOpen(false);
  };

  const handleHome = () => {
    dispatch(navigateTo(router, '/'));
    setConfirmLogoutOpen(false);
  };

  const handleCancelLogout = () => {
    setConfirmLogoutOpen(false);
  };


  return (
    <>
      <UserSpot onClick={handleMenuOpen} />
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box sx={{  }}>
          <AccountCard />
        </Box>
        <MiniListItem
          open
          onClick={handleThemeModeToggle}
          options={{
            label: currentThemeMode === 'light' ? 'Dark' : 'Light',
            icon: currentThemeMode === 'light' ? 'darkmode' : 'lightmode',
          }}
        />
        <MiniListItem
          open
          onClick={handleLogout}
          options={{
            label: 'Sign out',
            icon: 'signout',
          }}
        />
      </Menu>

      <Dialog
        maxWidth="xs"
        fullWidth
        open={confirmLogoutOpen}
        onClose={handleCancelLogout}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="signout" color="primary" />
            <span>Sure you want to logout?</span>
          </Box>
        </DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={handleCancelLogout}>No</Button>
          <Button 
            variant="contained"
            onClick={handleConfirmLogout} 
            color="primary"
            endIcon={<Icon icon="tick" />}  
          >Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
