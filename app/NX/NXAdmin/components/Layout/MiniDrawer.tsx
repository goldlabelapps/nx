"use client";
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { getFirebaseAuth } from '../../../lib/firebase';
import {
    Box,
    Toolbar,
    IconButton,
    CardHeader,
    Avatar,
    Typography,
} from '@mui/material';
import { 
    Icon,
    useDesignSystem,
    setDesignSystem,
} from '../../../DesignSystem';
import {
    useNXAdmin,
    Dashboard,
    Collection,
    MiniListItem,
} from '../../../NXAdmin';
import nav from '../../nav.json';
import { useDispatch } from '../../../Uberedux';

const drawerWidth = 200;

export interface I_AppBar extends MuiAppBarProps {
    open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<I_AppBar>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open
            ? {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }
            : {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
    })
);

export default function MiniDrawer({ config }: { config: any }) {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const nxAdmin = useNXAdmin();
    const { active } = nxAdmin;
    const theme = useTheme();
    const themeMode = theme?.palette?.mode || 'light';
    const activeNavItem = nav.find(item => item.collection === active);
    const designSystem = useDesignSystem();
    const currentThemeMode = themeMode ?? designSystem?.themeMode ?? 'light';

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleThemeModeToggle = () => {
        const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
        dispatch(setDesignSystem('themeMode', nextMode));
    }

    const handleSignout = async () => {
        const auth = getFirebaseAuth();
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar 
                position="fixed" 
                open={open}
                sx={{
                    background: 0,
                    boxShadow: 0,
                }}
            >
                <Toolbar sx={{background: 0}}>
                    {!open && (
                        <IconButton
                            color="primary"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ marginRight: 3 }}
                        >
                            {theme.direction === 'rtl' ? <Icon icon="left" /> : <Icon icon="right" />}
                        </IconButton>
                    )}

                    <CardHeader 
                        sx={{width: '100%'}}
                        title={<Typography variant="h6" color="text.secondary">{config.siteName}</Typography>}
                        subheader={<Typography variant="body2" color="text.secondary">{config.description}</Typography>}
                        avatar={
                            <Avatar 
                                src={config.avatars?.[currentThemeMode] ?? config.avatars?.light} 
                                alt={config.siteName} />
                        }
                    />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ border: 0, }}>
                <DrawerHeader sx={{ border: 0 }}>
                    {open && (
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <Icon icon="right" color="primary" /> : <Icon icon="left" color="primary" />}
                        </IconButton>
                    )}
                </DrawerHeader>  
                <Box sx={{height: 25}}/>              
                {/* <MiniListItem
                    open={open}
                    onClick={handleThemeModeToggle}
                    options={{
                        label: currentThemeMode === 'light' ? 'Dark mode' : 'Light mode',
                        icon: currentThemeMode === 'light' ? 'darkmode' : 'lightmode',
                    }}
                />
                */}
                <MiniListItem
                    open={open}
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    options={{
                        label: 'Visit site',
                        icon: 'public',
                    }}
                />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
                <DrawerHeader />
                {!active && <Dashboard />}
                {active && activeNavItem && (
                    <Collection
                        collection={activeNavItem.collection ?? ""}
                        title={activeNavItem.title}
                        description={activeNavItem.description}
                        icon={activeNavItem.icon}
                        single={activeNavItem.single}
                    />
                )}
            </Box>
        </Box>
    );
}
