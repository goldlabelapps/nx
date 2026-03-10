"use client";
import * as React from 'react';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    Typography,
    Divider,
} from '@mui/material';
import { 
    Icon,
    useDesignSystem,
    setDesignSystem,
} from '../DesignSystem';
import {
    useNXAdmin,
    setNXAdmin,
    Dashboard,
    Collection,
    MiniListItem,
} from '../NXAdmin';
import nav from './nav.json';
import { useDispatch } from '../Uberedux';

const drawerWidth = 220;

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

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

export default function Layout({ config }: { config: any }) {
    const dispatch = useDispatch();

    const nxAdmin = useNXAdmin();
    const { active } = nxAdmin;
    const theme = useTheme();
    const activeNavItem = nav.find(item => item.collection === active);
    const [open, setOpen] = React.useState(true);
    const designSystem = useDesignSystem();
    const currentThemeMode = designSystem?.themeMode ?? 'light';

    const handleThemeModeToggle = () => {
        const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
        dispatch(setDesignSystem('themeMode', nextMode));
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                    <Typography sx={{m:1}} color='primary' variant="h6" component="h1">
                        {config.siteName} Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ border: 0, }}>
                <DrawerHeader sx={{ border: 0, }}>
                    {open && (
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <Icon icon="right" color="primary" /> : <Icon icon="left" color="primary" />}
                        </IconButton>
                    )}
                </DrawerHeader>
                <List>
                    {nav.map((item, i: number) => (
                        <ListItem
                            key={`item_${i}`}
                            disablePadding
                            sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => dispatch(setNXAdmin('active', item.collection))}
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
                                    <Icon icon={item.icon as any} color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    sx={[
                                        open ? { opacity: 1 } : { opacity: 0 },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{flexGrow: 1}} />
                <MiniListItem
                    open={open}
                    onClick={() => {
                        window.location.href = '/nx-admin';
                    }}
                    options={{
                        label: 'Reset',
                        icon: 'reset',
                    }}
                />

                <MiniListItem
                    open={open}
                    onClick={handleThemeModeToggle}
                    options={{
                        label: currentThemeMode === 'light' ? 'Dark mode' : 'Light mode',
                        icon: currentThemeMode === 'light' ? 'darkmode' : 'lightmode',
                    }}
                />

                <MiniListItem
                    open={open}
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    options={{
                        label: 'Back to site',
                        icon: 'left',
                    }}
                />

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/* <pre>active: {JSON.stringify(active, null, 2)}</pre> */}
                {!active && <Dashboard nav={nav} />}
                {active && activeNavItem && (
                    <Collection
                        collection={activeNavItem.collection}
                        title={activeNavItem.title}
                        description={activeNavItem.description}
                        icon={activeNavItem.icon}
                    />
                )}
            </Box>
        </Box>
    );
}
