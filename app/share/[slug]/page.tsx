import type { T_Theme, T_Tenant } from '../../NX/types';
import { notFound } from 'next/navigation';
import { Metadata } from "next";
import {
    Box,
    Button,
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import {
    getTenant,
} from '../../NX/lib';
import {
    getMeta,
} from '../../NX/lib';
import { getBaseurl } from '../../api';
import {
    Virus,
} from '../../NX/Virus';
import {
    DesignSystem,
} from '../../NX/DesignSystem';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {

    const { slug } = await params;
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const meta = getMeta({});
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [
            key,
            data.data && key in data.data ? data.data[key] : value
        ])
    );
    if (data.data && data.data.title) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                title: data.data.title
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                title: data.data.title
            };
        }
    }
    if (data.data && data.data.description) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                description: data.data.description
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                description: data.data.description
            };
        }
    }
    if (data.data && data.data.siteName) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                siteName: data.data.siteName
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                site: data.data.siteName
            };
        }
    }
    if (data.data && data.data.url) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                url: data.data.url
            };
        }
    }
    return mergedMeta;
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
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [key, key in data.data ? data.data[key] : value])
    );
    if (data.data.title) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                title: data.data.title
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                title: data.data.title
            };
        }
    }
    if (data.data.description) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                description: data.data.description
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                description: data.data.description
            };
        }
    }
    if (data.data.siteName) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                siteName: data.data.siteName
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                site: data.data.siteName
            };
        }
    }
    if (data.data.url) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                url: data.data.url
            };
        }
    }

    const {
        title,
        description,
        tenant,
    } = data.data || {};

    const { config } = getTenant(tenant as T_Tenant);
    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    const themes = config?.cartridges?.designSystem?.themes;
    let theme = themes && themeMode in themes ? themes[themeMode as keyof typeof themes] : undefined;
    if (theme) {
        theme = { ...theme, mode: themeMode };
    };

    return (
        <DesignSystem theme={theme as T_Theme}>
            {/* <pre>theme: {JSON.stringify(theme, null, 2)}</pre> */}
            <Container>
                <Card>
                    <CardHeader
                        title={title}
                        subheader={description}
                    />
                    <CardContent>

                    </CardContent>
                    <CardActions>
                        <Virus meta={mergedMeta} />
                        <Box sx={{ flexGrow: 1 }} />

                    </CardActions>
                </Card>

            </Container>
        </DesignSystem >
    );
}
