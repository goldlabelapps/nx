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
import {
    Build,
} from '@mui/icons-material'
// import { useDispatch } from '../../Uberedux';
// import { setProspects } from '../../Prospects';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { factoryReset } from '../actions/factoryReset';


export default function HammerMenu() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Dialog state
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogAction, setDialogAction] = React.useState<'factoryReset' | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (action: 'factoryReset') => {
        setDialogAction(action);
        setDialogOpen(true);
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogAction(null);
    };

    const handleDialogConfirm = () => {
        if (dialogAction === 'factoryReset') {
            // You may want to pass a real id and flag value here
            dispatch(factoryReset(0, true, 'Factory Reset complete'));
        }
        setDialogOpen(false);
        setDialogAction(null);
    };

    return (
        <Box>
            <IconButton
                size="small"
                color="primary"
                onClick={handleClick}
            >
                <Icon color="primary" icon="settings" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem 
                    sx={{minWidth: 200}}
                    onClick={() => handleMenuItemClick('factoryReset')}>
                    <ListItemIcon sx={{ mr: 1 }}>
                        <Icon color="primary" icon="reset" />
                    </ListItemIcon>
                    Factory Reset
                </MenuItem>
            </Menu>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}>
                <DialogTitle>
                    Factory Reset
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This fetches PATCH /prospects/factory-reset, resetting all prospects to their default state. Irreversible. Are you sure you want to do it?
                    </DialogContentText>
                    <DialogContentText color="info">
                        此操作会获取 PATCH /prospects/factory-reset 文件，将所有潜在客户重置为默认状态。此操作不可逆。您确定要执行此操作吗？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        endIcon={<Icon icon="cancel" />} 
                        onClick={handleDialogClose}>
                        No
                    </Button>
                    <Button endIcon={<Icon icon="tick" />}
                        onClick={handleDialogConfirm} color="primary" variant="contained">
                            Yes
                        </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
