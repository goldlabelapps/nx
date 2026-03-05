import type { T_Theme, T_Tenant } from '../NX/types';
import { Metadata } from "next";
// import {
//     Container,
//     CardHeader,
// } from '@mui/material';
import {
    getTenant,
} from '../NX/lib';
import { getBaseurl } from '../api';
import {
    DesignSystem,
} from '../NX/DesignSystem';
import {
    SignIn,
} from '../NX/Paywall';
import {
    NXAdmin,
} from '../NX/NXAdmin';

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    const themeMode: 'light' | 'dark' = 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    };
    return (
        <DesignSystem theme={theme as T_Theme}>
            <NXAdmin />
        </DesignSystem >
    );
}

/*
<pre>icon: {JSON.stringify(icon, null, 2)}</pre>

const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
*/