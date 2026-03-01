"use client";
import * as React from 'react';
import { GoViralAS } from './';
import {
    Box,
    Dialog,
    CardHeader,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    CardContent,
    CardActions,
} from '@mui/material';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useDispatch } from '../../../../app/NX/Uberedux';

export default function GoViral() {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const flash = useFlash();
    const dispatch = useDispatch();
    const { goViralOpen } = flash;

    React.useEffect(() => {
        ActionScript.current = new GoViralAS(clipRef);
        ActionScript.current.init();
    }, []);

    const handleClose = () => {
        dispatch(setFlash("goViralOpen", false));
    }

    return (
        <Box ref={clipRef}>
            <Dialog
                open={goViralOpen}
                fullScreen
                onClose={handleClose}
            >
                <DialogTitle>
                    <CardHeader
                        avatar={<Icon icon="share" />}
                        title={<Typography variant="h6">
                            Share
                        </Typography>}
                    />
                </DialogTitle>
                <DialogContent>
                    <pre>goViralOpen: {JSON.stringify(goViralOpen, null, 2)}</pre>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        startIcon={<Icon icon="close" />}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
