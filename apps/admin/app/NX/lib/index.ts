// Firebase utilities
import {
    getFirebaseApp,
    getFirebaseAuth,
    getFirebaseFirestore,
    getFirebaseStorage,
    getFirebaseMessaging,
} from './firebase';

// Tenant & metadata utilities
import { getTenant } from './getTenant';
import { getMeta } from './getMeta';

// Vanilla JS utilities
import { createSlug } from './vanilla-js/createSlug';
import { makeIdentity } from './vanilla-js/makeIdentity';
import { militaryTime } from './vanilla-js/militaryTime';

// Hooks
import { useFirebaseAuthListener } from '../Paywall/hooks/useFirebaseAuthListener';

export {
    // Firebase
    getFirebaseApp,
    getFirebaseAuth,
    getFirebaseFirestore,
    getFirebaseStorage,
    getFirebaseMessaging,
    // Tenant & metadata
    getTenant,
    getMeta,
    // Utilities
    createSlug,
    makeIdentity,
    militaryTime,
    // Hooks
    useFirebaseAuthListener,
};
