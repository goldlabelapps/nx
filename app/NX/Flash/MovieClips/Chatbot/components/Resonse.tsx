"use client";
import React from 'react';
import { Box } from '@mui/material';
import { RenderMarkdown } from '../../../../Shortcodes';

const Resonse = () => {


    return (
        <Box
            sx={{
                // border: '1px solid white',
                display: 'flex',
                alignItems: 'flex-start',
                mb: 1,
            }}
        >
            <RenderMarkdown>
                Vivamus vehicula, turpis non sodales mattis, erat sem dignissim purus, vel pretium libero dui sed tortor. Sed molestie massa in tellus mollis ultricies. Morbi vestibulum dictum lobortis. Etiam suscipit rhoncus quam, quis eleifend metus commodo in. Ut et vulputate diam, et imperdiet lectus. Vestibulum tincidunt nisi vitae ex rhoncus, sit amet gravida nisl ornare. Phasellus vehicula convallis sem, sit amet maximus lectus fermentum in.
            </RenderMarkdown>
        </Box>
    );
};

export default Resonse;
