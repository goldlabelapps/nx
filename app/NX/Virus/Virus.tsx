'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { Box, Typography, ButtonBase, Popover } from '@mui/material';
import { Icon } from '../../NX/DesignSystem';
import { Forward } from '../../NX/Virus';

export default function Virus({
  meta,
  frontmatter,
}: {
  meta?: T_Meta,
  frontmatter?: T_Frontmatter
}) {

  // Prefer frontmatter if provided, else fallback to meta
  let title = meta?.title || '';
  let description = meta?.description || '';
  let image = '';
  // url state
  const [url, setUrl] = React.useState('');
  if (frontmatter) {
    title = frontmatter.title || title;
    description = frontmatter.description || description;
    image = frontmatter.image || '';
  } else if (meta) {
    image = meta.openGraph?.images?.[0] || '';
  }
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    if (frontmatter && typeof window !== 'undefined') {
      setUrl(window.location.hostname + (frontmatter.slug || '/'));
    } else if (meta?.openGraph?.url) {
      setUrl(meta.openGraph.url);
    } else if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [frontmatter, meta]);

  return (
    <>
      <Box id="virus" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 1
      }}>

        <Box sx={{ mt: 0.25 }}>
          <ButtonBase
            color={'primary'}
            onClick={e => {
              navigator.clipboard.writeText(url);
              setCopied(true);
              setAnchorEl(e.currentTarget);
              setTimeout(() => {
                setCopied(false);
                setAnchorEl(null);
              }, 1500);
            }}
          >
            <Icon icon="copy" />
          </ButtonBase>
          <Popover
            open={copied}
            anchorEl={anchorEl}
            onClose={() => {
              setCopied(false);
              setAnchorEl(null);
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            disableRestoreFocus
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body2">
                Copied {url} to clipboard
              </Typography>
            </Box>
          </Popover>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TwitterShareButton title={title} url={url}>
            <Icon icon="twitter" color={'primary'} />
          </TwitterShareButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <FacebookShareButton url={url} >
            <Icon icon="facebook" color={'primary'} />
          </FacebookShareButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <LinkedinShareButton
            url={url}
            title={title}
            summary={description}
            source="NX"
          >
            <Icon icon="linkedin" color={'primary'} />
          </LinkedinShareButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <WhatsappShareButton
            url={url}
            title={title}
            separator=" - "
          >
            <Icon icon="whatsapp" color={'primary'} />
          </WhatsappShareButton>
        </Box>
        <Box>
          <Forward />
        </Box>
      </Box>
    </>
  );
}
