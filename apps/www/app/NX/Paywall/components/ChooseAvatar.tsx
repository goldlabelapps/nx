'use client';
import * as React from 'react';
import {
    useMediaQuery,
    Box,
    IconButton,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Icon, setFeedback } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { 
    usePaywall,
    setPaywall, 
    useAccount,
} from '../../Paywall';
import { getAuth } from 'firebase/auth';

export interface I_ChooseAvatar {
    onSave: (newAvatar: string) => void;
};

export default function ChooseAvatar({
    onSave,
}: I_ChooseAvatar) {
    const dispatch = useDispatch();
    const account = useAccount();
    const paywall = usePaywall();
    const avatarsByUID = paywall?.avatarsByUID || {};
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);
    const presetAvatars = [
        '/shared/svg/characters/biker.svg',
        '/shared/svg/characters/chix.svg',
        '/shared/svg/characters/dapper.svg',
        '/shared/svg/characters/hippy.svg',
        '/shared/svg/characters/hipster.svg',
        '/shared/svg/characters/mumma.svg',
        '/shared/svg/characters/punk.svg',
        '/shared/svg/characters/rasta.svg',
        '/shared/svg/characters/rocker.svg',
    ];

    const handleAvatarClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChoice = (url: string) => {
        setSelected(url);
        onSave(url);
        setOpen(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !account?.uid) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', account.uid);

        try {
            // Get Firebase ID token for the current user
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error('User not authenticated');
            const idToken = await user.getIdToken();

            const res = await fetch('/api/avatars', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            const result = await res.json();
            // Accept either result.data.src or result.data.url for compatibility
            const avatarUrl = result?.data?.src || result?.data?.url;
            if (avatarUrl) {
                setSelected(avatarUrl);
                dispatch(setPaywall('account', { 
                    ...account, 
                    avatar: avatarUrl 
                }));
                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Avatar uploaded',
                }))
                onSave(avatarUrl);
            } else {
                dispatch(setFeedback({
                    severity: 'error',
                    title: result?.message || 'Avatar upload failed',
                }))
            }
        } catch (err: any) {
            dispatch(setFeedback({
                severity: 'error',
                title: err?.message || 'Avatar upload failed',
            }))
        } finally {
            setUploading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Box>
                <IconButton onClick={handleAvatarClick} disabled={uploading}>
                    <Avatar src={account?.avatar} />
                </IconButton>
                <Box>
                    <Icon icon="photo" color="primary" />
                </Box>
            </Box>
            

            {/* Avatar selection dialog using MUI Dialog */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth="xs" 
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle>
                    <IconButton onClick={handleClose}>
                        <Icon icon="close" />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box>
                        
                        {Object.entries(avatarsByUID).map(([id, avatarObj]) => {
                            const avatar = avatarObj as { src: string; uid: string };
                            return (
                                <IconButton key={id} onClick={() => handleChoice(avatar.src)}>
                                    <Avatar src={avatar.src} />
                                </IconButton>
                            );
                        })}
                        
                        <Box>
                            <Box />
                            <label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload} />

                                Upload
                                <Icon icon="upload" color="primary" />
                            </label>
                            <Box />
                        </Box>



                        {presetAvatars.map((url) => (
                            <IconButton key={url} onClick={() => handleChoice(url)}>
                                <Avatar src={url} />
                            </IconButton>
                        ))}

                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    

                </DialogActions>
                
            </Dialog>
        </>
    );
}
