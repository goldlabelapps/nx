'use client';
import * as React from 'react';
import { T_Meta } from '../types.d';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { Box, Typography, ButtonBase, Popover } from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

export default function Virus({ meta }: { meta: T_Meta }) {

  const { title, openGraph } = meta || {};
  const url = openGraph?.url || window.location.href;
  const description = openGraph?.description || meta.description || '';
  const [copied, setCopied] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <Box id="virus" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      mt: 4
    }}>
      <Box>
        <ButtonBase
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
      <Box>
        <TwitterShareButton title={title} url={url}>
          <Icon icon="twitter" />
        </TwitterShareButton>
      </Box>
      <Box>
        <FacebookShareButton url={url} >
          <Icon icon="facebook" />
        </FacebookShareButton>
      </Box>
      <Box>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={description}
          source="NX"
        >
          <Icon icon="linkedin" />
        </LinkedinShareButton>
      </Box>
      <Box>
        <WhatsappShareButton
          url={url}
          title={title}
          separator=" - "
        >
          <Icon icon="whatsapp" />
        </WhatsappShareButton>
      </Box>

    </Box>
  );
}
