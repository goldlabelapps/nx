'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
} from '@mui/material';
import { MiniListItem } from '../../../NXAdmin';

export default function AdminNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {

  const router = useRouter();
  const pathname = usePathname();

  const buildAdminPath = (route?: string) => {
    if (!route) return '/';
    const slug = route.replace(/^\/+/, '');
    return `/${slug}`;
  };

  const navigateToRoute = React.useCallback((route?: string) => {
      const nextPath = buildAdminPath(route);
      if (pathname !== nextPath) {
          router.push(nextPath);
      }
      onNavigate?.();
  }, [onNavigate, pathname, router]);


  const open = true;

  return (<>
    
        <Box sx={{ height: 24 }} />

        <MiniListItem
            open={open}
            onClick={navigateToRoute}
            options={{
              label: 'Dashboard',
              icon: 'dashboard',
              route: '/',
            }}
        /> 

        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Tenants',
            icon: 'tenant',
            route: '/tenants',
          }}
        />

        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Fingerprints',
            icon: 'fingerprint',
            route: '/fingerprints',
          }}
        />
        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Prospects',
            icon: 'prospects',
            route: '/prospects',
          }}
        />

        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Posts',
            icon: 'writing',
            route: '/posts',
          }}
        />

        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Media',
            icon: 'media',
            route: '/media',
          }}
        />

        <MiniListItem
          open={open}
          onClick={navigateToRoute}
          options={{
            label: 'Categories & Tags',
            icon: 'category',
            route: '/taxonomy',
          }}
        />

        

        <Box sx={{ height: 50 }} />
    </>
  );
}
