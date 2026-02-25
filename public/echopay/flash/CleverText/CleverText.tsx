"use client";
import * as React from 'react';
import {
    useTheme,
} from '@mui/material';

export default function CleverText(props: any) {
    const theme = useTheme();
    let color1 = theme.palette.primary.main;
    return (
        <>
            CleverText
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed augue id purus iaculis euismod. Suspendisse porttitor sapien et lorem gravida, eget pulvinar ante lobortis. Phasellus tempus commodo sapien eu interdum. Curabitur mattis maximus tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus semper nisl at nibh consequat, nec blandit diam tincidunt. Praesent et velit vitae magna condimentum dictum. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla laoreet, lorem et lobortis pulvinar, eros ipsum venenatis lacus, sed egestas elit leo vitae mi. Sed auctor magna eu cursus efficitur. Vivamus vulputate tristique nunc, at tempor justo vulputate vel.

        </>
    );
}
