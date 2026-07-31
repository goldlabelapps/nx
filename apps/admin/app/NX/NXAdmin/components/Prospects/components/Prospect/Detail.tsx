'use client';

import type { T_Prospect } from '../../types';
import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';

import { Icon, navigateTo } from '../../../../../DesignSystem';
import { createSlug } from '../../../../../lib/vanilla-js/createSlug';
import { useDispatch } from '../../../../../Uberedux';
import { AvaFlag } from '../../../Prospects';
import { updateProspect } from '../../actions/updateProspect';

interface I_Detail {
    prospect: T_Prospect;
}

const MetaItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => {
    if (!value) {
        return null;
    }

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
};

export const Detail: React.FC<I_Detail> = ({ prospect }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const geo = prospect.geo || {};
    const device = prospect.device || {};
    const countryCode = geo.country_code2 || null;
    const [editingName, setEditingName] = useState(false);
    const [nameValue, setNameValue] = useState(prospect.name || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBack = () => {
        dispatch(navigateTo(router, '/prospects'));
    };

    const handleTagClick = (tag: string) => {
        dispatch(navigateTo(router, `/prospects/tag/${createSlug(tag)}`));
    };

    const handleNameEdit = () => {
        setEditingName(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    };

    const handleNameBlur = async () => {
        setEditingName(false);
        if (nameValue !== prospect.name) {
            await dispatch(updateProspect(prospect.id, 'name', nameValue));
        }
    };

    const handleNameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            setNameValue(prospect.name || '');
            setEditingName(false);
        }
    };

    return (
        <Box>
            <Card sx={{ mb: 3 }} variant="outlined">
                <CardHeader
                    avatar={
                        <IconButton onClick={handleBack}>
                            <Icon icon="left" />
                        </IconButton>
                    }
                    action={countryCode ? (
                        <AvaFlag
                            countryCode={countryCode}
                            avatarUrl={`https://goldlabel.pro/shared/svg/characters/${prospect.avatar}.svg`}
                            size={90}
                            position="bottom-left"
                        />
                    ) : undefined}
                    title={
                        editingName ? (
                            <TextField
                                inputRef={inputRef}
                                value={nameValue}
                                onChange={handleNameChange}
                                onBlur={handleNameBlur}
                                onKeyDown={handleNameKeyDown}
                                variant="filled"
                                fullWidth
                                size="small"
                                InputProps={{
                                    disableUnderline: false,
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 700,
                                        padding: 0,
                                        margin: 0,
                                        background: 'transparent',
                                    },
                                }}
                                inputProps={{
                                    maxLength: 64,
                                    style: {
                                        padding: 0,
                                    },
                                }}
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        background: 'transparent',
                                        fontSize: 28,
                                        fontWeight: 700,
                                        padding: 0,
                                    },
                                }}
                            />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h4" component="h1" sx={{ cursor: 'pointer' }} onClick={handleNameEdit}>
                                    {nameValue || 'Unknown prospect'}
                                </Typography>
                                <IconButton size="small" onClick={handleNameEdit} aria-label="Edit name">
                                    <Icon icon="edit" />
                                </IconButton>
                            </Box>
                        )
                    }
                    subheader={
                        prospect.company ? (
                            <Typography variant="body2" color="text.secondary">
                                {prospect.company}
                            </Typography>
                        ) : undefined
                    }
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {prospect.linkedin && (
                            <Button
                                href={prospect.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                startIcon={<Icon icon="linkedin" />}
                            >
                                LinkedIn
                            </Button>
                        )}
                        {prospect.email && (
                            <Button
                                href={`mailto:${prospect.email}`}
                                variant="outlined"
                                startIcon={<Icon icon="email" />}
                            >
                                Email
                            </Button>
                        )}
                        {prospect.companyWebsite && (
                            <Button
                                href={prospect.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                startIcon={<Icon icon="web" />}
                            >
                                Website
                            </Button>
                        )}
                    </Box>

                    {prospect.recommendation && (
                        <Alert severity="info" sx={{ mb: 3 }}>
                            <Typography variant="body2">
                                <Box component="span" sx={{ fontWeight: 700 }}>Recommendation:</Box>{' '}
                                {prospect.recommendation}
                            </Typography>
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            {prospect.job && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Role</Typography>
                                    <Typography variant="body2">{prospect.job}</Typography>
                                </Box>
                            )}

                            {prospect.summary && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Summary</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {prospect.summary}
                                    </Typography>
                                </Box>
                            )}

                            {prospect.career && Array.isArray(prospect.career) && prospect.career.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Career</Typography>
                                    {prospect.career.map((role: any, idx: number) => (
                                        <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                                            <Box component="span" sx={{ fontWeight: 700 }}>{role.title}</Box> @ {role.company}{' '}
                                            <Box component="span" sx={{ color: 'text.secondary' }}>({role.from} - {role.to})</Box>
                                        </Typography>
                                    ))}
                                </Box>
                            )}

                            {prospect.education && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Education</Typography>
                                    <Typography variant="body2">
                                        {prospect.education.degree} @ {prospect.education.institution}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {prospect.education.location} ({prospect.education.year})
                                    </Typography>
                                </Box>
                            )}

                            {prospect.tags && Array.isArray(prospect.tags) && prospect.tags.length > 0 && (
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Tags</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {prospect.tags.map((tag: string) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                clickable
                                                onClick={() => handleTagClick(tag)}
                                                variant="outlined"
                                                size="small"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Details</Typography>
                            <MetaItem label="Title" value={prospect.title} />
                            <MetaItem label="Company" value={prospect.company} />
                            <MetaItem label="Location" value={[geo.city, geo.state_prov, geo.country_name].filter(Boolean).join(', ')} />
                            <MetaItem label="IP Address" value={geo.ip} />
                            <MetaItem label="Browser" value={device.browser} />
                            <MetaItem label="Operating System" value={device.os} />
                            <MetaItem label="Platform" value={device.platform} />
                            <MetaItem label="Estimated Age" value={prospect.age ? String(prospect.age) : undefined} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
