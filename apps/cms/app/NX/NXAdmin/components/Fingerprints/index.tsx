// Main components
import Fingerprints from './Fingerprints';
import Surface from './components/Surface';
import { Device } from './components/Fingerprint';
import AvaFlag from './components/AvaFlag';

// Hooks
import { useFingerprints } from './hooks/useFingerprints';
import { useDoc } from './hooks/useDoc';
import { useFingerprint } from './hooks/useFingerprint';
import { useSubscription } from './hooks/useSubscription';

// Actions
import { initFingerprints } from './actions/initFingerprints';
import { trashFingerprint } from './actions/trashFingerprint';
import { updateFingerprint } from './actions/updateFingerprint';
import { setFingerprints } from './actions/setFingerprints';

// Utils
import { identityCharacters, randomIdentityProfile } from './utils/randomIdentity';

// Types
export type { T_GeoLike } from '../../types';
export type { T_IdentityCharacter } from './utils/randomIdentity';

export {
    // Main components
    Fingerprints,
    Surface,
    Device,
    AvaFlag,
    // Hooks
    useFingerprints,
    useDoc,
    useFingerprint,
    useSubscription,
    // Actions
    initFingerprints,
    trashFingerprint,
    updateFingerprint,
    setFingerprints,
    // Utils
    identityCharacters,
    randomIdentityProfile,
};
