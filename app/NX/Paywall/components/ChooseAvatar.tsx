'use client';
import * as React from 'react';
import {
    useTheme,
    useMediaQuery,
    Box,
    IconButton,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
import { Icon, setFeedback } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { setPaywall, useAccount, usePaywall } from '../../Paywall';
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
    const avatars = paywall?.avatars || {};
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(true);
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

    const handleUploadWIP = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFeedback({
            severity: 'info',
            title: 'Not available yet',
        }))

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

            const res = await fetch('/api/avatars/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });
            const result = await res.json();
            if (result?.data?.src) {
                setSelected(result.data.src);
                dispatch(setPaywall('account', { 
                    ...account, 
                    avatar: result.data.src 
                }));
                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Avatar uploaded',
                }))
                onSave(result.data.src);
            } else {
                dispatch(setFeedback({
                    severity: 'error',
                    title: result?.message || 'Avatar upload failed',
                }))
            }
        } catch (err) {
            dispatch(setFeedback({
                severity: 'error',
                title: 'Avatar upload failed',
            }))
        } finally {
            setUploading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <IconButton onClick={handleAvatarClick} disabled={uploading}>
                    <Avatar sx={{ 
                        width: 50, height: 50 }} 
                        src={account?.avatar} 
                    />
                </IconButton>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        transform: 'translateX(-15px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
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
                <DialogTitle sx={{  }}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Icon icon="close" />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', width: '100%', m: 2 }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer',
                            }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleUploadWIP} />

                                Upload
                                <Icon icon="upload" color="primary" />
                            </label>
                            <Box sx={{ flexGrow: 1 }} />
                        </Box>
{/* 
                        <Typography variant="h6" sx={{ width: '100%', my: 2, textAlign: 'center' }}>
                            Or choose
                        </Typography> */}

                        {presetAvatars.map((url, i) => (
                            <IconButton key={url} onClick={() => handleChoice(url)}>
                                <Avatar 
                                src={url} 
                                sx={{ 
                                    width: 85, 
                                    height: 85,
                                    border: selected === url ? `2px solid ${theme.palette.primary.main}` 
                                : undefined }} />
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
