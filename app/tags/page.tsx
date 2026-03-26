import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Link as MuiLink,
} from '@mui/material';
import { serverUseRelated } from '../NX/lib/serverHooks/serverUseRelated';

export const metadata: Metadata = {
    title: 'Tags',
};

export default function TagsPage() {
    const relatedPages = serverUseRelated();

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Tags
            </Typography>
            <List>
                {relatedPages.map((page) => (
                    <ListItem key={page.slug}>
                        <Link href={`/${page.slug}`} style={{ textDecoration: 'none' }}>
                            <MuiLink component="span" underline="hover">
                                <ListItemText primary={page.title} />
                            </MuiLink>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
