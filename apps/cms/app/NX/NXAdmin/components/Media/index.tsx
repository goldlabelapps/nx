// Main component
import Media from './Media';

// Hooks
import { useMediaLibrary } from './hooks/useMediaLibrary';

// Actions
import { uploadMedia } from './actions/uploadMedia';
import { updateMedia } from './actions/updateMedia';
import { deleteMedia } from './actions/deleteMedia';

// Types
export type { T_MediaItem } from './types';

export {
    // Main component
    Media,
    // Hooks
    useMediaLibrary,
    // Actions
    uploadMedia,
    updateMedia,
    deleteMedia,
};
