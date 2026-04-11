'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Alert,
} from '@mui/material';
import { init, useState } from '../../NX/Orders';
import { useDispatch } from '../../NX/Uberedux';

export default function Orders() {

  const state = useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
      if (!state) {
          dispatch(init());
      }
  }, [state, dispatch]);

  return (<>
      <Box>
        <Alert severity="warning">
          Orders
        </Alert>
        <pre>state: {JSON.stringify(state, null, 2)}</pre>
      </Box>
    </>
  );
}

