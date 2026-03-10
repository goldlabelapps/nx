'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  IconButton,
  Button,
  ListItem,
  Popover,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
// import { useNXAdmin } from '../../../NXAdmin'
// import { useDispatch } from '../../../Uberedux'

export interface I_TypeScript {
  typescript?: any;
  btnMode?: 'icon' | 'button';
  collection?: string;
  cardSubheader?: string;
};

export default function TypeScript({
  typescript,
  btnMode = 'icon',
  collection,
  cardSubheader,
}: I_TypeScript) {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const typeName = typescript?.typeName;
  return (
    <>

    {btnMode === 'button' && <>
        <Button
          variant="contained"
          endIcon={<Icon icon="js" />}
          onClick={handleClick}>
          {typeName}
        </Button>
    </>}

      {btnMode === 'icon' && <>
        <IconButton
          onClick={handleClick}>
          <Icon icon="js" />
        </IconButton>
      </>}
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { p: 1 } }}
      >
        <Card elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
          <CardHeader 
            title={`TypeScript ${typeName || 'TypeScript'}`} 
            subheader={cardSubheader}
            action={<IconButton onClick={handleClose}>
              <Icon icon="close" />
            </IconButton>}
          />
            {typescript ? (
              (() => {
                const entries = Object.entries(typescript)
                  .filter(([key]) => !['typeName', 'id', 'typescript', 'tenant'].includes(key));
                const ordered = entries
                  .filter(([_, value]) => typeof value === 'object' && value !== null && typeof (value as any).order === 'number')
                  .sort((a, b) => ((a[1] as any).order - (b[1] as any).order));
                const alphabetical = entries
                  .filter(([_, value]) => !(typeof value === 'object' && value !== null && typeof (value as any).order === 'number'))
                  .sort((a, b) => a[0].localeCompare(b[0]));
                return [...ordered, ...alphabetical].map(([key, value]) => (
                  <ListItem key={key} alignItems="flex-start" sx={{ py: 1, display: 'block' }}>
                    
                    {typeof value === 'object' && value !== null ? (
                      <Box sx={{ pl: 0 }}>
                        {(value as any).label && (
                          <Box sx={{display: 'flex'}}>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                              {(value as any).label}
                          </Typography>
                            {(value as any).required && <Box sx={{ ml: 1 }}>
                              <Icon icon="required" color="primary" />
                            </Box>}
                          </Box>
                        )}
                        {(value as any).description && <Typography variant="body2" color="text.secondary">
                          <strong>{key}</strong>: 
                          {(value as any).description}
                          </Typography>}
                      </Box>
                    ) : (
                      <Typography variant="body2">
                        {String(value)}
                      </Typography>
                    )}
                  </ListItem>
                ));
              })()
            ) : (
              <ListItem><ListItemText primary="No TypeScript info available" /></ListItem>
            )}
        </Card>
      </Popover>
    </>
  );
}



/* <pre>typescript: {JSON.stringify(typescript, null, 2)}</pre> */
