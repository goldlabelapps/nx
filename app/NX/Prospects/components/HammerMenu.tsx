'use client';
import * as React from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
} from '@mui/material';
// import { useDispatch } from '../../Uberedux';
// import { setProspects } from '../../Prospects';
import {Icon} from '../../DesignSystem';


export default function HammerMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                color="primary"
                onClick={handleClick}
            >
                <Icon icon='settings' />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon sx={{ mr: 1 }}>
                        <Icon color="primary" icon="flagoff" />
                    </ListItemIcon>
                    Reset all flags
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon sx={{mr:1}}>
                        <Icon color="primary" icon="hide" />
                    </ListItemIcon>
                    Unhide all hidden
                </MenuItem>
            </Menu>
        </Box>
    );
}
