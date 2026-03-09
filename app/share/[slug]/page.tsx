import type { T_Theme, T_Tenant, T_Meta, I_NestedNav } from '../../NX/types';
import { notFound } from 'next/navigation';
import { Metadata } from "next";
import { getTenant, getMeta, serverUseNav } from '../../NX/lib';
import { getBaseurl } from '../../api';
import { mergeData } from './mergeData';
import ShareClient from './ShareClient';

// ...existing code...

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = typeof params?.then === 'function' ? await params : params;
    const slug = (resolvedParams as { slug: string }).slug;
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const { severity } = data?.meta || {};
    if (severity !== 'success') {
        notFound();
    }
    const meta = getMeta({});
    const mergedMeta = mergeData(meta, data.data);
    const { tenant } = data.data || {};
    const { config } = getTenant(tenant as T_Tenant);
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    }
    const navItems = await serverUseNav(data.slug || "/");

    return (
        <ShareClient
            theme={theme as T_Theme}
            mergedMeta={mergedMeta as T_Meta}
            data={data.data}
            navItems={navItems as I_NestedNav["navItems"]}
        />
    );
}
