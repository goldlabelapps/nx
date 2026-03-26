'use client';
import type { T_Config } from '../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { usePaywall, setPaywall, useAccount } from '../../Paywall';

export interface I_ChooseAvatar {
    onSave: (newAvatar: string) => void;
};

export default function ChooseAvatar({
    onSave,
}: I_ChooseAvatar) {
    const dispatch = useDispatch();
    const account = useAccount();
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
                    <Avatar sx={{ 
                        width: 64, height: 64 }} 
                        src={account?.avatar} 
                    />
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
            {/* Avatar selection dialog using MUI Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{  }}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Icon icon="close" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 0 }}>
                        {presetAvatars.map((url, i) => (
                            <IconButton key={url} onClick={() => handleChoice(url)}>
                                <Avatar 
                                src={url} 
                                sx={{ 
                                    width: 64,
                                    height: 64,
                                    border: selected === url ? '2px solid #1976d2' : undefined }} />
                            </IconButton>
                        ))}
                    </Box>
                    
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex',width: '100%', m:2}}>
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
                                onChange={handleUpload} />
                            
                            Upload
                            <Icon icon="upload" color="primary" />
                        </label>
                        <Box sx={{ flexGrow: 1 }} />
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
