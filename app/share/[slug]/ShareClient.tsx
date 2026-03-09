"use client";
import type { T_Theme, T_Meta, I_NestedNav } from '../../NX/types';
import {
    Box,
    Container,
    Card,
    CardHeader,
    CardContent,
} from '@mui/material';
import { DesignSystem, Footer } from '../../NX/DesignSystem';
import { NXAdminBtn } from '../../NX/NXAdmin';

interface ShareClientProps {
    theme: T_Theme | undefined;
    mergedMeta: T_Meta;
    data: any;
    navItems: I_NestedNav["navItems"];
}

export default function ShareClient({ theme, mergedMeta, data, navItems }: ShareClientProps) {
    const {
        title,
        description,
        body,
    } = data || {};
    const { markdown } = body || {};
    return (
        <DesignSystem theme={theme}>
            <Container>
                <pre>data.data: {JSON.stringify(data, null, 2)}</pre>
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
                    meta={mergedMeta}
                    frontmatter={data}
                    navItems={navItems}
                />
            </footer>
        </DesignSystem>
    );
}
