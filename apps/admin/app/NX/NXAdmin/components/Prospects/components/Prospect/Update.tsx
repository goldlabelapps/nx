'use client';
import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Icon } from '../../../../../DesignSystem';
import { useDispatch } from '../../../../../Uberedux';
import {
    identityCharacters,
    randomIdentityProfile,
    type T_IdentityCharacter,
    updateProspect,
    useProspect,
    useDoc,
} from '../../../Prospects';

type UpdateValueType = 'string' | 'number' | 'boolean';
type T_IconName = React.ComponentProps<typeof Icon>['icon'];

export type T_Update = {
    field: string;
    icon?: T_IconName;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
    label?: string;
    title?: string;
    description?: string;
    valueType?: UpdateValueType;
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    initialValue?: string | number | boolean;
    prospect?: string | null;
    triggerLabel?: string;
    triggerVariant?: 'text' | 'outlined' | 'contained';
    confirmText?: string;
    cancelText?: string;
    parse?: (rawValue: string) => string | number | boolean;
    validate?: (nextValue: string | number | boolean) => string | null;
    onUpdated?: (nextValue: string | number | boolean) => void;
};

const asTextValue = (value: unknown, valueType: UpdateValueType): string => {
    if (valueType === 'boolean') return value ? 'true' : 'false';
    if (value === undefined || value === null) return '';
    return String(value);
};

const inferType = (value: unknown): UpdateValueType => {
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'string';
};

const getAvatarSrc = (character: T_IdentityCharacter): string => `/shared/svg/characters/${character}.svg`;

