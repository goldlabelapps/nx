'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  IconButton,
  Button,
  List,
  ListItem,
  Popover,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useNXAdmin } from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_TypeScript {
  typescript?: any;
};

export default function TypeScript({
  typescript,
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
      <Button 
        variant="contained"
        startIcon={<Icon icon="js" />}
        onClick={handleClick}>
        {typeName}
      </Button>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { p: 1 } }}
      >
        <Card elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
          <CardHeader 
            title={typeName || 'TypeScript'} 
            subheader={`Collection: `}
          />
            {typescript ? (
              (() => {
                const entries = Object.entries(typescript)
                  .filter(([key]) => !['typeName', 'id', 'typescript'].includes(key));
                const ordered = entries
                  .filter(([_, value]) => typeof value === 'object' && value !== null && typeof (value as any).order === 'number')
                  .sort((a, b) => ((a[1] as any).order - (b[1] as any).order));
                const alphabetical = entries
                  .filter(([_, value]) => !(typeof value === 'object' && value !== null && typeof (value as any).order === 'number'))
                  .sort((a, b) => a[0].localeCompare(b[0]));
                return [...ordered, ...alphabetical].map(([key, value]) => (
                  <ListItem key={key} alignItems="flex-start" sx={{ py: 1, display: 'block' }}>
                    
                    {typeof value === 'object' && value !== null ? (
                      <Box sx={{ pl: 2 }}>
                        {(value as any).label && (
                          <Box sx={{display: 'flex'}}>
                            
                            {(value as any).required && <Box sx={{ mr: 2 }}><Icon icon="required" /></Box>}
                            
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                              {(value as any).label} (<strong>{key}</strong>)
                            
                          </Typography>
                          </Box>
                        )}


                        {(value as any).description && <Typography variant="body2" color="text.secondary">{(value as any).description}</Typography>}

                        {/* {(value as any).default && <Typography variant="caption">
                          {(value as any).default}
                        </Typography>} */}

                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ pl: 2 }}>{String(value)}</Typography>
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
