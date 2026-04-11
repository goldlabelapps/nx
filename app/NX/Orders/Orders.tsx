'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Alert,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { 
  init, 
  useState,
  Order,
} from '../../NX/Orders';
import { useDispatch } from '../../NX/Uberedux';
import {
  Icon,
} from '../DesignSystem';

export default function Orders() {

  const dispatch = useDispatch(); 
  const state = useState();
  const {
    error,
    initted,
    pagination,
    search,
    results,
  } = state || {};

  React.useEffect(() => {
    if (!initted) {
          dispatch(init());
      }
  }, [initted, dispatch]);

  if (!initted) return null

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Alert severity="info" sx={{ my: 2 }}
          action={
            <Button
              startIcon={<Icon icon="reset" />}
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }
  
  return (<>
      <Box>
        {pagination && (
          <Typography variant="subtitle1" sx={{ mb: 2 }} align="center">
            {(() => {
              const { page, limit, total } = pagination;
              if (!page || !limit || !total) return null;
              const start = (page - 1) * limit + 1;
              const end = Math.min(page * limit, total);
              return `Showing ${start}-${end} of ${total} results`;
            })()}
          </Typography>
        )}

        {search && search.searchStr && (
          <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
            {search.searchStr}
          </Typography>
        )}

        {results && results.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            No results found.
          </Typography>
        )}

        {results && results.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {results.map((order: any, idx: number) => (
              <Grid size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }} key={`order_${idx}`}>
                <Order data={order} />
              </Grid>
            ))}
          </Grid>
        )}
        
      </Box>
    </>
  );
}

