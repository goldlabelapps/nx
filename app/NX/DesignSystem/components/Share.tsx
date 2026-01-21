'use client';
import * as React from 'react';
import Image from "next/image";
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from 'react-share';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '../';

export type I_Share = {
    frontmatter?: any;
    metaImage?: string;
};

export default function Share({
    frontmatter = null,
    metaImage = '/nx/og.jpg',
}: I_Share) {

    const [copied, setCopied] = React.useState(false);
    const { title, description, icon } = frontmatter;
    const fullWidth = { display: 'block' };
    const url = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>

            <Box
                sx={{
                    width: '100%',
                    height: { xs: 150, sm: 250, md: 315 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: { xs: '0.25rem', md: '1rem' },
                    mb: { xs: '1rem', md: '1.5rem' },
                    borderRadius: '1rem',
                    overflow: 'hidden',
                }}
            >
                <Image
                    alt={`${title}, ${description}`}
                    src={metaImage}
                    width={1200}
                    height={315}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '1rem',
                        display: 'block',
                        maxHeight: '100%',
                    }}
                    priority
                />
            </Box>

            <MenuItem
                onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1500);
                }}
            >
                <ListItemIcon>
                    <Icon icon="copy" color="secondary" />
                </ListItemIcon>
                <ListItemText primary={copied ? 'Copied!' : 'Copy Link'} />
            </MenuItem>

            <MenuItem sx={{ p: 0 }}>
                <FacebookShareButton url={url} style={fullWidth}>
                    <Box display="flex" alignItems="center" px={2} py={1}>
                        <ListItemIcon>
                            <Icon icon="facebook" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Facebook" />
                    </Box>
                </FacebookShareButton>
            </MenuItem>

            <MenuItem sx={{ p: 0 }}>
                <TwitterShareButton title={title} url={url}>
                    <Box display="flex" alignItems="center" px={2} py={1}>
                        <ListItemIcon>
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
                        <ListItemIcon>
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
                        <ListItemIcon>
                            <Icon icon="whatsapp" color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="WhatsApp" />
                    </Box>
                </WhatsappShareButton>
            </MenuItem>
        </>
    );
}
