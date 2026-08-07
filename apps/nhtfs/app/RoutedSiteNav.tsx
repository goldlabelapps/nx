'use client';

import { SiteNav, type T_NavNode } from '@nx/design-system';
import { useRouter } from 'next/navigation';

type RoutedSiteNavProps = {
  items: T_NavNode[];
};

export default function RoutedSiteNav({ items }: RoutedSiteNavProps) {
  const router = useRouter();

  function handleNavigate(route: string) {
    if (!route || route === '#') {
      return;
    }

    router.push(route);
  }

  return <SiteNav items={items} navigateTo={handleNavigate} />;
}
