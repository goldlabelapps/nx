"use client";
import * as React from 'react';
import { usePathname } from 'next/navigation';

const getPostIdFromPath = (pathname: string | null): string | null => {
    if (!pathname) return null;

    const [segment, id] = pathname.split('/').filter(Boolean);
    if (segment !== 'posts' || !id || id === 'new') {
        return null;
    }

    try {
        return decodeURIComponent(id);
    } catch {
        return id;
    }
};

export function usePost() {
    const pathname = usePathname();

    return React.useMemo(() => getPostIdFromPath(pathname), [pathname]);
}
