"use client";
import * as React from 'react';
import { usePathname } from 'next/navigation';

type T_ProspectsRouteInfo = {
    prospectId: string | null;
    tagSlug: string | null;
};

const getProspectsRouteInfo = (pathname: string | null): T_ProspectsRouteInfo => {
    if (!pathname) {
        return { prospectId: null, tagSlug: null };
    }

    const [segment, id, maybeSlug] = pathname.split('/').filter(Boolean);
    if (segment !== 'prospects' || !id || id === 'new') {
        return { prospectId: null, tagSlug: null };
    }

    if (id === 'tag') {
        if (!maybeSlug) {
            return { prospectId: null, tagSlug: null };
        }

        try {
            return { prospectId: null, tagSlug: decodeURIComponent(maybeSlug) };
        } catch {
            return { prospectId: null, tagSlug: maybeSlug };
        }
    }

    try {
        return { prospectId: decodeURIComponent(id), tagSlug: null };
    } catch {
        return { prospectId: id, tagSlug: null };
    }
};

export function useProspect() {
    const pathname = usePathname();

    return React.useMemo(
        () => getProspectsRouteInfo(pathname).prospectId,
        [pathname],
    );
}

export function useProspectTagSlug() {
    const pathname = usePathname();

    return React.useMemo(
        () => getProspectsRouteInfo(pathname).tagSlug,
        [pathname],
    );
}
