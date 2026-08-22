// Main component
import Posts from './Posts';

// Hooks
import { usePosts } from './hooks/usePosts';
import { usePost } from './hooks/usePost';
import { useDoc } from './hooks/useDoc';
import { useSubscription } from './hooks/useSubscription';

// Actions
import { initPosts } from './actions/initPosts';
import { setPosts } from './actions/setPosts';
import { createPost } from './actions/createPost';
import { updatePost } from './actions/updatePost';
import { trashPost } from './actions/trashPost';
import { deletePost } from './actions/deletePost';

// Types
export type { T_Post, T_PostStatus, T_PostRevision } from './types';

export {
    // Main component
    Posts,
    // Hooks
    usePosts,
    usePost,
    useDoc,
    useSubscription,
    // Actions
    initPosts,
    setPosts,
    createPost,
    updatePost,
    trashPost,
    deletePost,
};
