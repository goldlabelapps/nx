// swapCartridge.tsx
// Extracted cartridge swapping logic from [[...slug]]/page.tsx

import { Container, Box, Typography } from '@mui/material';
import { OrdersFrontend } from '../NX/Orders';
import { RenderMarkdown } from '../NX/Shortcodes';

export function SwapCartridge({ data, content, config, title }: any) {
    if (data.cartridge === 'orders-frontend') {
        return (
            <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <OrdersFrontend config={config} />
                </Box>
            </Container>
        );
    } else {
        return (
            <Container id="main" maxWidth="lg" sx={{ mt: '100px', pb: '90px' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                        {data.title || title} (Custom Layout)
                    </Typography>
                    <Box>
                        <RenderMarkdown config={config}>
                            {content}
                        </RenderMarkdown>
                    </Box>
                </Box>
            </Container>
        );
    }
}
