"use client";
import * as React from 'react';
import { 
    usePathname, 
    // useRouter,
} from 'next/navigation';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import type { I_AppBar } from '../../types';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {
    Box,
    Toolbar,
    IconButton,
} from '@mui/material';
import { 
    Icon,
} from '../../../DesignSystem';
import {
    useNXAdmin,
    setNXAdmin,
    pwaAlert,
    useNotifications,
    Header,
    AdminNav,
} from '../../../NXAdmin';
import PageRouter from '../PageRouter';
import { useDispatch } from '../../../Uberedux';

const drawerWidth = 220;
const NAV_ROUTES = new Set([
    'prospects', 
    'fingerprints',
    'tenants',
]);

const FALLBACK_ADMIN_BASE_PATH = '/';

const sanitizePath = (value: string) => {
    if (!value) return '/';
    const normalized = value.startsWith('/') ? value : `/${value}`;
    return normalized.replace(/\/+$/, '') || '/';
};

const getActiveFromPathname = (pathname: string) => {
    const normalized = sanitizePath(pathname);
    if (normalized === '/') return null;
    const [segment] = normalized.slice(1).split('/');
    if (!segment) return null;
    try {
        const decoded = decodeURIComponent(segment);
        return NAV_ROUTES.has(decoded) ? decoded : null;
    } catch {
        return NAV_ROUTES.has(segment) ? segment : null;
    }
};

const buildAdminPath = (route?: string) => {
    if (!route) return '/';
    const slug = route.replace(/^\/+/, '');
    return `/${slug}`;
};

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

export default function DesktopLayout({ config }: { config: any }) {

    const dispatch = useDispatch();
    // const router = useRouter();
    const pathname = usePathname() || FALLBACK_ADMIN_BASE_PATH;
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(isMdUp);
    const nxAdmin = useNXAdmin();
    const { active } = nxAdmin;

    React.useEffect(() => {
        setOpen(isMdUp);
    }, [isMdUp]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const activeFromPath = getActiveFromPathname(pathname);
        const nextActive = activeFromPath || null;
        if (active !== nextActive) {
            dispatch(setNXAdmin('active', nextActive));
        }
    }, [active, dispatch, pathname]);

    React.useEffect(() => {
        dispatch(pwaAlert());
    }, [dispatch]);

    useNotifications();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar 
                position="fixed" 
                open={open}
                color='default'
                variant='outlined'
                sx={{
                    background: 0,
                    boxShadow: 0,
                    border: 0,
                }}>
                <Toolbar sx={{background: 0}}>
                    {!open && (
                        <IconButton
                            color="primary"
                            aria-label="Toggle descriptions"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ marginRight: 3 }}
                        >
                            {theme.direction === 'rtl' ? 
                            <Icon icon="left" /> : <Icon icon="right" />}
                        </IconButton>
                    )}
                    <Header />
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} sx={{ border: 0, }}>
                <DrawerHeader sx={{ border: 0 }}>
                    {open && (
                        <IconButton color="primary" onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <Icon icon="right" /> : <Icon icon="left" />}
                        </IconButton>
                    )}
                </DrawerHeader>  
                <AdminNav />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
                <DrawerHeader />
                <PageRouter active={active} />
            </Box>
        </Box>
    );
}