export default function Update({
    field,
    icon,
    open: controlledOpen,
    onOpenChange,
    hideTrigger = false,
    label,
    title,
    description,
    valueType,
    required = false,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    initialValue,
    prospect,
    triggerLabel,
    triggerVariant = 'outlined',
    confirmText = 'Save',
    cancelText = 'Later',
    parse,
    validate,
    onUpdated,
}: T_Update) {
    const dispatch = useDispatch();
    const doc = useDoc() as Record<string, unknown> | null;
    const activeProspect = useProspect();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [openState, setOpenState] = React.useState(false);
        const open = controlledOpen ?? openState;
        const setDialogOpen = React.useCallback((nextOpen: boolean) => {
            if (controlledOpen === undefined) {
                setOpenState(nextOpen);
            }
            onOpenChange?.(nextOpen);
        }, [controlledOpen, onOpenChange]);

    const [rawValue, setRawValue] = React.useState('');
    const [selectedAvatar, setSelectedAvatar] = React.useState<T_IdentityCharacter | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);

    const resolvedProspect = prospect ?? activeProspect;
    const resolvedField = typeof field === 'string' && field.length > 0 ? field : 'field';
    const sourceValue = initialValue ?? doc?.[resolvedField];
    const resolvedType = valueType ?? inferType(sourceValue);
    const fieldLabel = typeof label === 'string' && label.length > 0
        ? label
        : resolvedField;
    const normalizedFieldLabel = fieldLabel.toLowerCase();
    const hasSourceValue = typeof sourceValue === 'string'
        ? sourceValue.trim().length > 0
        : sourceValue !== undefined && sourceValue !== null;
    const isIdentityEditor = resolvedType === 'string' && resolvedField === 'name';
    const currentAvatar = typeof doc?.avatar === 'string' ? doc.avatar as T_IdentityCharacter : null;
    const resolvedIcon: T_IconName = icon ?? (hasSourceValue ? 'edit' : 'add');
    const triggerText = triggerLabel
        ?? (hasSourceValue ? String(sourceValue) : `Add ${normalizedFieldLabel}`);

    React.useEffect(() => {
        if (!open) return;
        setRawValue(asTextValue(sourceValue, resolvedType));
        setSelectedAvatar(currentAvatar);
        setError(null);
    }, [currentAvatar, open, sourceValue, resolvedType]);

    React.useEffect(() => {
        if (!open || !isIdentityEditor) return;
    }, [currentAvatar, isIdentityEditor, open, selectedAvatar]);

    React.useEffect(() => {
        if (!open) return;
        const frame = requestAnimationFrame(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });

        return () => cancelAnimationFrame(frame);
    }, [open]);

    const dialogTitle = title ?? `Update ${fieldLabel}`;

    const parseValue = React.useCallback((raw: string): string | number | boolean => {
        if (parse) return parse(raw);
        if (resolvedType === 'number') return Number(raw);
        if (resolvedType === 'boolean') return raw === 'true';
        return raw;
    }, [parse, resolvedType]);

    const validateValue = React.useCallback((nextValue: string | number | boolean): string | null => {
        if (required) {
            const emptyString = typeof nextValue === 'string' && nextValue.trim().length === 0;
            if (emptyString) return `${fieldLabel} is required`;
        }

        if (resolvedType === 'number') {
            const n = Number(nextValue);
            if (Number.isNaN(n)) return `${fieldLabel} must be a number`;
            if (typeof min === 'number' && n < min) return `${fieldLabel} must be at least ${min}`;
            if (typeof max === 'number' && n > max) return `${fieldLabel} must be at most ${max}`;
        }

        if (resolvedType === 'string') {
            const s = String(nextValue ?? '');
            if (typeof minLength === 'number' && s.length < minLength) {
                return `${fieldLabel} must be at least ${minLength} characters`;
            }
            if (typeof maxLength === 'number' && s.length > maxLength) {
                return `${fieldLabel} must be no more than ${maxLength} characters`;
            }
            if (pattern && !pattern.test(s)) return `${fieldLabel} has an invalid format`;
        }

        if (validate) {
            const custom = validate(nextValue);
            if (custom) return custom;
        }

        return null;
    }, [fieldLabel, max, maxLength, min, minLength, pattern, required, resolvedType, validate]);

    const handleOpen = () => setDialogOpen(true);

    const handleClose = () => {
        if (saving) return;
        setDialogOpen(false);
        setError(null);
    };

    const handleSave = async () => {
        if (!resolvedProspect) {
            setError('No prospect selected to update');
            return;
        }

        const nextValue = parseValue(rawValue);
        const nextError = validateValue(nextValue);
        if (nextError) {
            setError(nextError);
            return;
        }

        if (isIdentityEditor && !selectedAvatar) {
            setError('Avatar is required');
            return;
        }

        setSaving(true);
        await dispatch(updateProspect(resolvedProspect, resolvedField, nextValue));
        if (isIdentityEditor && selectedAvatar) {
            await dispatch(updateProspect(resolvedProspect, 'avatar', selectedAvatar));
        }
        setSaving(false);
        setDialogOpen(false);
        setError(null);
        onUpdated?.(nextValue);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (saving) return;
        await handleSave();
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (resolvedType === 'boolean') return;

        event.preventDefault();
        if (saving) return;
        await handleSave();
    };

    const handleRandomIdentity = () => {
        const profile = randomIdentityProfile();
        setRawValue(profile.name);
        setSelectedAvatar(profile.character);
        setError(null);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    return (
        <>
            {!hideTrigger ? (
                <Button 
                    aria-label={triggerText}
                    onClick={handleOpen} 
                    variant={triggerVariant} 
                    color="primary" 
                    startIcon={<Icon icon={resolvedIcon} />}
                >
                    {triggerText}
                </Button>
            ) : null}

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                TransitionProps={{
                    onEntered: () => {
                        inputRef.current?.focus();
                        inputRef.current?.select();
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Icon icon={resolvedIcon} />
                    <Typography variant="h6" component="span">
                        {dialogTitle}
                    </Typography>
                </DialogTitle>

                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        {resolvedType === 'boolean' ? (
                            <TextField
                                select
                                fullWidth
                                autoFocus
                                inputRef={inputRef}
                                label={label ?? field}
                                value={rawValue}
                                onChange={(e) => {
                                    setRawValue(e.target.value);
                                    if (error) setError(null);
                                }}
                                error={!!error}
                                helperText={error ?? ' '}
                            >
                                <MenuItem value="true">True</MenuItem>
                                <MenuItem value="false">False</MenuItem>
                            </TextField>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    inputRef={inputRef}
                                    label={label ?? field}
                                    type={resolvedType === 'number' ? 'number' : 'text'}
                                    value={rawValue}
                                    onChange={(e) => {
                                        setRawValue(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    InputProps={isIdentityEditor ? {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title="Generate random identity">
                                                    <IconButton
                                                        edge="start"
                                                        aria-label="Generate random identity"
                                                        onClick={handleRandomIdentity}
                                                    >
                                                        <Icon icon="about" />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                    } : undefined}
                                    error={!!error}
                                    helperText={error ?? ' '}
                                />
                                {isIdentityEditor ? (
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {identityCharacters.map((character) => {
                                                const selected = selectedAvatar === character;
                                                return (
                                                    <Tooltip key={character} title={character}>
                                                        <IconButton
                                                            aria-label={`Select ${character} avatar`}
                                                            color={selected ? 'primary' : 'default'}
                                                            onClick={() => {
                                                                setSelectedAvatar(character);
                                                                if (error) setError(null);
                                                            }}
                                                            sx={{
                                                                border: theme => `2px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
                                                                borderRadius: 2,
                                                            }}
                                                        >
                                                            <Avatar
                                                                alt={character}
                                                                src={getAvatarSrc(character)}
                                                                sx={{ width: 128, height: 128 }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                ) : null}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1 }}>
                            <Button 
                                startIcon={<Icon icon="close" />} 
                                onClick={handleClose} 
                                variant="outlined" 
                                color="primary" 
                                disabled={saving}>
                                No
                            </Button>
                            <Button 
                                startIcon={<Icon icon="save" />} 
                                type="submit"
                                variant="contained" 
                                color="primary" 
                                disabled={saving}>
                                Save
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}
