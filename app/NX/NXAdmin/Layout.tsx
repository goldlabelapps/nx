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
import { Icon } from '../DesignSystem';
import {
    useNXAdmin,
    setNXAdmin,
    Dashboard,
    NXAdminMenu,
} from '../NXAdmin';
import nav from './nav.json';
import { useDispatch } from '../Uberedux';

const drawerWidth = 320;

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
    // necessary for content to be below app bar
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    // React.useEffect(() => {
    //     if (!nxAdmin?.active) {
    //         dispatch(setNXAdmin('active', 'users'));
    //     }
    // }, [dispatch, nxAdmin]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <Icon icon="dashboard" />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {config.siteName} NX
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <Icon icon="right" /> : <Icon icon="left" />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
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
                <NXAdminMenu />

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Dashboard nav={nav} />
                { }
                {/* <pre>nxAdmin: {JSON.stringify(nxAdmin, null, 2)}</pre> */}
            </Box>
        </Box>
    );
}
