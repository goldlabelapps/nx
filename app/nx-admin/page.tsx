import React from 'react';
import { Container, Typography } from '@mui/material';

export default function NXAdminHome() {
    return (
        <Container maxWidth="md" style={{ marginTop: 40 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                NX Admin
            </Typography>
            <Typography variant="body1">
                Welcome to the NX Admin dashboard. Select a section from the menu or enter a slug in the URL.
            </Typography>
        </Container>
    );
}
