'use client';
import type { T_Config } from '../types'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  AppBar,
  Toolbar,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { NXAdminMenu, CRUD, useNXAdmin, setNXAdmin } from '../NXAdmin'
import { useDispatch } from '../Uberedux'
import { getFirebaseFirestore } from '../lib/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export interface I_NXAdmin {
  children?: React.ReactNode;
  config: T_Config;
};

export default function NXAdmin({
  // children,
  config,
}: I_NXAdmin) {

  const router = useRouter();
  const t = useTheme();
  const data = useNXAdmin();
  const dispatch = useDispatch();



  // React.useEffect(() => {
  //   dispatch(setNXAdmin('initted', true));

  //   // Subscribe to all collections in Firestore
  //   const db = getFirebaseFirestore();
  //   let unsubscribers: (() => void)[] = [];

  //   // Helper to fetch all collection names
  //   async function subscribeToCollections() {
  //     // List collections (Firestore does not support listing collections client-side directly)
  //     // You must know the collection names or fetch them from config or backend
  //     const collectionsToSubscribe = [
  //       'users', // Example collection
  //       'posts', // Example collection
  //       // Add more collection names as needed
  //     ];

  //     collectionsToSubscribe.forEach((colName) => {
  //       const colRef = collection(db, colName);
  //       const unsubscribe = onSnapshot(colRef, (snapshot) => {
  //         const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //         dispatch(setNXAdmin(colName, docs));
  //       });
  //       unsubscribers.push(unsubscribe);
  //     });
  //   }

  //   subscribeToCollections();

  //   return () => {
  //     unsubscribers.forEach(unsub => unsub());
  //   };
  // }, [dispatch]);

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  const { icons, cartridges } = config;
  const theme = cartridges?.designSystem?.defaultTheme === 'dark' ? 'dark' : 'light';
  const avatarSrc = icons && (icons as Record<'light' | 'dark', { icon: string; favicon: string }>)[theme]?.icon || '/nx/svg/favicon.svg';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          boxShadow: 0,
          background: t.palette.background.default,
        }}>
        <Container maxWidth="xl">
          <CardHeader
            avatar={<a href='/'>
              <IconButton
                onClick={handleAvatarClick}
                edge="start"
                color="inherit"
                aria-label={config.siteName}>
                <Avatar
                  alt={`${config.siteName}. ${config.description}`}
                  src={avatarSrc}
                />
              </IconButton>
            </a>}
            action={null}
            title={<Typography
              color='secondary'
              variant="h6"
              component="h1"
            >
              {config.siteName}
            </Typography>}
          />
        </Container>
      </AppBar>

      <Container id="main" maxWidth="xl" sx={{ mt: '100px', pb: '90px' }}>

        {/* {children && children} */}
        <CRUD />
        <pre>data: {JSON.stringify(data, null, 2)}</pre>
      </Container>

      <AppBar
        position="fixed"
        sx={{
          background: t.palette.background.default,
          boxShadow: 0, top: 'auto', bottom: 0
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <NXAdminMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}
