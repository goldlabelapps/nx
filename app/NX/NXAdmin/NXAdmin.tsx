'use client';
import type { T_Config, T_Theme } from '../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  NXAdminMenu,
  setNXAdmin,
  Share,
  Collection,
} from '../NXAdmin';
import { DesignSystem, Feedback, setFeedback, useDesignSystem, setDesignSystem } from '../DesignSystem';
import { useDispatch } from '../Uberedux';
import { getFirebaseFirestore } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { query, where, doc, getDoc } from 'firebase/firestore';

export interface I_NXAdmin {
  children?: React.ReactNode;
  config: T_Config;
};

export default function NXAdmin({
  config,
}: I_NXAdmin) {

  const tenant = process.env.NEXT_PUBLIC_TENANT || 'nx';
  const dispatch = useDispatch();
  const router = useRouter();
  const designSystem = useDesignSystem();
  const configThemes = config?.cartridges?.designSystem?.themes || {};
  const configDefaultTheme = config?.cartridges?.designSystem?.defaultTheme || 'light';
  const themeMode = designSystem?.themeMode || configDefaultTheme;
  const themeObj = (designSystem?.themes && designSystem?.themes[themeMode])
    || configThemes[themeMode]
    || configThemes[configDefaultTheme];
  const { icons, cartridges } = config;
  const theme = cartridges?.designSystem?.defaultTheme === 'dark' ? 'dark' : 'light';
  const avatarSrc = icons && (icons as Record<'light' | 'dark', { icon: string; favicon: string }>)[theme]?.icon || '/nx/svg/favicon.svg';

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push('/');
  }

  React.useEffect(() => {
    if (!designSystem?.themeMode && configDefaultTheme) {
      dispatch(setDesignSystem("themeMode", configDefaultTheme));
    }
  }, [dispatch, designSystem?.themeMode, configDefaultTheme]);

  React.useEffect(() => {
    dispatch(setFeedback({
      severity: 'success',
      title: 'Welcome to NX Admin'
    }))
    dispatch(setNXAdmin('CRUDMode', 'read'));
    // List collections 
    // (Firestore does not support listing collections client-side directly)
    // You must know the collection names or fetch them from config or backend
    const collectionsToSubscribe = [
      'share',
    ];

    // Subscribe to all collections in Firestore
    const db = getFirebaseFirestore();
    let unsubscribers: (() => void)[] = [];

    // Helper to fetch all collection names
    async function subscribeToCollections() {
      collectionsToSubscribe.forEach((colName) => {
        const colRef = collection(db, colName);
        const q = query(colRef, where('tenant', '==', tenant));
        const unsubscribe = onSnapshot(q, async (snapshot: import('firebase/firestore').QuerySnapshot) => {
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const typescriptDocSnap = await getDoc(doc(colRef, 'typescript'));
          let typescript = undefined;
          if (typescriptDocSnap.exists()) {
            typescript = typescriptDocSnap.data();
          }
          dispatch(setNXAdmin(colName, { typescript, docs }));
        });
        unsubscribers.push(unsubscribe);
      });
    }

    subscribeToCollections();

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [dispatch]);


  return (
    <>
      <DesignSystem config={config} theme={themeObj}>
        <Feedback />
        <AppBar
          position="fixed"
          sx={{
            top: 0,
            boxShadow: 0,
            background: themeObj.background,
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
          <Collection 
            collection="notify"
            label="Notifications"
            icon="notify"
          />
        </Container>

        <AppBar
          position="fixed"
          sx={{
            background: themeObj.background,
            boxShadow: 0, top: 'auto', bottom: 0
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <NXAdminMenu />
          </Toolbar>
        </AppBar>
      </DesignSystem>
    </>
  );
}
