'use client';
import * as React from 'react';
import { T_Meta, T_Frontmatter } from '../types.d';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share';
import { Tooltip, Box, Typography, ButtonBase, Popover, Dialog} from '@mui/material';
import { Icon } from '../../NX/DesignSystem';

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
  const [open, setOpen] = React.useState(false);

  if (frontmatter) {
    title = frontmatter.title || title;
    description = frontmatter.description || description;
    image = frontmatter.image || '';
  } else if (meta) {
    image = meta.openGraph?.images?.[0] || '';
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (frontmatter) {
        setUrl(window.location.protocol + '//' + window.location.hostname + (frontmatter.slug || '/'));
      } else if (meta?.openGraph?.url) {
        setUrl(meta.openGraph.url);
      } else {
        setUrl(window.location.href);
      }
    }
  }, [frontmatter, meta]);

  return (
    <>
      <ButtonBase onClick={() => setOpen(true)} sx={{ }}>
        <Icon icon="share" color="primary" />
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
          <Typography variant="body1">
            {url} copied to clipboard
          </Typography>
        </Box>
      </Popover>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>

        <Box id="virus" sx={{ p: 1 }}>

          <Box sx={{  }}>
            <pre>title: {JSON.stringify(title, null, 2)}</pre>
            <pre>description: {JSON.stringify(description, null, 2)}</pre>
            <pre>image: {JSON.stringify(image, null, 2)}</pre>

            <Box sx={{ display: 'flex' }}>
              
              <Box sx={{m:1, mr: 2}}>
                <ButtonBase
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
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      ml: 1,
                     }}
                  >
                    Copy link
                    </Typography>
                </ButtonBase>
              </Box>
              
            </Box>

            <Box sx={{ m: 1 }}>
              <Tooltip title="X/Twitter" placement="top">
                <TwitterShareButton url={url}>
                  <Icon icon="twitter" color={'primary'} />
                </TwitterShareButton>
              </Tooltip>
            
              <Tooltip title="Facebook" placement="top">
                <FacebookShareButton url={url} >
                  <Icon icon="facebook" color={'primary'} />
                </FacebookShareButton>
              </Tooltip>
              <Tooltip title="Share on LinkedIn" placement="top">
                <LinkedinShareButton
                  url={url}
                  summary={description}
                >
                  <Icon icon="linkedin" color={'primary'} />
                </LinkedinShareButton>
              </Tooltip>
              <Tooltip title="Share on WhatsApp" placement="top">
                <WhatsappShareButton
                  url={url}
                  separator=" - "
                >
                  <Icon icon="whatsapp" color={'primary'} />
                </WhatsappShareButton>
              </Tooltip>
            </Box>
            
          </Box>
          
        </Box>
      </Dialog>
    </>
  );
}
