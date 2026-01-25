'use client';
import * as React from 'react';
import type { T_SmartImage } from '../../types';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';
import {
    Box,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Icon,
    SmartImage,
} from '../../DesignSystem';

export type I_Share = {
    frontmatter?: any;
    smartImage?: T_SmartImage;
};

export default function Share({
    frontmatter = null,
    smartImage,
}: I_Share) {

    const [copied, setCopied] = React.useState(false);
    const { title, description, icon } = frontmatter;
    const fullWidth = { display: 'block' };
    const url = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>

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
                    <Icon icon="copy" color="secondary" />
                </ListItemIcon>
                <ListItemText
                    primary={copied ? 'Copied!' : 'Copy Link'}
                    secondary={url}
                />
            </MenuItem>

            <MenuItem sx={{ p: 0 }}>
                <FacebookShareButton url={url} style={fullWidth}>
                    <Box display="flex" alignItems="center" px={2} py={1}>
                        <ListItemIcon sx={{ mr: 1 }}>
                            <Icon icon="facebook" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Facebook" />
                    </Box>
                </FacebookShareButton>
            </MenuItem>

            <MenuItem sx={{ p: 0 }}>
                <TwitterShareButton title={title} url={url}>
                    <Box display="flex" alignItems="center" px={2} py={1}>
                        <ListItemIcon sx={{ mr: 1 }}>
                            <Icon icon="twitter" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Twitter (X)" />
                    </Box>
                </TwitterShareButton>
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
                            <Icon icon="linkedin" color="secondary" />
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
                            <Icon icon="whatsapp" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="WhatsApp" />
                    </Box>
                </WhatsappShareButton>
            </MenuItem>
        </>
    );
}
