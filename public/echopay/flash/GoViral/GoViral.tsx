"use client";
import * as React from 'react';
import { GoViralAS } from './';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';
import {
    Box,
    Dialog,
    CardHeader,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    MenuItem,
    ListItemIcon,
    ListItemText,
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
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const fullWidth = { display: 'block' };
    const [copied, setCopied] = React.useState(false);
    const title = "EchoPay";
    const description = "Do the maths";
    const isMobile = require('@mui/material/useMediaQuery').default('(max-width:899.95px)');

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
                fullScreen={isMobile}
                fullWidth={true}
                maxWidth="xs"
                onClose={handleClose}
                aria-labelledby="go-viral-dialog-title"
            >
                <DialogTitle id="go-viral-dialog-title">
                    Send it to: Enter name
                    email address or phone number
                </DialogTitle>
                <DialogContent>
                    {/* <pre>url: {JSON.stringify(url, null, 2)}</pre> */}

                    <MenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(url);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 1500);
                        }}
                    >
                        <ListItemIcon sx={{ mr: 1 }}>
                            <Icon icon="copy" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary={copied ? 'Copied!' : 'Copy Link'}
                        />
                    </MenuItem>


                    <MenuItem sx={{ p: 0 }}>
                        <TwitterShareButton title={title} url={url}>
                            <Box display="flex" alignItems="center" px={2} py={1}>
                                <ListItemIcon sx={{ mr: 1 }}>
                                    <Icon icon="twitter" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Twitter (X)" />
                            </Box>
                        </TwitterShareButton>
                    </MenuItem>


                    <MenuItem sx={{ p: 0 }}>
                        <FacebookShareButton url={url} style={fullWidth}>
                            <Box display="flex" alignItems="center" px={2} py={1}>
                                <ListItemIcon sx={{ mr: 1 }}>
                                    <Icon icon="facebook" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Facebook" />
                            </Box>
                        </FacebookShareButton>
                    </MenuItem>


                    <MenuItem sx={{ p: 0 }}>
                        <LinkedinShareButton
                            url={url}
                            title={title}
                            summary={description}
                            source="Goldlabel"
                            style={fullWidth}
                        >
                            <Box display="flex" alignItems="center" px={2} py={1}>
                                <ListItemIcon sx={{ mr: 1 }}>
                                    <Icon icon="linkedin" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="LinkedIn" />
                            </Box>
                        </LinkedinShareButton>
                    </MenuItem>

                    <MenuItem sx={{ p: 0 }}>
                        <WhatsappShareButton
                            url={url}
                            title={title}
                            separator=" - "
                            style={fullWidth}
                        >
                            <Box display="flex" alignItems="center" px={2} py={1}>
                                <ListItemIcon sx={{ mr: 1 }}>
                                    <Icon icon="whatsapp" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="WhatsApp" />
                            </Box>
                        </WhatsappShareButton>
                    </MenuItem>

                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        onClick={handleClose}
                        variant="contained"
                        endIcon={<Icon icon="close" />}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
