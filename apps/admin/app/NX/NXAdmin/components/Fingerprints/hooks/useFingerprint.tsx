"use client";
import * as React from 'react';
import { usePathname } from 'next/navigation';

const getFingerprintIdFromPathname = (pathname: string | null): string | null => {
    if (!pathname) return null;

    const [segment, id] = pathname.split('/').filter(Boolean);
    if (segment !== 'fingerprints' || !id || id === 'new') return null;

    try {
        return decodeURIComponent(id);
    } catch {
        return id;
    }
};

export function useFingerprint() {
    const pathname = usePathname();

    return React.useMemo(
        () => getFingerprintIdFromPathname(pathname),
        [pathname],
    );
}