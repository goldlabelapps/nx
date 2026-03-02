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
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { makeMDResponse } from '../../';
import { defaultCompany } from '../NewCompany/NewCompany';

const slugify = (text: string) => {
    return text
        .toString()
        .normalize('NFKD')
        .replace(/[\u0300-\u036F]/g, '') // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

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
    const slug = slugify(flash?.name ?? defaultCompany.name);
    const company = {
        biz: flash?.biz ?? defaultCompany.biz,
        atv: flash?.atv ?? defaultCompany.atv,
        cto: flash?.cto ?? defaultCompany.cto,
        name: flash?.name ?? defaultCompany.name,
        slug,
        markdown: makeMDResponse({
            name: flash?.name ?? defaultCompany.name,
            biz: flash?.biz ?? defaultCompany.biz,
            cto: flash?.cto ?? defaultCompany.cto,
            atv: flash?.atv ?? defaultCompany.atv,
        }),
        url: `/share/${slug}`
    };

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

                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex' }}>

                        <IconButton
                            onClick={() => {
                                navigator.clipboard.writeText(url);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 1500);
                            }}
                        >
                            <Icon icon="copy" color="primary" />
                        </IconButton>

                        <Box sx={{ ml: 0, mt: 1 }}>
                            <TwitterShareButton title={title} url={url}>
                                <Icon icon="twitter" color="primary" />
                            </TwitterShareButton>
                        </Box>
                        <Box sx={{ ml: 1, mt: 1 }}>
                            <FacebookShareButton url={url} style={fullWidth}>
                                <Icon icon="facebook" color="primary" />
                            </FacebookShareButton>
                        </Box>
                        <Box sx={{ ml: 1, mt: 1 }}>
                            <LinkedinShareButton
                                url={url}
                                title={title}
                                summary={description}
                                source="Goldlabel"
                                style={fullWidth}
                            >
                                <Icon icon="linkedin" color="primary" />
                            </LinkedinShareButton>
                        </Box>
                        <Box sx={{ ml: 1, mt: 1 }}>
                            <WhatsappShareButton
                                url={url}
                                title={title}
                                separator=" - "
                                style={fullWidth}
                            >
                                <Icon icon="whatsapp" color="primary" />
                            </WhatsappShareButton>
                        </Box>


                    </Box>
                    <pre>company: {JSON.stringify(company, null, 2)}</pre>
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
