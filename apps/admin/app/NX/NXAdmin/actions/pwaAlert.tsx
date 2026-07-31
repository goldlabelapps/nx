import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';

type T_BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

let deferredInstallPrompt: T_BeforeInstallPromptEvent | null = null;

const isStandalone = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches
        || (window.navigator as any).standalone === true;
};

export const pwaAlert = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            if (typeof window === 'undefined') return;

            const currentPwa = getState()?.redux?.nxAdmin?.pwa;
            if (currentPwa?.initialized) return;

            const supported = window.isSecureContext && 'serviceWorker' in navigator;
            const installed = isStandalone();

            dispatch(setUbereduxKey({
                key: 'nxAdmin.pwa',
                value: {
                    initialized: true,
                    supported,
                    installed,
                    installable: false,
                    lastOutcome: null,
                },
            }));

            if (!supported || installed) return;

            window.addEventListener('beforeinstallprompt', (event: Event) => {
                const installEvent = event as T_BeforeInstallPromptEvent;
                installEvent.preventDefault();
                deferredInstallPrompt = installEvent;

                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.installable', value: true }));
                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.lastOutcome', value: null }));
            });

            window.addEventListener('appinstalled', () => {
                deferredInstallPrompt = null;
                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.installable', value: false }));
                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.installed', value: true }));
                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.lastOutcome', value: 'accepted' }));
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };

export const triggerPwaInstall = (): any =>
    async (dispatch: Dispatch) => {
        try {
            if (!deferredInstallPrompt) return false;

            await deferredInstallPrompt.prompt();
            const choice = await deferredInstallPrompt.userChoice;
            const accepted = choice.outcome === 'accepted';

            dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.lastOutcome', value: choice.outcome }));
            dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.installable', value: false }));

            if (accepted) {
                dispatch(setUbereduxKey({ key: 'nxAdmin.pwa.installed', value: true }));
            }

            deferredInstallPrompt = null;
            return accepted;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
            return false;
        }
    };
