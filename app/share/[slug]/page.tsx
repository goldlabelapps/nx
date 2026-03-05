import type { T_Theme, T_Tenant, T_Meta, I_NestedNav } from '../../NX/types';
import { notFound } from 'next/navigation';
import { Metadata } from "next";
import {
    Box,
    Container,
    Card,
    CardHeader,
    CardContent,
} from '@mui/material';
import {
    getTenant,
} from '../../NX/lib';
import {
    getMeta,
    serverUseNav,
} from '../../NX/lib';
import { getBaseurl } from '../../api';
import {
    DesignSystem,
    Footer,
} from '../../NX/DesignSystem';
import {
    NXAdminBtn,
} from '../../NX/NXAdmin';

import { mergeData } from './mergeData';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { slug } = await params;
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const meta = getMeta({});
    return mergeData(meta, data.data);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const { severity } = data?.meta || {};
    if (severity !== 'success') {
        notFound();
    }
    const meta = getMeta({});
    const mergedMeta = mergeData(meta, data.data);
    const {
        title,
        description,
        tenant,
        body,
    } = data.data || {};
    const {
        markdown,
        // text,
    } = body || {};

    const { config } = getTenant(tenant as T_Tenant);
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    };
    const navItems = await serverUseNav(data.slug || "/");

    return (
        <DesignSystem theme={theme as T_Theme}>

            <Container>
                <pre>data.data: {JSON.stringify(data.data, null, 2)}</pre>
                <Card sx={{ mt: 2 }}>
                    <CardHeader
                        title={title}
                        subheader={description}
                        action={<Box sx={{ m: 1 }}><NXAdminBtn /></Box>}
                    />
                    <CardContent>
                        {markdown}
                    </CardContent>
                </Card>

            </Container>
            <footer>
                <Footer
                    meta={mergedMeta as T_Meta}
                    frontmatter={data}
                    navItems={navItems as I_NestedNav["navItems"]}
                />
            </footer>
        </DesignSystem >
    );
}
