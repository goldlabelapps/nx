'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
} from '@mui/material';
import { navigateTo } from '../../../../../DesignSystem';
import { useDispatch } from '@nx/uberedux';
import type { T_Post } from '../../types';

const statusColor: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
    draft: 'default',
    pending: 'warning',
    published: 'success',
    scheduled: 'info',
    trash: 'default',
};

export default function Panel({ post }: { post: T_Post }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = () => {
        dispatch(navigateTo(router, `/posts/${encodeURIComponent(post.id)}`));
    };

    return (
        <Card sx={{ mb: 1 }} variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="h6" noWrap>
                                {post.title || 'Untitled post'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {post.excerpt}
                            </Typography>
                        </Box>
                        <Chip
                            size="small"
                            label={post.status}
                            color={statusColor[post.status] ?? 'default'}
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
