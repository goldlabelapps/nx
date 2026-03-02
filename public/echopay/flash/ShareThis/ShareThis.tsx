"use client";
import * as React from 'react';
import { ShareThisAS } from './';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Icon } from '../../../../app/NX/DesignSystem';

export default function ShareThis() {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const fullWidth = { display: 'block' };
    const [copied, setCopied] = React.useState(false);
    const title = "EchoPay";
    const description = "Do the maths";

    React.useEffect(() => {
        ActionScript.current = new ShareThisAS(clipRef);
        ActionScript.current.init();
    }, []);

    return (
        <Box ref={clipRef}>
            <Box sx={{ display: 'flex', }}>
                <Tooltip
                    title={copied ? `Copied! ${url}` : "Copy to clipboard"}
                    open={copied}
                    disableFocusListener
                    disableTouchListener
                    placement="top"
                >
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
                </Tooltip>

                <Box sx={{ ml: 1, mt: 0.75 }}>
                    <TwitterShareButton title={title} url={url}>
                        <Icon icon="twitter" color="primary" />
                    </TwitterShareButton>
                </Box>
                <Box sx={{ ml: 2, mt: 0.75 }}>
                    <FacebookShareButton url={url} style={fullWidth}>
                        <Icon icon="facebook" color="primary" />
                    </FacebookShareButton>
                </Box>
                <Box sx={{ ml: 2, mt: 0.75 }}>
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
                <Box sx={{ ml: 2, mt: 0.75 }}>
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
            {/* <pre>url: {JSON.stringify(url, null, 2)}</pre> */}
        </Box>
    );
}
