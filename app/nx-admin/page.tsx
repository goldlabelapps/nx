import type { T_Theme, T_Tenant } from '../NX/types';
import { Metadata } from "next";
import {
    Container,
} from '@mui/material';
import {
    getTenant,
} from '../NX/lib';
import { getBaseurl } from '../api';
import {
    DesignSystem,
} from '../NX/DesignSystem';
import {
    NXAdmin,
} from '../NX/NXAdmin';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {

    const title = `NX Admin - ${params.slug}`;
    const description = `Admin page for ${params.slug}`;
    const image = 'https://live.staticflickr.com/65535/55065806556_6f6d91c14b_b.jpg';
    const siteName = 'NX';
    const url = `${getBaseurl()}/nx-admin/${params.slug}`;

    return {
        title: 'NX Admin',
        description: 'description',
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
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    };

    return (
        <DesignSystem theme={theme as T_Theme}>
            <Container>
                {/* <pre>config: {JSON.stringify(config, null, 2)}</pre> */}
                <NXAdmin>
                    <>
                        NXAdmin (login required)
                    </>
                </NXAdmin>
            </Container>
        </DesignSystem >
    );
}
