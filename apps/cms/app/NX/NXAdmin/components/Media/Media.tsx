'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { setNXAdmin } from '../../../NXAdmin';
import { useDispatch } from '@nx/uberedux';
import { Icon } from '../../../DesignSystem';
import { useUID } from '../../../Paywall';
import { useMediaLibrary } from './hooks/useMediaLibrary';
import { uploadMedia } from './actions/uploadMedia';
import { updateMedia } from './actions/updateMedia';
import { deleteMedia } from './actions/deleteMedia';

export default function Media() {
    const dispatch = useDispatch();
    const uid = useUID();
    const { media, loading } = useMediaLibrary(100);

    React.useEffect(() => {
        dispatch(setNXAdmin('header', {
            title: 'Media°',
            icon: 'media',
        }));
    }, [dispatch]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await dispatch(uploadMedia({ file, uploadedBy: uid ?? '' }));
        e.target.value = '';
    };

    const handleAltBlur = (id: string, value: string, previous: string) => {
        if (value !== previous) dispatch(updateMedia(id, { alt: value }));
    };

    const handleDelete = (id: string, storagePath: string) => {
        dispatch(deleteMedia(id, storagePath));
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button component="label" variant="contained" startIcon={<Icon icon="upload" />}>
                    Upload media
                    <input type="file" accept="image/*" hidden onChange={handleUpload} />
                </Button>
            </Box>

            {loading ? (
                <Typography variant="body2">Loading...</Typography>
            ) : media.length === 0 ? (
                <Typography variant="body2">No media found.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {media.map((item) => (
                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    image={item.url}
                                    alt={item.alt}
                                    sx={{ height: 160, objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <TextField
                                        defaultValue={item.alt}
                                        onBlur={(e) => handleAltBlur(item.id, e.target.value, item.alt)}
                                        label="Alt text"
                                        size="small"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography variant="caption" color="text.secondary" display="block" noWrap>
                                        {item.fileName} · {(item.size / 1024).toFixed(0)} KB
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(item.id, item.storagePath)}
                                            aria-label="Delete"
                                        >
                                            <Icon icon="delete" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
