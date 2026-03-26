'use client';
import type { T_Config } from '../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { usePaywall, setPaywall, useAccount } from '../../Paywall';

export interface I_ChooseAvatar {
    options?: any;
};

export default function ChooseAvatar({
    options={
        avatar: '/shared/svg/blank.svg',
    },
}: I_ChooseAvatar) {
    const dispatch = useDispatch();
    const account = useAccount();
    const [open, setOpen] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);
    const presetAvatars = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
    ];

    const handleAvatarClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePresetSelect = (url: string) => {
        setSelected(url);
        dispatch(setPaywall('account', { ...account, avatar: url }));
        setOpen(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        // Resize to square and upload logic here (stubbed)
        // For now, just use a local URL
        const reader = new FileReader();
        reader.onload = () => {
            const url = reader.result as string;
            setSelected(url);
            dispatch(setPaywall('account', { ...account, avatar: url }));
            setUploading(false);
            setOpen(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <IconButton onClick={handleAvatarClick} disabled={uploading}>
                    <Avatar sx={{ width: 64, height: 64 }} src={selected || account?.avatar || options.avatar} />
                </IconButton>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        transform: 'translateX(56px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <Icon icon="photo" color="info" />
                </Box>
            </Box>
            {/* Avatar selection dialog */}
            <Box
                component="dialog"
                open={open}
                sx={{
                    zIndex: 1300,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    display: open ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={handleClose}
            >
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 3,
                        minWidth: 320,
                        boxShadow: 6,
                        position: 'relative',
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <Box sx={{ mb: 2, fontWeight: 600 }}>Choose your avatar</Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                        {presetAvatars.map((url, i) => (
                            <IconButton key={url} onClick={() => handlePresetSelect(url)}>
                                <Avatar src={url} sx={{ border: selected === url ? '2px solid #1976d2' : undefined }} />
                            </IconButton>
                        ))}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
                            <Icon icon="upload" color="primary" /> Upload your own
                        </label>
                    </Box>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Icon icon="close" />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}
