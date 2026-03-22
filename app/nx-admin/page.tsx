import type { T_Tenant } from '../NX/types';
import { Metadata } from "next";
import { getTenant } from '../NX/lib';
import { getBaseurl } from '../api';
import NXAdminAuthWrapper from './NXAdminAuthWrapper';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {

    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const siteName = config.siteName || 'NX';
    const title = `${siteName} Admin`;
    const description = `Admin dashboard for ${siteName}`;
    const designSystem = config?.cartridges?.designSystem;
    const defaultThemeModeRaw = designSystem?.defaultTheme;
    const defaultThemeMode: 'light' | 'dark' = defaultThemeModeRaw === 'light' 
        || defaultThemeModeRaw === 'dark' ? defaultThemeModeRaw : 'light';
    const imagesObj: { light?: string; dark?: string } | undefined = config.images;
    const imageRaw = imagesObj && defaultThemeMode in imagesObj ? imagesObj[defaultThemeMode] : imagesObj?.light;
    let image: string = imageRaw || config.siteName;
    // If you have a data.image from frontmatter, use it if non-empty string (not available here, but for consistency)
    // image = (typeof data?.image === 'string' && data.image.trim()) ? data.image : imageRaw;
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
    const defaultThemeMode: 'light' | 'dark' = defaultThemeModeRaw === 'light' 
        || defaultThemeModeRaw === 'dark' ? defaultThemeModeRaw : 'light';
    const themes = designSystem?.themes;
    let theme = themes && defaultThemeMode in themes ?
        themes[defaultThemeMode] : undefined;
    if (theme) {
        theme = { ...theme, mode: defaultThemeMode };
    }

    return <NXAdminAuthWrapper config={config} />;
}

