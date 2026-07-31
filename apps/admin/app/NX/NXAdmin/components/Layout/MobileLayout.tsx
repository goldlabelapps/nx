"use client";
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import {
    Box,
    Fab,
    useMediaQuery,
} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { grey } from '@mui/material/colors';
import { useDispatch } from '../../../Uberedux';
import { Icon } from '../../../DesignSystem';
import {
    AdminNav,
    Header,
    pwaAlert,
    setNXAdmin,
    useNotifications,
    useNXAdmin,
} from '../../../NXAdmin';    
import PageRouter from '../PageRouter';

const drawerBleeding = 25;
const NAV_ROUTES = new Set([
    'accounts',
    'account',
    'tenants',
    'prospects',
    'fingerprints',
    'avatars',
    'queue',
    'virus',
]);
const FALLBACK_ADMIN_BASE_PATH = '/';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    config?: any;
}

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

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: grey[100],
    ...theme.applyStyles('dark', {
        backgroundColor: (theme.vars || theme).palette.background.default,
    }),
}));

interface SwipeableEdgeDrawerProps {
    children: React.ReactNode;
    container?: () => HTMLElement;
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    swipeAreaWidth: number;
    disableSwipeToOpen: boolean;
    keepMounted?: boolean;
    drawerBleeding: number;
    showPuller?: boolean;
    headerContent?: React.ReactNode;
}

function SwipeableEdgeDrawer(props: SwipeableEdgeDrawerProps) {
    const {
        children,
        container,
        open,
        onClose,
        onOpen,
        swipeAreaWidth,
        disableSwipeToOpen,
        keepMounted = true,
        drawerBleeding,
        showPuller = true,
        headerContent,
    } = props;

    return (
        <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            swipeAreaWidth={swipeAreaWidth}
            disableSwipeToOpen={disableSwipeToOpen}
            ModalProps={{ keepMounted }}
            PaperProps={{
                sx: {
                    // height: `calc(50% + ${drawerBleeding}px)`,
                    overflow: 'visible',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -drawerBleeding,
                    right: 0,
                    left: 0,
                    visibility: 'visible',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                {showPuller && (
                    <Box
                        sx={{
                            width: 30,
                            height: 6,
                            bgcolor: (theme) =>
                                theme.palette.mode === 'light' ? grey[300] : grey[700],
                            borderRadius: 3,
                        }}
                    />
                )}
                {headerContent}
            </Box>
            <Box sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>{children}</Box>
        </SwipeableDrawer>
    );
}

export default function MobileLayout(props: Props) {
    const { window } = props;
    const dispatch = useDispatch();
    const pathname = usePathname() || FALLBACK_ADMIN_BASE_PATH;
    const nxAdmin = useNXAdmin();
    const { active } = nxAdmin;
    const [open, setOpen] = React.useState(false);
    const isSwipeableDevice = useMediaQuery('(pointer: coarse)');

    const openDrawer = React.useCallback(() => setOpen(true), []);
    const closeDrawer = React.useCallback(() => setOpen(false), []);
    const toggleDrawer = React.useCallback(() => setOpen((prev) => !prev), []);

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleMenuClick = () => {
        toggleDrawer();
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
        <Root>
            <Box sx={{ minHeight: '100vh', pb: 8 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Header />
                </Box>
                <Box component="main" sx={{ p: 2 }}>
                    <PageRouter active={active} />
                </Box>
            </Box>
            {!isSwipeableDevice && (
                <Box
                    sx={{
                        position: 'fixed',
                        right: 16,
                        bottom: 16,
                        zIndex: (theme) => theme.zIndex.modal + 1,
                    }}
                >
                    <Fab
                        color={'primary'}
                        aria-label={open ? 'Close NX Admin navigation' : 'Open NX Admin navigation'}
                        onClick={handleMenuClick}
                        sx={{
                            boxShadow: 0,
                        }}
                    >
                        <Icon icon={open ? 'close' : 'star'} />
                    </Fab>
                </Box>
            )}

            {isSwipeableDevice && !open && (
                <Box
                    sx={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        backgroundColor: 'background.default',
                        borderTop: 1,
                        borderColor: 'divider',
                        zIndex: (theme) => theme.zIndex.modal + 1,
                        pointerEvents: 'none',
                    }}
                >
                    <Icon icon="expand" color="primary" />
                    <Box sx={{ color: 'text.secondary', fontSize: 12 }}>Swipe up for menu</Box>
                </Box>
            )}

            <SwipeableEdgeDrawer
                container={container}
                open={open}
                onClose={closeDrawer}
                onOpen={openDrawer}
                swipeAreaWidth={isSwipeableDevice ? drawerBleeding : 0}
                disableSwipeToOpen={!isSwipeableDevice}
                keepMounted
                drawerBleeding={drawerBleeding}
                showPuller={false}
                headerContent={isSwipeableDevice ? <Icon icon="expand" color="primary" /> : null}
            >
                <Box sx={{ overflow: 'auto' }}>
                    <Box sx={{ 
                        // my: 4, mb: '70px' 
                    }}>
                        <AdminNav onNavigate={closeDrawer} />
                    </Box>
                </Box>
            </SwipeableEdgeDrawer>
        </Root>
    );
}
