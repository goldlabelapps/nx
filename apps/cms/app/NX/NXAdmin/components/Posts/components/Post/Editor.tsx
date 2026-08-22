'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { Icon, navigateTo } from '../../../../../DesignSystem';
import { createSlug } from '../../../../../lib/vanilla-js/createSlug';
import { useDispatch } from '@nx/uberedux';
import { useUID } from '../../../../../Paywall';
import { updatePost } from '../../actions/updatePost';
import { trashPost } from '../../actions/trashPost';
import { deletePost } from '../../actions/deletePost';
import { uploadMedia } from '../../../Media';
import { useTerms } from '../../../Taxonomy';
import type { T_Post, T_PostStatus } from '../../types';

const STATUSES: T_PostStatus[] = ['draft', 'pending', 'published', 'scheduled', 'trash'];

export default function Editor({ post }: { post: T_Post }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const uid = useUID();
    const { terms: categories } = useTerms<{ id: string; name: string }>('categories');
    const { terms: tags } = useTerms<{ id: string; name: string }>('tags');

    const [title, setTitle] = React.useState(post.title || '');
    const [slug, setSlug] = React.useState(post.slug || '');
    const [excerpt, setExcerpt] = React.useState(post.excerpt || '');
    const [body, setBody] = React.useState(post.body || '');

    const handleBack = () => dispatch(navigateTo(router, '/posts'));

    const commit = (changes: Record<string, any>) => dispatch(updatePost(post.id, changes));

    const handleTitleBlur = () => {
        if (title !== post.title) commit({ title });
    };

    const handleSlugBlur = () => {
        const nextSlug = createSlug(slug);
        setSlug(nextSlug);
        if (nextSlug !== post.slug) commit({ slug: nextSlug });
    };

    const handleExcerptBlur = () => {
        if (excerpt !== post.excerpt) commit({ excerpt });
    };

    const handleBodyBlur = () => {
        if (body !== post.body) commit({ body });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        commit({ status: e.target.value as T_PostStatus });
    };

    const handleCategoriesChange = (_: unknown, value: { id: string; name: string }[]) => {
        commit({ categoryIds: value.map((v) => v.id) });
    };

    const handleTagsChange = (_: unknown, value: { id: string; name: string }[]) => {
        commit({ tagIds: value.map((v) => v.id) });
    };

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const media = await dispatch(uploadMedia({ file, uploadedBy: uid ?? '', postId: post.id, alt: title }));
        if (media) commit({ featuredImage: media });
        e.target.value = '';
    };

    const handleTrash = () => dispatch(trashPost(post.id));
    const handleDelete = async () => {
        const ok = await dispatch(deletePost(post.id));
        if (ok) handleBack();
    };

    const selectedCategories = categories.filter((c) => (post.categoryIds ?? []).includes(c.id));
    const selectedTags = tags.filter((t) => (post.tagIds ?? []).includes(t.id));

    return (
        <Box>
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardHeader
                    avatar={
                        <IconButton onClick={handleBack}>
                            <Icon icon="left" />
                        </IconButton>
                    }
                    title={
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            variant="standard"
                            fullWidth
                            placeholder="Post title"
                            slotProps={{ input: { style: { fontSize: 28, fontWeight: 700 } } }}
                        />
                    }
                    subheader={
                        <TextField
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            onBlur={handleSlugBlur}
                            variant="standard"
                            size="small"
                            placeholder="post-slug"
                            InputProps={{ startAdornment: <Typography variant="caption" sx={{ mr: 0.5 }}>/posts/</Typography> }}
                        />
                    }
                    action={
                        <TextField
                            select
                            size="small"
                            value={post.status}
                            onChange={handleStatusChange}
                            sx={{ minWidth: 140 }}
                        >
                            {STATUSES.map((s) => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </TextField>
                    }
                />
                <CardContent>
                    <TextField
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value.slice(0, 280))}
                        onBlur={handleExcerptBlur}
                        label="Excerpt"
                        helperText={`${excerpt.length}/280`}
                        fullWidth
                        multiline
                        minRows={2}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onBlur={handleBodyBlur}
                        label="Body (markdown & html)"
                        fullWidth
                        multiline
                        minRows={12}
                        sx={{ mb: 3, fontFamily: 'monospace' }}
                    />

                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
                        <Autocomplete
                            multiple
                            options={categories}
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(a, b) => a.id === b.id}
                            value={selectedCategories}
                            onChange={handleCategoriesChange}
                            sx={{ minWidth: 260, flex: 1 }}
                            renderInput={(params) => <TextField {...params} label="Categories" />}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                                ))
                            }
                        />
                        <Autocomplete
                            multiple
                            options={tags}
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(a, b) => a.id === b.id}
                            value={selectedTags}
                            onChange={handleTagsChange}
                            sx={{ minWidth: 260, flex: 1 }}
                            renderInput={(params) => <TextField {...params} label="Tags" />}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip label={option.name} {...getTagProps({ index })} key={option.id} />
                                ))
                            }
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Featured image</Typography>
                        {post.featuredImage?.url && (
                            <Box
                                component="img"
                                src={post.featuredImage.url}
                                alt={post.featuredImage.alt || title}
                                sx={{ maxWidth: 320, borderRadius: 1, mb: 1, display: 'block' }}
                            />
                        )}
                        <Button component="label" variant="outlined" startIcon={<Icon icon="upload" />}>
                            {post.featuredImage ? 'Replace image' : 'Upload image'}
                            <input type="file" accept="image/*" hidden onChange={handleFeaturedImageUpload} />
                        </Button>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                        Created {post.createdAt} · Updated {post.updatedAt}
                        {post.publishedAt ? ` · Published ${post.publishedAt}` : ''}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {post.status !== 'trash' ? (
                            <Button color="error" variant="outlined" onClick={handleTrash}>
                                Move to trash
                            </Button>
                        ) : (
                            <Button color="error" variant="contained" onClick={handleDelete}>
                                Delete permanently
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
