'use client';
import * as React from 'react';
import {
    Box,
    Button,
    List,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { setNXAdmin, useNXAdmin } from '../../../NXAdmin';
import { useDispatch } from '@nx/uberedux';
import { Icon, navigateTo } from '../../../DesignSystem';
import { useUID } from '../../../Paywall';
import { initPosts, createPost, usePost, useSubscription, useDoc } from '../Posts';
import { Panel, Editor } from './components/Post';

export default function Posts() {
    const dispatch = useDispatch();
    const router = useRouter();
    const uid = useUID();
    const nxAdmin = useNXAdmin();
    const didInit = React.useRef(false);
    const postId = usePost();
    const doc = useDoc();
    const { posts, loading } = useSubscription(100);

    React.useEffect(() => {
        if (!didInit.current) {
            if (!nxAdmin || !nxAdmin.posts) {
                dispatch(initPosts());
            }
            didInit.current = true;
        }
    }, [dispatch, nxAdmin]);

    React.useEffect(() => {
        dispatch(setNXAdmin('header', {
            title: 'Posts',
            icon: 'writing',
        }));
    }, [dispatch]);

    const handleNewPost = async () => {
        const post = await dispatch(createPost({ title: 'Untitled post', authorId: uid ?? '' }));
        if (post?.id) {
            dispatch(navigateTo(router, `/posts/${encodeURIComponent(post.id)}`));
        }
    };

    if (postId && doc) {
        return <Editor post={doc as any} />;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<Icon icon="plus" />} onClick={handleNewPost}>
                    New post
                </Button>
            </Box>

            {loading ? (
                <Typography variant="body2">Loading...</Typography>
            ) : posts.length === 0 ? (
                <Typography variant="body2">No posts found.</Typography>
            ) : (
                <List disablePadding>
                    {posts.map((post) => (
                        <Panel key={post.id} post={post} />
                    ))}
                </List>
            )}
        </Box>
    );
}
