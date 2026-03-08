'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { Tooltip, Box, Typography, ButtonBase, Popover } from '@mui/material';
import { Icon } from '../../NX/DesignSystem';
import { Forward } from '../../NX/Virus';

export default function Virus({
  meta,
  frontmatter,
}: {
  meta?: T_Meta,
  frontmatter?: T_Frontmatter
}) {

  let title = meta?.title || '';
  let description = meta?.description || '';
  let image = '';
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = React.useState('');

  if (frontmatter) {
    title = frontmatter.title || title;
    description = frontmatter.description || description;
    image = frontmatter.image || '';
  } else if (meta) {
    image = meta.openGraph?.images?.[0] || '';
  }

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
      <Box id="virus">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          ml: 2,
        }}>
          <Box sx={{ mt: 0.25 }}>
            <Tooltip title={`Copy ${url}`} placement="top">
              <ButtonBase
                color={'primary'}
                onClick={e => {
                  navigator.clipboard.writeText(url);
                  setCopied(true);
                  setAnchorEl(e.currentTarget);
                  setTimeout(() => {
                    setCopied(false);
                    setAnchorEl(null);
                  }, 3500);
                }}
              >
                <Icon icon="copy" color="primary" />
              </ButtonBase>
            </Tooltip>
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
                <Typography variant="body1">
                  {url} copied to clipboard
                </Typography>
              </Box>
            </Popover>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Tooltip title="X/Twitter" placement="top">
              <TwitterShareButton url={url}>
                <Icon icon="twitter" color={'primary'} />
              </TwitterShareButton>
            </Tooltip>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Tooltip title="Facebook" placement="top">
              <FacebookShareButton url={url} >
                <Icon icon="facebook" color={'primary'} />
              </FacebookShareButton>
            </Tooltip>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Tooltip title="Share on LinkedIn" placement="top">
              <LinkedinShareButton
                url={url}
                summary={description}
              >
                <Icon icon="linkedin" color={'primary'} />
              </LinkedinShareButton>
            </Tooltip>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Tooltip title="Share on WhatsApp" placement="top">
              <WhatsappShareButton
                url={url}
                separator=" - "
              >
                <Icon icon="whatsapp" color={'primary'} />
              </WhatsappShareButton>
            </Tooltip>
          </Box>
          <Forward />
        </Box>
      </Box>
    </>
  );
}
