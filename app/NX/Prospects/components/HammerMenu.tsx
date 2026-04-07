'use client';
import * as React from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
// import { useDispatch } from '../../Uberedux';
// import { setProspects } from '../../Prospects';
import {Icon} from '../../DesignSystem';


export default function HammerMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogAction, setDialogAction] = React.useState<'resetFlags' | 'unhideAll' | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (action: 'resetFlags' | 'unhideAll') => {
        setDialogAction(action);
        setDialogOpen(true);
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogAction(null);
    };

    const handleDialogConfirm = () => {
        // TODO: Perform the action here (reset flags or unhide all)
        setDialogOpen(false);
        setDialogAction(null);
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
                <MenuItem onClick={() => handleMenuItemClick('resetFlags')}>
                    <ListItemIcon sx={{ mr: 1 }}>
                        <Icon color="primary" icon="flagoff" />
                    </ListItemIcon>
                    Reset all flags
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('unhideAll')}>
                    <ListItemIcon sx={{mr:1}}>
                        <Icon color="primary" icon="hide" />
                    </ListItemIcon>
                    Unhide all hidden
                </MenuItem>
            </Menu>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogAction === 'resetFlags' && 'Are you sure you want to reset all flags? This action cannot be undone.'}
                        {dialogAction === 'unhideAll' && 'Are you sure you want to unhide all hidden items? This action cannot be undone.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="inherit">Cancel</Button>
                    <Button endIcon={<Icon icon="tick" />}
                     onClick={handleDialogConfirm} color="primary" variant="contained">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
