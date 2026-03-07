'use client';
// import type { T_Config } from '../../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Popover,
  ListItemText,
} from '@mui/material';
import { Icon, setFeedback } from '../../../DesignSystem';
import { useNXAdmin, setNXAdmin } from '../../../NXAdmin'
import { useDispatch } from '../../../Uberedux'

export interface I_TypeScript {
  // children?: React.ReactNode;
  // config: T_Config;
};

export default function TypeScript({
  // children,
  // config,
}: I_TypeScript) {

  const nxAdmin = useNXAdmin();
  const dispatch = useDispatch();
  const { typescript } = nxAdmin?.share || {};
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="js" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { p: 2, } }}
      >
        <Card elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
          <CardHeader title="TypeScript Reference" />
          <List dense>
            {typescript && Object.entries(typescript).map(([key, value]) => (
              <ListItem key={key} alignItems="flex-start" sx={{ py: 0.5, display: 'block' }}>
                <ListItemText
                  primary={<strong>{key}</strong>}
                  secondary={typeof value === 'object' ? null : String(value)}
                />
                {typeof value === 'object' && (
                  <>{JSON.stringify(value, null, 2)}</>
                )}
              </ListItem>
            ))}
            {!typescript && <ListItem><ListItemText primary="No TypeScript info available" /></ListItem>}
          </List>
        </Card>
      </Popover>
    </>
  );
}



/* <pre>typescript: {JSON.stringify(typescript, null, 2)}</pre> */
