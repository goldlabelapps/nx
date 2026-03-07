import type { T_Theme, T_Tenant } from '../NX/types';
import { Metadata } from "next";
import { getTenant } from '../NX/lib';
import { getBaseurl } from '../api';
import {
    DesignSystem,
} from '../NX/DesignSystem';
import NXAdminAuthWrapper from './NXAdminAuthWrapper';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {

    const siteName = 'NX';
    const title = `NX Admin`;
    const description = `Data, Storage, Users`;
    const image = '/nx/gif/dark.gif';
    const url = `${getBaseurl()}/nx-admin`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName,
            images: [image],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            site: siteName,
        },
    }
}

export default async function Page(
    { params }
        : {
            params: Promise<{ slug: string }>,
        }) {

    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const designSystem = config?.cartridges?.designSystem;
    const defaultThemeModeRaw = designSystem?.defaultTheme;
    const defaultThemeMode: 'light' | 'dark' = defaultThemeModeRaw === 'light' || defaultThemeModeRaw === 'dark' ? defaultThemeModeRaw : 'light';
    const themes = designSystem?.themes;
    let theme = themes && defaultThemeMode in themes ?
        themes[defaultThemeMode] : undefined;
    if (theme) {
        theme = { ...theme, mode: defaultThemeMode };
    }
    return (
        // <DesignSystem config={config} theme={theme as T_Theme}>
        <NXAdminAuthWrapper config={config} />
        // </DesignSystem>
    );
}

